/* Localizador del programa de estudios oficial CT-GenAI v1.0 en español.
   Los resúmenes y los términos son una guía propia de estudio.
   El texto del programa sigue en el PDF del ISTQB. */
(function () {
  window.SILABO = {
    url: "https://www.gasq.org/files/content/gasq/downloads/certification/ISTQB%20Syllabi/CT-GenAI%20-%20Syllabus%20v1.0%20Spain-ES.pdf",
    nombre: "Programa de estudios CT-GenAI v1.0 (español)",
    capitulos: [
      ["1", "Introducción a la IA generativa", 13],
      ["2", "Ingeniería de prompts", 19],
      ["3", "Gestión de riesgos", 34],
      ["4", "Infraestructura de prueba impulsada por LLM", 43],
      ["5", "Despliegue e integración", 49]
    ],
    temas: {
      "1.1.1": {
        titulo: "Espectro de la IA",
        pagina: 14,
        resumen: "No toda IA hace lo mismo. La simbólica sigue reglas que escribió una persona. El aprendizaje automático clásico entrena un modelo, pero alguien elige antes las características. El aprendizaje profundo aprende esas características con redes y sigue orientado a clasificar o predecir, no a inventar contenido. La generativa produce datos que no estaban en el entrenamiento, imitando sus patrones. En la prueba, redactar casos nuevos encaja en la generativa; clasificar con rasgos elegidos a mano, no."
      },
      "1.1.2": {
        titulo: "Conceptos básicos de la IA generativa y los grandes modelos de lenguaje",
        pagina: 14,
        resumen: "Un modelo de lenguaje grande se entrena con muchísimo texto y genera la respuesta prediciendo el siguiente token. Tokenizar es partir el texto en esas piezas. La ventana de contexto es cuánto texto puede tener en cuenta a la vez: lo que no cabe se queda fuera, y ampliarla no le da acceso a archivos que nadie le pasó. Un modelo pequeño tiene menos parámetros y sirve para tareas más acotadas. Esas piezas explican por qué un requisito largo puede perderse y por qué el modelo no «consulta» lo que no está en la entrada."
      },
      "1.1.3": {
        titulo: "Modelos fundacionales, ajustados por instrucciones y de razonamiento",
        pagina: 16,
        resumen: "El modelo fundacional es el entrenado de forma general, antes de especializarlo en seguir encargos. El ajustado por instrucciones responde mejor a lo que se le pide hacer. El de razonamiento dedica más pasos a problemas que hay que encadenar, no solo a completar una frase. No son intercambiables: un fundacional sin ese ajuste suele seguir peor una consigna de prueba, y un modelo de razonamiento no hace falta para una tarea de formato simple. La elección depende de si la tarea es obedecer una instrucción o resolver un problema de varios pasos."
      },
      "1.1.4": {
        titulo: "Modelos multimodales y de visión y lenguaje",
        pagina: 16,
        resumen: "Un modelo solo de texto no ve una captura, un esquema o un diagrama. El multimodal, y en particular el de visión y lenguaje, acepta imagen y texto en la misma entrada. En la prueba eso permite pedir criterios de aceptación a partir de una pantalla, o contrastar un diseño con una descripción. Si la entrada es una imagen, hace falta ese tipo de modelo. Tratar la captura como si fueran palabras, o como un sistema de reglas, no aprovecha lo que la imagen contiene."
      },
      "1.2.1": {
        titulo: "Capacidades clave de los modelos para las tareas de prueba",
        pagina: 17,
        resumen: "En la prueba, un modelo de lenguaje sirve para trabajar el lenguaje de la base de prueba: señalar ambigüedades, proponer condiciones y datos, resumir informes o bosquejar casos. No sustituye el juicio de quien prueba, no garantiza que la salida sea cierta y no ejecuta solo la batería ni despliega el sistema. Una capacidad es realista cuando la persona sigue revisando el resultado. Encargos del tipo «hazlo todo y fírmalo» se salen de lo que el programa considera un uso clave."
      },
      "1.2.2": {
        titulo: "Chatbots y aplicaciones de prueba impulsadas por modelos",
        pagina: 18,
        resumen: "Un chatbot es una conversación abierta: la persona pregunta y el modelo responde, sin un flujo fijo. Una aplicación de prueba impulsada por un modelo encaja el modelo en un proceso: toma una entrada concreta, a veces recupera información y devuelve un resultado con un formato previsto. No basta con cambiarle el nombre al chat. Si el recorrido está definido (historia, criterio, plantilla de casos), es una aplicación de prueba. Si la charla es libre, es un chatbot."
      },
      "2.1.1": {
        titulo: "Estructura de las instrucciones",
        pagina: 21,
        resumen: "Un prompt de prueba se entiende mejor si se separan sus partes. El rol y el fondo son contexto. Los datos de entrada son el material que hay que analizar, por ejemplo un archivo o una historia. Las restricciones limitan qué queda fuera o cómo debe hacerse la tarea. El formato de salida dice qué forma debe tener la respuesta, como una tabla o una lista. Confundir esas piezas produce un encargo ambiguo: pedir columnas es formato, no contexto, y un archivo por analizar son datos, no una restricción."
      },
      "2.1.2": {
        titulo: "Técnicas fundamentales de instrucción",
        pagina: 22,
        resumen: "Sin ejemplos, el modelo solo recibe la consigna. Con un ejemplo se le muestra un caso ya aceptado para que imite ese formato: es one-shot. Con pocos ejemplos se le muestran varios, y eso fija mejor el formato y el contenido. El encadenamiento parte la tarea en varios prompts. El meta-prompting deja que el modelo refine sus propios prompts. No se intercambian: si ya hay ejemplos útiles, omitirlos no es la técnica de pocos ejemplos, y un solo ejemplo no es una colección."
      },
      "2.1.3": {
        titulo: "Instrucción de sistema e instrucción de usuario",
        pagina: 23,
        resumen: "La instrucción de sistema fija un comportamiento que se mantiene, por ejemplo el rol, las reglas de seguridad o el estilo de la salida. La de usuario es el encargo de este turno: la historia, el defecto o la pregunta concreta. Poner la política estable en el mensaje de usuario, o la tarea puntual en el de sistema, las mezcla. El sistema no recalcula el contexto en cada frase suelta, y el usuario no es el lugar de las reglas que deben valer en toda la sesión."
      },
      "2.2.1": {
        titulo: "Análisis de prueba con IA generativa",
        pagina: 24,
        resumen: "Analizar la prueba con un modelo consiste en obtener condiciones a partir de la base de prueba, priorizarlas si hay información de riesgo y revisar si cubren lo pedido. El encadenamiento separa esos pasos en lugar de meterlos en un único prompt opaco. El centro no es cazar defectos de un requisito ya revisado ni generar el sistema. Si el resultado tiene que ser condiciones priorizadas y huecos de cobertura, el encargo debe pedir eso y no un comentario genérico."
      },
      "2.2.2": {
        titulo: "Diseño e implementación de pruebas con IA generativa",
        pagina: 25,
        resumen: "Diseñar e implementar es pasar de la historia o el criterio a casos concretos, con datos y un orden que respete prioridades y dependencias. Un caso de pago no tiene sentido si el acceso previo no está cubierto: eso hay que decírselo al modelo, a menudo en un segundo paso. Pedir «casos buenos» sin criterios ni dependencias no aplica la técnica. Tampoco basta con datos límite sueltos ni con pedirle que ejecute la historia en producción."
      },
      "2.2.3": {
        titulo: "Pruebas de regresión automatizadas con IA generativa",
        pagina: 27,
        resumen: "En regresión, el modelo ayuda a ver qué guiones toca un cambio y a proponer cómo actualizarlos, no a tirar la batería ni a decidir que un cambio «parece pequeño» y no se regresa. El correo de la release no es el guion. La persona sigue siendo quien acepta el cambio en la suite. El encargo útil nombra el cambio, los guiones existentes y la actualización, y deja la ejecución bajo control del equipo."
      },
      "2.2.4": {
        titulo: "Monitorización y control de pruebas con IA generativa",
        pagina: 28,
        resumen: "Monitorizar y controlar es mirar el ciclo que ya está en marcha: avance, desvíos, riesgos y decisiones. El modelo puede resumir los resultados del ciclo para esa lectura. No es diseñar casos de una historia nueva ni reescribir el código de producción. Si el encargo no usa los datos del ciclo, no hay monitorización: solo hay una definición de diccionario. El informe tiene que hablar del plan, de lo ejecutado y de lo que se desvía."
      },
      "2.2.5": {
        titulo: "Elección de técnicas de instrucciones",
        pagina: 30,
        resumen: "La técnica se elige según la tarea, no por costumbre. Si ya hay ejemplos del formato deseado, lo directo es mostrarlos. Si la tarea son pasos distintos (condiciones, luego prioridad, luego cobertura), encaja el encadenamiento. Partir en diez pasos una transformación directa, o usar meta-prompting cuando lo que falta es un formato, complica sin ganar. Sin ejemplos, el modelo tiene que adivinar una forma que el equipo ya tiene escrita."
      },
      "2.3.1": {
        titulo: "Métricas para evaluar los resultados",
        pagina: 31,
        resumen: "La salida de un modelo de prueba se juzga con métricas de la tarea, no con el tamaño del prompt. Importan la exactitud y la completitud frente a los requisitos, la relevancia respecto al contexto, la diversidad de escenarios y la tasa de éxito al ejecutar los guiones. El tiempo puede hablar de eficiencia, pero no sustituye a la cobertura ni a la ejecución. Contar tokens no dice si la respuesta responde al contexto. Una salida breve puede ser mala, y una larga puede no ejecutarse."
      },
      "2.3.2": {
        titulo: "Técnicas para evaluar y afinar las instrucciones",
        pagina: 32,
        resumen: "Afinar un prompt es un ciclo: se mira la salida, se dice qué faltó y se ajusta la instrucción, los ejemplos o las restricciones. Luego se compara la nueva salida con la anterior. Aceptar el primer borrador, o subir la temperatura esperando que el azar rellene los huecos, no es ese ciclo. Tampoco lo es cambiar de tarea para no revisar. La persona sigue en el medio: el modelo no se corrige solo porque se le vuelva a preguntar igual."
      },
      "3.1.1": {
        titulo: "Alucinaciones, errores de razonamiento y sesgos",
        pagina: 35,
        resumen: "Una alucinación afirma algo que no está en la entrada ni en los hechos, como un campo inventado. Un error de razonamiento falla en el encadenamiento lógico aunque los datos existan. Un sesgo inclina el resultado de forma sistemática, por ejemplo al generalizar un grupo sin apoyo en la especificación. No son lo mismo: inventar un dato no es un fallo de suma, y un estereotipo no se arregla ampliando la ventana de contexto. Nombrar mal el fallo lleva a la mitigación equivocada."
      },
      "3.1.2": {
        titulo: "Identificación de alucinaciones, errores de razonamiento y sesgos",
        pagina: 35,
        resumen: "Identificar es contrastar la salida con la especificación y con el encargo. Si aparece un dato que nadie dio, huele a alucinación. Si los datos están pero la conclusión no se sigue, es un error de razonamiento. Si se trata peor o mejor a un grupo sin que la base de prueba lo diga, es un sesgo. Una frase puede ser fiel en la regla y estar sesgada en la siguiente. No basta con que el texto suene seguro o profesional."
      },
      "3.1.3": {
        titulo: "Técnicas de mitigación de las alucinaciones",
        pagina: 37,
        resumen: "Para que el modelo invente menos, se acota la fuente: que cite el fragmento de la especificación, se recuperan documentos pertinentes y una persona revisa lo que no se sostiene. Subir la temperatura aumenta la variación, no la fidelidad. Quitar la especificación del prompt le deja solo la memoria del entrenamiento. Aceptar una salida porque está bien redactada no comprueba nada. La mitigación deja una pista verificable, no una prosa más convincente."
      },
      "3.1.4": {
        titulo: "Mitigación del comportamiento no determinista",
        pagina: 37,
        resumen: "La misma pregunta puede dar respuestas distintas porque el modelo muestrea. Bajar la temperatura reduce esa variación. Si la herramienta permite una semilla, la secuencia se puede repetir. Aun así conviene comprobar la salida con reglas o con una revisión fija, no fiarse de una prosa libre. Subir la temperatura para que «todas las corridas coincidan» hace lo contrario. Borrar el prompt de sistema en cada llamada aumenta el descontrol."
      },
      "3.2.1": {
        titulo: "Riesgos de privacidad y seguridad de datos",
        pagina: 38,
        resumen: "Lo que se envía a un modelo externo puede incluir datos de prueba sensibles, secretos o fragmentos de producción. El riesgo no es solo que el modelo se equivoque: es que esos datos salgan del entorno, queden retenidos o se usen fuera de la política. Un prompt también puede filtrar más de lo que se quería pedir. Por eso el programa trata el uso de IA generativa en la prueba como un tema de privacidad y de seguridad, no solo de calidad de la respuesta."
      },
      "3.2.2": {
        titulo: "Privacidad de datos y vulnerabilidades",
        pagina: 39,
        resumen: "Conviene separar los ataques. La manipulación del contexto busca sonsacar datos confidenciales que el modelo vio en el entrenamiento o en el prompt. La manipulación de la solicitud altera la salida en el momento, por ejemplo con una entrada trucada. El envenenamiento falsea los datos con los que se ajusta el modelo. La generación de código malicioso mete puertas traseras o fallos ocultos en lo que el modelo escribe. Cada uno se explota en un momento distinto y no se mitiga igual."
      },
      "3.2.3": {
        titulo: "Estrategias de mitigación de la privacidad y la seguridad",
        pagina: 39,
        resumen: "Antes de enviar datos al modelo, lo sensible se anonimiza o se sustituye por datos sintéticos, y se cifra en tránsito y en reposo. El acceso se limita. Dar paso libre a los datos reales, o quitar el cifrado para ir más rápido, aumenta el riesgo. Comparar varios modelos puede mejorar la exactitud y no protege la privacidad. La mitigación actúa sobre lo que sale del entorno, no sobre el número de modelos consultados."
      },
      "3.3.1": {
        titulo: "Impacto en el consumo de energía y las emisiones",
        pagina: 41,
        resumen: "Generar con un modelo consume energía, y no todas las salidas cuestan lo mismo. Una imagen o una captura sintética exige mucho más cómputo que un texto de longitud parecida, y eso se nota en la energía y en las emisiones. No da igual el formato si el prompt tiene los mismos caracteres. Tampoco se puede decir que la imagen emite menos por ser imagen. En la prueba, pedir capturas de más tiene un coste ambiental que el texto no tiene."
      },
      "3.4.1": {
        titulo: "Regulaciones, estándares y marcos de trabajo",
        pagina: 42,
        resumen: "Para el uso de IA generativa en la prueba, el programa se apoya en un grupo concreto de referencias. ISO/IEC 42001 trata la gestión de los sistemas de IA en la organización. ISO/IEC 23053 es el marco de sistemas de IA con aprendizaje automático y, en este uso, se aplica a la calidad de los datos, la transparencia y la seguridad. El Reglamento europeo de IA clasifica usos según el riesgo y pide transparencia y rendición de cuentas. El marco NIST de gestión de riesgos de IA insiste en equidad, transparencia y seguridad. Las normas de prueba del nivel fundamentos y el modelo de calidad de producto no ocupan ese lugar."
      },
      "4.1.1": {
        titulo: "Componentes de la infraestructura de pruebas",
        pagina: 44,
        resumen: "Una aplicación de prueba con un modelo no es solo el modelo. El front-end recoge lo que escribe la persona y muestra la salida. El back-end prepara el prompt: junta la entrada con datos recuperados que se parecen en significado. La base vectorial guarda esos fragmentos; no los almacena el modelo. El posprocesamiento trabaja la salida, no la recuperación. La autenticación controla el acceso y no arma el prompt. Si se mezclan esos papeles, la arquitectura deja de explicar dónde se pierde o se filtra la información."
      },
      "4.1.2": {
        titulo: "Generación aumentada por recuperación",
        pagina: 45,
        resumen: "La generación aumentada por recuperación busca fragmentos pertinentes, los añade al prompt y entonces el modelo responde. Así la salida se apoya en documentación de la prueba y no solo en lo que el modelo recuerda del entrenamiento. No es ajuste fino: no se reentrena el modelo. Tampoco es el modelo consultando solo una función interna sin recuperar nada. Sirve cuando los casos tienen que coincidir con una especificación o con defectos históricos que están en un almacén."
      },
      "4.1.3": {
        titulo: "Agentes impulsados por modelos",
        pagina: 46,
        resumen: "Un agente usa el modelo para perseguir un objetivo y puede llamar herramientas, por ejemplo para preparar datos. El autónomo avanza con poca intervención. El semiautónomo se detiene donde el riesgo pide una persona, como aceptar casos que tocan dinero. Quitar esa aceptación, o desplegar en producción sin registro, no es el equilibrio que describe el programa. Que haya un objetivo no autoriza a saltarse la verificación. El número de agentes no es, por sí solo, la mejora."
      },
      "4.2.1": {
        titulo: "Ajuste fino de los modelos para las tareas de prueba",
        pagina: 47,
        resumen: "El ajuste fino sigue entrenando el modelo con datos de la tarea de prueba, cuando el prompt y la recuperación no bastan. Hacen falta datos suficientes y de calidad, y métricas de esa tarea, como relevancia, éxito de ejecución o tiempo. Importar entero un catálogo pensado para otro tipo de modelo no mide esta salida. Ajustar no es barato ni se hace una vez y se olvida: los datos malos se aprenden igual que los buenos."
      },
      "4.2.2": {
        titulo: "Operaciones de modelos al desplegarlos y gestionarlos",
        pagina: 48,
        resumen: "Las operaciones de modelos cubren la vida del modelo ya en uso en la prueba: qué versión del prompt y del modelo está activa, cómo se vigila la calidad de las salidas y cómo se autoriza un cambio. No es elegir características a mano de un modelo clásico ni publicar el modelo sin control para que cualquiera lo reentrene. El informe de prueba sigue siendo el informe de prueba. El log de entrenamiento no lo reemplaza."
      },
      "5.1.1": {
        titulo: "Riesgos de la IA en la sombra",
        pagina: 50,
        resumen: "La IA en la sombra es el uso de modelos o cuentas personales al margen de lo que la organización autorizó. El daño típico es sacar datos de prueba o de negocio hacia una herramienta pública, sin política ni registro. No se evita prohibiendo en abstracto y dejando que cada quien elija. Se evita con herramientas aprobadas, reglas de qué datos pueden salir y una vía oficial para los experimentos. Un piloto escondido no es un atajo inocente."
      },
      "5.1.2": {
        titulo: "Aspectos clave de una estrategia de IA generativa",
        pagina: 50,
        resumen: "La estrategia dice para qué se usa la IA generativa en la prueba y con qué límites. Importa que los modelos elegidos encajen con las herramientas que ya existen, y que haya política de uso y de datos. No es exigir un certificado distinto por cada modelo, ni volcar la mayor cantidad de datos posible, ni copiar las métricas del aprendizaje supervisado como si midieran un caso de prueba. Sin gobernanza, la estrategia es solo una lista de herramientas."
      },
      "5.1.3": {
        titulo: "Selección de modelos grandes o pequeños",
        pagina: 51,
        resumen: "Elegir modelo es un compromiso entre calidad de la tarea, coste, latencia y si los datos pueden salir de la red. Un modelo grande en una nube pública no gana siempre: en una clasificación corta y sensible, un modelo pequeño interno puede bastar y evita sacar los datos. El tamaño sí cambia el coste y la privacidad. Descartar todo modelo y volver solo a reglas simbólicas es otra decisión, no la conclusión automática de que la tarea sea corta."
      },
      "5.1.4": {
        titulo: "Fases al adoptar la IA generativa",
        pagina: 51,
        resumen: "El programa recuerda tres fases. En el descubrimiento, el equipo se forma, prueba modelos y hace experimentos pequeños. En el inicio y la definición del uso, se eligen y priorizan casos de uso reales y se mira la infraestructura. En el uso y la iteración, la IA queda integrada, se mide y se ajusta. No hace falta cerrar una fase en toda la organización para empezar otra: dos casos de uso pueden ir en fases distintas a la vez. Empezar desplegando todo el primer día no es ese recorrido."
      },
      "5.2.1": {
        titulo: "Habilidades y conocimientos esenciales",
        pagina: 52,
        resumen: "Quien prueba con IA generativa necesita escribir prompts claros, leer la salida con criterio de prueba y reconocer alucinaciones, sesgos y fugas de datos. No necesita memorizar el código del modelo ni dejar de aplicar técnicas de prueba. Más llamadas al modelo no sustituyen la conversación con el equipo ni la decisión de qué probar. La habilidad está en guiar y verificar, no en delegar el juicio."
      },
      "5.2.2": {
        titulo: "Desarrollo de capacidades en los equipos de prueba",
        pagina: 52,
        resumen: "El equipo aprende practicando, de prompts simples a técnicas más finas, y compartiendo lo que funciona y lo que no. Una charla única, o prohibir el modelo al día siguiente, no construye capacidad. Tampoco lo hace empujar a la gente a herramientas no autorizadas, ni sustituir al equipo en cuanto hay un piloto. El recorrido es guiado y colectivo. El miedo a perder el puesto se trata en ese mismo cambio, no se ignora."
      },
      "5.2.3": {
        titulo: "Evolución de los procesos de prueba",
        pagina: 53,
        resumen: "Al entrar la IA generativa, quien prueba pasa a guiar y verificar más, y quien dirige sigue gestionando e incorpora estrategia, riesgos y competencias. El proceso no desaparece ni se entrega entero al modelo. Quien dirige no tiene que convertirse en especialista del funcionamiento interno del modelo. Sustituir a las personas por la IA no es la evolución que describe el programa. El cambio está en los papeles y en los controles, no en borrar la prueba."
      }
    },
    terminos: [
      ["1", [
        ["IA simbólica", "Decisiones con reglas y símbolos escritos por personas."],
        ["Aprendizaje automático clásico", "El modelo se entrena después de que alguien elige las características."],
        ["Aprendizaje profundo", "Redes que aprenden las características. No crea contenido nuevo por sí mismo."],
        ["IA generativa", "Crea datos nuevos imitando patrones del entrenamiento."],
        ["Token", "Pieza en la que se parte el texto para que el modelo lo procese."],
        ["Ventana de contexto", "Cantidad de tokens que el modelo puede tener en cuenta a la vez."],
        ["Modelo fundacional", "Modelo entrenado de forma general, antes de ajustarlo a instrucciones."],
        ["Modelo multimodal", "Acepta más de un tipo de entrada, por ejemplo texto e imagen."]
      ], "Introducción"],
      ["2", [
        ["Prompt", "Instrucción que se le da al modelo, con contexto, datos, límites y formato."],
        ["Prompt de sistema", "Reglas o rol que se mantienen a lo largo de la sesión."],
        ["Prompt de usuario", "Encargo concreto de este turno."],
        ["Sin ejemplos", "Solo la consigna, sin casos de muestra."],
        ["Un ejemplo", "Se muestra un único caso aceptado para fijar el formato."],
        ["Pocos ejemplos", "Se muestran varios casos para guiar formato y contenido."],
        ["Encadenamiento", "La tarea se parte en varios prompts, y la salida de uno alimenta al siguiente."],
        ["Meta-prompting", "El modelo ayuda a mejorar sus propios prompts."],
        ["Tasa de éxito de ejecución", "Proporción de guiones generados que realmente se ejecutan bien."]
      ], "Ingeniería de prompts"],
      ["3", [
        ["Alucinación", "La salida afirma algo que no está en la entrada ni en los hechos."],
        ["Error de razonamiento", "Los datos pueden estar, pero la conclusión no se sigue."],
        ["Sesgo", "Desvío sistemático, por ejemplo una generalización sobre un grupo sin apoyo en la especificación."],
        ["Temperatura", "Controla cuánta variación hay al generar. Baja, la salida es más repetible."],
        ["Manipulación del contexto", "Intento de sonsacar datos confidenciales que el modelo vio."],
        ["Envenenamiento", "Datos de entrenamiento o de ajuste alterados a propósito."],
        ["ISO/IEC 42001", "Requisitos para gestionar sistemas de IA en la organización."],
        ["ISO/IEC 23053", "Marco de sistemas de IA con aprendizaje automático."],
        ["Reglamento europeo de IA", "Marco legal que clasifica usos según el riesgo."],
        ["Marco NIST de riesgos de IA", "Guía para gestionar riesgos de IA, con foco en equidad, transparencia y seguridad."]
      ], "Riesgos"],
      ["4", [
        ["Front-end", "Recoge la entrada de la persona y muestra la salida."],
        ["Back-end", "Prepara el prompt juntando la entrada con datos recuperados."],
        ["Generación aumentada por recuperación", "Se buscan fragmentos pertinentes, se añaden al prompt y entonces el modelo responde."],
        ["Agente", "El modelo persigue un objetivo y puede usar herramientas. La verificación humana se mantiene donde el riesgo lo pide."],
        ["Ajuste fino", "Se sigue entrenando el modelo con datos de la tarea de prueba."],
        ["Operaciones de modelos", "Versionar, vigilar y cambiar con control los modelos y los prompts ya en uso."]
      ], "Infraestructura"],
      ["5", [
        ["IA en la sombra", "Uso de modelos no autorizados, a menudo con datos de la organización."],
        ["Estrategia de IA generativa", "Para qué se usa, con qué herramientas y con qué reglas de datos."],
        ["Modelo pequeño", "Menos parámetros. Puede bastar en tareas acotadas y dentro de la red interna."],
        ["Descubrimiento", "Primera fase: formarse, probar y hacer experimentos pequeños."],
        ["Inicio y definición del uso", "Segunda fase: elegir y priorizar casos de uso reales."],
        ["Uso e iteración", "Tercera fase: integrar, medir y ajustar."]
      ], "Adopción"]
    ]
  };
})();
