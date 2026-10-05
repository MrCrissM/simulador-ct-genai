/* Simulador de práctica CT-GenAI. */
(function () {
  var PLAN = [
    ["1.1.1", "K1", 1, 1],
    ["1.1.2", "K2", 1, 1],
    ["1.1.2", "K2", 1, 1],
    ["1.1.3", "K2", 1, 1],
    ["1.1.4", "K2", 1, 1],
    ["1.2.1", "K2", 1, 2],
    ["1.2.2", "K2", 1, 1],
    ["2.1.1", "K2", 1, 1],
    ["2.1.1", "K2", 1, 1],
    ["2.1.2", "K2", 1, 1],
    ["2.1.3", "K2", 1, 1],
    ["2.2.1", "K3", 2, 1],
    ["2.2.2", "K3", 2, 1],
    ["2.2.3", "K3", 2, 1],
    ["2.2.4", "K3", 2, 1],
    ["2.2.5", "K3", 2, 1],
    ["2.3.1", "K2", 1, 1],
    ["2.3.2", "K2", 1, 1],
    ["3.1.1", "K1", 1, 1],
    ["3.1.2", "K3", 2, 1],
    ["3.1.3", "K2", 1, 1],
    ["3.1.4", "K1", 1, 1],
    ["3.2.1", "K2", 1, 1],
    ["3.2.2", "K2", 1, 1],
    ["3.2.2", "K2", 1, 1],
    ["3.2.3", "K2", 1, 1],
    ["3.3.1", "K2", 1, 1],
    ["3.4.1", "K1", 1, 2],
    ["4.1.1", "K2", 1, 1],
    ["4.1.2", "K2", 1, 1],
    ["4.1.3", "K2", 1, 1],
    ["4.2.1", "K2", 1, 1],
    ["4.2.2", "K2", 1, 1],
    ["5.1.1", "K1", 1, 1],
    ["5.1.2", "K2", 1, 1],
    ["5.1.3", "K2", 1, 1],
    ["5.1.4", "K1", 1, 1],
    ["5.2.1", "K2", 1, 1],
    ["5.2.2", "K1", 1, 1],
    ["5.2.3", "K1", 1, 1]
  ];

  var CAPITULOS = {
    "1": "Introducción a la IA generativa",
    "2": "Ingeniería de prompts",
    "3": "Gestión de riesgos",
    "4": "Infraestructura de prueba impulsada por LLM",
    "5": "Despliegue e integración"
  };

  var TOTAL_PUNTOS = 46;
  var CORTE = 30;
  var CLAVE_HIST = "ctgenai-historial";
  var CLAVE_SESION = "ctgenai-sesion";
  var CLAVE_PAUSA = "ctgenai-pausado";

  var estado = null;
  var reloj = null;

  function barajar(lista) {
    var a = lista.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function porLo(lo) {
    return window.BANCO.filter(function (p) { return p.lo === lo; });
  }

  function enunciadosRecientes() {
    var set = {};
    var hist = leerHistorial();
    var ultimo = hist[0];
    if (!ultimo || !ultimo.preguntas) return set;
    ultimo.preguntas.forEach(function (p) {
      if (p && p.enunciado) set[p.enunciado] = true;
    });
    return set;
  }

  function armarExamen() {
    var usados = {};
    var recientes = enunciadosRecientes();
    var preguntas = PLAN.map(function (slot) {
      var lo = slot[0];
      var candidatas = porLo(lo).filter(function (p) { return !usados[p._id]; });
      if (!candidatas.length) candidatas = porLo(lo);
      var frescas = candidatas.filter(function (p) { return !recientes[p.enunciado]; });
      if (frescas.length) candidatas = frescas;
      var elegida = barajar(candidatas)[0];
      usados[elegida._id] = true;
      var orden = barajar(elegida.opciones.map(function (_, i) { return i; }));
      var correctas = elegida.correctas.map(function (i) { return orden.indexOf(i); }).sort(function (a, b) { return a - b; });
      return {
        lo: elegida.lo,
        k: elegida.k,
        puntos: elegida.puntos,
        elegir: elegida.elegir,
        enunciado: elegida.enunciado,
        lista: elegida.lista || null,
        opciones: orden.map(function (i) { return elegida.opciones[i]; }),
        porques: elegida.porques ? orden.map(function (i) { return elegida.porques[i]; }) : null,
        correctas: correctas,
        porque: elegida.porque
      };
    });
    return barajar(preguntas);
  }

  function letra(i) { return String.fromCharCode(97 + i); }

  var NUMERALES = ["", "UNA", "DOS", "TRES", "CUATRO"];
  function consigna(elegir) {
    return elegir > 1 ? "Elija " + NUMERALES[elegir] + " opciones." : "Elija UNA opción.";
  }

  function htmlLista(p) {
    if (!p.lista || !p.lista.length) return "";
    return "<ol class='lista'>" + p.lista.map(function (item) {
      return "<li><span class='rotulo'>" + escapar(item[0]) + ".</span><span>" + escapar(item[1]) + "</span></li>";
    }).join("") + "</ol>";
  }

  function mismoConjunto(a, b) {
    if (!a || a.length !== b.length) return false;
    var x = a.slice().sort(function (m, n) { return m - n; });
    var y = b.slice().sort(function (m, n) { return m - n; });
    for (var i = 0; i < x.length; i++) if (x[i] !== y[i]) return false;
    return true;
  }

  function puntuar(preguntas, respuestas) {
    var puntos = 0;
    var detalle = preguntas.map(function (p, i) {
      var marca = respuestas[i] || [];
      var bien = mismoConjunto(marca, p.correctas);
      if (bien) puntos += p.puntos;
      return { bien: bien, marca: marca };
    });
    return { puntos: puntos, detalle: detalle, aprobado: puntos >= CORTE };
  }

  function escribirHistorial(lista) {
    var h = lista.slice(0, 20);
    /* Cada intento guarda el examen completo; si el navegador se queda sin espacio, se sueltan los más antiguos. */
    while (h.length) {
      try {
        localStorage.setItem(CLAVE_HIST, JSON.stringify(h));
        return h.length;
      } catch (e) {
        h.pop();
      }
    }
    try { localStorage.removeItem(CLAVE_HIST); } catch (e) {}
    return 0;
  }

  function guardarHistorial(item) {
    var h = leerHistorial();
    h.unshift(item);
    escribirHistorial(h);
  }

  function leerHistorial() {
    try { return JSON.parse(localStorage.getItem(CLAVE_HIST)) || []; }
    catch (e) { return []; }
  }

  function persistir() {
    if (!estado) return;
    sessionStorage.setItem(CLAVE_SESION, JSON.stringify(estado));
  }

  function leerPausado() {
    try {
      var p = JSON.parse(localStorage.getItem(CLAVE_PAUSA));
      return p && p.preguntas && p.respuestas && typeof p.restante === "number" ? p : null;
    } catch (e) { return null; }
  }

  function contarRespondidas(respuestas) {
    return respuestas.filter(function (r) { return r && r.length; }).length;
  }

  function intentoValido(h) {
    return !!(h && typeof h.fecha === "string" && typeof h.puntos === "number" && Array.isArray(h.preguntas) && Array.isArray(h.respuestas));
  }

  function firmaIntento(h) {
    return JSON.stringify([h.fecha, h.modo, h.puntos, !!h.incompleto, !!h.porTiempo, h.minutos, h.respuestas]);
  }

  function fechaMs(fecha) {
    var m = String(fecha || "").match(/(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})(?:\D+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
    if (!m) return 0;
    return new Date(+m[3], +m[2] - 1, +m[1], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0)).getTime() || 0;
  }

  function pausadoValido(p) {
    return !!(p && p.preguntas && p.respuestas && typeof p.restante === "number");
  }

  function descargarHistorial() {
    var hist = leerHistorial();
    var pausado = leerPausado();
    if (!hist.length && !pausado) {
      window.alert("No hay intentos ni un examen en pausa en este navegador.");
      return;
    }
    var datos = {
      tipo: "ctgenai-historial",
      version: 1,
      exportado: new Date().toISOString(),
      historial: hist,
      pausado: pausado
    };
    var blob = new Blob([JSON.stringify(datos)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "ctgenai-historial-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }

  function traerHistorial(texto) {
    var datos;
    try { datos = JSON.parse(texto); }
    catch (e) {
      window.alert("No se pudo leer el archivo. Elige el JSON descargado desde el simulador.");
      return;
    }
    if (!datos || datos.tipo !== "ctgenai-historial" || !Array.isArray(datos.historial)) {
      window.alert("Ese archivo no es un historial del simulador CT-GenAI.");
      return;
    }
    var entrantes = datos.historial.filter(intentoValido);
    var local = leerHistorial();
    var firmasLocal = {};
    local.forEach(function (h) { firmasLocal[firmaIntento(h)] = true; });
    var añadidos = entrantes.filter(function (h) { return !firmasLocal[firmaIntento(h)]; }).length;
    var vistos = {};
    var unidos = [];
    local.concat(entrantes).forEach(function (h) {
      var firma = firmaIntento(h);
      if (vistos[firma]) return;
      vistos[firma] = true;
      unidos.push(h);
    });
    unidos.sort(function (a, b) { return fechaMs(b.fecha) - fechaMs(a.fecha); });
    var sobraron = unidos.length > 20;
    var guardados = escribirHistorial(unidos);
    if (unidos.length && !guardados) {
      window.alert("No se pudo guardar el historial: el navegador no tiene espacio.");
      return;
    }

    var avisoPausa = "";
    if (pausadoValido(datos.pausado)) {
      var actual = leerPausado();
      var misma = actual && JSON.stringify(actual.preguntas) === JSON.stringify(datos.pausado.preguntas) && JSON.stringify(actual.respuestas) === JSON.stringify(datos.pausado.respuestas);
      if (!actual) {
        try {
          localStorage.setItem(CLAVE_PAUSA, JSON.stringify(datos.pausado));
          avisoPausa = " También se trajo el examen en pausa.";
        } catch (e) {
          avisoPausa = " No se pudo guardar el examen en pausa: falta espacio.";
        }
      } else if (!misma) {
        if (window.confirm("En este dispositivo ya hay un examen en pausa. ¿Reemplazarlo por el que viene en el archivo?")) {
          try {
            localStorage.setItem(CLAVE_PAUSA, JSON.stringify(datos.pausado));
            avisoPausa = " Se reemplazó el examen en pausa por el del archivo.";
          } catch (e) {
            avisoPausa = " No se pudo guardar el examen en pausa: falta espacio.";
          }
        } else {
          avisoPausa = " Se conservó el examen en pausa de este dispositivo.";
        }
      }
    }

    pantallaInicio();
    var msg = añadidos
      ? "Se añadieron " + añadidos + (añadidos === 1 ? " intento" : " intentos") + " al historial de este dispositivo."
      : (entrantes.length ? "Esos intentos ya estaban en este dispositivo. No se duplicaron." : "El archivo no traía intentos nuevos.");
    if (sobraron) msg += " Se conservan los 20 más recientes.";
    var ignorados = datos.historial.length - entrantes.length;
    if (ignorados) msg += " Se ignoraron " + ignorados + (ignorados === 1 ? " registro incompleto." : " registros incompletos.");
    window.alert(msg + avisoPausa);
  }

  function formatear(seg) {
    seg = Math.max(0, seg);
    var m = Math.floor(seg / 60);
    var s = seg % 60;
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  function restantes() {
    return Math.round((estado.fin - Date.now()) / 1000);
  }

  function el(html) {
    var n = document.createElement("div");
    n.innerHTML = html.trim();
    return n.firstChild;
  }

  function escapar(t) {
    return String(t)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function mostrar(nodo) {
    var raiz = document.getElementById("app");
    raiz.innerHTML = "";
    raiz.appendChild(nodo);
  }

  /* Pide confirmación antes de armar el examen, para no entrar con un clic accidental. */
  function pedirConfirmacionExamen(modo, minutos, alAceptar) {
    if (document.querySelector(".modal-fondo")) return;
    var prueba = modo === "prueba";
    var titulo = prueba ? "¿Empezar el examen de prueba?" : "¿Empezar el examen real?";
    var detalle = prueba
      ? "Son 40 preguntas y 46 puntos, con " + minutos + " minutos. Al confirmar cada respuesta verás cuál es la correcta y por qué."
      : "Son 40 preguntas y 46 puntos, con " + minutos + " minutos. No verás comentarios hasta que entregues.";
    var pausado = leerPausado();
    var aviso = pausado
      ? "<p class='modal-aviso'>Tienes un examen en pausa. Si empiezas este, el pausado sigue guardado para continuarlo después.</p>"
      : "";
    var fondo = el(
      "<div class='modal-fondo'>" +
        "<div class='modal' role='dialog' aria-modal='true' aria-labelledby='modal-titulo'>" +
          "<p class='kicker'>Antes de empezar</p>" +
          "<h2 id='modal-titulo'>" + titulo + "</h2>" +
          "<p>" + detalle + "</p>" +
          aviso +
          "<div class='acciones'>" +
            "<button type='button' class='primario' id='modal-empezar'>Sí, empezar</button>" +
            "<button type='button' id='modal-cancelar'>No, volver</button>" +
          "</div>" +
        "</div>" +
      "</div>"
    );
    document.body.appendChild(fondo);
    document.body.classList.add("modal-abierto");
    var previo = document.activeElement;
    var empezarBtn = fondo.querySelector("#modal-empezar");
    var cancelarBtn = fondo.querySelector("#modal-cancelar");
    var abiertoEn = Date.now();
    cancelarBtn.focus();

    function cerrar() {
      if (!fondo.parentNode) return;
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("modal-abierto");
      fondo.remove();
      if (previo && previo.focus) {
        try { previo.focus(); } catch (e) { /* el botón de origen ya no está en la página */ }
      }
    }

    cancelarBtn.addEventListener("click", cerrar);
    empezarBtn.addEventListener("click", function () {
      if (Date.now() - abiertoEn < 350) return;
      cerrar();
      alAceptar();
    });
    fondo.addEventListener("click", function (ev) {
      if (ev.target === fondo) cerrar();
    });
    function onKey(ev) {
      if (ev.key === "Escape") {
        ev.preventDefault();
        cerrar();
        return;
      }
      if (ev.key !== "Tab") return;
      var nodos = [empezarBtn, cancelarBtn];
      var i = nodos.indexOf(document.activeElement);
      if (ev.shiftKey) {
        if (i <= 0) { ev.preventDefault(); nodos[nodos.length - 1].focus(); }
      } else if (i === -1 || i === nodos.length - 1) {
        ev.preventDefault();
        nodos[0].focus();
      }
    }
    document.addEventListener("keydown", onKey);
  }

  function instalarIrArriba() {
    if (document.getElementById("ir-arriba")) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.id = "ir-arriba";
    btn.className = "ir-arriba";
    btn.setAttribute("aria-label", "Volver arriba");
    btn.textContent = "Arriba";
    btn.hidden = true;
    btn.addEventListener("click", function () {
      var suave = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
      window.scrollTo({ top: 0, behavior: suave });
    });
    document.body.appendChild(btn);
    function actualizar() {
      btn.hidden = window.scrollY < 320;
    }
    window.addEventListener("scroll", actualizar, { passive: true });
    actualizar();
  }

  function pararReloj() {
    if (reloj) { clearInterval(reloj); reloj = null; }
  }

  /* ---------- pantallas ---------- */
  function nombreModo(modo) {
    return modo === "prueba" ? "Examen de prueba" : "Examen real";
  }

  function urlSilabo(pagina) {
    var base = window.SILABO && window.SILABO.url;
    if (!base) return "";
    return base + (pagina ? "#page=" + pagina : "");
  }

  function enlaceSilabo(pagina, texto) {
    return "<a class='enlace-silabo' href='" + urlSilabo(pagina) + "' target='_blank' rel='noopener noreferrer'>" + escapar(texto) + "</a>";
  }

  function htmlSilabo(p) {
    if (!p) return "";
    var tema = window.SILABO && window.SILABO.temas[p.lo];
    if (!tema) return "";
    var aplica = p.porque
      ? "<p><strong>En esta pregunta. </strong>" + escapar(p.porque) + "</p>"
      : "";
    return "<details class='silabo'>" +
      "<summary>Ver en el sílabo</summary>" +
      "<p>Objetivo <strong>GenAI-" + escapar(p.lo) + "</strong>" + (p.k ? " · " + escapar(p.k) : "") +
      " · " + escapar(tema.titulo) + ". Página " + tema.pagina + " del programa oficial.</p>" +
      "<p class='resumen-silabo'>" + escapar(tema.resumen) + "</p>" +
      aplica +
      "<p>" + enlaceSilabo(tema.pagina, "Abrir la página " + tema.pagina + " del sílabo") + "</p>" +
    "</details>";
  }

  function htmlTerminos() {
    if (!window.SILABO || !window.SILABO.terminos) return "";
    var bloques = window.SILABO.terminos.map(function (cap) {
      var items = cap[1].map(function (t) {
        var ingles = t[2] ? " <span class='termino-en' lang='en'>(" + escapar(t[2]) + ")</span>" : "";
        return "<li><strong>" + escapar(t[0]) + "</strong>" + ingles + "<strong>.</strong> " + escapar(t[1]) + "</li>";
      }).join("");
      return "<li class='grupo-silabo'><strong>Capítulo " + escapar(cap[0]) + ". " + escapar(cap[2] || "") + "</strong><ul>" + items + "</ul></li>";
    }).join("");
    return "<details class='silabo-completo'>" +
      "<summary>Términos para repasar</summary>" +
      "<p>Palabras que el examen puede pedir recordar. Entre paréntesis va el término en inglés, tal como aparece en el sílabo original. Cada definición es una guía breve para estudiar, escrita para este simulador.</p>" +
      "<ul class='indice-silabo'>" + bloques + "</ul>" +
    "</details>";
  }

  function htmlIndiceSilabo() {
    if (!window.SILABO) return "";
    var caps = window.SILABO.capitulos.map(function (c) {
      return "<li>" + enlaceSilabo(c[2], "Capítulo " + c[0] + ". " + c[1] + " · página " + c[2]) + "</li>";
    }).join("");
    var porCap = {};
    Object.keys(window.SILABO.temas).forEach(function (lo) {
      var n = lo.charAt(0);
      if (!porCap[n]) porCap[n] = [];
      porCap[n].push(lo);
    });
    var objetivos = Object.keys(porCap).sort().map(function (n) {
      var items = porCap[n].map(function (lo) {
        var tema = window.SILABO.temas[lo];
        return "<li>" + enlaceSilabo(tema.pagina, "GenAI-" + lo + " · " + tema.titulo + " · p. " + tema.pagina) + "</li>";
      }).join("");
      return "<li class='grupo-silabo'><strong>Capítulo " + n + "</strong><ul>" + items + "</ul></li>";
    }).join("");
    return "<details class='silabo-completo'>" +
      "<summary>Sílabo completo para repaso</summary>" +
      "<p>Programa de estudios oficial CT-GenAI v1.0 en español. El texto es del ISTQB y se abre en su documento.</p>" +
      "<p>" + enlaceSilabo(1, "Abrir el sílabo completo") + "</p>" +
      "<ul class='indice-silabo'>" + caps + "</ul>" +
      "<p class='nota-hist'>Cada objetivo de aprendizaje abre la página donde el sílabo lo explica.</p>" +
      "<ul class='indice-silabo'>" + objetivos + "</ul>" +
    "</details>";
  }

  function pantallaInicio() {
    pararReloj();
    estado = null;
    sessionStorage.removeItem(CLAVE_SESION);
    var hist = leerHistorial();
    var pausado = leerPausado();
    var filas = hist.length
      ? hist.map(function (h, i) {
          var revisable = h.preguntas && h.respuestas;
          var etiqueta = h.incompleto ? "Incompleto" : (h.aprobado ? "Aprobado" : "No aprobado");
          var detalle = escapar(nombreModo(h.modo));
          if (h.porTiempo) detalle += " · tiempo agotado";
          else if (h.incompleto) detalle += " · terminado sin completar";
          return "<li class='intento'>" +
            "<span class='intento-fecha'>" + escapar(h.fecha) + "<small>" + detalle + "</small></span>" +
            "<strong>" + h.puntos + "/" + TOTAL_PUNTOS + "</strong>" +
            "<em class='" + (h.incompleto ? "neutro" : (h.aprobado ? "ok" : "mal")) + "'>" + etiqueta + "</em>" +
            "<span class='intento-acciones'>" +
              (revisable
                ? "<button type='button' class='revisar' data-i='" + i + "'>Revisar</button>"
                : "<span class='sin-detalle'>Sin detalle</span>") +
              "<button type='button' class='eliminar' data-i='" + i + "' title='Eliminar este intento del historial' aria-label='Eliminar el intento del " + escapar(h.fecha) + "'>Eliminar</button>" +
            "</span>" +
          "</li>";
        }).join("")
      : "<li class='vacio'>Todavía no hay intentos en este navegador.</li>";

    var tarjetaPausa = "";
    if (pausado) {
      tarjetaPausa =
        "<div class='pausado'>" +
          "<p class='kicker'>Examen en pausa</p>" +
          "<p><strong>" + escapar(nombreModo(pausado.modo)) + "</strong> · pausado el " + escapar(pausado.fechaPausa || "") +
          "<br>" + contarRespondidas(pausado.respuestas) + " de 40 respondidas · quedan <strong>" + formatear(pausado.restante) + "</strong> de tiempo.</p>" +
          "<div class='acciones'>" +
            "<button type='button' class='primario' id='continuar'>Continuar el examen</button>" +
            "<button type='button' id='descartar-pausa'>Descartar</button>" +
          "</div>" +
        "</div>";
    }

    var nodo = el(
      "<section class='panel inicio'>" +
        "<p class='kicker'>Práctica · ISTQB CT-GenAI</p>" +
        "<h1>Simulador de examen</h1>" +
        tarjetaPausa +
        "<p class='lead'>Elige cómo quieres rendir. Cada examen toma 40 preguntas de un banco de " + (window.BANCO ? window.BANCO.length : 0) + " formulaciones originales, una por objetivo de aprendizaje. Si acabas de terminar un intento, el siguiente procura no repetir esas mismas preguntas, y baraja el orden y las opciones. No son los ítems oficiales.</p>" +
        "<ul class='reglas'>" +
          "<li><strong>40 preguntas</strong> y <strong>46 puntos</strong>, como el examen.</li>" +
          "<li>Se aprueba con <strong>30 puntos</strong> (65&nbsp;%).</li>" +
          "<li><strong>60 minutos</strong>. Quien no rinde en su lengua materna dispone de 75.</li>" +
          "<li>Seis preguntas de nivel K3 valen 2 puntos. El resto vale 1.</li>" +
          "<li>En las de «elija dos», el punto cuenta solo si las dos opciones son las correctas.</li>" +
        "</ul>" +
        "<label class='check'><input type='checkbox' id='extra'> Añadir el 25&nbsp;% de tiempo (75 minutos)</label>" +
        "<div class='modos'>" +
          "<button type='button' class='modo' id='modo-real'>" +
            "<strong>Examen real</strong>" +
            "<span>Las 40 preguntas, sin comentarios mientras respondes. La nota y la corrección aparecen solo al entregar.</span>" +
          "</button>" +
          "<button type='button' class='modo' id='modo-prueba'>" +
            "<strong>Examen de prueba</strong>" +
            "<span>Marcas la opción y, al confirmarla, ves enseguida cuál es la correcta y por qué.</span>" +
          "</button>" +
        "</div>" +
        htmlIndiceSilabo() +
        htmlTerminos() +
        "<h2>Intentos anteriores</h2>" +
        "<p class='nota-hist'>El historial se guarda en este navegador. Para verlo en el celular, la tablet o el computador, descárgalo y tráelo en el otro aparato. El archivo también incluye el examen en pausa, si hay uno.</p>" +
        "<div class='acciones'>" +
          "<button type='button' id='descargar-hist'>Descargar historial</button>" +
          "<button type='button' id='traer-hist'>Traer historial</button>" +
          (hist.length ? "<button type='button' class='peligro' id='borrar-hist'>Borrar todo el historial</button>" : "") +
        "</div>" +
        (hist.length ? "<p class='nota-hist'>Pulsa «Revisar» para volver a ver el examen completo de ese intento, con tus respuestas, las correctas y la explicación de cada pregunta.</p>" : "") +
        "<ul class='historial'>" + filas + "</ul>" +
        "<input type='file' id='archivo-hist' accept='application/json,.json' hidden>" +
      "</section>"
    );
    mostrar(nodo);
    var continuar = nodo.querySelector("#continuar");
    if (continuar) continuar.addEventListener("click", reanudar);
    var descartar = nodo.querySelector("#descartar-pausa");
    if (descartar) descartar.addEventListener("click", function () {
      if (window.confirm("¿Descartar el examen en pausa? No se guardará ningún resultado.")) {
        localStorage.removeItem(CLAVE_PAUSA);
        pantallaInicio();
      }
    });
    nodo.querySelectorAll(".revisar").forEach(function (b) {
      b.addEventListener("click", function () {
        var intento = hist[Number(b.getAttribute("data-i"))];
        if (intento) pintarResultado(intento, false);
      });
    });
    nodo.querySelectorAll(".eliminar").forEach(function (b) {
      b.addEventListener("click", function () {
        var i = Number(b.getAttribute("data-i"));
        var intento = hist[i];
        if (!intento) return;
        if (!window.confirm("¿Eliminar del historial el intento del " + intento.fecha + " (" + intento.puntos + "/" + TOTAL_PUNTOS + ")? No se puede deshacer.")) return;
        var resto = hist.slice(0, i).concat(hist.slice(i + 1));
        escribirHistorial(resto);
        pantallaInicio();
      });
    });
    var borrar = nodo.querySelector("#borrar-hist");
    if (borrar) borrar.addEventListener("click", function () {
      var n = hist.length;
      if (!window.confirm("¿Borrar los " + n + (n === 1 ? " intento" : " intentos") + " del historial de este navegador? No se puede deshacer. Si quieres conservarlos, descárgalos antes.")) return;
      escribirHistorial([]);
      pantallaInicio();
    });
    function minutosElegidos() {
      return nodo.querySelector("#extra").checked ? 75 : 60;
    }
    function arrancarNuevo(modo) {
      pedirConfirmacionExamen(modo, minutosElegidos(), function () {
        empezar(minutosElegidos(), modo);
      });
    }
    nodo.querySelector("#modo-real").addEventListener("click", function () { arrancarNuevo("real"); });
    nodo.querySelector("#modo-prueba").addEventListener("click", function () { arrancarNuevo("prueba"); });
    nodo.querySelector("#descargar-hist").addEventListener("click", descargarHistorial);
    var archivo = nodo.querySelector("#archivo-hist");
    nodo.querySelector("#traer-hist").addEventListener("click", function () { archivo.click(); });
    archivo.addEventListener("change", function () {
      var file = archivo.files && archivo.files[0];
      archivo.value = "";
      if (!file) return;
      if (file.size > 8 * 1024 * 1024) {
        window.alert("El archivo es demasiado grande para ser un historial del simulador.");
        return;
      }
      var lector = new FileReader();
      lector.onload = function () { traerHistorial(String(lector.result || "")); };
      lector.onerror = function () { window.alert("No se pudo leer el archivo."); };
      lector.readAsText(file);
    });
  }

  function pausar() {
    if (!estado || estado.cerrado) return;
    pararReloj();
    var copia = JSON.parse(JSON.stringify(estado));
    copia.restante = Math.max(0, restantes());
    copia.fechaPausa = new Date().toLocaleString("es");
    delete copia.fin;
    try {
      localStorage.setItem(CLAVE_PAUSA, JSON.stringify(copia));
    } catch (e) {
      window.alert("No se pudo guardar el examen en pausa: el navegador no tiene espacio. El examen sigue en curso.");
      arrancarReloj();
      return;
    }
    estado = null;
    sessionStorage.removeItem(CLAVE_SESION);
    pantallaInicio();
  }

  function reanudar() {
    var pausado = leerPausado();
    if (!pausado) { pantallaInicio(); return; }
    estado = pausado;
    estado.fin = Date.now() + estado.restante * 1000;
    delete estado.restante;
    delete estado.fechaPausa;
    localStorage.removeItem(CLAVE_PAUSA);
    persistir();
    if (restantes() <= 0) { cerrarExamen(true); return; }
    pintarExamen();
  }

  function confirmarTerminar() {
    var respondidas = contarRespondidas(estado.respuestas);
    var corregidas = respondidas === 0 ? "No hay preguntas respondidas: quedará con 0 puntos"
      : respondidas === 1 ? "Se corregirá la única pregunta respondida"
      : "Se corregirán las " + respondidas + " preguntas respondidas";
    var texto = "¿Terminar el examen ahora, sin completarlo?\n\n" +
      corregidas + " y el intento quedará en el historial como incompleto. " +
      "Si prefieres seguir en otro momento, usa «Pausar».";
    if (window.confirm(texto)) cerrarExamen(false, true);
  }

  function empezar(minutos, modo) {
    var preguntas = armarExamen();
    estado = {
      modo: modo === "prueba" ? "prueba" : "real",
      preguntas: preguntas,
      respuestas: preguntas.map(function () { return []; }),
      reveladas: preguntas.map(function () { return false; }),
      marcas: preguntas.map(function () { return false; }),
      indice: 0,
      fin: Date.now() + minutos * 60 * 1000,
      minutos: minutos,
      cerrado: false
    };
    persistir();
    pintarExamen();
  }

  function htmlPorqueOpcion(p, i) {
    if (!p.porques || !p.porques[i]) return "";
    var correcta = p.correctas.indexOf(i) !== -1;
    return "<p class='porque-op'><strong>" + (correcta ? "Es correcta. " : "No es correcta. ") + "</strong>" + escapar(p.porques[i]) + "</p>";
  }

  function htmlCorreccion(p, marca) {
    var bien = mismoConjunto(marca, p.correctas);
    var suyas = marca.length ? marca.map(letra).join(", ") : "ninguna";
    var detalle = "";
    if (!p.porques) {
      var buenas = p.correctas.map(function (i) {
        return "<li><span class='letra'>" + letra(i) + "</span><span>" + escapar(p.opciones[i]) + "</span></li>";
      }).join("");
      detalle = "<p>" + (p.correctas.length > 1 ? "Las respuestas correctas son:" : "La respuesta correcta es:") + "</p>" +
        "<ul class='correctas-lista'>" + buenas + "</ul>" +
        "<p class='porque'><strong>Por qué. </strong>" + escapar(p.porque) + "</p>";
    }
    return "<div class='correccion " + (bien ? "ok" : "mal") + "' id='correccion' role='status'>" +
      "<p class='correccion-titulo'>" + (bien ? "Correcta" : "Incorrecta") + "</p>" +
      (bien ? "" : "<p>Marcaste " + escapar(suyas) + ".</p>") +
      (p.porques ? "<p>Cada opción indica por qué es correcta o por qué no lo es.</p>" : "") +
      detalle +
    "</div>";
  }

  function pintarExamen() {
    var p = estado.preguntas[estado.indice];
    var marca = estado.respuestas[estado.indice];
    var revelada = estado.modo === "prueba" && estado.reveladas[estado.indice];
    var tipo = p.elegir > 1 ? "checkbox" : "radio";
    var aviso = consigna(p.elegir);
    var opciones = p.opciones.map(function (texto, i) {
      var activo = marca.indexOf(i) !== -1;
      var cls = "opcion";
      if (revelada) {
        if (p.correctas.indexOf(i) !== -1) cls += " buena";
        else if (activo) cls += " mala";
        cls += " bloqueada";
      } else if (activo) {
        cls += " activa";
      }
      return "<div class='opcion-bloque'><label class='" + cls + "'>" +
        "<input type='" + tipo + "' name='op' value='" + i + "'" + (activo ? " checked" : "") + (revelada ? " disabled" : "") + ">" +
        "<span class='letra'>" + letra(i) + "</span><span>" + escapar(texto) + "</span></label>" +
        (revelada ? htmlPorqueOpcion(p, i) : "") + "</div>";
    }).join("");

    var celdas = estado.preguntas.map(function (preg, i) {
      var cls = (i === estado.indice ? "actual" : "") + (estado.respuestas[i].length ? " hecha" : "") + (estado.marcas[i] ? " bandera" : "");
      if (estado.modo === "prueba" && estado.reveladas[i]) {
        cls += mismoConjunto(estado.respuestas[i], preg.correctas) ? " acertada" : " fallada";
      }
      return "<button type='button' class='celda " + cls + "' data-i='" + i + "'>" + (i + 1) + "</button>";
    }).join("");

    var cap = CAPITULOS[p.lo.charAt(0)];
    var puedeConfirmar = marca.length === p.elegir;
    var botonConfirmar = (estado.modo === "prueba" && !revelada)
      ? "<button type='button' class='primario' id='confirmar'" + (puedeConfirmar ? "" : " disabled") + ">Confirmar respuesta</button>"
      : "";
    var siguientePrimario = estado.modo !== "prueba" || revelada;
    var clsSiguiente = siguientePrimario ? " class='primario'" : "";
    var botonAvance = estado.indice < 39
      ? "<button type='button' id='next'" + clsSiguiente + ">Siguiente</button>"
      : "<button type='button' id='cerrar'" + clsSiguiente + ">Entregar examen</button>";
    var pista = (estado.modo === "prueba" && !revelada)
      ? "<p class='pista'>Elige la respuesta y pulsa Confirmar para ver cuál es la correcta y por qué. Después no podrás cambiarla.</p>"
      : "";
    var correccion = revelada ? htmlCorreccion(p, marca) : "";
    var bloqueSilabo = revelada ? htmlSilabo(p) : "";

    var nodo = el(
      "<section class='examen'>" +
        "<header class='barra'>" +
          "<div><strong>" + escapar(nombreModo(estado.modo)) + "</strong><span class='meta'>Pregunta " + (estado.indice + 1) + " de 40 · " + p.puntos + (p.puntos === 1 ? " punto" : " puntos") + " · " + p.k + "</span></div>" +
          "<div class='barra-derecha'>" +
            "<div class='barra-botones'>" +
              "<button type='button' class='barra-btn' id='pausar' title='Guardar el examen y detener el tiempo para seguir después'>Pausar</button>" +
              "<button type='button' class='barra-btn' id='terminar' title='Cerrar el examen ahora y guardarlo como incompleto'>Terminar</button>" +
            "</div>" +
            "<div class='tiempo' id='tiempo'>" + formatear(restantes()) + "</div>" +
          "</div>" +
        "</header>" +
        "<div class='cuerpo'>" +
          "<nav class='mapa' aria-label='Preguntas'>" + celdas + "</nav>" +
          "<article class='pregunta'>" +
            "<p class='lo'>" + escapar(cap) + " · GenAI-" + escapar(p.lo) + "</p>" +
            "<h1>" + escapar(p.enunciado) + "</h1>" +
            htmlLista(p) +
            "<p class='aviso'>" + aviso + "</p>" +
            "<div class='opciones'>" + opciones + "</div>" +
            pista +
            correccion +
            bloqueSilabo +
            "<footer class='pie-pregunta'>" +
              "<label class='check'><input type='checkbox' id='bandera'" + (estado.marcas[estado.indice] ? " checked" : "") + "> Marcar para revisar</label>" +
              "<div class='acciones'>" +
                "<button type='button' id='prev' " + (estado.indice === 0 ? "disabled" : "") + ">Anterior</button>" +
                botonConfirmar +
                botonAvance +
              "</div>" +
            "</footer>" +
          "</article>" +
        "</div>" +
      "</section>"
    );
    mostrar(nodo);

    nodo.querySelectorAll(".celda").forEach(function (b) {
      b.addEventListener("click", function () {
        estado.indice = Number(b.getAttribute("data-i"));
        persistir();
        pintarExamen();
      });
    });
    nodo.querySelectorAll("input[name='op']").forEach(function (input) {
      input.addEventListener("change", function () {
        leerMarcas(nodo, p.elegir);
      });
    });
    nodo.querySelector("#bandera").addEventListener("change", function (e) {
      estado.marcas[estado.indice] = e.target.checked;
      persistir();
      pintarExamen();
    });
    var prev = nodo.querySelector("#prev");
    if (prev) prev.addEventListener("click", function () { mover(-1); });
    var next = nodo.querySelector("#next");
    if (next) next.addEventListener("click", function () { mover(1); });
    var cerrar = nodo.querySelector("#cerrar");
    if (cerrar) cerrar.addEventListener("click", function () { confirmarCierre(); });
    var confirmar = nodo.querySelector("#confirmar");
    if (confirmar) confirmar.addEventListener("click", confirmarRespuesta);
    nodo.querySelector("#pausar").addEventListener("click", pausar);
    nodo.querySelector("#terminar").addEventListener("click", confirmarTerminar);

    arrancarReloj();
  }

  function leerMarcas(nodo, elegir) {
    if (estado.modo === "prueba" && estado.reveladas[estado.indice]) return;
    var previas = (estado.respuestas[estado.indice] || []).slice();
    var inputs = Array.prototype.slice.call(nodo.querySelectorAll("input[name='op']"));
    var marks = [];
    inputs.forEach(function (input, idx) {
      if (input.checked) marks.push(idx);
    });
    while (elegir > 1 && marks.length > elegir) {
      var quitar = previas.length ? previas.shift() : marks[0];
      if (marks.indexOf(quitar) === -1) quitar = marks[0];
      inputs[quitar].checked = false;
      marks = marks.filter(function (i) { return i !== quitar; });
    }
    estado.respuestas[estado.indice] = marks;
    persistir();
    nodo.querySelectorAll(".opcion").forEach(function (lab) {
      lab.classList.toggle("activa", lab.querySelector("input").checked);
    });
    var celda = nodo.querySelector('.celda[data-i="' + estado.indice + '"]');
    if (celda) celda.classList.toggle("hecha", marks.length > 0);
    var confirmar = nodo.querySelector("#confirmar");
    if (confirmar) confirmar.disabled = marks.length !== elegir;
  }

  function confirmarRespuesta() {
    var p = estado.preguntas[estado.indice];
    var marca = estado.respuestas[estado.indice] || [];
    if (estado.modo !== "prueba" || estado.reveladas[estado.indice]) return;
    if (marca.length !== p.elegir) return;
    estado.reveladas[estado.indice] = true;
    persistir();
    pintarExamen();
    var caja = document.getElementById("correccion");
    if (caja && caja.scrollIntoView) caja.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function mover(delta) {
    estado.indice = Math.min(39, Math.max(0, estado.indice + delta));
    persistir();
    pintarExamen();
  }

  function arrancarReloj() {
    pararReloj();
    reloj = setInterval(function () {
      var caja = document.getElementById("tiempo");
      var seg = restantes();
      if (caja) {
        caja.textContent = formatear(seg);
        caja.classList.toggle("urgente", seg < 60);
      }
      if (seg <= 0) {
        pararReloj();
        cerrarExamen(true);
      }
    }, 250);
  }

  function confirmarCierre() {
    var vacias = estado.respuestas.filter(function (r) { return !r.length; }).length;
    var texto = vacias
      ? "Quedan " + vacias + " preguntas sin responder. ¿Entregar el examen igualmente?"
      : "¿Entregar el examen y ver el resultado?";
    if (window.confirm(texto)) cerrarExamen(false);
  }

  function cerrarExamen(porTiempo, terminadoAntes) {
    if (!estado || estado.cerrado) return;
    estado.cerrado = true;
    pararReloj();
    var resultado = puntuar(estado.preguntas, estado.respuestas);
    var intento = {
      fecha: new Date().toLocaleString("es"),
      puntos: resultado.puntos,
      aprobado: resultado.aprobado,
      porTiempo: porTiempo,
      incompleto: !!terminadoAntes,
      respondidas: contarRespondidas(estado.respuestas),
      modo: estado.modo,
      minutos: estado.minutos,
      preguntas: estado.preguntas,
      respuestas: estado.respuestas
    };
    guardarHistorial(intento);
    sessionStorage.removeItem(CLAVE_SESION);
    pintarResultado(intento, true);
  }

  /* Muestra el resultado de un intento: recién entregado (enVivo) o recuperado del historial. */
  function pintarResultado(intento, enVivo) {
    pararReloj();
    var resultado = puntuar(intento.preguntas, intento.respuestas);
    var porTiempo = intento.porTiempo;
    var porCap = {};
    intento.preguntas.forEach(function (p, i) {
      var c = p.lo.charAt(0);
      if (!porCap[c]) porCap[c] = { bien: 0, puntos: 0, max: 0 };
      porCap[c].max += p.puntos;
      if (resultado.detalle[i].bien) {
        porCap[c].bien += 1;
        porCap[c].puntos += p.puntos;
      }
    });
    var filasCap = Object.keys(porCap).sort().map(function (c) {
      var x = porCap[c];
      return "<li><span>Capítulo " + c + ". " + escapar(CAPITULOS[c]) + "</span><strong>" + x.puntos + " de " + x.max + " puntos</strong></li>";
    }).join("");

    var repaso = intento.preguntas.map(function (p, i) {
      var d = resultado.detalle[i];
      var suyas = d.marca.length ? d.marca.map(letra).join(", ") : "sin respuesta";
      var buenas = p.correctas.map(letra).join(", ");
      var ops = p.opciones.map(function (t, k) {
        var cls = p.correctas.indexOf(k) !== -1 ? "buena" : (d.marca.indexOf(k) !== -1 ? "mala" : "");
        return "<li class='" + cls + "'><div class='op-linea'><span class='letra'>" + letra(k) + "</span><span>" + escapar(t) + "</span></div>" + htmlPorqueOpcion(p, k) + "</li>";
      }).join("");
      var cierre = (p.porques && p.porques.length)
        ? ""
        : "<p class='porque'><strong>Por qué. </strong>" + escapar(p.porque) + "</p>";
      return "<details" + (d.bien ? "" : " open") + ">" +
        "<summary><span class='pill " + (d.bien ? "ok" : "mal") + "'>" + (d.bien ? "Bien" : "Mal") + "</span> " +
        (i + 1) + ". GenAI-" + escapar(p.lo) + " · " + p.k + " · " + p.puntos + " pt · su respuesta: " + suyas + " · correcta: " + buenas + "</summary>" +
        "<p>" + escapar(p.enunciado) + "</p>" + htmlLista(p) + "<ol class='repaso-ops'>" + ops + "</ol>" + cierre + htmlSilabo(p) + "</details>";
    }).join("");

    var cierreTxt = porTiempo ? "el tiempo se agotó" : (intento.incompleto ? "terminado sin completar" : "entregado");
    var kicker = enVivo
      ? escapar(nombreModo(intento.modo)) + " · " + cierreTxt
      : "Repaso del intento · " + escapar(intento.fecha) + " · " + escapar(nombreModo(intento.modo)) + " · " + cierreTxt;
    var titulo = intento.incompleto
      ? "<h1 class='neutro'>Incompleto</h1>"
      : "<h1 class='" + (resultado.aprobado ? "ok" : "mal") + "'>" + (resultado.aprobado ? "Aprobado" : "No aprobado") + "</h1>";
    var respondidas = typeof intento.respondidas === "number" ? intento.respondidas : contarRespondidas(intento.respuestas);
    var notaExtra = intento.incompleto
      ? " · " + respondidas + " de 40 respondidas" + (resultado.aprobado ? " · con lo respondido ya superas el corte" : "")
      : "";
    var acciones = enVivo
      ? "<button class='primario' id='otro' type='button'>Nuevo " + (intento.modo === "prueba" ? "examen de prueba" : "examen real") + "</button><button id='inicio' type='button'>Volver al inicio</button>"
      : "<button class='primario' id='inicio' type='button'>Volver al inicio</button><button id='otro' type='button'>Nuevo " + (intento.modo === "prueba" ? "examen de prueba" : "examen real") + "</button>";

    var nodo = el(
      "<section class='panel resultado'>" +
        "<p class='kicker'>" + kicker + "</p>" +
        titulo +
        "<p class='nota'>" + resultado.puntos + " / " + TOTAL_PUNTOS + " puntos · el corte es " + CORTE + notaExtra + "</p>" +
        "<h2>Por capítulo</h2><ul class='historial'>" + filasCap + "</ul>" +
        "<div class='acciones'>" + acciones + "</div>" +
        "<h2>Repaso</h2>" + repaso +
        "<div class='acciones acciones-pie'><button id='inicio-pie' type='button'>Volver al inicio</button></div>" +
      "</section>"
    );
    mostrar(nodo);
    nodo.querySelector("#otro").addEventListener("click", function () {
      pedirConfirmacionExamen(intento.modo, intento.minutos || 60, function () {
        empezar(intento.minutos || 60, intento.modo);
      });
    });
    nodo.querySelector("#inicio").addEventListener("click", pantallaInicio);
    nodo.querySelector("#inicio-pie").addEventListener("click", pantallaInicio);
    window.scrollTo(0, 0);
  }

  function restaurar() {
    var crudo = sessionStorage.getItem(CLAVE_SESION);
    if (!crudo) return false;
    try { estado = JSON.parse(crudo); }
    catch (e) { return false; }
    if (!estado || estado.cerrado || !estado.preguntas) return false;
    if (estado.modo !== "prueba") estado.modo = "real";
    if (!estado.reveladas || estado.reveladas.length !== estado.preguntas.length) {
      estado.reveladas = estado.preguntas.map(function () { return false; });
    }
    if (restantes() <= 0) { cerrarExamen(true); return true; }
    pintarExamen();
    return true;
  }

  document.addEventListener("DOMContentLoaded", function () {
    window.BANCO.forEach(function (p, i) { p._id = p.lo + "#" + i; });
    instalarIrArriba();
    if (!restaurar()) pantallaInicio();
  });

  window.CTGenAI = { PLAN: PLAN, armarExamen: armarExamen, puntuar: puntuar, TOTAL_PUNTOS: TOTAL_PUNTOS, CORTE: CORTE };
})();
