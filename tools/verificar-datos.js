"use strict";

/*
 * Validación sin dependencias del banco CT-GenAI.
 * Ejecución: node tools/verificar-datos.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const simulador = path.resolve(__dirname, "..");
const errores = [];

function comprobar(condicion, mensaje) {
  if (!condicion) errores.push(mensaje);
}

function cargar(nombre, sandbox) {
  const archivo = path.join(simulador, nombre);
  vm.runInContext(fs.readFileSync(archivo, "utf8"), sandbox, { filename: nombre });
}

const sandbox = {
  console,
  document: { addEventListener() {} },
  localStorage: {
    getItem() { return null; },
    setItem() {},
    removeItem() {}
  }
};
sandbox.sessionStorage = sandbox.localStorage;
sandbox.window = sandbox;
vm.createContext(sandbox);

try {
  cargar("banco.js", sandbox);
  cargar("preguntas-exigentes.js", sandbox);
  cargar("preguntas-exigentes-2.js", sandbox);
  cargar("preguntas-exigentes-3.js", sandbox);
  cargar("preguntas-exigentes-4.js", sandbox);
  cargar("porques.js", sandbox);
  cargar("silabo.js", sandbox);
  cargar("app.js", sandbox);
} catch (error) {
  console.error("No se pudieron cargar los datos:", error.message);
  process.exit(1);
}

const banco = sandbox.window.BANCO;
const silabo = sandbox.window.SILABO;
comprobar(Array.isArray(banco) && banco.length > 0, "El banco de preguntas está vacío o no se pudo cargar.");
comprobar(silabo && silabo.temas, "El sílabo no se pudo cargar.");

const ids = new Set();
const objetivosBanco = new Set();

banco.forEach((pregunta, indice) => {
  const prefijo = `Pregunta ${indice + 1}`;

  comprobar(typeof pregunta.id === "string" && pregunta.id.length > 0, `${prefijo}: falta el identificador estable.`);
  comprobar(!ids.has(pregunta.id), `${prefijo}: identificador duplicado "${pregunta.id}".`);
  ids.add(pregunta.id);

  comprobar(typeof pregunta.lo === "string" && pregunta.lo.length > 0, `${prefijo}: falta el objetivo de aprendizaje.`);
  objetivosBanco.add(pregunta.lo);
  comprobar(["K1", "K2", "K3"].includes(pregunta.k), `${prefijo}: nivel cognitivo inválido "${pregunta.k}".`);
  comprobar(Number.isInteger(pregunta.puntos) && pregunta.puntos > 0, `${prefijo}: puntuación inválida.`);
  comprobar(Number.isInteger(pregunta.elegir) && pregunta.elegir > 0, `${prefijo}: valor "elegir" inválido.`);
  comprobar(Array.isArray(pregunta.opciones) && pregunta.opciones.length >= pregunta.elegir, `${prefijo}: opciones insuficientes.`);
  comprobar(Array.isArray(pregunta.correctas) && pregunta.correctas.length === pregunta.elegir, `${prefijo}: la cantidad de respuestas correctas no coincide con "elegir".`);
  comprobar(new Set(pregunta.correctas).size === pregunta.correctas.length, `${prefijo}: hay respuestas correctas repetidas.`);

  (pregunta.correctas || []).forEach((opcion) => {
    comprobar(Number.isInteger(opcion) && opcion >= 0 && opcion < pregunta.opciones.length, `${prefijo}: índice de respuesta correcta fuera de rango (${opcion}).`);
  });

  comprobar(
    Array.isArray(pregunta.porques) && pregunta.porques.length === pregunta.opciones.length,
    `${prefijo}: faltan justificaciones o no coinciden con las opciones.`
  );
  comprobar(
    new Set(pregunta.porques).size === pregunta.porques.length,
    `${prefijo}: hay justificaciones repetidas entre sus opciones.`
  );

  comprobar(
    silabo.temas[pregunta.lo],
    `${prefijo}: el objetivo ${pregunta.lo} no existe en silabo.js.`
  );
});

const codigoApp = fs.readFileSync(path.join(simulador, "app.js"), "utf8");
const coincidenciaPlan = codigoApp.match(/var PLAN = (\[[\s\S]*?\n  \]);/);
comprobar(Boolean(coincidenciaPlan), "No se pudo extraer PLAN de app.js.");

let plan = [];
if (coincidenciaPlan) {
  try {
    plan = vm.runInNewContext(coincidenciaPlan[1]);
  } catch (error) {
    errores.push(`PLAN no es válido: ${error.message}`);
  }
}

comprobar(plan.length === 40, `PLAN debe contener 40 preguntas; tiene ${plan.length}.`);
const puntosPlan = plan.reduce((total, entrada) => total + entrada[2], 0);
comprobar(puntosPlan === 46, `PLAN debe sumar 46 puntos; suma ${puntosPlan}.`);

plan.forEach((entrada, indice) => {
  const [lo, nivel, puntos, elegir] = entrada;
  const candidatas = banco.filter((pregunta) =>
    pregunta.lo === lo &&
    pregunta.k === nivel &&
    pregunta.puntos === puntos &&
    pregunta.elegir === elegir
  );

  comprobar(
    candidatas.length > 0,
    `PLAN, posición ${indice + 1}: no hay pregunta compatible para ${lo} / ${nivel} / ${puntos} punto(s) / elegir ${elegir}.`
  );
});

Object.keys(silabo.temas || {}).forEach((lo) => {
  comprobar(objetivosBanco.has(lo), `El objetivo ${lo} existe en el sílabo pero no tiene preguntas en el banco.`);
});

function contarFirmas(claves) {
  const mapa = {};
  claves.forEach((clave) => { mapa[clave] = (mapa[clave] || 0) + 1; });
  return mapa;
}

const armarExamen = sandbox.CTGenAI && sandbox.CTGenAI.armarExamen;
comprobar(typeof armarExamen === "function", "app.js no expone armarExamen.");

const RONDAS = 200;
let desviados = 0;
let repetidos = 0;
let incompletos = 0;
let sinExigencia = 0;
if (typeof armarExamen === "function" && plan.length === 40) {
  const firmaPlan = contarFirmas(plan.map((entrada) => entrada.join("|")));
  for (let ronda = 0; ronda < RONDAS; ronda++) {
    let examen;
    try {
      examen = armarExamen();
    } catch (error) {
      errores.push(`armarExamen falló en la simulación ${ronda + 1}: ${error.message}`);
      break;
    }
    if (examen.length !== 40) incompletos++;
    const firmaExamen = contarFirmas(examen.map((pregunta) => [pregunta.lo, pregunta.k, pregunta.puntos, pregunta.elegir].join("|")));
    const claves = new Set([...Object.keys(firmaPlan), ...Object.keys(firmaExamen)]);
    let distinto = false;
    claves.forEach((clave) => {
      if (firmaPlan[clave] !== firmaExamen[clave]) distinto = true;
    });
    if (distinto) desviados++;
    if (new Set(examen.map((pregunta) => pregunta.enunciado)).size !== examen.length) repetidos++;
    if (examen.some((pregunta) => !pregunta.exigente)) sinExigencia++;
  }
  comprobar(incompletos === 0, `${incompletos} exámenes simulados no tienen 40 preguntas.`);
  comprobar(desviados === 0, `${desviados} de ${RONDAS} exámenes simulados no respetan el nivel K, los puntos o el número de opciones del plan.`);
  comprobar(repetidos === 0, `${repetidos} exámenes simulados repiten un enunciado.`);
  comprobar(sinExigencia === 0, `${sinExigencia} exámenes simulados incluyen alguna pregunta que no es de la tanda exigente.`);
}

const fusionarHistoriales = sandbox.CTGenAI && sandbox.CTGenAI.fusionarHistoriales;
if (typeof fusionarHistoriales === "function") {
  function intentoDePrueba(fecha, puntos, remoto) {
    const intento = {
      fecha,
      modo: "real",
      puntos,
      incompleto: false,
      porTiempo: false,
      minutos: 60,
      preguntas: [{ lo: "1.1.1" }],
      respuestas: [[0]]
    };
    if (remoto) intento._remotoId = remoto;
    return intento;
  }
  const soloLocal = intentoDePrueba("2/1/2026, 10:00:00", 31);
  const remotoDistinto = intentoDePrueba("3/1/2026, 10:00:00", 40, "remoto-1");
  const fusionConserva = fusionarHistoriales([soloLocal], [remotoDistinto]);
  comprobar(fusionConserva.length === 2, "La fusión del historial no debe descartar un intento que solo está en el navegador.");

  const localSinId = intentoDePrueba("4/1/2026, 10:00:00", 28);
  const remotoMismo = intentoDePrueba("4/1/2026, 10:00:00", 28, "remoto-2");
  const fusionId = fusionarHistoriales([localSinId], [remotoMismo]);
  comprobar(fusionId.length === 1 && fusionId[0]._remotoId === "remoto-2", "Si el mismo intento ya está en la cuenta, la fusión debe conservar su identificador remoto.");
}

if (errores.length) {
  console.error(`Validación fallida: ${errores.length} error(es).`);
  errores.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  `Validación correcta: ${banco.length} preguntas, ${ids.size} IDs únicos, ${objetivosBanco.size} objetivos, PLAN de ${plan.length} preguntas / ${puntosPlan} puntos y ${RONDAS} exámenes simulados dentro del plan.`
);
