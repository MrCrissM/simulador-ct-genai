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

const sandbox = { window: {} };
vm.createContext(sandbox);

try {
  cargar("banco.js", sandbox);
  cargar("porques.js", sandbox);
  cargar("silabo.js", sandbox);
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

if (errores.length) {
  console.error(`Validación fallida: ${errores.length} error(es).`);
  errores.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  `Validación correcta: ${banco.length} preguntas, ${ids.size} IDs únicos, ${objetivosBanco.size} objetivos y PLAN de ${plan.length} preguntas / ${puntosPlan} puntos.`
);
