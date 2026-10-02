/* Banco de práctica CT-GenAI.
   Preguntas originales, alineadas a los objetivos de aprendizaje del programa de estudios
   y al estilo del examen de muestra. No son ítems oficiales del ISTQB. */
(function () {
  function q(lo, k, puntos, elegir, enunciado, opciones, correctas, porque) {
    return { lo: lo, k: k, puntos: puntos, elegir: elegir, enunciado: enunciado, lista: null, opciones: opciones, correctas: correctas, porque: porque };
  }

  /* Pregunta con una lista numerada bajo el enunciado (afirmaciones i-v, pares 1-4 / A-D, pasos...).
     Cada elemento de la lista es [rótulo, texto]. */
  function ql(lo, k, puntos, elegir, enunciado, lista, opciones, correctas, porque) {
    var p = q(lo, k, puntos, elegir, enunciado, opciones, correctas, porque);
    p.lista = lista;
    return p;
  }

  var ROM = ["i", "ii", "iii", "iv", "v", "vi"];
  function afirmaciones(textos) {
    return textos.map(function (t, i) { return [ROM[i], t]; });
  }

  window.BANCO = [
    /* ---------- 1.1.1 Espectro de la IA ---------- */
    ql("1.1.1", "K1", 1, 1,
      "Relacione cada tecnología (1-4) con su descripción (A-D).",
      [
        ["1", "IA simbólica"],
        ["2", "Aprendizaje automático clásico"],
        ["3", "Aprendizaje profundo"],
        ["4", "IA generativa"],
        ["A", "Aprende características con redes neuronales."],
        ["B", "Imita decisiones con reglas y símbolos."],
        ["C", "Crea datos nuevos imitando patrones de entrenamiento."],
        ["D", "Exige preparación de datos, selección de características y entrenamiento."]
      ],
      [
        "1D, 2B, 3C, 4A",
        "1B, 2D, 3A, 4C",
        "1A, 2C, 3D, 4B",
        "1C, 2A, 3B, 4D"
      ],
      [1],
      "La IA simbólica usa reglas y símbolos (B). El aprendizaje automático clásico es un enfoque guiado por datos con selección de características (D). El aprendizaje profundo aprende características con redes neuronales (A). La IA generativa crea datos nuevos a partir de patrones aprendidos (C). La correspondencia correcta es 1B, 2D, 3A, 4C."),

    q("1.1.1", "K1", 1, 1,
      "Un equipo describe cuatro herramientas. ¿Cuál descripción corresponde a la IA generativa y no a las otras tres?",
      [
        "Un motor que aplica reglas lógicas escritas por expertos para decidir si un caso de prueba es obligatorio.",
        "Un modelo que, tras elegir características a mano y entrenarse con ejemplos etiquetados, clasifica defectos.",
        "Una red que aprende por sí sola qué rasgos de una imagen importan para reconocer una pantalla.",
        "Un modelo que, a partir de patrones de sus datos de entrenamiento, redacta casos de prueba que no existían."
      ],
      [3],
      "La IA generativa usa técnicas de aprendizaje profundo para crear datos nuevos imitando patrones aprendidos. Las reglas son IA simbólica, la clasificación con características seleccionadas es aprendizaje automático clásico y aprender rasgos de una imagen es aprendizaje profundo, no todavía generación."),

    /* ---------- 1.1.2 Ventana de contexto y tokenización (2 huecos en el examen) ---------- */
    q("1.1.2", "K2", 1, 1,
      "Un requisito de 30 páginas no cabe en la ventana de contexto del modelo. ¿Qué consecuencia es la correcta?",
      [
        "El modelo reordena el documento en orden cronológico y por eso pierde la secuencia de los pasos.",
        "El modelo deja de poder citar otros documentos del repositorio, aunque quepan en la entrada actual.",
        "Al ir leyendo tokens nuevos, el modelo deja fuera los tokens que ya no caben en la ventana y puede perder detalles necesarios para entender lo que viene después.",
        "La ventana obliga al modelo a analizar solo carácter a carácter y le impide mirar el documento completo."
      ],
      [2],
      "La ventana de contexto limita cuánto texto se considera a la vez. Si el texto la supera, los tokens que quedan fuera se descartan. No controla el tiempo, ni las referencias entre documentos, ni el tipo de análisis sintáctico."),

    q("1.1.2", "K2", 1, 1,
      "¿Qué afirmación describe mejor la tokenización al preparar texto para un LLM?",
      [
        "Convierte cada token en un vector de muchas dimensiones para guardar su significado.",
        "Parte el texto en unidades más pequeñas que el modelo usa como piezas para entender y generar lenguaje.",
        "Es el mecanismo con el que el modelo redacta una respuesta adecuada al contexto.",
        "Predice el siguiente token usando las relaciones que aprendió durante el entrenamiento."
      ],
      [1],
      "Tokenizar es dividir el texto en tokens, las piezas con las que el LLM entiende y genera texto. Convertir tokens en vectores es una incrustación (embedding). Generar la respuesta y predecir el siguiente token son funciones del modelo, no de la tokenización."),

    q("1.1.2", "K2", 1, 1,
      "Durante una revisión, alguien afirma: «Si amplío la ventana de contexto, el modelo podrá consultar a la vez el requisito, el diseño y el informe de defectos, aunque estén en archivos distintos que no le he pasado». ¿Qué hay de erróneo?",
      [
        "Nada: la ventana de contexto sirve precisamente para cruzar documentos que el modelo no ha recibido.",
        "La ventana solo limita cuánto de la entrada actual se considera a la vez; no otorga por sí sola acceso a documentos que no forman parte de esa entrada.",
        "Ampliar la ventana cambia el algoritmo de análisis de carácter a documento.",
        "La ventana de contexto ordena los hechos por fecha y por eso no admite varios archivos."
      ],
      [1],
      "La ventana acota el alcance dentro de la entrada actual. Referenciar otros documentos exige incluirlos en la entrada (o recuperarlos, como hace RAG). No define el análisis sintáctico ni la secuencia temporal."),

    /* ---------- 1.1.3 Tipos de LLM ---------- */
    q("1.1.3", "K2", 1, 1,
      "¿Qué dos usos encajan con el tipo de LLM indicado?",
      [
        "Un LLM fundacional genera casos de prueba excelentes a partir de un requisito vago, sin ninguna estructura de entrada. Un LLM de razonamiento rellena guiones copiando una plantilla fija de la organización.",
        "Un LLM ajustado por instrucciones decide solo, en tiempo real, qué prueba ejecutar según la opinión del usuario. Un LLM fundacional destaca generando casos en sintaxis Gherkin sin más ayuda.",
        "Un LLM de razonamiento detecta tendencias en informes de defectos y prioriza el esfuerzo de prueba. Un LLM ajustado por instrucciones genera casos que respetan la sintaxis Gherkin pedida.",
        "Un LLM de razonamiento sigue al pie de la letra el formato de una plantilla. Un LLM ajustado por instrucciones sintetiza varias fuentes y toma la decisión de prioridad."
      ],
      [2],
      "El LLM de razonamiento sintetiza fuentes, infiere y prioriza. El ajustado por instrucciones sigue formatos, estilos y reglas (como Gherkin). El fundacional no «destaca» generando casos sin una entrada estructurada, y el de razonamiento no está hecho para obedecer plantillas rígidas."),

    q("1.1.3", "K2", 1, 1,
      "Hay que producir casos de prueba en un formato impuesto (columnas, palabras clave y sintaxis fija) a partir de un prompt muy pautado. ¿Qué tipo de LLM encaja mejor y por qué?",
      [
        "El LLM fundacional, porque sobresale generando casos desde requisitos de alto nivel sin estructura.",
        "El LLM de razonamiento, porque su fortaleza es ceñirse a plantillas organizativas.",
        "El LLM ajustado por instrucciones, porque está entrenado para seguir instrucciones de formato, estilo y sintaxis.",
        "Cualquiera de los tres: el formato de salida no depende del tipo de LLM."
      ],
      [2],
      "Seguir un formato y una sintaxis pedidos es propio del LLM ajustado por instrucciones. El de razonamiento se orienta a inferencia y decisiones, no al cumplimiento rígido de una plantilla. El fundacional no destaca en esa tarea sin una entrada estructurada."),

    /* ---------- 1.1.4 Multimodal ---------- */
    q("1.1.4", "K2", 1, 1,
      "¿Cuál es la relación correcta entre los LLM multimodales y los modelos de visión y lenguaje?",
      [
        "Los LLM multimodales son un subconjunto de los modelos de visión y lenguaje.",
        "Los modelos de visión y lenguaje son un subconjunto de los LLM multimodales: integran datos visuales y de texto.",
        "No tienen relación: los de visión y lenguaje solo miran la interfaz y no el texto.",
        "Son dos nombres para la misma cosa y se pueden intercambiar."
      ],
      [1],
      "El modelo de visión y lenguaje combina imagen y texto, así que queda dentro de los LLM multimodales, que abarcan más combinaciones de modalidades. No es al revés, no están desconectados y no son sinónimos."),

    q("1.1.4", "K2", 1, 1,
      "Un proveedor anuncia «un modelo de visión y lenguaje, luego cubre audio, imagen, texto y sensores». ¿Qué matiz importa?",
      [
        "Es correcto: visión y lenguaje es el término amplio y el multimodal es el caso particular.",
        "El modelo de visión y lenguaje cubre imagen y texto. Tratar también audio o sensores corresponde a un LLM multimodal más amplio, no a ese subconjunto.",
        "Da igual el nombre: ambos términos son intercambiables en el programa de estudios.",
        "Un modelo de visión y lenguaje no usa texto; solo analiza la interfaz gráfica."
      ],
      [1],
      "Visión y lenguaje es el subconjunto centrado en lo visual y lo textual. El LLM multimodal es la categoría más amplia. No son intercambiables ni el de visión y lenguaje se limita a la interfaz ignorando el texto."),

    /* ---------- 1.2.1 Capacidades en tareas de prueba (elegir DOS) ---------- */
    q("1.2.1", "K2", 1, 2,
      "¿Cuáles DOS opciones son capacidades clave de un LLM en tareas de prueba?",
      [
        "Señalar ambigüedades e inconsistencias en un requisito.",
        "Generar, listo para desplegar, todo el código de la aplicación.",
        "Ejecutar él solo todos los guiones de prueba, sin que una persona supervise.",
        "Hacer la prueba exploratoria manual, apoyándose en la intuición del modelo.",
        "Crear datos de prueba variados, con combinaciones y valores límite."
      ],
      [0, 4],
      "El LLM puede aclarar requisitos (ambigüedades e inconsistencias) y generar datos de prueba diversos. No es una capacidad clave generar la aplicación completa, ejecutar los guiones sin supervisión ni sustituir la prueba exploratoria, que depende de la creatividad y el juicio humanos."),

    q("1.2.1", "K2", 1, 2,
      "Un equipo quiere usar un LLM en la prueba de una API. ¿Qué DOS encargos son realistas?",
      [
        "Pedirle combinaciones de datos que cubran límites y clases de equivalencia.",
        "Dejar que recorra la aplicación explorando, como lo haría un probador experto, y que decida él cuándo parar.",
        "Pedirle que revise una historia y marque frases ambiguas o que se contradicen.",
        "Encargarle el despliegue del sistema completo generado desde cero.",
        "Configurarlo para que lance la batería de regresión en el entorno y firme el resultado sin revisión."
      ],
      [0, 2],
      "Generar datos diversos y analizar requisitos son capacidades clave. La prueba exploratoria, la generación del sistema completo y la ejecución autónoma sin supervisión humana no lo son."),

    /* ---------- 1.2.2 Chatbot frente a aplicación de prueba ---------- */
    q("1.2.2", "K2", 1, 1,
      "¿Qué diferencia mejor un chatbot con IA de una aplicación de prueba impulsada por un LLM?",
      [
        "El chatbot conviene para tareas de prueba muy concretas y la aplicación, para charlas improvisadas.",
        "Hacen lo mismo y se configuran igual; solo cambia el nombre comercial.",
        "La aplicación de prueba se basa en la conversación libre y el chatbot hay que integrarlo en el proceso de prueba.",
        "El chatbot ofrece una conversación para tareas puntuales. La aplicación de prueba se integra en el proceso y se ajusta a una tarea de prueba concreta."
      ],
      [3],
      "El chatbot facilita interacciones ad hoc. La aplicación de prueba impulsada por LLM entrega una solución adaptada a necesidades concretas de prueba e integrada en el proceso. No son equivalentes ni se invierten esos papeles."),

    q("1.2.2", "K2", 1, 1,
      "Hay que elegir herramienta para dos necesidades: (1) preguntar hoy, de forma suelta, cómo partir una clase de equivalencia; (2) incorporar la generación de condiciones de prueba al flujo del equipo, con datos y formato fijos. ¿Qué encaja?",
      [
        "Las dos necesidades se cubren igual con un chatbot, porque no requiere integrarse en herramientas ni procesos.",
        "La primera encaja con un chatbot (interacción puntual). La segunda encaja con una aplicación de prueba impulsada por LLM, preparada para esa tarea.",
        "La primera exige la aplicación integrada y la segunda, el chatbot.",
        "Ninguna de las dos puede usar un LLM: el chatbot no sirve para probar y la aplicación no admite formatos."
      ],
      [1],
      "La conversación ad hoc es el terreno del chatbot. La tarea de prueba específica, integrada en el proceso, es el terreno de la aplicación impulsada por LLM."),

    /* ---------- 2.1.1 Estructura del prompt (2 huecos) ---------- */
    q("2.1.1", "K2", 1, 1,
      "En un prompt para analizar una prueba de rendimiento, un apartado dice: «Informes de la herramienta, registros del sistema en hora punta y referencias de rendimiento de la versión anterior». ¿A qué parte de la estructura pertenece?",
      [
        "Al contexto, porque describe el entorno que se está probando.",
        "A los datos de entrada, porque enumera las fuentes concretas que el modelo debe procesar.",
        "A las restricciones, porque limita cómo se permite analizar.",
        "Al formato de salida, porque dice cómo hay que presentar el informe."
      ],
      [1],
      "Esas líneas listan fuentes que el LLM va a analizar: son datos de entrada. El contexto sería información de fondo, las restricciones limitarían el análisis y el formato de salida diría cómo presentar el resultado. Aquí no hay ninguna de esas tres cosas."),

    q("2.1.1", "K2", 1, 1,
      "Un prompt para buscar defectos en un requisito incluye la línea: «Entrega los hallazgos en una tabla con las columnas identificador, requisito, tipo, descripción y severidad». ¿Qué parte de la estructura es?",
      [
        "La instrucción, porque dice qué tarea hay que hacer.",
        "Una restricción, del estilo de «no informes defectos solo de redacción».",
        "El formato de salida, porque indica cómo debe presentarse la respuesta.",
        "El contexto, porque aporta el fondo de la especificación."
      ],
      [2],
      "La línea no dice qué hacer ni limita el análisis ni da contexto del requisito: fija cómo debe quedar la respuesta. Eso es el formato de salida."),

    q("2.1.1", "K2", 1, 1,
      "¿Cuál de estos fragmentos es una restricción y no datos de entrada, contexto o formato?",
      [
        "«Eres un analista de pruebas de una pasarela de pago».",
        "«Usa el archivo adjunto con los resultados de la última ejecución».",
        "«No propongas cambios de código. Limítate a defectos que impidan aceptar la historia».",
        "«Responde con una lista numerada de como máximo ocho líneas»."
      ],
      [2],
      "Una restricción limita cómo se hace la tarea o qué queda fuera. El rol y el fondo son contexto, el archivo son datos de entrada y la lista numerada es formato de salida."),

    /* ---------- 2.1.2 Técnicas de prompting ---------- */
    q("2.1.2", "K2", 1, 1,
      "¿Qué opción diferencia bien el prompting con pocos ejemplos, el encadenamiento de prompts y el meta-prompting?",
      [
        "El encadenamiento consiste en dar ejemplos; el de pocos ejemplos parte la tarea en subtareas; el meta-prompting lo reescribe una persona a mano.",
        "El de pocos ejemplos orienta con ejemplos; el encadenamiento parte la tarea en varios prompts; el meta-prompting deja que el modelo refine sus propios prompts.",
        "El meta-prompting parte la tarea en pasos; el encadenamiento se basa en ejemplos; el de pocos ejemplos es la optimización manual del texto.",
        "El encadenamiento orienta sin ejemplos; el de pocos ejemplos también, pero con ejemplos; el meta-prompting solo usa el texto que escribió el probador."
      ],
      [1],
      "Pocos ejemplos: se muestran ejemplos. Encadenamiento: la tarea se descompone en prompts sucesivos. Meta-prompting: el propio LLM revisa y mejora sus prompts. Las otras opciones cruzan esas definiciones."),

    q("2.1.2", "K2", 1, 1,
      "Quiere que el modelo mejore solo, en varias vueltas, el prompt con el que genera oráculos. No va a partir el trabajo en pasos ni a pegar ejemplos de casos. ¿Qué técnica está usando?",
      [
        "Prompting sin ejemplos, porque no hay ejemplos.",
        "Encadenamiento de prompts, porque hay varias vueltas.",
        "Meta-prompting, porque el modelo refina de forma iterativa sus propios prompts.",
        "Prompting con pocos ejemplos, porque cada vuelta es un ejemplo."
      ],
      [2],
      "Que el LLM revise sus propios prompts es meta-prompting. La ausencia de ejemplos no basta para llamarlo «sin ejemplos» si el objetivo es refinar el prompt. El encadenamiento descompone la tarea de prueba, no la mejora del prompt."),

    /* ---------- 2.1.3 Prompt de sistema ---------- */
    q("2.1.3", "K2", 1, 1,
      "¿Cuál es la función principal del prompt de sistema?",
      [
        "Fijar, durante toda la conversación, el marco de cómo debe comportarse el modelo.",
        "Llevar la pregunta concreta que la persona escribe en cada turno.",
        "Recalcularse en cada mensaje para cambiar el contexto de la charla.",
        "Mostrar en pantalla lo que escribió el usuario y, además, las reglas."
      ],
      [0],
      "El prompt de sistema permanece constante en la sesión y establece el marco de respuesta. La pregunta de cada turno es el prompt de usuario. El de sistema no se ajusta solo en cada interacción ni muestra la entrada del usuario."),

    q("2.1.3", "K2", 1, 1,
      "En una herramienta de chat, las reglas «responde siempre en español, no inventes requisitos y cita la sección» se cargan al abrir la sesión y el usuario no las ve. Cada pregunta posterior cambia. ¿Qué son esas reglas?",
      [
        "Un prompt de usuario, porque acaban condicionando la respuesta.",
        "Un prompt de sistema: quedan fijas toda la sesión, ocultas, y marcan el comportamiento.",
        "Datos de entrada, porque describen el sistema que se prueba.",
        "Un meta-prompt, porque el modelo las reescribe en cada turno."
      ],
      [1],
      "Permanecen constantes, ocultas y definen el marco. Eso es el prompt de sistema. El prompt de usuario es lo que la persona envía en cada turno."),

    /* ---------- 2.2.1 Análisis de prueba, K3 ---------- */
    q("2.2.1", "K3", 2, 1,
      "Los requisitos de un proyecto nuevo ya están estables y revisados a fondo. El encargo es: generar condiciones de prueba, priorizarlas por riesgo y detectar huecos de cobertura, usando encadenamiento de prompts. ¿Qué secuencia es la adecuada?",
      [
        "Pedir condiciones a partir de los requisitos; después, con el contexto de riesgo, pedir que las priorice; después, pedir un análisis de si cubren todos los aspectos de los requisitos.",
        "Pedir en un solo prompt condiciones ya priorizadas y con cobertura completa, y luego solo reordenarlas.",
        "Pedir condiciones, saltar la priorización y cerrar buscando ambigüedades en los requisitos.",
        "Empezar por cazar inconsistencias del requisito y, en el mismo paso, pedir el análisis completo de cobertura."
      ],
      [0],
      "El análisis de prueba con IA generativa genera condiciones desde la base de prueba, puede priorizarlas por riesgo si hay contexto y puede analizar la cobertura. El encadenamiento separa esos pasos. Un único prompt que lo hace todo, o centrarse en defectos de un requisito ya revisado, no sigue esa técnica ni el objetivo."),

    q("2.2.1", "K3", 2, 1,
      "Le proponen este guion de prompts para el mismo objetivo (condiciones priorizadas y huecos de cobertura) sobre una especificación ya cerrada: (i) «genera condiciones priorizadas que cubran todo»; (ii) «busca ambigüedades». ¿Por qué no es la mejor aplicación del encadenamiento?",
      [
        "Porque el encadenamiento prohíbe usar el requisito como entrada.",
        "Porque junta en un solo paso la generación, la prioridad y la cobertura, y además dedica otro paso a defectos que el escenario da por revisados.",
        "Porque priorizar por riesgo no forma parte del análisis de prueba con IA generativa.",
        "Porque el análisis de cobertura solo puede hacerlo una persona, nunca el modelo."
      ],
      [1],
      "El encadenamiento descompone: primero condiciones, luego prioridad con contexto, luego cobertura. Meterlo todo en un paso no es esa técnica. Buscar defectos no es el centro cuando el objetivo son condiciones priorizadas y huecos, y el requisito ya fue revisado."),

    /* ---------- 2.2.2 Diseño Gherkin, K3 ---------- */
    q("2.2.2", "K3", 2, 1,
      "Quiere casos Gherkin para la historia «quiero exportar mi historial» y el criterio «si la cuenta está verificada, la exportación llega por correo». Dispone de ejemplos ya escritos (historia, criterio y caso). ¿Qué prompt está mejor planteado?",
      [
        "Pide casos Gherkin, pega los ejemplos, pero como restricción solo dice «aplica buenas prácticas» y no exige la sintaxis Dado-Cuando-Entonces ni el criterio.",
        "Se presenta como analista de casos Gherkin, incluye los ejemplos, exige la sintaxis Dado-Cuando-Entonces, la alineación con el criterio y el formato de los ejemplos.",
        "Exige Dado-Cuando-Entonces y el criterio, pero no aporta ningún ejemplo y remite a «buenas prácticas» en la instrucción.",
        "Pide dos casos, solo de límites, con Dado-Cuando-Entonces, y no usa los ejemplos ni pide cubrir el criterio completo."
      ],
      [1],
      "El prompting con pocos ejemplos necesita los ejemplos. Para Gherkin, además, hacen falta la sintaxis Dado-Cuando-Entonces y el alineamiento con el criterio de aceptación. El resto omite los ejemplos, la sintaxis o la cobertura del criterio."),

    q("2.2.2", "K3", 2, 1,
      "De estos cuatro encargos para generar escenarios Gherkin de una historia de transferencia, ¿cuál aplica de verdad el prompting con pocos ejemplos?",
      [
        "«Genera escenarios. Usa buenas prácticas. Aquí están la historia y el criterio».",
        "«Aquí tienes tres tríos de historia, criterio y escenario Dado-Cuando-Entonces. Genera los de esta historia nueva con la misma sintaxis y alineados a su criterio».",
        "«Inventa casos límite. No mires ejemplos anteriores: razonar solo es más puro».",
        "«Reescribe el criterio con otras palabras, sin convertir nada a escenarios»."
      ],
      [1],
      "La técnica se apoya en ejemplos previos para guiar el formato y el contenido. Sin ejemplos no es prompting con pocos ejemplos. Pedir solo límites descuida la cobertura del criterio."),

    /* ---------- 2.2.3 Regresión, K3 ---------- */
    q("2.2.3", "K3", 2, 1,
      "El borrador de prompt para un informe de regresión dice: rol de analista, contexto de resultados crudos, instrucción «indica discrepancias», datos en un archivo, restricción «contrasta con la lista de anomalías conocidas» y salida en tabla. ¿Qué mejora encaja mejor con un análisis estructurado?",
      [
        "Añadir que agrupe incidencias parecidas y que las cruce con las anomalías conocidas, sin tocar el resto de los pasos.",
        "Cambiar el rol a «analista de regresión orientado a decisiones», sin ampliar la instrucción.",
        "Ampliar la instrucción: separar resultado esperado y real, agrupar incidencias y resaltar las discrepancias.",
        "Meter en las restricciones principios de regresión escritos como Dado-Cuando-Entonces."
      ],
      [2],
      "La mejora completa incorpora los pasos que faltan: separar esperado y real (localiza el desajuste), agrupar (prioriza y quita duplicados) y resaltar discrepancias. Las otras dejan fuera pasos, solo cambian el rol o meten una restricción que no pertenece a la tarea."),

    q("2.2.3", "K3", 2, 1,
      "Tras una regresión, el modelo devuelve una lista plana donde se mezclan lo esperado y lo obtenido. ¿Qué ajuste del prompt ataca mejor ese problema?",
      [
        "Prohibir en las restricciones cualquier mención a la lista de anomalías conocidas.",
        "Pedir de forma explícita que separe esperado y obtenido, que agrupe los fallos repetidos y que destaque solo los desajustes relevantes.",
        "Sustituir el rol por «director de proyecto» para que el texto quede más breve.",
        "Quitar el formato de tabla para que el modelo redacte un ensayo."
      ],
      [1],
      "Esas tres instrucciones son los pasos estructurados del análisis de resultados de regresión. Cambiar el rol o el formato, o tirar la lista de anomalías, no incorpora esos pasos."),

    /* ---------- 2.2.4 Métricas, K3 ---------- */
    q("2.2.4", "K3", 2, 1,
      "Un prompt genera métricas de avance, defectos y cobertura en un panel, con rol de director de pruebas, datos crudos y la restricción «que sea breve». Quiere que las partes interesadas entiendan las cifras y sepan qué hacer. ¿Qué cambio es el mejor?",
      [
        "Precisar que el rol «apoya decisiones», sin añadir ninguna instrucción nueva sobre las métricas.",
        "Pedir además un análisis de riesgos, impactos y prioridades, apartado del cálculo de las métricas.",
        "Ampliar el formato de salida con un resumen en lenguaje llano que interprete las métricas y proponga los pasos siguientes.",
        "Repetir en las restricciones que el texto sea comprensible y sin jerga, sin decir cómo lograrlo."
      ],
      [2],
      "Un resumen en lenguaje llano, con interpretación y próximos pasos, hace las métricas accionables para quien no vive en el detalle. Cambiar el rol no añade una instrucción concreta. El análisis de riesgos distrae del encargo. Repetir la restricción no dice cómo conseguir esa lectura."),

    q("2.2.4", "K3", 2, 1,
      "El panel de métricas que devuelve el modelo es exacto, pero gerencia dice que no sabe qué decisión tomar. ¿Dónde debe actuar el prompt?",
      [
        "En el formato de salida: añadir una lectura en lenguaje sencillo y los pasos que siguen.",
        "En el rol: cambiar «director de pruebas» por «científico de datos».",
        "En los datos de entrada: adjuntar otra vez el mismo archivo.",
        "En las restricciones: copiar de nuevo la frase «salida breve y comprensible»."
      ],
      [0],
      "El hueco está en cómo se presentan e interpretan las métricas para quien decide. Eso se resuelve en el formato de salida, no repitiendo una restricción ni cambiando el oficio del rol."),

    /* ---------- 2.2.5 Elegir la técnica, K3 ---------- */
    q("2.2.5", "K3", 2, 1,
      "Solo tiene unos pocos casos con resultado esperado conocido y unas reglas claras de cómo cambia ese resultado si cambia la entrada. Quiere más casos aplicando esas reglas. ¿Qué técnica encaja mejor?",
      [
        "Prompting con pocos ejemplos: los casos existentes ilustran cómo se aplica la regla.",
        "Encadenamiento de prompts: hace falta partir esta tarea en muchos pasos.",
        "Meta-prompting: lo importante es que el modelo reescriba el prompt.",
        "Prompting sin ejemplos: las reglas bastan y los casos existentes sobran."
      ],
      [0],
      "Con pocos ejemplos reales de entrada y resultado, y una regla de transformación, lo directo es mostrar esos ejemplos. El encadenamiento complica una tarea lineal. El meta-prompting no es tan específico. Sin ejemplos se desaprovechan los casos que ya existen."),

    q("2.2.5", "K3", 2, 1,
      "Va a generar oráculos de una función de redondeo. Tiene cuatro casos acordados y la regla «si la entrada se multiplica por 10, el resultado también». No necesita descomponer el trabajo ni reescribir el prompt. ¿Qué técnica elige?",
      [
        "Meta-prompting, para que el modelo diseñe solo el procedimiento.",
        "Prompting sin ejemplos, para no condicionarlo con los cuatro casos.",
        "Prompting con pocos ejemplos, mostrando los cuatro casos y la regla aplicada.",
        "Encadenamiento, con un prompt por cada cifra del redondeo."
      ],
      [2],
      "Hay ejemplos y una regla que se puede ilustrar con ellos. Esa es la situación del prompting con pocos ejemplos. Las otras técnicas o ignoran los ejemplos o añaden pasos que la tarea no pide."),

    /* ---------- 2.3.1 Métricas de evaluación ---------- */
    q("2.3.1", "K2", 1, 1,
      "Un modelo genera casos de interacción, guiones de API y datos para límites de una aplicación. ¿Qué pareja evalúa mejor la cobertura de situaciones distintas y la fiabilidad de los guiones de API?",
      [
        "Diversidad de los casos, y tasa de éxito al ejecutar los guiones de API.",
        "Exactitud y completitud de los casos, más el tiempo que se tarda frente a la prueba manual.",
        "Precisión de los datos frente a una norma, y el encaje contextual de los guiones.",
        "Relevancia de todo lo generado, más diversidad, sin mirar si los guiones llegan a ejecutarse."
      ],
      [0],
      "La diversidad mira si se cubren situaciones variadas, incluidos los límites. La tasa de éxito de ejecución mira si el guion de API funciona de verdad. El tiempo no mide cobertura ni fiabilidad. Precisión y relevancia, solas, dejan fuera esa ejecución."),

    q("2.3.1", "K2", 1, 1,
      "Los guiones de API que genera el modelo compilan, pero al lanzarlos fallan a menudo, y los casos repiten siempre el mismo camino feliz. ¿Qué métricas lo ponen de manifiesto?",
      [
        "Solo el tiempo de generación: si tarda poco, la calidad es suficiente.",
        "La diversidad (caminos poco variados) y la tasa de éxito de ejecución (guiones que no pasan).",
        "La longitud del prompt y el número de tokens de la respuesta.",
        "Únicamente si el texto «suena» a requisito, es decir, la relevancia aislada."
      ],
      [1],
      "Poca variedad de casos es un problema de diversidad. Guiones que no ejecutan con éxito se ven en la tasa de éxito. El tiempo, los tokens o la relevancia aislada no cubren esos dos fallos."),

    /* ---------- 2.3.2 Refinar prompts ---------- */
    q("2.3.2", "K2", 1, 1,
      "El modelo insiste en casos cuyo resultado esperado contradice el requisito. ¿Qué técnica sirve mejor para entender por qué y corregir el prompt?",
      [
        "Analizar las salidas: clasificar esos resultados erróneos y ver cómo el prompt indujo al modelo.",
        "Una prueba A/B de dos prompts, útil para comparar versiones, no para diagnosticar la causa.",
        "Acortar o alargar el prompt, que cambia el contexto pero no explica el error.",
        "Una encuesta a los probadores sobre si el texto les parece claro."
      ],
      [0],
      "El análisis de salidas examina inexactitudes e inconsistencias y relaciona el resultado esperado falso con el prompt. Las pruebas A/B comparan versiones. Tocar la longitud o recoger opiniones no señala la causa de ese resultado contradictorio."),

    q("2.3.2", "K2", 1, 1,
      "Quiere dejar de recibir oráculos que niegan una regla de negocio escrita en la entrada. ¿Por dónde empieza el refinamiento?",
      [
        "Por lanzar diez variantes del prompt y quedarse con la más votada, sin leer los oráculos.",
        "Por revisar las salidas incorrectas, agrupar en qué se oponen al requisito y ajustar el prompt con ese hallazgo.",
        "Por borrar restricciones hasta que la respuesta sea más larga.",
        "Por preguntar al equipo si el formato de la tabla les gusta."
      ],
      [1],
      "Primero hay que ver, en las propias salidas, por qué el resultado esperado está mal. Eso es análisis de salidas y da una pista concreta para reescribir el prompt."),

    /* ---------- 3.1.1 Definición de alucinación ---------- */
    q("3.1.1", "K1", 1, 1,
      "¿Qué es una alucinación en la salida de un LLM?",
      [
        "Un fallo al seguir un razonamiento de varios pasos.",
        "Una inclinación de la salida debida a datos de entrenamiento que favorecen una postura.",
        "Una salida irrelevante o falsa respecto de la tarea pedida.",
        "La incapacidad de generar pruebas en un idioma distinto del inglés."
      ],
      [2],
      "Alucinar es producir una salida incorrecta en los hechos o ajena a la tarea. Fallar un razonamiento encadenado es un error de razonamiento. Favorecer una postura, o dejar fuera perspectivas por los datos, es un sesgo."),

    q("3.1.1", "K1", 1, 1,
      "El modelo inventa un campo «código de empleado» que no está en la especificación y lo usa como si fuera obligatorio. ¿Cómo se clasifica, según las definiciones del programa?",
      [
        "Sesgo por infrarrepresentación en los datos de entrenamiento.",
        "Error de razonamiento: el modelo no supo encadenar tres pasos lógicos.",
        "Alucinación: la salida afirma algo que no corresponde a la tarea ni a los hechos dados.",
        "Ventana de contexto demasiado corta."
      ],
      [2],
      "Inventar un hecho que no está en la tarea es una alucinación. No es, por esta sola descripción, un sesgo ni un error de un razonamiento por pasos."),

    /* ---------- 3.1.2 Identificar alucinaciones, K3 ---------- */
    q("3.1.2", "K3", 2, 1,
      "El encargo escrito del proyecto de una tienda menciona solo: carrito, códigos de descuento y correo de confirmación. ¿Qué caso generado tiene más pinta de alucinación?",
      [
        "Comprobar que se pueden añadir varios productos al carrito y llegar al pago.",
        "Comprobar que un código de descuento caducado no se aplica.",
        "Comprobar que, tras el pedido, llega el correo de confirmación.",
        "Comprobar que el usuario crea una lista de deseos y guarda ahí sus favoritos."
      ],
      [3],
      "Carrito, descuento y correo están en el encargo, así que esos casos son pertinentes. La lista de deseos no se menciona: es el caso con más probabilidad de haber sido inventado."),

    q("3.1.2", "K3", 2, 1,
      "La descripción de una app médica cita tres funciones: alta del paciente, receta electrónica y aviso de cita. El modelo propone cuatro casos. ¿Cuál debe tratar como alucinación mientras no aparezca en la descripción?",
      [
        "El alta rechaza un documento de identidad con formato inválido.",
        "La receta no se firma si falta el identificador del profesional.",
        "El aviso de cita sale también por SMS, además del correo descrito.",
        "El paciente paga la consulta con una pasarela que la descripción no nombra."
      ],
      [3],
      "Alta, receta y aviso están en la descripción; incluso un canal extra del aviso parte de una función citada. El pago con pasarela no está y es el caso más claramente inventado."),

    /* ---------- 3.1.3 Formatos claros ---------- */
    q("3.1.3", "K2", 1, 1,
      "¿Qué beneficio se asocia de forma más directa a usar datos de entrada claros y estructurados en tareas de prueba?",
      [
        "Reduce el esfuerzo de hacer un ajuste fino del modelo para esa tarea.",
        "Hace menos ambiguas las salidas, porque hay menos malentendidos sobre la entrada.",
        "Garantiza por sí solo que la salida sea más relevante para el contexto de negocio.",
        "Vuelve al modelo más creativo y lo anima a respuestas novedosas."
      ],
      [1],
      "Una entrada clara y estructurada reduce ambigüedades. No abarata el ajuste fino, no sustituye al contexto adecuado y no aumenta la creatividad: al contrario, pide respuestas que respeten el formato."),

    q("3.1.3", "K2", 1, 1,
      "Al pasar de un párrafo libre a una tabla con columnas fijas (entrada, acción, resultado), las respuestas del modelo dejan de mezclar campos. ¿Qué explica ese cambio?",
      [
        "El modelo olvidó conocimiento general y por eso ya no divaga.",
        "El formato estructurado reduce malentendidos; la ambigüedad venía de una entrada confusa.",
        "La tabla aporta ella sola el contexto de riesgo que antes faltaba.",
        "El formato empuja al modelo a inventar columnas nuevas y más creativas."
      ],
      [1],
      "El efecto directo de una entrada clara es menos ambigüedad en la salida. No reemplaza conocimiento, no equivale a dar contexto y no busca originalidad."),

    /* ---------- 3.1.4 No determinismo ---------- */
    q("3.1.4", "K1", 1, 1,
      "¿Qué ajuste reduce la variabilidad de las salidas estrechando la distribución de probabilidad durante la inferencia?",
      [
        "Subir la tasa de aprendizaje.",
        "Bajar la temperatura.",
        "Subir la semilla aleatoria.",
        "Bajar la semilla aleatoria."
      ],
      [1],
      "La temperatura controla la aleatoriedad en la inferencia: bajarla da salidas más estables. La tasa de aprendizaje actúa en el entrenamiento, no en la inferencia. Fijar la semilla ayuda a reproducir, pero no estrecha por sí misma la distribución, y que sea alta o baja no importa a ese efecto."),

    q("3.1.4", "K1", 1, 1,
      "El mismo prompt devuelve oráculos distintos en cada ejecución. Quieren menos variación, sin reentrenar. ¿Qué hacen?",
      [
        "Aumentan la tasa de aprendizaje para que converja más rápido.",
        "Reducen la temperatura, de modo que la elección del siguiente token sea menos azarosa.",
        "Ponen una semilla muy alta, porque eso aplana la distribución.",
        "Ponen una semilla muy baja, porque eso concentra la probabilidad."
      ],
      [1],
      "Bajar la temperatura reduce la aleatoriedad en la inferencia. La tasa de aprendizaje no interviene al generar. La semilla, alta o baja, no estrecha la distribución."),

    /* ---------- 3.2.1 Privacidad: afirmación incorrecta ---------- */
    q("3.2.1", "K2", 1, 1,
      "¿Qué afirmación sobre privacidad al usar IA generativa en la prueba es INCORRECTA?",
      [
        "Las salidas pueden dejar al descubierto datos sensibles sin que esa fuera la intención.",
        "Una herramienta puede guardar o tratar datos sensibles sin un consentimiento claro.",
        "Saltarse una norma como el RGPD puede acabar en un conflicto legal.",
        "Si el modelo alucina al fabricar datos sintéticos, es probable que esté revelando datos sensibles reales, sea cual sea el material con el que se entrenó."
      ],
      [3],
      "Las tres primeras son preocupaciones reales de privacidad. La última no: si el modelo no se entrenó con datos sensibles reales, una alucinación al sintetizar datos es sintética. Que por casualidad coincida con un dato real es una preocupación, pero no es «exponer el dato real» y es muy poco probable."),

    q("3.2.1", "K2", 1, 1,
      "Un compañero dice: «Como el modelo a veces inventa, cada dato sintético que genera es una filtración de un cliente real, aunque nunca vio datos de clientes». ¿Qué responde el programa de estudios?",
      [
        "Tiene razón: alucinar y filtrar son lo mismo.",
        "No. Sin datos sensibles reales en el entrenamiento, la alucinación no expone esos datos; sería sintética. Una coincidencia fortuita es posible, pero muy poco probable.",
        "Tiene razón solo si el equipo no firmó el RGPD.",
        "No, porque los modelos no pueden generar datos que parezcan personales."
      ],
      [1],
      "Exponer datos reales exige que el modelo los haya visto. Inventar a partir de patrones no es, por sí mismo, una filtración. Las otras vías (salidas que revelan, almacenamiento sin control, incumplimiento normativo) sí son riesgos de privacidad."),

    /* ---------- 3.2.2 Vectores de ataque (2 huecos) ---------- */
    q("3.2.2", "K2", 1, 1,
      "Alguien cuela en el conjunto de entrenamiento resultados de prueba falsos para que el modelo recomiende mal la cobertura. ¿Qué vector es?",
      [
        "Generación de código malicioso: conseguir puertas traseras durante el uso.",
        "Manipulación del contexto: sonsacar datos confidenciales del entrenamiento.",
        "Manipulación de solicitudes: alterar la salida en tiempo de ejecución.",
        "Envenenamiento de datos: manipular los datos con los que el modelo aprende."
      ],
      [3],
      "Meter evaluaciones o resultados falsos en el entrenamiento es envenenamiento de datos. Los otros tres vectores actúan de otra forma: puertas traseras en el uso, extracción de datos de entrenamiento o perturbación de la salida al ejecutar."),

    ql("3.2.2", "K2", 1, 1,
      "Relacione cada vector de ataque (1-4) con el ejemplo (A-D).",
      [
        ["1", "Manipulación del contexto"],
        ["2", "Manipulación de solicitudes"],
        ["3", "Envenenamiento de datos"],
        ["4", "Generación de código malicioso"],
        ["A", "Altera en el ajuste fino los enlaces de trazabilidad para que los casos salgan mal."],
        ["B", "Induce con prompts engañosos a guiones con fallos de seguridad ocultos."],
        ["C", "Con prompts enormes y preparados hace que el modelo suelte claves de API de proyectos viejos."],
        ["D", "Cuela capturas modificadas para que el análisis visual ignore defectos reales de la interfaz."]
      ],
      [
        "1C, 2D, 3A, 4B",
        "1B, 2D, 3A, 4C",
        "1D, 2C, 3B, 4A",
        "1C, 2B, 3D, 4A"
      ],
      [0],
      "Sonsacar datos de entrenamiento (claves) es manipulación del contexto (1C). Perturbar la salida en ejecución con una imagen trucada es manipulación de solicitudes (2D). Falsear datos del ajuste fino es envenenamiento (3A). Inducir puertas traseras o fallos ocultos en el guion durante el uso es generación de código malicioso (4B)."),

    q("3.2.2", "K2", 1, 1,
      "Durante el uso, un prompt hace que el modelo, afinado para escribir guiones, inserte una llamada externa oculta. No se ha tocado el conjunto de entrenamiento. ¿Qué vector es?",
      [
        "Envenenamiento de datos.",
        "Manipulación del contexto.",
        "Generación de código malicioso.",
        "Ninguno: si no hay reentrenamiento, no hay ataque."
      ],
      [2],
      "Inducir en el uso una puerta trasera (por ejemplo una llamada externa) es generación de código malicioso. El envenenamiento actúa sobre los datos de entrenamiento. La manipulación del contexto busca extraer datos confidenciales de ese entrenamiento."),

    /* ---------- 3.2.3 Mitigación de privacidad ---------- */
    q("3.2.3", "K2", 1, 1,
      "¿Qué estrategia afronta mejor el riesgo de privacidad al probar con IA generativa?",
      [
        "Comparar varios modelos para ver cuál acierta más el resultado de la prueba.",
        "Sustituir los datos sensibles por una versión anonimizada de los mismos.",
        "Abrir el acceso a los datos sensibles para que el modelo aprenda más.",
        "Quitar el cifrado para guardar y transmitir más rápido."
      ],
      [1],
      "Anonimizar es una mitigación eficaz. Comparar modelos mira la exactitud, no la privacidad. Abrir el acceso y quitar el cifrado aumentan el riesgo de filtración o robo."),

    q("3.2.3", "K2", 1, 1,
      "Van a enviar al modelo extractos de expedientes reales para generar casos. ¿Qué medida está alineada con la mitigación de privacidad?",
      [
        "Dejar los nombres y documentos tal cual, para no perder realismo.",
        "Quitar o sustituir los identificadores personales antes de construir el prompt.",
        "Desactivar el cifrado del almacén donde están los expedientes.",
        "Dar a todo el equipo permiso de lectura sobre la base de producción."
      ],
      [1],
      "La anonimización reduce el riesgo de que datos sensibles entren en el modelo o queden en las salidas. Las otras opciones aumentan la exposición."),

    /* ---------- 3.3.1 Energía ---------- */
    q("3.3.1", "K2", 1, 1,
      "¿Qué afirmación sobre energía y CO₂ al usar LLM es correcta?",
      [
        "Generar imágenes gasta mucha más energía que generar texto, pero emite menos CO₂.",
        "Una búsqueda con IA generativa gasta bastante menos que una búsqueda web clásica.",
        "Generar imágenes exige muchos más recursos de cómputo que generar texto y, por eso, mucha más energía.",
        "Generar texto gasta tan poco que millones de usuarios no suponen un consumo apreciable."
      ],
      [2],
      "La imagen es bastante más intensiva en cómputo y en energía que el texto. Energía y CO₂ suelen ir juntos si no se dice otra cosa sobre la fuente de energía. La búsqueda con IA generativa gasta más, no menos, que la tradicional. El impacto acumulado del texto no es despreciable."),

    q("3.3.1", "K2", 1, 1,
      "Un equipo duda entre pedir al modelo capturas sintéticas de la interfaz o descripciones en texto de los mismos casos. Desde el consumo de energía, ¿qué es cierto?",
      [
        "Da igual: texto e imagen cuestan lo mismo si el prompt tiene la misma longitud.",
        "Las capturas (imagen) consumen bastante más energía por su mayor complejidad de cómputo.",
        "El texto consume más, porque se repite entre millones de usuarios y la imagen no.",
        "La imagen consume más energía pero, por definición, menos CO₂."
      ],
      [1],
      "Generar imagen es mucho más costoso en cómputo y en energía que generar texto. No se puede afirmar que emita menos CO₂ solo por ser imagen, y el uso masivo de texto tampoco es un consumo insignificante."),

    /* ---------- 3.4.1 Normas (elegir DOS) ---------- */
    q("3.4.1", "K1", 1, 2,
      "¿Cuáles DOS normas son las más pertinentes para usar IA generativa en la prueba, según el programa de estudios?",
      [
        "ISO/IEC 25010:2023, modelo de calidad de producto.",
        "ISO/IEC 23053:2022, marco de sistemas de IA con aprendizaje automático: calidad de datos, transparencia y seguridad.",
        "ISO/IEC/IEEE 29119-2:2021, procesos de prueba.",
        "ISO/IEC 42001:2023, requisitos para gestionar sistemas de IA en la organización.",
        "ISO/IEC/IEEE 29119-3:2021, documentación de prueba."
      ],
      [1, 3],
      "El programa cita ISO/IEC 23053:2022 e ISO/IEC 42001:2023 para el uso de IA generativa en la prueba. ISO/IEC 25010 y las partes de ISO/IEC/IEEE 29119 salen en el nivel fundamentos y no tratan ese uso."),

    q("3.4.1", "K1", 1, 1,
      "Le piden las dos referencias del programa CT-GenAI para gobernar el uso de IA generativa en la prueba. ¿Qué opción las cita?",
      [
        "ISO/IEC/IEEE 29119-3 y el modelo de calidad ISO/IEC 25010.",
        "ISO/IEC 23053:2022 e ISO/IEC 42001:2023.",
        "ISO/IEC/IEEE 29119-2 e ISO/IEC 25010.",
        "Solo el glosario de fundamentos, porque el programa no nombra normas de IA."
      ],
      [1],
      "Esas dos normas son las que el programa menciona para calidad de datos, transparencia y seguridad, y para la gestión de sistemas de IA. Las de procesos, documentación y calidad de producto no cubren el uso de IA generativa en la prueba."),

    /* ---------- 4.1.1 Arquitectura ---------- */
    q("4.1.1", "K2", 1, 1,
      "¿Qué componente junta la entrada de la persona con datos estructurados y parecidos en significado para dejar el prompt listo?",
      [
        "El back-end.",
        "El front-end.",
        "El componente de autenticación.",
        "El posprocesamiento."
      ],
      [0],
      "El back-end recupera datos de bases relacionales y vectoriales, los combina con lo que escribió el usuario y prepara el prompt. El front-end solo recoge la entrada. La autenticación controla el acceso. El posprocesamiento retoca la salida, no el prompt."),

    q("4.1.1", "K2", 1, 1,
      "En una aplicación de prueba con LLM, ¿dónde ocurre la recuperación desde la base vectorial y el armado del prompt que verá el modelo?",
      [
        "En la pantalla donde el probador escribe.",
        "En el servicio de back-end, antes de llamar al modelo.",
        "En el módulo que da o niega el acceso.",
        "En el paso que revisa la respuesta cuando el modelo ya contestó."
      ],
      [1],
      "Recuperar y preparar el prompt es trabajo del back-end. La pantalla es el front-end, el acceso es autenticación y revisar la respuesta ya generada es posprocesamiento."),

    /* ---------- 4.1.2 RAG ---------- */
    q("4.1.2", "K2", 1, 1,
      "La documentación de un banco está en una base vectorial y los casos históricos, en una base relacional. Hay que generar casos alineados con la especificación vigente. ¿Cuál es el uso más apropiado de RAG?",
      [
        "Consultar una función concreta: RAG recupera los fragmentos pertinentes, los junta con casos históricos y el modelo genera casos acordes al contexto.",
        "Pedir todas las funciones a la vez para que RAG vuelque la base vectorial completa en el prompt.",
        "Recuperar los documentos y revisarlos a mano antes de reescribir la consulta.",
        "Ignorar lo recuperado y fiarse solo de lo que el modelo ya trae entrenado."
      ],
      [0],
      "RAG brilla cuando recupera fragmentos concretos y los inyecta en la generación. No está pensado para volcar el conjunto entero, ni para sustituir esa recuperación por una revisión manual, ni para ignorar la información externa y actualizada."),

    q("4.1.2", "K2", 1, 1,
      "¿Qué secuencia resume mejor el proceso RAG?",
      [
        "Entrenar el modelo de cero, borrar la base vectorial y generar solo con la memoria del modelo.",
        "Partir documentos en fragmentos, limpiarlos, guardarlos como incrustaciones, recuperar los relevantes por similitud y generar la respuesta con esos fragmentos y el modelo.",
        "Enviar el documento entero en cada pregunta, sin fragmentar ni incrustar.",
        "Pedir al modelo que invente la especificación y después buscar en la base si esa invención existe."
      ],
      [1],
      "RAG fragmenta, limpia, incrusta y almacena; ante la consulta recupera por similitud y genera combinando lo recuperado con el modelo. No reentrena desde cero ni se salta la recuperación."),

    /* ---------- 4.1.3 Agentes ---------- */
    q("4.1.3", "K2", 1, 1,
      "¿Qué aportan de forma más ajustada los agentes autónomos y semiautónomos a la automatización de la prueba?",
      [
        "Mejoran eficiencia y calidad solo porque combinan sistemas de un agente y de varios.",
        "Suben la calidad con verificaciones complejas, a cambio de perder eficiencia.",
        "Mejoran eficiencia y calidad porque pueden trabajar con distintos grados de intervención humana.",
        "Mejoran eficiencia y calidad y, de paso, eliminan la necesidad de verificar."
      ],
      [2],
      "El agente autónomo gana eficiencia con poca intervención y comprobaciones automáticas. El semiautónomo mantiene una supervisión humana que cuida la calidad. Juntos equilibran las dos cosas. Quitar la verificación no es aceptable, y el número de agentes no es la mejora de fondo."),

    q("4.1.3", "K2", 1, 1,
      "Quieren más velocidad al preparar datos y, a la vez, que una persona siga aceptando los casos que tocan dinero. ¿Qué lectura de los agentes es la correcta?",
      [
        "Hace falta un agente autónomo para los datos y supervisión humana (enfoque semiautónomo) donde el riesgo lo pide. La verificación no se elimina.",
        "Un agente autónomo debe cubrir las dos cosas y borrar el paso de aceptación humana.",
        "Los agentes solo mejoran la calidad si se acepta que el proceso será más lento.",
        "Da igual el grado de autonomía: el programa no distingue autónomo de semiautónomo."
      ],
      [0],
      "Distintos niveles de interacción humana son precisamente la palanca: autonomía donde aporta eficiencia y supervisión donde hace falta calidad. La verificación sigue siendo necesaria."),

    /* ---------- 4.2.1 Ajuste fino ---------- */
    q("4.2.1", "K2", 1, 1,
      "¿Qué afirmación sobre el ajuste fino para una tarea de prueba es INCORRECTA?",
      [
        "Entrena un modelo ya preentrenado con datos de la tarea para mejorar rendimiento y conocimiento del dominio.",
        "Sustituye el conocimiento general por un razonamiento solo de esa tarea y así desaparece el sobreajuste.",
        "Modifica parámetros del modelo con un conjunto de datos dirigido a un dominio o tarea.",
        "Necesita datos de calidad y específicos de la tarea para no acabar en resultados sesgados o inexactos."
      ],
      [1],
      "El ajuste fino no borra el conocimiento general ni garantiza que no haya sobreajuste: el sobreajuste sigue siendo un riesgo. Las otras tres descripciones sí son correctas."),

    q("4.2.1", "K2", 1, 1,
      "Tras un ajuste fino con pocos casos de un solo proyecto, el modelo responde muy bien a ese proyecto y mal a cualquier otro parecido. ¿Qué está pasando?",
      [
        "Es el resultado esperado: el ajuste fino debe reemplazar el conocimiento general.",
        "Es una señal de sobreajuste, un riesgo que el ajuste fino no elimina.",
        "Es un fallo del posprocesamiento, no del ajuste.",
        "Indica que los datos eran demasiado variados y de demasiada calidad."
      ],
      [1],
      "Ajustar con un conjunto estrecho puede sobreajustar. El ajuste fino adapta; no sustituye todo el conocimiento general ni promete ausencia de sobreajuste. Hacen falta datos de calidad y propios de la tarea, no un puñado memorado."),

    /* ---------- 4.2.2 LLMOps ---------- */
    q("4.2.2", "K2", 1, 1,
      "¿Cuál es el foco principal de LLMOps al desplegar y gestionar modelos para la prueba?",
      [
        "Impedir que los procesos de prueba dependan de la IA generativa.",
        "Gestionar el modelo durante su ciclo de vida, incluida la privacidad, la seguridad y el coste.",
        "Limitar el uso a chatbots para que todo sea más simple.",
        "Automatizar todas las tareas de prueba y quitar la supervisión humana."
      ],
      [1],
      "LLMOps gestiona el ciclo de vida y, en la prueba, la privacidad, la seguridad y el coste. No consiste en prohibir el uso, ni se reduce a chatbots, ni busca automatizarlo todo sin personas."),

    q("4.2.2", "K2", 1, 1,
      "El equipo versiona prompts, controla quién accede a los datos que entran al modelo y revisa el coste de cada ejecución. ¿Cómo se llama esa disciplina?",
      [
        "Ajuste fino, porque se tocan parámetros del modelo.",
        "LLMOps, porque cubre la operación del modelo a lo largo de su vida, con privacidad, seguridad y coste.",
        "RAG, porque hay una base de documentos.",
        "Meta-prompting, porque hay varias versiones del prompt."
      ],
      [1],
      "Operar el modelo (acceso, datos, coste, ciclo de vida) es LLMOps. El ajuste fino cambia el modelo con datos. RAG recupera fragmentos. El meta-prompting refina prompts, no la operación."),

    /* ---------- 5.1.1 IA en la sombra ---------- */
    q("5.1.1", "K1", 1, 1,
      "¿Qué afirmación sobre la IA en la sombra es correcta?",
      [
        "Hace cumplir las políticas de datos de la organización y la normativa de IA.",
        "Quita la necesidad de licencias claras en las herramientas.",
        "Reduce las disputas por propiedad intelectual.",
        "Puede abrir accesos no autorizados a información sensible, porque la herramienta no aprobada a menudo carece de controles sólidos."
      ],
      [3],
      "La IA en la sombra aumenta el riesgo: licencias poco claras, disputas de propiedad intelectual y brechas o accesos no autorizados. No impone las políticas de la organización."),

    q("5.1.1", "K1", 1, 1,
      "Varias personas del equipo pegan requisitos en un chat público que la organización no ha aprobado. ¿Qué riesgo describe el programa?",
      [
        "Ninguno: al estar fuera del proceso, los datos quedan más protegidos.",
        "El de la IA en la sombra: herramienta no aprobada, con más riesgo de filtración, de licencia opaca y de disputas de propiedad intelectual.",
        "Solo un riesgo de rendimiento del modelo, no de datos.",
        "Un incumplimiento de ISO/IEC/IEEE 29119-3, que es la norma que el programa cita para este caso."
      ],
      [1],
      "Usar una herramienta de IA no aprobada es IA en la sombra. No refuerza las políticas: las esquiva y sube el riesgo de acceso indebido y de conflictos de licencia o de propiedad intelectual."),

    /* ---------- 5.1.2 Estrategia ---------- */
    q("5.1.2", "K2", 1, 1,
      "¿Qué aspecto es clave al definir una estrategia de IA generativa para la prueba?",
      [
        "Conseguir un certificado distinto por cada modelo que el equipo toque.",
        "Elegir modelos que encajen con los entornos y las herramientas de prueba que ya existen.",
        "Acumular la mayor cantidad posible de datos de entrada, aunque la calidad sea irregular.",
        "Medir las salidas solo con las métricas clásicas del aprendizaje supervisado."
      ],
      [1],
      "La infraestructura de prueba (entornos y herramientas) y la escalabilidad mandan al elegir el modelo. La formación debe dar habilidad de uso, no solo certificados. Hacen falta datos suficientes y de calidad, no «cuantos más mejor». Las métricas tienen que ser las de la tarea de prueba, no las del aprendizaje supervisado copiadas tal cual."),

    q("5.1.2", "K2", 1, 1,
      "La estrategia del equipo dice: «meteremos en el modelo todos los registros que encontremos y evaluaremos con exactitud y exhaustividad del aprendizaje supervisado clásico». ¿Qué corrección pide el programa?",
      [
        "Ninguna: cantidad de datos y métricas clásicas son el núcleo de la estrategia.",
        "Hace falta la cantidad adecuada de datos buenos para el objetivo de prueba, y métricas de la tarea (relevancia, éxito de ejecución, eficiencia de tiempo), no el catálogo clásico importado entero.",
        "Hay que retirar los entornos de prueba actuales y medir solo con benchmarks públicos de generación de código.",
        "La estrategia solo debe hablar de certificados nominales de cada modelo."
      ],
      [1],
      "El programa pide datos de calidad en la cantidad que el objetivo necesita, y métricas ligadas a la tarea de prueba. Llenar el modelo de datos y copiar las métricas del aprendizaje supervisado no es esa estrategia."),

    /* ---------- 5.1.3 Criterios de selección ---------- */
    q("5.1.3", "K2", 1, 1,
      "¿Cuál es un criterio clave para elegir un LLM para tareas de prueba concretas?",
      [
        "Medir el modelo solo contra los benchmarks públicos de generación de código, valga o no la tarea.",
        "Valorar costes recurrentes, como el cómputo necesario para ejecutar el modelo.",
        "Exigir compatibilidad total con todos los benchmarks comunitarios publicados.",
        "Tratar como coste recurrente el de una prueba de concepto que se hace una vez."
      ],
      [1],
      "Los costes recurrentes (por ejemplo, ejecutar el modelo) son un criterio de selección. Un benchmark de generación de código solo importa si la tarea es esa. La compatibilidad total con benchmarks comunitarios no es un criterio del programa. La prueba de concepto es un coste que no se repite."),

    q("5.1.3", "K2", 1, 1,
      "Al comparar dos modelos para revisar requisitos, el equipo mira la factura mensual de inferencia y el acierto frente a los casos de referencia de su propia organización. ¿Qué está aplicando?",
      [
        "Dos criterios ajenos al programa: el coste recurrente no se considera y los benchmarks deben ser siempre los públicos de código.",
        "Criterios de selección del programa: coste recurrente de ejecución y rendimiento en la tarea medido con las referencias de la organización.",
        "Solo el criterio de compatibilidad plena con la comunidad de benchmarks.",
        "El criterio de coste no recurrente, porque la factura mensual se paga una sola vez."
      ],
      [1],
      "Ejecutar el modelo es un coste recurrente. El rendimiento en la tarea de prueba se contrasta con las referencias de la organización, no necesariamente con un benchmark público de código ni con «ser compatible con todos»."),

    /* ---------- 5.1.4 Fases de adopción ---------- */
    q("5.1.4", "K1", 1, 1,
      "¿Cuáles son las tres fases clave de adopción de la IA generativa en una organización de prueba?",
      [
        "Descubrimiento; inicio y definición del uso; utilización e iteración.",
        "Concienciación; priorización del uso; seguimiento del rendimiento.",
        "Planificación; experimentación; evaluación y refinamiento.",
        "Formación; prueba; implementación y escalado."
      ],
      [0],
      "El programa nombra esas tres fases: descubrimiento, inicio y definición del uso, y utilización e iteración. Las otras listas mezclan actividades u objetivos, pero no son las fases."),

    q("5.1.4", "K1", 1, 1,
      "Un plan dice: formar al equipo, darle acceso a modelos y probar casos de uso pequeños; después elegir qué usos merecen la pena; después seguir el avance y sostener el cambio. ¿A qué fases corresponde, en ese orden?",
      [
        "Utilización, inicio y descubrimiento.",
        "Descubrimiento; inicio y definición del uso; utilización e iteración.",
        "Solo a la fase de inicio, porque las otras dos no incluyen formación ni seguimiento.",
        "A ninguna: el programa no ordena la adopción en fases."
      ],
      [1],
      "Formar, dar acceso y experimentar para ganar confianza es descubrimiento. Elegir y priorizar usos es inicio y definición del uso. Seguir el progreso y sostener el beneficio es utilización e iteración."),

    /* ---------- 5.2.1 Competencias ---------- */
    q("5.2.1", "K2", 1, 1,
      "¿Qué ejemplo encaja con los conocimientos que el probador necesita para trabajar con LLM?",
      [
        "Dominar técnicas que impiden por completo las alucinaciones y los errores de razonamiento.",
        "Elegir un enfoque de automatización, como el dirigido por palabras clave, sin relación con el modelo.",
        "Elegir el modelo más adecuado según, entre otros criterios, si se puede adaptar o ajustar a la tarea de prueba.",
        "Validar los datos con los que se construyó el modelo, como haría quien lo desarrolla."
      ],
      [2],
      "Evaluar las capacidades del modelo y elegir uno que se pueda adaptar a la tarea es una competencia del probador. No puede impedir del todo las alucinaciones: tiene que reconocerlas y mitigarlas. Desarrollar el modelo es trabajo de otros perfiles. La automatización genérica, por sí sola, no cubre la integración de la IA generativa."),

    q("5.2.1", "K2", 1, 1,
      "¿Qué espera el programa del probador que usa IA generativa, respecto de las alucinaciones?",
      [
        "Que las elimine con una técnica de prompting definitiva.",
        "Que sepa identificarlas y mitigar su riesgo (y el de los sesgos y los errores de razonamiento), no que impida que existan.",
        "Que deje ese tema en manos de quien entrena el modelo y no las revise.",
        "Que las trate como un fallo de la herramienta de gestión de pruebas."
      ],
      [1],
      "Con la tecnología actual, las alucinaciones no se pueden evitar del todo. La competencia está en detectarlas y mitigar el riesgo al probar."),

    /* ---------- 5.2.2 Desarrollar la competencia ---------- */
    q("5.2.2", "K1", 1, 1,
      "¿Cuál es el mejor enfoque para desarrollar la competencia del equipo de prueba en IA generativa?",
      [
        "Apoyarse sobre todo en cursos externos prácticos e integrar la IA de golpe en todas las tareas diarias.",
        "Dejar que cada persona experimente por su cuenta, sin un proceso.",
        "Un aprendizaje práctico y gradual, con ejercicios guiados, aprendizaje entre pares y comunidades para compartir conocimiento.",
        "Apoyarse sobre todo en cursos teóricos externos y fiar el saber hacer al aula."
      ],
      [2],
      "El programa recomienda práctica estructurada, aprendizaje entre pares y comunidades. Depender de cursos externos (aunque sean prácticos) quita peso a la práctica interna, y el cambio «de golpe» no se recomienda. Experimentar sin estructura no asegura el aprendizaje. La teoría sola no construye el saber hacer."),

    q("5.2.2", "K1", 1, 1,
      "El responsable propone un único taller externo el lunes y, el martes, usar IA generativa en todas las pruebas del sprint. ¿Qué falla?",
      [
        "Nada: es el enfoque recomendado de práctica guiada.",
        "Concentra el aprendizaje en un experto externo y mete la IA en todas las tareas de una vez, en lugar de un proceso gradual con práctica interna y comunidad.",
        "Falla porque cualquier curso externo está prohibido.",
        "Falla porque el programa pide que el aprendizaje sea solo teórico."
      ],
      [1],
      "Un curso externo puede ayudar, pero no debe ser el eje, y la integración «de golpe» no es el camino. Lo recomendado es práctica gradual, ejercicios guiados, pares y comunidades."),

    /* ---------- 5.2.3 Roles ---------- */
    q("5.2.3", "K1", 1, 1,
      "¿Cómo cambian los roles al adoptar IA generativa en la prueba?",
      [
        "El probador pasa de diseñar todos los casos a mano a guiar y comprobar el material de prueba que genera la IA.",
        "El director de pruebas deja la gestión y se dedica a entender el funcionamiento interno de la tecnología.",
        "El probador pasa a supervisar los procesos de prueba basados en IA.",
        "El director de pruebas deja de contar con las personas y se apoya solo en la IA para producir más."
      ],
      [0],
      "El probador evoluciona hacia un especialista que refina prompts y verifica salidas. Quien dirige sigue en la gestión: estrategia, riesgos y supervisión de los procesos, equilibrando personas e IA. Supervisar el proceso no pasa a ser tarea del probador, ni el objetivo es apoyarse únicamente en la IA."),

    q("5.2.3", "K1", 1, 1,
      "Tras adoptar IA generativa, ¿qué pareja de responsabilidades queda bien repartida?",
      [
        "El probador supervisa el proceso de punta a punta y el director escribe los prompts de cada caso.",
        "El probador guía y verifica lo que genera la IA. El director mantiene la estrategia, el riesgo y la supervisión, equilibrando capacidad humana y de la IA.",
        "El director abandona la gestión de la prueba para estudiar la arquitectura del modelo.",
        "Nadie verifica las salidas: el director confía solo en la IA y el probador deja de diseñar."
      ],
      [1],
      "Guiar y verificar es del probador. La estrategia, el riesgo y la supervisión del proceso, equilibrando personas e IA, siguen siendo de quien dirige la prueba."),

    /* ==========================================================
       Formatos combinados, como en el examen de muestra:
       afirmaciones (i-v) con opciones que las combinan, y «elija DOS» con cinco opciones.
       ========================================================== */

    ql("1.1.2", "K2", 1, 1,
      "¿Cuáles de las siguientes afirmaciones (i-v) sobre la tokenización y la ventana de contexto son CORRECTAS?",
      afirmaciones([
        "La tokenización divide el texto en unidades más pequeñas que el modelo usa para entender y generar lenguaje.",
        "La ventana de contexto es la cantidad de tokens que el modelo puede tener en cuenta a la vez.",
        "Ampliar la ventana de contexto da acceso al modelo a documentos que no se incluyeron en la entrada.",
        "Si la entrada supera la ventana, los tokens que no caben se descartan y pueden perderse detalles.",
        "La tokenización es el paso que convierte cada token en un vector de alta dimensión."
      ]),
      [
        "i, ii y iv",
        "i, iii y v",
        "ii, iii y iv",
        "i, iv y v"
      ],
      [0],
      "Tokenizar es partir el texto en piezas (i). La ventana acota cuántos tokens se consideran a la vez (ii) y, si se supera, lo que sobra se descarta (iv). Ampliarla no da acceso a documentos que no se pasaron (iii es falsa) y convertir tokens en vectores es una incrustación, no la tokenización (v es falsa)."),

    ql("1.1.3", "K2", 1, 1,
      "En el contexto de la prueba de software, ¿cuáles de las siguientes afirmaciones (i-v) sobre los LLM fundacionales, ajustados por instrucciones y de razonamiento son CORRECTAS?",
      afirmaciones([
        "Un LLM fundacional, sin entrada estructurada, es la mejor opción para producir casos de prueba listos a partir de requisitos de alto nivel.",
        "Un LLM de razonamiento es adecuado para cruzar informes de defectos, detectar tendencias y proponer prioridades de prueba.",
        "Un LLM ajustado por instrucciones sigue bien un formato impuesto, como la sintaxis Gherkin.",
        "Un LLM ajustado por instrucciones decide de forma autónoma, en tiempo real, qué pruebas ejecutar según la opinión de los usuarios.",
        "Un LLM de razonamiento está pensado para copiar al pie de la letra una plantilla rígida de la organización."
      ]),
      [
        "i, ii y iii",
        "ii y iii",
        "i y iv",
        "iii, iv y v"
      ],
      [1],
      "El modelo de razonamiento sintetiza fuentes y prioriza (ii). El ajustado por instrucciones obedece formatos y reglas como Gherkin (iii). El fundacional no destaca generando casos sin una entrada estructurada (i), el ajustado por instrucciones no toma decisiones autónomas en tiempo real (iv) y el de razonamiento no está hecho para seguir plantillas rígidas (v)."),

    ql("2.1.1", "K2", 1, 1,
      "¿Cuáles de las siguientes afirmaciones (i-v) sobre la estructura de prompt de seis partes son CORRECTAS?",
      afirmaciones([
        "El rol indica desde qué perspectiva o especialidad debe responder el modelo.",
        "Los datos de entrada son el material concreto sobre el que trabajar: registros, requisitos, informes.",
        "Las restricciones fijan la estructura y el aspecto que debe tener la respuesta.",
        "El formato de salida define cómo se presenta la respuesta: tabla, lista, Gherkin.",
        "El contexto es el apartado donde se enumeran las columnas que debe tener la tabla de resultados."
      ]),
      [
        "i, ii y iv",
        "i, iii y v",
        "ii, iii y iv",
        "iii, iv y v"
      ],
      [0],
      "Rol (i), datos de entrada (ii) y formato de salida (iv) están bien descritos. La estructura y el aspecto de la respuesta son formato de salida, no restricciones (iii es falsa), y las columnas de una tabla también pertenecen al formato de salida, no al contexto (v es falsa)."),

    ql("2.1.2", "K2", 1, 1,
      "¿Cuáles de las siguientes afirmaciones (i-iv) sobre técnicas de prompting son CORRECTAS?",
      afirmaciones([
        "El prompting con pocos ejemplos (few-shot) guía al modelo con ejemplos de entrada y salida.",
        "El encadenamiento de prompts divide la tarea en varios prompts cuyas salidas alimentan a los siguientes.",
        "El meta-prompting consiste en que el probador reescriba el prompt a mano después de cada respuesta.",
        "En el meta-prompting el propio modelo participa en generar o refinar sus prompts."
      ]),
      [
        "i, ii y iv",
        "i y iii",
        "ii y iii",
        "iii y iv"
      ],
      [0],
      "Few-shot aporta ejemplos (i), el encadenamiento parte la tarea en pasos enlazados (ii) y el meta-prompting hace que el modelo refine sus propios prompts (iv). Reescribir el prompt a mano es ajuste manual, no meta-prompting (iii es falsa)."),

    ql("2.1.3", "K2", 1, 1,
      "¿Cuáles de las siguientes afirmaciones (i-iv) sobre el prompt de sistema y el prompt de usuario son CORRECTAS?",
      afirmaciones([
        "El prompt de sistema establece el marco de comportamiento del modelo para toda la conversación.",
        "El prompt de usuario contiene las preguntas o instrucciones concretas de cada turno.",
        "El prompt de sistema se ajusta de forma automática con cada mensaje del usuario.",
        "El prompt de usuario es el que fija las reglas globales de la sesión."
      ]),
      [
        "i y ii",
        "i y iv",
        "ii y iii",
        "iii y iv"
      ],
      [0],
      "El prompt de sistema fija el marco de toda la sesión (i) y el de usuario lleva la petición de cada turno (ii). El de sistema no cambia con cada mensaje (iii) y las reglas globales no las pone el prompt de usuario (iv)."),

    ql("2.2.1", "K3", 2, 1,
      "La especificación de una API está estable y ya fue revisada. Debe aplicar este enfoque con encadenamiento de prompts: generar casos de prueba, clasificarlos por riesgo para la suite de regresión e identificar los puntos de acceso (endpoints) que quedan sin cubrir. ¿Qué secuencia de pasos (i-v) aplica mejor la técnica?",
      afirmaciones([
        "Enviar la especificación al LLM y pedirle que genere casos de prueba a partir de ella.",
        "Entregar al LLM los casos generados, con el contexto necesario, y pedirle que los clasifique por riesgo para la suite de regresión.",
        "Entregar al LLM los casos clasificados y la lista de endpoints, y pedirle que indique cuáles quedan sin cubrir.",
        "Enviar la especificación al LLM y pedirle, en un solo paso, casos ya clasificados por riesgo y la lista de endpoints no cubiertos.",
        "Enviar la especificación al LLM y pedirle que detecte contradicciones entre endpoints."
      ]),
      [
        "i, ii y iii",
        "iv y iii",
        "i, iii y v",
        "v y iv"
      ],
      [0],
      "El encadenamiento parte el objetivo en pasos cuya salida alimenta al siguiente: generar (i), clasificar lo generado (ii) y analizar cobertura sobre lo clasificado (iii). Pedir todo en un solo prompt (iv) no es encadenar, y buscar contradicciones (v) no forma parte del encargo porque la especificación ya fue revisada."),

    ql("2.3.1", "K2", 1, 1,
      "¿Cuáles de las siguientes afirmaciones (i-iv) sobre las métricas para evaluar las salidas de un LLM en tareas de prueba son CORRECTAS?",
      afirmaciones([
        "La exactitud y la completitud comparan lo generado con los requisitos.",
        "La diversidad mide si los casos cubren escenarios variados en lugar de repetir el mismo camino.",
        "La tasa de éxito en la ejecución sirve para valorar los guiones de prueba generados.",
        "La relevancia se mide contando los tokens que tiene la respuesta."
      ]),
      [
        "i, ii y iii",
        "i, ii y iv",
        "ii y iv",
        "i y iv"
      ],
      [0],
      "Exactitud y completitud frente a requisitos (i), diversidad de escenarios (ii) y tasa de éxito al ejecutar guiones (iii) son métricas del programa. La relevancia valora si la salida responde al contexto; no depende del número de tokens (iv es falsa)."),

    ql("3.1.1", "K1", 1, 1,
      "¿Cuáles de las siguientes afirmaciones (i-iv) sobre alucinaciones y errores de razonamiento son CORRECTAS?",
      afirmaciones([
        "Una alucinación es una salida incorrecta o irrelevante que el modelo presenta como válida.",
        "Un error de razonamiento ocurre cuando el modelo falla al seguir un proceso lógico de varios pasos.",
        "Las alucinaciones solo aparecen cuando el prompt está en un idioma distinto del inglés.",
        "Un sesgo heredado de los datos de entrenamiento es lo mismo que una alucinación."
      ]),
      [
        "i y ii",
        "i y iii",
        "ii y iv",
        "iii y iv"
      ],
      [0],
      "La alucinación es contenido inventado o incorrecto presentado como válido (i); el error de razonamiento es un fallo en la cadena lógica (ii). El idioma no define la alucinación (iii) y el sesgo es un riesgo distinto (iv)."),

    ql("3.2.1", "K2", 1, 1,
      "¿Cuáles de las siguientes afirmaciones (i-iv) sobre privacidad de datos al usar IA generativa en la prueba son CORRECTAS?",
      afirmaciones([
        "Las salidas de un LLM pueden exponer datos sensibles sin que nadie lo pretenda.",
        "Las herramientas de IA generativa pueden almacenar y procesar datos sensibles sin consentimiento explícito.",
        "Usar herramientas sin cumplir normas como el RGPD puede acarrear disputas legales.",
        "Si un LLM alucina al generar datos sintéticos, es probable que exponga datos reales, sin importar con qué fue entrenado."
      ]),
      [
        "i, ii y iii",
        "i, ii y iv",
        "ii, iii y iv",
        "i y iv"
      ],
      [0],
      "Exposición involuntaria (i), almacenamiento sin consentimiento (ii) e incumplimiento normativo (iii) son las preocupaciones del programa. Una alucinación es contenido inventado; no implica que se filtren datos reales con independencia del entrenamiento (iv es falsa)."),

    ql("3.3.1", "K2", 1, 1,
      "¿Cuáles de las siguientes afirmaciones (i-iv) sobre el consumo de energía y las emisiones de CO₂ de los LLM son CORRECTAS?",
      afirmaciones([
        "Generar imágenes consume bastante más energía que generar texto por su mayor complejidad computacional.",
        "Una búsqueda con IA generativa consume más energía que una búsqueda web tradicional.",
        "Una tarea de texto consume tan poco que millones de usuarios no suman un consumo relevante.",
        "El consumo de energía de los LLM se traduce en emisiones de CO₂."
      ]),
      [
        "i, ii y iv",
        "i y iii",
        "ii y iii",
        "iii y iv"
      ],
      [0],
      "La imagen cuesta mucho más que el texto (i), la búsqueda con IA generativa gasta más que la tradicional (ii) y ese consumo se traduce en CO₂ (iv). A escala de millones de usuarios, el texto sí suma un consumo relevante (iii es falsa)."),

    ql("4.1.2", "K2", 1, 1,
      "¿Cuáles de las siguientes afirmaciones (i-iv) sobre la generación aumentada por recuperación (RAG) son CORRECTAS?",
      afirmaciones([
        "RAG recupera información pertinente de una fuente externa, por ejemplo una base vectorial, antes de generar.",
        "La información recuperada se combina con la consulta del usuario para formar el prompt que recibe el LLM.",
        "RAG sustituye al entrenamiento del modelo y por eso elimina por completo las alucinaciones.",
        "RAG ayuda a que las respuestas se alineen con documentación actualizada que el modelo no vio al entrenarse."
      ]),
      [
        "i, ii y iv",
        "i, ii y iii",
        "ii y iii",
        "iii y iv"
      ],
      [0],
      "Recuperar (i), combinar con la consulta (ii) y alinear con documentación vigente (iv) describen RAG. No sustituye al entrenamiento ni garantiza cero alucinaciones; las reduce al anclar la respuesta en fuentes (iii es falsa)."),

    ql("4.2.1", "K2", 1, 1,
      "¿Cuáles de las siguientes afirmaciones (i-iv) sobre el ajuste fino de un LLM para tareas de prueba son CORRECTAS?",
      afirmaciones([
        "El ajuste fino entrena un modelo preentrenado con datos específicos de la tarea.",
        "El ajuste fino modifica los parámetros del modelo para adaptarlo a un dominio.",
        "El ajuste fino sustituye el conocimiento general del modelo y garantiza que no habrá sobreajuste.",
        "El ajuste fino requiere datos de alta calidad para evitar resultados sesgados o inexactos."
      ]),
      [
        "i, ii y iv",
        "i, ii y iii",
        "ii y iii",
        "i y iii"
      ],
      [0],
      "Entrenar con datos de la tarea (i), modificar parámetros (ii) y exigir datos de calidad (iv) es ajuste fino. No sustituye el conocimiento general ni garantiza ausencia de sobreajuste; de hecho, con pocos datos el sobreajuste es un riesgo (iii es falsa)."),

    ql("5.1.1", "K1", 1, 1,
      "¿Cuáles de las siguientes afirmaciones (i-iv) sobre la IA en la sombra (shadow AI) son CORRECTAS?",
      afirmaciones([
        "La IA en la sombra es el uso de herramientas de IA que la organización no ha aprobado.",
        "La IA en la sombra puede dar lugar a accesos no autorizados a información sensible.",
        "La IA en la sombra hace cumplir las políticas de datos de la organización.",
        "La IA en la sombra reduce el riesgo de disputas sobre propiedad intelectual."
      ]),
      [
        "i y ii",
        "i y iii",
        "ii y iv",
        "iii y iv"
      ],
      [0],
      "Herramientas no aprobadas (i) con riesgo de acceso indebido a información sensible (ii). Lejos de hacer cumplir políticas o reducir disputas, las elude y las aumenta (iii y iv son falsas)."),

    ql("5.2.3", "K1", 1, 1,
      "¿Cuáles de las siguientes afirmaciones (i-iv) sobre los roles tras adoptar IA generativa en la prueba son CORRECTAS?",
      afirmaciones([
        "Los probadores pasan de diseñar casos a mano a guiar y verificar el testware generado por IA.",
        "Los directores de prueba pasan a centrarse en el funcionamiento interno de los LLM.",
        "Los directores de prueba mantienen la gestión del proyecto e incorporan la estrategia, los riesgos y las competencias en IA generativa.",
        "Los directores de prueba sustituyen a las personas por IA generativa para ganar productividad."
      ]),
      [
        "i y iii",
        "i y ii",
        "ii y iv",
        "iii y iv"
      ],
      [0],
      "El probador guía y verifica (i); quien dirige sigue gestionando e integra estrategia, riesgos y competencias (iii). No se convierte en experto en arquitectura de modelos (ii) ni reemplaza a las personas (iv)."),

    /* ---------- «Elija DOS» con cinco opciones ---------- */
    q("3.2.3", "K2", 1, 2,
      "¿Cuáles DOS de las siguientes medidas mitigan el riesgo de privacidad al probar con IA generativa?",
      [
        "Sustituir los datos sensibles por una versión anonimizada o sintética antes de enviarlos al modelo.",
        "Cifrar los datos de prueba sensibles en tránsito y en reposo.",
        "Dar al modelo acceso sin restricciones a los datos sensibles para que aprenda mejor.",
        "Desactivar el cifrado para agilizar el almacenamiento y el envío de datos.",
        "Usar varios LLM y comparar sus resultados para mejorar la exactitud."
      ],
      [0, 1],
      "Anonimizar y cifrar son mitigaciones de privacidad. El acceso sin restricciones y quitar el cifrado agravan el riesgo. Comparar varios modelos apunta a la exactitud, no a la privacidad."),

    q("4.1.1", "K2", 1, 2,
      "¿Cuáles DOS afirmaciones sobre los componentes de una aplicación de prueba impulsada por LLM son CORRECTAS?",
      [
        "El front-end recoge la entrada de la persona usuaria y muestra la salida.",
        "El back-end combina la entrada con datos recuperados, parecidos en significado, para armar el prompt.",
        "El componente de autenticación es el que arma el prompt que recibe el modelo.",
        "El posprocesamiento es el que recupera documentos de la base vectorial.",
        "El LLM es el que almacena la base de datos vectorial."
      ],
      [0, 1],
      "El front-end es la interfaz con la persona; el back-end recupera, combina y prepara el prompt. Autenticar no arma prompts, el posprocesamiento trabaja sobre la salida del modelo y la base vectorial es un almacén aparte, no el LLM."),

    q("5.1.2", "K2", 1, 2,
      "¿Cuáles DOS aspectos son clave al definir una estrategia de IA generativa para la prueba?",
      [
        "Elegir LLM que puedan integrarse con los entornos y las herramientas de prueba existentes.",
        "Definir políticas de uso y de gobernanza de datos para el trabajo con IA generativa.",
        "Garantizar que cada miembro del equipo obtenga certificaciones específicas de cada LLM que use.",
        "Acumular la mayor cantidad posible de datos de entrada para aumentar las probabilidades de buenas salidas.",
        "Medir la eficacia de las salidas con las métricas estándar del aprendizaje supervisado."
      ],
      [0, 1],
        "Integración con lo existente y gobernanza del uso y de los datos son elementos de la estrategia. Las certificaciones por modelo, acumular datos sin criterio y las métricas del aprendizaje supervisado no son los criterios que propone el programa."),

    /* ---------- variantes para objetivos con solo dos formulaciones ---------- */
    q("1.1.1", "K1", 1, 1,
      "Un probador pide a una herramienta que invente mensajes de error que el sistema nunca ha mostrado, parecidos a los reales. ¿En qué punto del espectro encaja?",
      [
        "IA simbólica, porque aplica reglas de negocio ya escritas.",
        "Aprendizaje automático clásico, porque alguien eligió antes las características de los mensajes.",
        "Aprendizaje profundo, porque solo clasifica mensajes que ya existían.",
        "IA generativa, porque crea datos nuevos imitando patrones del entrenamiento."
      ],
      [3],
      "Inventar mensajes que no estaban en el sistema es crear datos nuevos. Las reglas escritas son IA simbólica, las características elegidas a mano son aprendizaje clásico y clasificar lo ya existente, sin crear, no es generativa."),

    q("1.1.4", "K2", 1, 1,
      "El equipo adjunta la captura de una pantalla y pide criterios de aceptación. ¿Qué tipo de modelo hace falta?",
      [
        "Uno solo de texto: la captura se convierte sola en palabras.",
        "Uno multimodal, de visión y lenguaje, porque la entrada mezcla imagen y texto.",
        "Uno simbólico: la interfaz se resume en reglas y no hace falta verla.",
        "Uno de aprendizaje automático clásico: la captura ya trae las características elegidas."
      ],
      [1],
      "La captura es una imagen. Hace falta un modelo que acepte imagen y texto. Un modelo solo de texto no ve la pantalla, y ni las reglas ni las características elegidas a mano sustituyen esa entrada."),

    q("1.2.1", "K2", 1, 2,
      "¿Cuáles DOS encargos aprovechan una capacidad clave del modelo en la prueba?",
      [
        "Resumir un informe de defectos largo y señalar contradicciones.",
        "Cerrar el defecto sin que nadie lo lea.",
        "Proponer oráculos a partir de los criterios de aceptación.",
        "Dar por cierta la salida porque el modelo se entrenó con internet.",
        "Ejecutar en producción el parche que él mismo escribió, sin revisión."
      ],
      [0, 2],
      "Resumir y contrastar un informe, y proponer oráculos desde los criterios, son trabajo de lenguaje que el modelo puede apoyar. Cerrar sin lectura, fiarse del entrenamiento o desplegar sin revisión dejan fuera a quien prueba."),

    q("1.2.2", "K2", 1, 1,
      "¿Cuál es una aplicación de prueba impulsada por un modelo, y no un simple chatbot?",
      [
        "Una charla abierta en la que el probador pregunta lo que se le ocurre.",
        "Un flujo que toma una historia, recupera el criterio de aceptación y devuelve casos en una plantilla fija.",
        "El mismo chat de uso general, con otro nombre en el menú.",
        "Una hoja de cálculo sin modelo, con fórmulas de cobertura."
      ],
      [1],
      "La aplicación encaja el modelo en un recorrido definido y un formato de salida. La charla libre es un chatbot, cambiar el nombre no crea un flujo y una hoja sin modelo no usa IA generativa."),

    q("2.1.2", "K2", 1, 1,
      "Hay un único caso Gherkin ya aceptado y se quiere que el modelo imite ese formato en una historia nueva. ¿Qué técnica es?",
      [
        "Sin ejemplos: no hace falta mostrar el caso.",
        "Con un ejemplo: se muestra ese único caso aceptado.",
        "Con pocos ejemplos: un caso solo no cuenta y hace falta una colección.",
        "Meta-prompting: el modelo reescribe el prompt y el caso no se usa."
      ],
      [1],
      "Un solo caso de muestra es la técnica de un ejemplo. Sin ejemplos no se muestra nada. Pocos ejemplos pide varios. El meta-prompting refina el prompt, no imita ese caso."),

    q("2.2.2", "K3", 2, 1,
      "Una historia tiene tres criterios y el caso de pago solo tiene sentido si el acceso previo ya pasó. ¿Qué encargo aplica el diseño de pruebas con IA generativa?",
      [
        "Un único prompt que pida «casos buenos», sin nombrar criterios ni dependencias.",
        "Encadenar: primero un caso por criterio y después ordenarlos según dependencias y prioridad.",
        "Pedir solo datos límite, sin casos ni prioridad.",
        "Pedir al modelo que ejecute la historia en producción."
      ],
      [1],
      "El diseño pasa de los criterios a casos y respeta las dependencias. Encadenar separa esos pasos. Un pedido vago, solo límites o la ejecución en producción no diseñan la prueba."),

    q("2.2.3", "K3", 2, 1,
      "Cambió el cálculo del descuento. ¿Qué uso de IA generativa encaja con la regresión automatizada?",
      [
        "Pedir qué guiones de regresión tocan el descuento y proponer cómo actualizarlos.",
        "Borrar la batería de regresión y generar una aplicación nueva.",
        "Redactar solo el correo de la release, sin mirar los guiones.",
        "Dejar que el modelo decida no regresar nada porque el cambio parece pequeño."
      ],
      [0],
      "En regresión el modelo ayuda a localizar y actualizar los guiones afectados. No sustituye la suite, no se queda en el correo y no descarta la regresión por una impresión."),

    q("2.2.4", "K3", 2, 1,
      "Quien dirige la prueba quiere saber si el ciclo se desvía del plan. ¿Qué encargo es monitorización y control con IA generativa?",
      [
        "Pedir un resumen del avance, de los desvíos y de los riesgos abiertos a partir de los resultados del ciclo.",
        "Pedir casos nuevos de una historia que aún no se ha analizado.",
        "Pedir que reescriba el código de producción.",
        "Pedir solo la definición de «métrica», sin usar los datos del ciclo."
      ],
      [0],
      "Monitorizar es leer el ciclo en curso. Los otros encargos diseñan casos nuevos, tocan producción o no usan los resultados, así que no controlan el ciclo."),

    q("2.2.5", "K3", 2, 1,
      "Hay que pasar una tabla de decisiones a casos, y ya existen cuatro filas bien hechas. ¿Qué técnica conviene?",
      [
        "Sin ejemplos, para que el modelo invente el formato.",
        "Con pocos ejemplos, mostrando esas filas para fijar formato y contenido.",
        "Meta-prompting, porque la tabla ya es un prompt de sistema.",
        "Encadenar en un paso por celda, aunque la transformación es directa."
      ],
      [1],
      "Las filas ya muestran el formato deseado: lo propio es enseñarlas. Sin ejemplos se desaprovechan. El meta-prompting y un encadenamiento por celda no aportan a una transformación directa."),

    q("2.3.2", "K2", 1, 1,
      "La primera salida omite los valores límite. ¿Qué es evaluar y afinar el prompt?",
      [
        "Aceptar la salida y no volver a consultar el modelo.",
        "Revisar qué faltó, ajustar la instrucción o los ejemplos y comparar la nueva salida.",
        "Subir la temperatura al máximo para que los límites aparezcan por azar.",
        "Cambiar de tarea y no volver a mirar esta."
      ],
      [1],
      "Afinar es un ciclo de revisión y ajuste. Aceptar el primer borrador, confiar en el azar o abandonar la tarea no compara ni corrige el prompt."),

    q("3.1.2", "K3", 2, 1,
      "La especificación dice que la edad mínima es 18. El modelo escribe la regla bien y luego añade: «conviene priorizar a candidatos de ciertos países porque suelen ser más cuidadosos». ¿Qué hay en esa segunda frase?",
      [
        "Una alucinación: inventa un campo que no existe.",
        "Un sesgo: generaliza un grupo sin apoyo en la especificación.",
        "Un error de razonamiento: se equivoca al sumar 18.",
        "Una mitigación correcta del comportamiento no determinista."
      ],
      [1],
      "La regla de edad coincide con la especificación. La frase siguiente atribuye una cualidad a un grupo sin que la base de prueba lo diga: eso es un sesgo, no un fallo aritmético ni una técnica de control."),

    q("3.1.3", "K2", 1, 1,
      "Las salidas inventan campos que no están en la especificación. ¿Qué mitigación encaja mejor?",
      [
        "Exigir que cada afirmación cite el fragmento de la especificación y revisar las que no citan.",
        "Subir la temperatura para que invente menos.",
        "Quitar la especificación del prompt para que el modelo use su criterio.",
        "Aceptar la salida si suena profesional."
      ],
      [0],
      "Citar la fuente y revisar lo que no cita ata la salida a la especificación. Más temperatura aumenta la variación, quitar la especificación deja al modelo sin fuente y el tono profesional no comprueba los campos."),

    q("3.1.4", "K1", 1, 1,
      "¿Qué ayuda a mitigar el comportamiento no determinista?",
      [
        "Fijar una temperatura baja y, si la herramienta lo permite, una semilla, y comprobar la salida con reglas.",
        "Subir la temperatura para que todas las corridas coincidan.",
        "Borrar el prompt de sistema en cada llamada.",
        "Pedir la respuesta en prosa libre y no compararla con nada."
      ],
      [0],
      "Menos temperatura y una semilla reducen la variación, y las reglas comprueban el resultado. Las otras opciones aumentan el azar o quitan controles."),

    q("3.4.1", "K1", 1, 2,
      "Además de las normas ISO de IA, ¿cuáles DOS referencias usa el programa para el marco legal y la gestión de riesgos?",
      [
        "El Reglamento europeo de IA, que clasifica usos según el riesgo.",
        "El marco de gestión de riesgos de IA del NIST.",
        "ISO/IEC/IEEE 29119-2, procesos de prueba.",
        "ISO/IEC 25010, calidad de producto.",
        "El glosario de fundamentos como única fuente de gobierno de la IA."
      ],
      [0, 1],
      "El programa suma el Reglamento europeo de IA y el marco NIST a las normas ISO de IA. Las normas de procesos y de calidad de producto, y el glosario de fundamentos, no ocupan ese lugar."),

    q("4.1.3", "K2", 1, 1,
      "Quieren un agente que prepare datos de prueba y se detenga para que una persona acepte los casos de pago. ¿Qué lectura es la correcta?",
      [
        "Un agente con un objetivo puede preparar los datos, y el tramo de pago sigue con supervisión humana.",
        "Si hay un objetivo, la aceptación humana sobra en todos los casos.",
        "Los agentes solo sirven para charlar y no pueden llamar herramientas de datos.",
        "Un agente autónomo debe desplegar el cambio en producción sin registro."
      ],
      [0],
      "El agente puede usar herramientas para un objetivo, y donde el riesgo es alto se mantiene a la persona. El objetivo no elimina la verificación, y desplegar sin registro se sale de ese uso."),

    q("4.2.2", "K2", 1, 1,
      "¿Qué actividad es propia de las operaciones de modelos al usarlos en la prueba?",
      [
        "Versionar prompts y modelos, vigilar la calidad de las salidas y controlar los cambios.",
        "Elegir a mano las características de un modelo clásico y no volver a medirlo.",
        "Sustituir el informe de prueba por el log de entrenamiento.",
        "Publicar el modelo sin control de acceso para que cualquiera lo ajuste."
      ],
      [0],
      "Operar el modelo es controlar versiones, calidad y cambios. Las otras opciones describen un modelo clásico, confunden informes o dejan el modelo sin gobierno."),

    q("5.1.3", "K2", 1, 1,
      "La tarea es clasificar defectos cortos, los datos no pueden salir de la red interna y el coste por llamada importa. ¿Qué encaja mejor?",
      [
        "El modelo más grande en una nube pública, sin mirar el coste.",
        "Un modelo pequeño que pueda ejecutarse en la red interna, si la calidad de esa tarea le basta.",
        "Cualquier modelo: el tamaño no cambia ni el coste ni la privacidad.",
        "Ningún modelo: una tarea corta solo puede hacerla un sistema de reglas."
      ],
      [1],
      "Con datos que no pueden salir y una tarea acotada, un modelo pequeño interno puede ser la mejor relación entre calidad, coste y privacidad. El tamaño sí importa, y la tarea corta no obliga a volver a las reglas."),

    q("5.1.4", "K1", 1, 1,
      "¿Cuál recuerda bien las fases de adopción del programa?",
      [
        "Uso e iteración, después descubrimiento y al final definir el uso.",
        "Descubrimiento, inicio y definición del uso, y uso e iteración. Dos casos de uso pueden ir en fases distintas a la vez.",
        "Solo dos fases: comprar un modelo y disolver el equipo de prueba.",
        "Una fase única: desplegar la IA en todos los procesos el primer día."
      ],
      [1],
      "El orden es descubrimiento, definición del uso y uso con iteración. Las fases pueden solaparse según el caso de uso. Comprar y desplegar todo de entrada no es ese recorrido."),

    q("5.2.1", "K2", 1, 1,
      "¿Qué habilidad es esencial para probar con IA generativa?",
      [
        "Saber escribir prompts, revisar la salida y detectar alucinaciones y sesgos.",
        "Memorizar el código fuente del modelo.",
        "Dejar de aplicar criterios de prueba, porque el modelo ya los trae.",
        "Sustituir la comunicación del equipo por más llamadas al modelo."
      ],
      [0],
      "La habilidad está en guiar el prompt y verificar la salida. El código interno del modelo, abandonar el criterio de prueba o aislar al equipo no son ese conocimiento."),

    q("5.2.2", "K2", 1, 1,
      "¿Cómo se desarrollan las capacidades de IA generativa en un equipo de prueba?",
      [
        "Con práctica guiada, de prompts simples a técnicas más finas, y compartiendo lo que funciona.",
        "Con una sola charla y la prohibición de volver a usar el modelo.",
        "Dejando que cada persona use herramientas no autorizadas para aprender más rápido.",
        "Sustituyendo al equipo por el modelo en cuanto hay un piloto."
      ],
      [0],
      "La capacidad se construye practicando y compartiendo, de lo simple a lo más fino. Una charla aislada, la IA en la sombra o reemplazar al equipo no forman esa competencia."),

    q("1.1.1", "K1", 1, 1,
      "El ayuntamiento quiere cartas de multa que nunca se han enviado, con el tono de las que ya archivó. ¿Qué técnica lo describe?",
      [
        "IA simbólica: un reglamento fija cada frase y no se crea nada nuevo.",
        "Aprendizaje automático clásico: una persona marcó antes los rasgos de cada carta.",
        "Aprendizaje profundo: solo clasifica las multas que ya existen.",
        "IA generativa: redacta cartas nuevas imitando el archivo."
      ],
      [3],
      "Redactar cartas que no existían, parecidas a las del archivo, es crear datos nuevos. Las otras tres no generan ese contenido."),

    q("1.1.2", "K2", 1, 1,
      "Una ordenanza de 200 páginas no entra en la ventana de contexto. ¿Qué consecuencia es la correcta?",
      [
        "El modelo la resume sola, aunque las páginas no se hayan incluido.",
        "Las páginas que no caben quedan fuera y pueden perderse artículos necesarios.",
        "La ventana ordena los artículos por fecha y por eso rechaza los antiguos.",
        "La ventana obliga a leer la ordenanza carácter a carácter."
      ],
      [1],
      "La ventana solo admite un cupo de tokens. Lo que no entra no se considera. No resume archivos ausentes ni ordena por fecha."),

    q("1.1.2", "K2", 1, 1,
      "Al preparar el catálogo de una biblioteca para un modelo, ¿qué describe la tokenización?",
      [
        "Convertir cada ficha en un vector numérico para buscar por significado.",
        "Partir el texto de las fichas en piezas con las que el modelo lee y escribe.",
        "Redactar la recomendación de lectura que verá la persona.",
        "Decidir el siguiente libro según la ficha anterior."
      ],
      [1],
      "Tokenizar es trocear el texto. El vector es una incrustación, redactar es generar y elegir el siguiente libro es la predicción, no el troceo."),

    q("1.1.3", "K2", 1, 1,
      "Hay que calcular un impuesto en cuatro pasos encadenados, con reglas que se citan unas a otras. ¿Qué modelo encaja mejor?",
      [
        "Uno fundacional, sin ajuste, porque basta con completar frases.",
        "Uno de razonamiento, porque el cálculo pide varios pasos enlazados.",
        "Uno ajustado por instrucciones solo para copiar una tabla fija, sin calcular.",
        "Cualquiera de los tres: el tipo no cambia cómo se resuelve un cálculo largo."
      ],
      [1],
      "Un cálculo de varios pasos se beneficia de un modelo de razonamiento. El fundacional no está preparado para seguir el encargo, y un ajuste de formato no resuelve la cadena."),

    q("1.1.4", "K2", 1, 1,
      "Llega una nota de voz del fallo y, además, la captura de la pantalla. ¿Qué hace falta para usar las dos a la vez?",
      [
        "Un modelo solo de texto: la nota de voz ya es lenguaje.",
        "Un modelo multimodal, capaz de tomar audio o imagen junto con el texto.",
        "Un modelo simbólico: la captura se sustituye por reglas de la interfaz.",
        "Ampliar la ventana de contexto de un modelo de texto hasta que «vea» la imagen."
      ],
      [1],
      "Voz e imagen no son texto. Hace falta un modelo multimodal. Ni la ventana ni las reglas simbólicas convierten esa entrada."),

    q("1.2.1", "K2", 1, 2,
      "En la prueba de una biblioteca digital, ¿qué DOS encargos son realistas para un modelo de lenguaje?",
      [
        "Marcar normas de préstamo que se contradicen entre sí.",
        "Generar plazos límite y combinaciones de socios y tipos de obra.",
        "Cerrar el defecto de préstamo sin que nadie lea el caso.",
        "Garantizar que cada plazo inventado es legalmente válido.",
        "Desplegar solo el parche del catálogo en producción."
      ],
      [0, 1],
      "Señalar contradicciones y proponer datos de prueba son capacidades de apoyo. Cerrar sin lectura, dar por válida la salida o desplegar sin revisión no lo son."),

    q("1.2.2", "K2", 1, 1,
      "¿Cuál es una aplicación de prueba y no un chatbot?",
      [
        "Un chat donde cada persona pregunta lo que quiera sobre citas médicas.",
        "Un flujo que toma el protocolo de la cita, recupera la regla de aviso y devuelve casos en una plantilla.",
        "El chat general del hospital con otro icono.",
        "La agenda en papel, sin modelo."
      ],
      [1],
      "El flujo con entrada definida, regla recuperada y plantilla es una aplicación de prueba. La charla libre, el cambio de icono y la agenda sin modelo no lo son."),

    q("2.1.1", "K2", 1, 1,
      "En un prompt sobre el inventario de un almacén, una línea dice: «Usa el archivo de movimientos de ayer». ¿Qué parte es?",
      [
        "Datos de entrada: es el material que hay que analizar.",
        "Contexto: describe el humor del equipo de almacén.",
        "Restricción: prohíbe mirar otros días.",
        "Formato de salida: obliga a una tabla de tres columnas."
      ],
      [0],
      "El archivo es el material del análisis, o sea datos de entrada. No es el fondo, ni un límite, ni la forma de la respuesta."),

    q("2.1.1", "K2", 1, 1,
      "Un prompt de una tarjeta de transporte dice: «No propongas tarifas que la ordenanza no liste». ¿Qué parte es?",
      [
        "Datos de entrada.",
        "Formato de salida.",
        "Una restricción: deja fuera lo que la ordenanza no contempla.",
        "El rol del probador."
      ],
      [2],
      "Limitar lo que se puede proponer es una restricción. No aporta el material, no fija la forma de la respuesta y no nombra un rol."),

    q("2.1.2", "K2", 1, 1,
      "Quieren partir la generación de partidos de un torneo en tres prompts (sedes, luego horarios, luego conflictos) y que nadie reescriba el prompt por ellos. ¿Qué técnica es?",
      [
        "Pocos ejemplos, porque cada prompt es un ejemplo.",
        "Encadenamiento: la salida de un paso alimenta al siguiente.",
        "Meta-prompting: el modelo reescribe el encargo en cada vuelta.",
        "Sin ejemplos y en un solo prompt, que es lo mismo que encadenar."
      ],
      [1],
      "Partir la tarea en prompts encadenados es encadenamiento. Pocos ejemplos muestran casos, el meta-prompting reescribe el prompt y un solo prompt no es una cadena."),

    q("2.1.3", "K2", 1, 1,
      "En un asistente de notas escolares, «nunca inventes una calificación y responde en español» está fijo, y cada turno trae el examen de un curso. ¿Qué es cada cosa?",
      [
        "Lo fijo es el prompt de usuario y el examen de hoy es el de sistema.",
        "Lo fijo es el prompt de sistema y el examen de este turno es el de usuario.",
        "Las dos frases son prompts de usuario, porque las lee una persona.",
        "El examen es formato de salida y la regla de idioma es un dato de entrada."
      ],
      [1],
      "La regla que permanece es de sistema. El encargo de este turno es de usuario. No se invierten ni se confunden con el formato."),

    q("2.2.1", "K3", 2, 1,
      "La póliza de un seguro ya está revisada y estable. Hay que sacar condiciones, ordenarlas por el riesgo que indicó el negocio y ver huecos. ¿Qué enfoque aplica?",
      [
        "Un prompt único: «busca defectos de redacción en la póliza».",
        "Encadenar: condiciones desde la póliza, luego prioridad con el riesgo, luego huecos de cobertura.",
        "Pedir solo un resumen literario de la póliza.",
        "Generar el sistema de cobro a partir de la póliza."
      ],
      [1],
      "El análisis pedido es condiciones, prioridad y cobertura. El encadenamiento los separa. Buscar defectos de estilo, resumir o generar el sistema no es ese encargo."),

    q("2.2.2", "K3", 2, 1,
      "Hay dos escenarios Gherkin ya aceptados de reserva de sala y una historia nueva de reserva de taquilla. ¿Qué encargo aplica pocos ejemplos?",
      [
        "Pedir escenarios sin mostrar los dos ya aceptados.",
        "Mostrar los dos escenarios aceptados y pedir otros, en el mismo estilo, para la taquilla.",
        "Pedir al modelo que reescriba el prompt y no usar los escenarios.",
        "Partir la historia en diez prompts, uno por palabra del criterio."
      ],
      [1],
      "Pocos ejemplos enseña casos ya buenos para fijar estilo y contenido. Sin mostrarlos, reescribir el prompt o trocear por palabras no es esa técnica."),

    q("2.2.3", "K3", 2, 1,
      "Cambió la franquicia de un seguro. El borrador de prompt solo dice «comenta la regresión». ¿Qué ajuste lo acerca a una regresión automatizada?",
      [
        "Pedir qué guiones tocan la franquicia, contrastarlos con el resultado obtenido y proponer el parche del guion.",
        "Pedir un correo de felicitación por la release.",
        "Pedir que borre la suite y escriba otra aplicación.",
        "Pedir que no regrese nada si el diff tiene pocas líneas."
      ],
      [0],
      "Hay que nombrar los guiones afectados, el contraste y la actualización. El correo, rehacer la aplicación o saltarse la regresión por el tamaño del diff no analizan la suite."),

    q("2.2.4", "K3", 2, 1,
      "El ciclo de una app de citas lleva tres días. Gerencia quiere saber si van tarde. ¿Qué prompt es de monitorización y control?",
      [
        "Con los resultados del ciclo, resume avance, desvío frente al plan y riesgos que siguen abiertos.",
        "Inventa casos de una historia que aún no entra en este ciclo.",
        "Reescribe el código de la agenda.",
        "Define la palabra métrica, sin usar los números del ciclo."
      ],
      [0],
      "Monitorizar usa los datos del ciclo para avance, desvío y riesgo. Los otros encargos no leen ese ciclo."),

    q("2.2.5", "K3", 2, 1,
      "Una función recomienda rutas y nadie puede decir el resultado correcto de antemano. Hay cinco rutas que un experto ya dio por buenas. ¿Qué técnica encaja?",
      [
        "Sin ejemplos: que el modelo invente el resultado esperado.",
        "Pocos ejemplos, con esas rutas buenas, para imitar el criterio del experto.",
        "Encadenar veinte pasos, uno por calle, aunque el experto ya dejó el criterio cerrado.",
        "Meta-prompting para que el modelo decida que el oráculo no hace falta."
      ],
      [1],
      "Cuando el oráculo es difícil y ya hay ejemplos aceptados, pocos ejemplos trasladan ese criterio. Inventar el resultado, trocear de más o borrar el oráculo no lo resuelven."),

    q("2.3.1", "K2", 1, 1,
      "Un modelo genera guiones para el lector de códigos de un almacén. Compilan, pero al lanzarlos fallan, y los casos repiten el mismo pasillo. ¿Qué dos métricas lo ven?",
      [
        "Tasa de éxito de ejecución y diversidad de escenarios.",
        "Número de tokens del prompt y la hora del servidor.",
        "Solo la longitud del guion, en líneas.",
        "El coste de la factura, que mide la cobertura de pasillos."
      ],
      [0],
      "Que el guion no llega a ejecutarse es tasa de éxito. Que siempre sea el mismo pasillo es falta de diversidad. Tokens, hora, líneas o la factura no miden eso."),

    q("2.3.2", "K2", 1, 1,
      "El modelo fecha siempre los casos en MM/DD y el equipo necesita DD/MM, en todas las corridas. ¿Por dónde se entiende la causa?",
      [
        "Se acepta el formato: si es consistente, es correcto.",
        "Se revisa el prompt y los ejemplos, se fija el formato DD/MM y se compara una corrida nueva.",
        "Se sube la temperatura para que alguna corrida acierte el día.",
        "Se cambia de aplicación y no se vuelve a mirar el formato."
      ],
      [1],
      "La consistencia no prueba que el formato sea el pedido. Hay que localizar la instrucción o el ejemplo que lo fija, corregirlo y comparar. El azar no lo explica."),

    q("3.1.1", "K1", 1, 1,
      "El modelo atribuye a un libro un ISBN que no está en el catálogo ni en la pregunta. ¿Cómo se llama eso?",
      [
        "Error de razonamiento: falló una suma.",
        "Sesgo: prefiere un género literario.",
        "Alucinación: afirma un dato que no está en la entrada ni en los hechos.",
        "Ventana de contexto demasiado corta."
      ],
      [2],
      "Inventar un identificador que nadie dio es una alucinación. No es un fallo de cálculo, ni un sesgo de género, ni un límite de ventana."),

    q("3.1.2", "K3", 2, 1,
      "El encargo de una app de turnos cita solo mostrador, reloj y aviso por SMS. El modelo añade «pago con tarjeta» y dice que los turnos de la tarde los atienden mejor ciertas nacionalidades. ¿Qué hay en esa salida?",
      [
        "Solo una alucinación: el pago no está en el encargo. La frase sobre nacionalidades es un dato de la especificación.",
        "Una alucinación (el pago inventado) y un sesgo (la generalización sobre nacionalidades).",
        "Solo un error de razonamiento al sumar los turnos.",
        "Nada que señalar: las dos frases completan el encargo."
      ],
      [1],
      "El pago no estaba en el encargo: es una alucinación. La frase sobre nacionalidades no sale de la especificación: es un sesgo. No es un fallo aritmético ni un completado válido."),

    q("3.1.3", "K2", 1, 1,
      "Al pasar de un párrafo libre a una ficha con columnas (trámite, dato, resultado), las respuestas del modelo traen menos campos inventados. ¿Qué beneficio es el directo?",
      [
        "Menos ambigüedad: la entrada dice qué debe aparecer.",
        "El ajuste fino sale gratis.",
        "Ya no hace falta incluir el reglamento.",
        "La salida se vuelve más creativa."
      ],
      [0],
      "Una entrada clara reduce ambigüedades. No abarata el ajuste fino, no sustituye la fuente y no busca originalidad."),

    q("3.1.4", "K1", 1, 1,
      "¿Qué estrecha la distribución de probabilidad al generar y así baja la variación entre corridas?",
      [
        "Subir la temperatura.",
        "Bajar la temperatura.",
        "Borrar el prompt de sistema.",
        "Pedir la respuesta en verso."
      ],
      [1],
      "Bajar la temperatura concentra la probabilidad y las corridas se parecen más. Subirla, quitar el sistema o cambiar el género literario no reducen esa variación de forma controlada."),

    q("3.2.1", "K2", 1, 1,
      "¿Qué afirmación sobre privacidad al probar con IA generativa es INCORRECTA?",
      [
        "Pegar expedientes reales en un chat público puede sacarlos de la organización.",
        "Un prompt puede incluir más datos sensibles de los que hacían falta para el caso.",
        "Si el modelo a veces inventa, cada dato sintético es por fuerza la ficha de una persona real.",
        "Conviene acordar qué datos de prueba pueden salir del entorno."
      ],
      [2],
      "Un dato inventado no demuestra que se haya filtrado una ficha real. Las otras tres sí describen riesgos o controles de privacidad."),

    q("3.2.2", "K2", 1, 1,
      "Alguien altera las actas con las que se ajusta un modelo que recomienda qué exámenes repetir. En uso, el modelo deja fuera materias enteras. ¿Qué ataque es?",
      [
        "Envenenamiento: los datos de ajuste se falsearon.",
        "Manipulación del contexto: se sonsacaron claves del entrenamiento en una pregunta.",
        "Generación de código malicioso en un guion de prueba.",
        "Una alucinación aislada, sin relación con los datos de ajuste."
      ],
      [0],
      "Falsear el conjunto con el que se ajusta el modelo es envenenamiento. No es extraer secretos en una pregunta, ni un guion con puerta trasera, ni un invento suelto."),

    q("3.2.2", "K2", 1, 1,
      "Durante una sesión, una captura trucada hace que el modelo cambie el veredicto de un caso que estaba bien planteado. ¿Qué vector es?",
      [
        "Envenenamiento del entrenamiento.",
        "Manipulación de la solicitud en el momento de uso.",
        "Manipulación del contexto para robar datos de entrenamiento.",
        "Ajuste fino legítimo."
      ],
      [1],
      "Alterar la entrada en ejecución para torcer la salida es manipulación de la solicitud. El entrenamiento no se tocó y no se están extrayendo secretos."),

    q("3.2.3", "K2", 1, 1,
      "Van a generar casos a partir de boletines de notas reales. ¿Qué medida encaja con la mitigación de privacidad?",
      [
        "Sustituir nombres y números por datos sintéticos antes de enviarlos.",
        "Pegar el boletín completo en un chat público para ir más rápido.",
        "Quitar el cifrado del envío para ahorrar tiempo.",
        "Dar al modelo acceso directo a la base de alumnos."
      ],
      [0],
      "Anonimizar o sustituir por datos sintéticos reduce la exposición. El chat público, quitar el cifrado y el acceso directo la aumentan."),

    q("3.3.1", "K2", 1, 1,
      "El equipo duda entre pedir un vídeo sintético del fallo o un informe en texto del mismo caso. Desde la energía, ¿qué es cierto?",
      [
        "El vídeo consume bastante más por el cómputo de generar imagen en movimiento.",
        "Cuestan lo mismo si el prompt tiene las mismas palabras.",
        "El texto consume más porque se lee en voz alta.",
        "El vídeo emite menos CO₂ precisamente por durar más."
      ],
      [0],
      "Generar vídeo es más costoso que generar texto. La longitud del prompt no los iguala y una pieza más larga no emite menos."),

    q("3.4.1", "K1", 1, 2,
      "Una entidad europea quiere la referencia que clasifica el uso según el riesgo legal, y la guía de Estados Unidos para gestionar riesgos de IA. ¿Cuáles DOS son?",
      [
        "El Reglamento europeo de IA.",
        "El marco de gestión de riesgos de IA del NIST.",
        "ISO/IEC 25010, calidad de producto.",
        "ISO/IEC/IEEE 29119-3, documentación de prueba.",
        "El glosario del nivel fundamentos."
      ],
      [0, 1],
      "El Reglamento europeo clasifica usos por riesgo. El marco NIST es la guía de gestión de riesgos citada por el programa. Las otras tres no ocupan ese papel."),

    q("4.1.1", "K2", 1, 1,
      "En la app de entradas de un museo, ¿qué componente junta lo que escribe la persona con fichas parecidas recuperadas del almacén?",
      [
        "El back-end.",
        "El front-end, que solo pinta la pantalla.",
        "La autenticación.",
        "El posprocesamiento de la salida."
      ],
      [0],
      "El back-end combina la entrada con lo recuperado y arma el prompt. La pantalla muestra, la autenticación controla el acceso y el posprocesamiento actúa después del modelo."),

    q("4.1.2", "K2", 1, 1,
      "Las normas de una red de transporte están en una base vectorial. Hay que generar casos acordes a la norma vigente. ¿Qué secuencia es RAG?",
      [
        "Recuperar los fragmentos pertinentes, unirlos al prompt y entonces generar.",
        "Reentrenar el modelo con todas las normas y no recuperar nada.",
        "Generar primero y, si queda mal, borrar la base vectorial.",
        "Consultar solo la memoria del entrenamiento, sin almacén."
      ],
      [0],
      "RAG recupera, aumenta el prompt y genera. Reentrenar es ajuste fino. Generar a ciegas o ignorar el almacén no es recuperación."),

    q("4.1.3", "K2", 1, 1,
      "Un agente prepara lotes de datos de almacén y se detiene si el lote supera un importe. Una persona confirma ese lote. ¿Qué lectura es la correcta?",
      [
        "El tramo automático gana velocidad y la parada humana cubre el importe alto.",
        "El objetivo del agente obliga a confirmar también los lotes de un céntimo.",
        "Un agente no puede leer una hoja de movimientos.",
        "La confirmación humana se elimina porque el agente ya tiene un objetivo."
      ],
      [0],
      "Autonomía en lo rutinario y supervisión donde el riesgo sube es el reparto descrito. El objetivo no borra la verificación ni impide usar herramientas."),

    q("4.2.1", "K2", 1, 1,
      "¿Qué afirmación sobre el ajuste fino para una tarea de prueba es INCORRECTA?",
      [
        "Parte de un modelo ya entrenado y lo sigue entrenando con datos de la tarea.",
        "Puede mejorar el desempeño en ese dominio si los datos son buenos.",
        "Hace desaparecer la necesidad de revisar las salidas, porque el modelo queda exacto.",
        "Con datos pobres o sesgados, la salida del ajuste también lo será."
      ],
      [2],
      "El ajuste no garantiza exactitud ni quita la revisión. Las otras tres describen bien de qué parte, qué puede mejorar y qué pasa con malos datos."),

    q("4.2.2", "K2", 1, 1,
      "¿Cuál es el objetivo principal de las operaciones de modelos al usarlos en la prueba?",
      [
        "Desplegar, vigilar y cambiar con control los modelos y los prompts que ya están en uso.",
        "Elegir a mano las características de un clasificador clásico.",
        "Sustituir el informe de prueba por el registro de entrenamiento.",
        "Publicar el modelo en abierto para que cualquier persona lo reentrene."
      ],
      [0],
      "Operar es gobernar el modelo en servicio: versión, vigilancia y cambio. Las otras opciones pertenecen a otro tipo de modelo o eliminan el control."),

    q("5.1.1", "K2", 1, 1,
      "¿Qué afirmación sobre la IA en la sombra es CORRECTA?",
      [
        "Usar un chat no aprobado con datos del trabajo puede incumplir la política de datos.",
        "La IA en la sombra garantiza por sí sola el cumplimiento de esa política.",
        "Si el chat es gratuito, los datos no salen de la organización.",
        "Solo es IA en la sombra cuando el modelo se entrenó dentro de la empresa."
      ],
      [0],
      "El riesgo es usar una herramienta no autorizada con datos de la organización. Eso no asegura el cumplimiento, el precio no retiene los datos y el entrenamiento interno no define la sombra."),

    q("5.1.2", "K2", 1, 1,
      "¿Qué aspecto es clave en una estrategia de IA generativa para la prueba?",
      [
        "Definir qué usos están permitidos y qué datos pueden entrar al modelo.",
        "Exigir un certificado distinto por cada modelo del mercado.",
        "Volcar en el modelo todos los registros que aparezcan.",
        "Medir las salidas solo con las métricas del aprendizaje supervisado clásico."
      ],
      [0],
      "La política de uso y de datos es parte de la estrategia. El certificado por modelo, acumular datos sin criterio y las métricas de otro paradigma no lo son."),

    q("5.1.3", "K2", 1, 1,
      "¿Qué criterio pesa al elegir un modelo para una tarea de prueba concreta?",
      [
        "Si la calidad en esa tarea, el coste y el lugar donde se procesan los datos encajan con la organización.",
        "Elegir siempre el modelo con más parámetros, sin mirar la tarea.",
        "Ignorar la documentación: el tamaño basta.",
        "Descartar cualquier modelo que pueda ejecutarse dentro de la red."
      ],
      [0],
      "La elección mira calidad, coste y restricciones de datos. El tamaño solo, la falta de documentación o rechazar lo interno no son el criterio."),

    q("5.1.4", "K1", 1, 1,
      "Durante dos semanas el equipo asiste a un curso y prueba un modelo con avisos de impuestos ficticios, sin cambiar el proceso. ¿En qué fase está?",
      [
        "Descubrimiento.",
        "Uso e iteración, porque ya hay un curso.",
        "Inicio y definición del uso, porque el curso obliga a elegir ya el caso definitivo.",
        "En ninguna: sin comprar una licencia no hay fase."
      ],
      [0],
      "Formarse y experimentar con casos pequeños, sin integrar el proceso, es descubrimiento. Comprar una licencia no es el requisito de esa fase."),

    q("5.2.1", "K2", 1, 1,
      "¿Qué ejemplo encaja con lo que el probador necesita para trabajar con un modelo?",
      [
        "Escribe el prompt, contrasta la salida con la especificación y aparta lo que no se sostiene.",
        "Recita de memoria las capas internas del modelo.",
        "Acepta la salida si está bien redactada y no la compara con nada.",
        "Deja de hablar con el equipo y aumenta el número de llamadas."
      ],
      [0],
      "Hace falta guiar y verificar. La anatomía interna del modelo, fiarse del estilo o aislarse del equipo no son esa competencia."),

    q("5.2.2", "K2", 1, 1,
      "¿Qué enfoque desarrolla la competencia del equipo para adoptar IA generativa?",
      [
        "Práctica guiada en el trabajo real, de encargos simples a técnicas más finas, y una reunión para compartir lo aprendido.",
        "Un curso el lunes y, el martes, IA generativa en todas las pruebas sin acompañamiento.",
        "Que cada quien pruebe cuentas personales con datos del proyecto.",
        "Sustituir al equipo en cuanto termina el primer experimento."
      ],
      [0],
      "La competencia se construye practicando y compartiendo, con progresión. Un salto sin guía, la IA en la sombra o reemplazar al equipo no lo hacen."),

    q("5.2.3", "K2", 1, 1,
      "Al adoptar IA generativa en la prueba de una mutua, ¿qué reparto de responsabilidades encaja?",
      [
        "Quien prueba guía y verifica las salidas. Quien dirige mantiene la gestión e incorpora estrategia, riesgos y competencias.",
        "Quien dirige pasa a programar el modelo y deja de gestionar.",
        "Quien prueba deja de revisar, porque el modelo cubre el criterio.",
        "Los dos roles se sustituyen por el modelo."
      ],
      [0],
      "El cambio reparte guía y verificación en quien prueba, y estrategia y riesgos en quien dirige. No convierte a la dirección en ingeniería del modelo ni borra a las personas.")

  ];
})();
