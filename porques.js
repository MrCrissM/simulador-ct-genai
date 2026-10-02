/* Justificación de cada opción, en el orden original del banco (antes de barajar).
   El texto no incluye «Es correcta» / «No es correcta»: eso lo pone la pantalla según la clave. */
(function () {
  var R = [
    /* 0 1.1.1 relacionar */
    [
      "1D asigna a la IA simbólica la selección de características, que corresponde al aprendizaje automático clásico, y el resto de los pares también queda cruzado.",
      "La IA simbólica imita decisiones con reglas (B), el aprendizaje automático clásico exige seleccionar características (D), el profundo aprende rasgos con redes (A) y la generativa crea datos nuevos (C): 1B, 2D, 3A, 4C.",
      "Pone en la IA simbólica el aprendizaje automático de características (A) y trata la generativa como si solo imitara reglas.",
      "Trata la IA simbólica como generativa y el aprendizaje profundo como un sistema de reglas."
    ],
    /* 1 */
    [
      "Aplicar reglas escritas por expertos es IA simbólica, no generación de datos nuevos.",
      "Clasificar con características elegidas a mano es aprendizaje automático clásico.",
      "Aprender sola los rasgos de una imagen es aprendizaje profundo, todavía sin crear contenido nuevo.",
      "Redactar casos que no existían, imitando patrones del entrenamiento, es justo lo que hace la IA generativa."
    ],
    /* 2 ventana */
    [
      "La ventana no reordena el texto ni controla el orden cronológico: solo limita cuántos tokens se consideran a la vez.",
      "Citar otros documentos depende de que estén en la entrada. La ventana no quita esa capacidad si el texto cabe.",
      "Cuando la entrada supera la ventana, los tokens que quedan fuera se descartan y pueden perderse detalles necesarios para lo que viene después.",
      "La ventana no obliga a un análisis carácter a carácter: limita la cantidad de texto, no el tipo de análisis."
    ],
    /* 3 tokenización */
    [
      "Convertir un token en un vector es una incrustación (embedding), no la tokenización.",
      "Tokenizar es partir el texto en unidades más pequeñas, las piezas con las que el modelo entiende y genera lenguaje.",
      "Redactar la respuesta es la función del modelo, no el paso de trocear el texto.",
      "Predecir el siguiente token es cómo el modelo genera texto, no cómo se prepara la entrada."
    ],
    /* 4 ventana y documentos */
    [
      "La ventana no da acceso a documentos que no se han incluido en la entrada.",
      "La ventana solo acota cuánto de la entrada actual se considera a la vez. Para consultar otros archivos hay que incluirlos o recuperarlos.",
      "Ampliar la ventana no cambia el algoritmo de análisis de carácter a documento.",
      "La ventana no ordena los hechos por fecha ni por eso rechaza varios archivos."
    ],
    /* 5 tipos de LLM, pareja */
    [
      "El fundacional no destaca generando casos desde un requisito vago y sin estructura, y el de razonamiento no está hecho para copiar plantillas rígidas.",
      "El ajustado por instrucciones no decide solo qué ejecutar en tiempo real, y el fundacional no destaca en Gherkin sin una entrada estructurada.",
      "El de razonamiento sintetiza informes y prioriza; el ajustado por instrucciones sigue un formato impuesto, como Gherkin.",
      "Invierte los papeles: la plantilla rígida es del ajustado por instrucciones y la síntesis con prioridad, del de razonamiento."
    ],
    /* 6 formato impuesto */
    [
      "El fundacional no sobresale generando casos listos a partir de un requisito de alto nivel sin estructura.",
      "Ceñirse a una plantilla no es la fortaleza del modelo de razonamiento, orientado a inferir y priorizar.",
      "Seguir formato, estilo y sintaxis pedidos es propio del LLM ajustado por instrucciones.",
      "El tipo de modelo sí importa: no cualquiera obedece igual un formato rígido."
    ],
    /* 7 multimodal */
    [
      "Es al revés: el multimodal es la categoría amplia y visión y lenguaje es el caso particular.",
      "Visión y lenguaje combina imagen y texto, así que es un subconjunto de los LLM multimodales.",
      "Sí están relacionados, y el de visión y lenguaje no se limita a mirar la interfaz ignorando el texto.",
      "No son sinónimos: el multimodal abarca más combinaciones de modalidades."
    ],
    /* 8 matiz */
    [
      "Visión y lenguaje no es el término amplio; el amplio es el LLM multimodal.",
      "Visión y lenguaje cubre imagen y texto. Audio o sensores corresponden a un multimodal más amplio.",
      "El programa no los trata como intercambiables.",
      "Un modelo de visión y lenguaje sí usa texto, junto con la imagen."
    ],
    /* 9 capacidades DOS */
    [
      "Aclarar un requisito, marcando ambigüedades e inconsistencias, es una capacidad clave del LLM en la prueba.",
      "Generar la aplicación completa y lista para desplegar no es una capacidad clave del LLM en tareas de prueba.",
      "Ejecutar solo todos los guiones, sin supervisión, no es una capacidad clave: la ejecución autónoma no sustituye a la persona.",
      "La prueba exploratoria depende del juicio humano. El modelo no la hace «a mano» ni con intuición de probador.",
      "Crear datos de prueba variados, con combinaciones y valores límite, es una capacidad clave."
    ],
    /* 10 encargos DOS */
    [
      "Pedir combinaciones de datos, límites y clases de equivalencia es un encargo realista.",
      "Recorrer la aplicación explorando y decidir cuándo parar es prueba exploratoria, no una capacidad clave del LLM.",
      "Revisar una historia y marcar frases ambiguas o contradictorias es análisis de requisitos, una capacidad clave.",
      "Desplegar un sistema generado desde cero no es un uso realista del LLM en la prueba.",
      "Lanzar la regresión y firmar el resultado sin revisión es ejecución autónoma sin supervisión, fuera de las capacidades clave."
    ],
    /* 11 chatbot vs app */
    [
      "Invierte los papeles: el chatbot es para lo puntual e improvisado, y la aplicación para la tarea concreta.",
      "No hacen lo mismo ni se configuran igual.",
      "Es al contrario: la conversación libre es del chatbot y la integración en el proceso, de la aplicación.",
      "El chatbot sirve para una conversación puntual. La aplicación de prueba se integra en el proceso y se ajusta a una tarea concreta."
    ],
    /* 12 dos necesidades */
    [
      "La segunda necesidad (integrarla en el flujo, con datos y formato fijos) no la cubre un chatbot suelto.",
      "Preguntar hoy, de forma suelta, encaja con un chatbot. Incorporar la generación al flujo del equipo encaja con una aplicación de prueba impulsada por LLM.",
      "Invierte las herramientas: lo puntual es del chatbot y lo integrado, de la aplicación.",
      "Las dos pueden usar un LLM. Lo que cambia es el tipo de herramienta, no la posibilidad."
    ],
    /* 13 datos de entrada */
    [
      "El contexto sería información de fondo sobre lo que se prueba. Aquí se enumeran fuentes concretas.",
      "Esas líneas listan los informes, registros y referencias que el modelo debe procesar: son datos de entrada.",
      "Una restricción limitaría el análisis o dejaría cosas fuera. Esta frase no prohíbe nada.",
      "El formato de salida diría cómo presentar el resultado. Aquí no hay tabla, lista ni plantilla."
    ],
    /* 14 formato de salida */
    [
      "La instrucción diría qué tarea hacer (buscar defectos). Esta línea solo dice cómo entregar el resultado.",
      "Una restricción limitaría el alcance, por ejemplo «no informes defectos solo de redacción». Aquí no hay límite: hay columnas.",
      "Fijar la tabla y sus columnas es decir cómo debe presentarse la respuesta: formato de salida.",
      "El contexto aportaría el fondo de la especificación. Esta línea no describe el requisito, describe la respuesta."
    ],
    /* 15 restricción */
    [
      "Asignar el rol de analista de una pasarela de pago es contexto, no una restricción.",
      "El archivo adjunto es el material que hay que procesar: datos de entrada.",
      "Prohibir cambios de código y limitarse a defectos que impiden aceptar la historia es acotar la tarea: una restricción.",
      "Pedir una lista numerada de ocho líneas fija la forma de la respuesta: formato de salida."
    ],
    /* 16 tres técnicas */
    [
      "Cruza las definiciones: los ejemplos son del few-shot, no del encadenamiento, y reescribir a mano no es meta-prompting.",
      "Few-shot orienta con ejemplos, el encadenamiento parte la tarea en varios prompts y el meta-prompting deja que el modelo refine los suyos.",
      "Vuelve a cruzarlas: partir en pasos es encadenar, los ejemplos son few-shot y la optimización manual no es few-shot.",
      "El meta-prompting no se queda en el texto que escribió el probador: el modelo participa en refinar el prompt."
    ],
    /* 17 meta-prompting */
    [
      "Que no haya ejemplos no basta para llamarlo prompting sin ejemplos: el objetivo aquí es mejorar el propio prompt.",
      "Varias vueltas no son encadenamiento si no se está partiendo la tarea de prueba en subtareas.",
      "Que el modelo refine en varias vueltas el prompt con el que trabaja es meta-prompting.",
      "Una vuelta de mejora no es un ejemplo de entrada y salida. Few-shot necesita ejemplos de la tarea."
    ],
    /* 18 prompt de sistema */
    [
      "El prompt de sistema permanece durante la sesión y fija el marco de comportamiento del modelo.",
      "La pregunta de cada turno es el prompt de usuario, no el de sistema.",
      "El prompt de sistema no se recalcula con cada mensaje.",
      "Mostrar lo que escribió el usuario no es función del prompt de sistema, que suele ir oculto."
    ],
    /* 19 reglas ocultas */
    [
      "Condicionar la respuesta no lo convierte en prompt de usuario. El de usuario es lo que la persona envía en cada turno.",
      "Reglas fijas, cargadas al abrir la sesión y ocultas, que marcan el comportamiento: eso es el prompt de sistema.",
      "No describen el sistema que se prueba. Son reglas de la conversación, no datos de entrada.",
      "El modelo no las reescribe en cada turno. Un meta-prompt serviría para refinar prompts, no para estas reglas fijas."
    ],
    /* 20 secuencia encadenamiento */
    [
      "Separa los tres pasos y encadena la salida de uno como entrada del siguiente: generar, priorizar con el contexto de riesgo y analizar cobertura.",
      "Pedir generación, prioridad y cobertura en un solo prompt no es encadenar, y reordenar después no recupera esos pasos.",
      "Se salta la priorización y cierra buscando ambigüedades de un requisito que ya estaba revisado.",
      "Empieza por defectos que el escenario da por revisados y junta el análisis en un solo paso."
    ],
    /* 21 por qué no encadena */
    [
      "El encadenamiento sí usa el requisito como entrada del primer prompt.",
      "Mete generación, prioridad y cobertura en un solo paso, y gasta otro en buscar defectos que la especificación ya no pide.",
      "Priorizar por riesgo sí forma parte del análisis de prueba con IA generativa, si se le da ese contexto.",
      "El modelo sí puede analizar cobertura. No es una tarea reservada a una persona."
    ],
    /* 22 prompt Gherkin */
    [
      "Trae los ejemplos, pero no exige la sintaxis Dado-Cuando-Entonces ni el alineamiento con el criterio.",
      "Incluye los ejemplos, se presenta como analista de Gherkin, exige Dado-Cuando-Entonces, el criterio y el formato de los ejemplos.",
      "Exige la sintaxis y el criterio, pero sin ejemplos deja de ser prompting con pocos ejemplos.",
      "Se queda en dos casos límite, no usa los ejemplos y no pide cubrir el criterio completo."
    ],
    /* 23 few-shot de verdad */
    [
      "Da la historia y el criterio, pero ningún ejemplo de escenario. Sin ejemplos no es few-shot.",
      "Muestra tres ejemplos completos (historia, criterio y escenario) y pide lo mismo para la historia nueva, con la sintaxis y el criterio.",
      "Pide expresamente no mirar ejemplos y se limita a límites. Eso es lo contrario del few-shot.",
      "Ni siquiera pide escenarios: solo parafrasear el criterio."
    ],
    /* 24 mejora regresión */
    [
      "Agrupar y cruzar con anomalías ayuda, pero no pide separar esperado y real, que es lo que localiza el desajuste.",
      "Cambiar el rol no incorpora los pasos que le faltan a la instrucción.",
      "Amplía la instrucción con los tres pasos que faltan: separar esperado y real, agrupar incidencias y resaltar las discrepancias.",
      "Escribir principios de regresión como Dado-Cuando-Entonces no es un paso del análisis de resultados."
    ],
    /* 25 lista plana */
    [
      "Quitar la lista de anomalías conocidas elimina un contraste útil y no separa esperado de obtenido.",
      "Pide separar esperado y obtenido, agrupar los fallos repetidos y destacar solo los desajustes: eso ataca la lista plana.",
      "Cambiar el rol por «director de proyecto» no enseña al modelo a separar los dos resultados.",
      "Quitar la tabla empeora la lectura y no obliga a distinguir esperado de obtenido."
    ],
    /* 26 métricas accionables */
    [
      "Decir que el rol «apoya decisiones» no añade qué debe hacer el modelo con las cifras.",
      "Un análisis de riesgos aparte distrae del encargo, que es hacer comprensibles las métricas.",
      "Un resumen en lenguaje llano, con la interpretación y los pasos siguientes, es lo que permite decidir.",
      "Repetir «que sea comprensible» no dice cómo conseguir esa lectura."
    ],
    /* 27 dónde actuar */
    [
      "El hueco está en cómo se presentan las cifras. El formato de salida es el sitio para la lectura sencilla y los pasos que siguen.",
      "Cambiar el oficio del rol no explica las métricas a quien decide.",
      "Adjuntar otra vez el mismo archivo no añade interpretación.",
      "Copiar de nuevo la restricción de brevedad no dice cómo lograr que la cifra sea accionable."
    ],
    /* 28 técnica con reglas */
    [
      "Hay pocos casos con resultado conocido y una regla clara: mostrarlos como ejemplos es few-shot.",
      "La tarea es lineal. Partirla en muchos prompts no aporta y no usa los ejemplos.",
      "Nadie pide que el modelo reescriba el prompt. El meta-prompting no es la técnica de este encargo.",
      "Sin ejemplos se tiran los casos que ya existen y que ilustran la regla."
    ],
    /* 29 redondeo */
    [
      "No hace falta que el modelo diseñe el procedimiento: la regla ya está escrita.",
      "Ocultar los cuatro casos acordados desperdicia los ejemplos que la técnica necesita.",
      "Mostrar los cuatro casos y la regla aplicada es prompting con pocos ejemplos, y la tarea no pide más.",
      "Un prompt por cada cifra parte un trabajo que no hace falta descomponer."
    ],
    /* 30 pareja de métricas */
    [
      "La diversidad mira si hay situaciones variadas y la tasa de éxito mira si el guion de API llega a ejecutarse.",
      "Exactitud y completitud comparan con requisitos, y el tiempo no mide ni cobertura de situaciones ni fiabilidad del guion.",
      "Precisión y encaje contextual dejan fuera la pregunta de si el guion se ejecuta.",
      "Sin mirar la ejecución no se sabe si los guiones de API son fiables."
    ],
    /* 31 caminos felices */
    [
      "Tardar poco no dice nada de la variedad de los casos ni de si los guiones pasan.",
      "Poca variedad es un problema de diversidad, y los guiones que fallan al lanzarse se ven en la tasa de éxito de ejecución.",
      "La longitud del prompt y los tokens no describen ni la repetición del camino feliz ni los fallos de ejecución.",
      "Que el texto suene a requisito no detecta caminos repetidos ni guiones que no se ejecutan."
    ],
    /* 32 analizar salidas */
    [
      "Clasificar los resultados que contradicen el requisito y ver cómo el prompt los indujo es análisis de salidas.",
      "Una prueba A/B compara dos versiones. No explica por qué esta salida contradice el requisito.",
      "Acortar o alargar el prompt cambia el contexto, pero no diagnostica el error.",
      "Una encuesta sobre claridad no relaciona el oráculo falso con el prompt."
    ],
    /* 33 por dónde empezar */
    [
      "Votar variantes sin leer los oráculos no muestra en qué se oponen a la regla de negocio.",
      "Hay que mirar las salidas incorrectas, agrupar cómo niegan el requisito y con eso reescribir el prompt.",
      "Borrar restricciones alarga la respuesta y no explica el oráculo contradictorio.",
      "El gusto por el formato de la tabla no tiene que ver con una regla de negocio incumplida."
    ],
    /* 34 definición alucinación */
    [
      "Fallar un razonamiento de varios pasos es un error de razonamiento, no una alucinación.",
      "Una inclinación heredada de los datos de entrenamiento es un sesgo, no una alucinación.",
      "Una alucinación es una salida irrelevante o falsa respecto de la tarea, presentada como válida.",
      "El idioma de la salida no define la alucinación."
    ],
    /* 35 campo inventado */
    [
      "No hay nada en el caso que hable de infrarrepresentación en los datos de entrenamiento.",
      "No se describe un fallo al encadenar pasos lógicos, sino un hecho inventado.",
      "Afirmar un campo obligatorio que no está en la especificación es una alucinación.",
      "La ventana de contexto limita cuánto texto se considera. No explica un campo inventado."
    ],
    /* 36 tienda */
    [
      "El carrito y el pago están en el encargo, así que el caso es pertinente.",
      "Los códigos de descuento están nombrados. Comprobar uno caducado no es inventar una función.",
      "El correo de confirmación está en el encargo.",
      "La lista de deseos no se menciona en ninguna parte: es el caso inventado."
    ],
    /* 37 app médica */
    [
      "El alta está en la descripción. Rechazar un documento inválido sigue siendo esa función.",
      "La receta electrónica está citada. Exigir el identificador del profesional no inventa otra función.",
      "El aviso de cita está descrito. Añadir un canal parte de una función que sí existe.",
      "Pagar con una pasarela no aparece en la descripción: es la alucinación."
    ],
    /* 38 entrada estructurada */
    [
      "Una entrada clara no reduce el esfuerzo de ajustar el modelo.",
      "El beneficio directo es menos ambigüedad en la salida, porque hay menos malentendidos sobre la entrada.",
      "La relevancia depende del contexto, no la garantiza el formato por sí solo.",
      "Un formato fijo no busca respuestas más creativas: pide que se respete la estructura."
    ],
    /* 39 tabla */
    [
      "El modelo no olvida su conocimiento general por recibir una tabla.",
      "Las columnas fijas reducen los malentendidos que provocaba el párrafo libre.",
      "Una tabla de entrada, acción y resultado no aporta el contexto de riesgo.",
      "El formato no empuja a inventar columnas: hace lo contrario."
    ],
    /* 40 temperatura */
    [
      "La tasa de aprendizaje actúa en el entrenamiento, no al generar la respuesta.",
      "Bajar la temperatura estrecha la distribución y da salidas más estables durante la inferencia.",
      "Subir la semilla no estrecha la distribución. La semilla sirve para reproducir, no para quitar variabilidad.",
      "Bajar la semilla tampoco concentra la probabilidad. El valor alto o bajo de la semilla no tiene ese efecto."
    ],
    /* 41 menos variación */
    [
      "Subir la tasa de aprendizaje no interviene al generar y, además, sería reentrenar.",
      "Reducir la temperatura hace menos azarosa la elección del siguiente token, sin reentrenar.",
      "Una semilla alta no aplana la distribución de probabilidad.",
      "Una semilla baja tampoco concentra la probabilidad."
    ],
    /* 42 privacidad INCORRECTA */
    [
      "Es una preocupación real: las salidas pueden exponer datos sensibles sin que esa fuera la intención.",
      "Es una preocupación real: la herramienta puede guardar o tratar datos sensibles sin un consentimiento claro.",
      "Es una preocupación real: saltarse una norma como el RGPD puede acabar en un conflicto legal.",
      "Si el modelo no se entrenó con datos reales, una alucinación al fabricar datos sintéticos no está revelando esos datos. Esta afirmación es la incorrecta."
    ],
    /* 43 compañero */
    [
      "Alucinar y filtrar no son lo mismo. Inventar no implica haber visto el dato real.",
      "Sin datos sensibles en el entrenamiento, lo inventado es sintético. Una coincidencia con un dato real es posible, pero muy poco probable.",
      "El RGPD no convierte una alucinación en una filtración. El fallo del argumento es otro.",
      "Los modelos sí pueden generar datos que parecen personales. El matiz es que parecerlo no es filtrar un dato real."
    ],
    /* 44 vector entrenamiento */
    [
      "La generación de código malicioso actúa durante el uso, por ejemplo con una puerta trasera. Aquí se toca el entrenamiento.",
      "La manipulación del contexto busca extraer datos confidenciales, no meter resultados falsos en el entrenamiento.",
      "La manipulación de solicitudes altera la salida en tiempo de ejecución, no el conjunto con el que el modelo aprende.",
      "Meter resultados falsos en el conjunto de entrenamiento para desviar las recomendaciones es envenenamiento de datos."
    ],
    /* 45 relacionar vectores. Correcta 1C, 2D, 3A, 4B */
    [
      "1C: sonsacar claves del entrenamiento es manipulación del contexto. 2D: una captura trucada en ejecución es manipulación de solicitudes. 3A: falsear el ajuste fino es envenenamiento. 4B: un prompt que induce fallos ocultos en el guion es generación de código malicioso.",
      "Asigna al contexto la inducción de fallos en el guion (B), que es generación de código malicioso, y deja la clave (C) en ese último vector.",
      "Pone la captura trucada en el contexto y el envenenamiento del ajuste fino en la manipulación de solicitudes.",
      "Cruza el envenenamiento con la captura y la generación de código malicioso con el falseo del ajuste fino."
    ],
    /* 46 llamada oculta */
    [
      "El envenenamiento exige tocar los datos de entrenamiento, y el enunciado dice que no se han tocado.",
      "La manipulación del contexto busca extraer datos confidenciales del entrenamiento, no insertar una llamada.",
      "Inducir durante el uso una llamada externa oculta en el guion es generación de código malicioso.",
      "Sí hay ataque aunque no haya reentrenamiento: este vector actúa en el uso, no en el entrenamiento."
    ],
    /* 47 mitigación */
    [
      "Comparar modelos mira la exactitud del resultado, no la privacidad de los datos.",
      "Sustituir los datos sensibles por una versión anonimizada reduce el riesgo de que entren en el modelo.",
      "Abrir el acceso a los datos sensibles aumenta el riesgo, no lo mitiga.",
      "Quitar el cifrado facilita la filtración o el robo."
    ],
    /* 48 expedientes */
    [
      "Dejar nombres y documentos reales aumenta la exposición.",
      "Quitar o sustituir los identificadores antes de armar el prompt es anonimizar, que es la mitigación pedida.",
      "Desactivar el cifrado del almacén aumenta el riesgo.",
      "Abrir la base de producción a todo el equipo amplía quién puede ver los expedientes."
    ],
    /* 49 energía correcta */
    [
      "La imagen gasta más energía, pero no por eso emite menos CO₂.",
      "Una búsqueda con IA generativa gasta más, no menos, que una búsqueda web clásica.",
      "Generar imágenes exige mucho más cómputo que generar texto y, por eso, mucha más energía.",
      "A escala de millones de usuarios, el texto sí supone un consumo apreciable."
    ],
    /* 50 capturas vs texto */
    [
      "No cuestan lo mismo: la imagen es mucho más intensiva en cómputo.",
      "Las capturas consumen bastante más energía por la complejidad de generar imagen.",
      "Que el texto se use masivamente no lo hace más caro por petición que la imagen, ni la imagen queda fuera de ese uso.",
      "Gastar más energía no implica, por definición, emitir menos CO₂."
    ],
    /* 51 normas DOS. Correctas 1 y 3 */
    [
      "ISO/IEC 25010 es el modelo de calidad de producto del nivel fundamentos. El programa no la cita para el uso de IA generativa en la prueba.",
      "ISO/IEC 23053:2022 es el marco de sistemas de IA con aprendizaje automático. En la prueba, el programa lo usa para calidad de datos, transparencia y seguridad.",
      "ISO/IEC/IEEE 29119-2 cubre procesos de prueba, no el uso de IA generativa.",
      "ISO/IEC 42001:2023 fija requisitos para gestionar sistemas de IA en la organización, y el programa la cita junto con la 23053.",
      "ISO/IEC/IEEE 29119-3 cubre documentación de prueba, no el gobierno de la IA generativa."
    ],
    /* 52 dos referencias */
    [
      "29119-3 y 25010 son documentación y calidad de producto, no las referencias de IA del programa.",
      "ISO/IEC 23053:2022 e ISO/IEC 42001:2023 son las dos normas que el programa cita para este uso.",
      "29119-2 y 25010 cubren procesos y calidad de producto, no la gestión de sistemas de IA.",
      "El programa sí nombra normas de IA. No se queda en el glosario de fundamentos."
    ],
    /* 53 componente */
    [
      "El back-end recupera los datos, los combina con lo que escribió la persona y deja el prompt listo.",
      "El front-end recoge la entrada y muestra la salida. No arma el prompt.",
      "La autenticación controla el acceso. No combina datos ni prepara el prompt.",
      "El posprocesamiento retoca la salida del modelo, no el prompt de entrada."
    ],
    /* 54 dónde */
    [
      "La pantalla es el front-end: recoge el texto, no recupera de la base vectorial.",
      "Recuperar de la base vectorial y armar el prompt, antes de llamar al modelo, ocurre en el back-end.",
      "Dar o negar el acceso es autenticación.",
      "Revisar la respuesta cuando el modelo ya contestó es posprocesamiento."
    ],
    /* 55 RAG banco */
    [
      "Consultar una función, recuperar los fragmentos pertinentes, juntarlos con los casos históricos y generar con eso es el uso propio de RAG.",
      "Volcar la base completa en un solo prompt no es recuperar lo pertinente.",
      "Revisar a mano y reescribir la consulta sustituye la recuperación automática que define a RAG.",
      "Ignorar lo recuperado y fiarse solo del entrenamiento anula la generación aumentada."
    ],
    /* 56 secuencia RAG */
    [
      "RAG no reentrena el modelo desde cero ni borra la base para generar solo de memoria.",
      "Fragmentar, limpiar, guardar como incrustaciones, recuperar por similitud y generar con esos fragmentos es el proceso RAG.",
      "Enviar el documento entero, sin fragmentar ni incrustar, se salta la recuperación.",
      "Inventar la especificación y buscarla después invierte el proceso y favorece la alucinación."
    ],
    /* 57 agentes */
    [
      "El número de agentes no es la mejora de fondo. Lo que importa es el grado de intervención humana.",
      "Las verificaciones complejas no tienen por qué pagarse con menos eficiencia: el agente autónomo busca justo esa eficiencia.",
      "Pueden trabajar con poca intervención (eficiencia) o con supervisión humana (calidad), y ese equilibrio es el aporte.",
      "Quitar la verificación no es aceptable. Los agentes no eliminan esa necesidad."
    ],
    /* 58 dinero */
    [
      "Autonomía para preparar datos, donde aporta velocidad, y supervisión humana donde el caso toca dinero. La verificación no se elimina.",
      "Borrar la aceptación humana en los casos de dinero quita justamente el control que el riesgo pide.",
      "No es cierto que la calidad solo mejore a costa de ir más lento.",
      "El programa sí distingue el agente autónomo del semiautónomo, según cuánta intervención humana haya."
    ],
    /* 59 ajuste fino INCORRECTA */
    [
      "Es correcta: el ajuste fino entrena un modelo preentrenado con datos de la tarea.",
      "No sustituye el conocimiento general ni hace desaparecer el sobreajuste. Esta afirmación es la incorrecta.",
      "Es correcta: modifica parámetros con un conjunto dirigido a un dominio o tarea.",
      "Es correcta: sin datos de calidad y específicos de la tarea, el resultado puede salir sesgado o inexacto."
    ],
    /* 60 sobreajuste */
    [
      "El ajuste fino adapta el modelo. No está para borrar el conocimiento general.",
      "Responder solo al proyecto con el que se ajustó, y mal a uno parecido, es sobreajuste. El ajuste fino no elimina ese riesgo.",
      "El síntoma aparece por los datos del ajuste, no por el paso que revisa la salida.",
      "El problema es un conjunto estrecho, no unos datos demasiado variados o de demasiada calidad."
    ],
    /* 61 LLMOps foco */
    [
      "LLMOps no consiste en impedir que la prueba use IA generativa.",
      "Su foco es gestionar el modelo durante el ciclo de vida, incluida la privacidad, la seguridad y el coste.",
      "No se reduce a limitar el uso a chatbots.",
      "No busca automatizar todas las tareas ni quitar la supervisión humana."
    ],
    /* 62 disciplina */
    [
      "Versionar prompts y mirar accesos y coste no es tocar los parámetros del modelo. Eso sería ajuste fino.",
      "Operar el modelo a lo largo de su vida, con privacidad, seguridad y coste, es LLMOps.",
      "No se describe una recuperación de fragmentos. RAG sería otra cosa.",
      "Tener varias versiones del prompt no convierte la disciplina en meta-prompting, que es refinar el prompt con el modelo."
    ],
    /* 63 sombra correcta */
    [
      "La IA en la sombra no hace cumplir las políticas: las esquiva.",
      "No quita la necesidad de licencias claras. Al contrario, las vuelve más opacas.",
      "No reduce las disputas de propiedad intelectual: las aumenta.",
      "Una herramienta no aprobada suele carecer de controles y puede abrir accesos no autorizados a información sensible."
    ],
    /* 64 chat público */
    [
      "Sacar los requisitos del proceso no los protege más.",
      "Usar un chat que la organización no ha aprobado es IA en la sombra, con riesgo de filtración, de licencia opaca y de disputas de propiedad intelectual.",
      "El riesgo que describe el programa es de datos y de gobierno, no de rendimiento del modelo.",
      "ISO/IEC/IEEE 29119-3 es documentación de prueba. No es la referencia de este caso."
    ],
    /* 65 estrategia */
    [
      "La formación debe dar habilidad de uso. Un certificado por cada modelo no es el aspecto clave.",
      "Elegir modelos que encajen con los entornos y las herramientas que ya existen es parte de la estrategia.",
      "Hacen falta datos suficientes y de calidad, no la mayor cantidad posible aunque sea irregular.",
      "Las métricas tienen que ser las de la tarea de prueba, no el catálogo del aprendizaje supervisado copiado tal cual."
    ],
    /* 66 corrección de estrategia */
    [
      "Cantidad sin criterio y métricas clásicas importadas no son el núcleo que pide el programa.",
      "Hacen falta datos buenos en la cantidad que el objetivo necesita, y métricas de la tarea (relevancia, éxito de ejecución, eficiencia), no el catálogo clásico entero.",
      "No pide retirar los entornos actuales ni medir solo con benchmarks públicos de código.",
      "Los certificados nominales no son el contenido de la estrategia."
    ],
    /* 67 criterio de selección */
    [
      "Un benchmark público de generación de código solo importa si la tarea es esa. No sirve para cualquier tarea de prueba.",
      "El cómputo necesario para ejecutar el modelo es un coste recurrente, y valorarlo es un criterio de selección.",
      "La compatibilidad total con todos los benchmarks comunitarios no es un criterio del programa.",
      "Una prueba de concepto se hace una vez. No es un coste recurrente."
    ],
    /* 68 factura y referencias */
    [
      "El coste recurrente sí se considera, y el benchmark no tiene que ser el público de generación de código.",
      "La factura mensual de inferencia es coste recurrente de ejecución, y el acierto frente a las referencias propias es rendimiento en la tarea. Los dos son criterios del programa.",
      "No están comprobando compatibilidad plena con la comunidad de benchmarks.",
      "La factura mensual se repite. No es un coste de una sola vez."
    ],
    /* 69 tres fases */
    [
      "Esas son las tres fases del programa: descubrimiento, inicio y definición del uso, y utilización e iteración.",
      "Concienciación, priorización y seguimiento mezclan actividades, pero no son las fases nombradas.",
      "Planificación, experimentación y refinamiento es otra lista, no la del programa.",
      "Formación, prueba, implementación y escalado tampoco son las tres fases."
    ],
    /* 70 orden de fases */
    [
      "Invierte el orden: formar y experimentar es lo primero, no la utilización.",
      "Formar, dar acceso y probar casos pequeños es descubrimiento. Elegir usos es inicio y definición. Seguir el avance y sostener el cambio es utilización e iteración.",
      "La fase de inicio no incluye la formación inicial ni el seguimiento posterior.",
      "El programa sí ordena la adopción en esas tres fases."
    ],
    /* 71 competencia */
    [
      "Con la tecnología actual no se pueden impedir del todo las alucinaciones. La competencia es reconocerlas y mitigarlas.",
      "Elegir una automatización por palabras clave, sin relación con el modelo, no cubre el trabajo con LLM.",
      "Elegir el modelo según si se puede adaptar o ajustar a la tarea de prueba es una competencia del probador.",
      "Validar los datos con los que se construyó el modelo es trabajo de quien lo desarrolla, no del probador."
    ],
    /* 72 expectativa */
    [
      "No existe una técnica de prompting que elimine las alucinaciones.",
      "Lo que se espera es identificarlas y mitigar su riesgo, igual que el de los sesgos y los errores de razonamiento, no impedir que existan.",
      "El probador no puede dejar de revisarlas y pasar el tema a quien entrena el modelo.",
      "No son un fallo de la herramienta de gestión de pruebas."
    ],
    /* 73 desarrollar competencia */
    [
      "Depender de cursos externos y meter la IA de golpe en todas las tareas no es el enfoque recomendado.",
      "Experimentar cada persona por su cuenta, sin proceso, no asegura el aprendizaje.",
      "Lo recomendado es práctica gradual, ejercicios guiados, aprendizaje entre pares y comunidades para compartir conocimiento.",
      "La teoría de un curso externo no construye por sí sola el saber hacer."
    ],
    /* 74 taller del lunes */
    [
      "No es el enfoque recomendado: falta el proceso gradual y sobra el cambio de golpe.",
      "Concentra el aprendizaje en un experto externo y mete la IA en todas las tareas de una vez, en lugar de la práctica interna y gradual.",
      "Un curso externo puede ayudar. No está prohibido: el fallo es que sea el único eje.",
      "El programa no pide un aprendizaje solo teórico. Pide práctica."
    ],
    /* 75 roles */
    [
      "El probador pasa de diseñar todos los casos a mano a guiar y comprobar lo que genera la IA.",
      "Quien dirige no abandona la gestión para estudiar el funcionamiento interno de la tecnología.",
      "Supervisar los procesos de prueba basados en IA sigue siendo de quien dirige, no del probador.",
      "El objetivo no es dejar de contar con las personas y apoyarse solo en la IA."
    ],
    /* 76 pareja */
    [
      "Invierte los roles: la supervisión del proceso es de quien dirige, y los prompts de cada caso los guía el probador.",
      "El probador guía y verifica lo generado. Quien dirige mantiene la estrategia, el riesgo y la supervisión, equilibrando personas e IA.",
      "Abandonar la gestión para estudiar la arquitectura del modelo no es el cambio de rol descrito.",
      "Alguien tiene que verificar las salidas. Ni el director se apoya solo en la IA ni el probador deja de participar."
    ],
    /* 77 tokenización i-v. Correctas i, ii, iv. iii y v falsas */
    [
      "i, ii y iv son ciertas: tokenizar es partir el texto, la ventana acota los tokens considerados y lo que no cabe se descarta.",
      "Incluye iii y v, que son falsas: ampliar la ventana no da acceso a documentos no incluidos, y convertir un token en vector es una incrustación, no tokenizar.",
      "Incluye iii, que es falsa, y deja fuera i, que es cierta.",
      "Incluye v, que confunde tokenización con incrustación, y deja fuera ii, que es cierta."
    ],
    /* 78 tipos i-v. Correctas ii y iii */
    [
      "Incluye i, que es falsa: el fundacional no es la mejor opción para casos listos sin una entrada estructurada.",
      "ii y iii son las ciertas: el de razonamiento prioriza a partir de informes y el ajustado por instrucciones sigue un formato como Gherkin.",
      "i y iv son falsas. El ajustado por instrucciones no decide solo, en tiempo real, qué pruebas ejecutar.",
      "iv y v son falsas: el de razonamiento no está pensado para copiar una plantilla rígida, y iii queda acompañada de dos errores."
    ],
    /* 79 seis partes. Correctas i, ii, iv. iii y v falsas */
    [
      "i, ii y iv describen bien el rol, los datos de entrada y el formato de salida.",
      "iii es falsa: la estructura de la respuesta es formato de salida, no una restricción. v también es falsa.",
      "iii es falsa y falta el rol (i), que sí está bien descrito.",
      "iii y v confunden restricciones y contexto con el formato de salida, que es donde van las columnas de la tabla."
    ],
    /* 80 técnicas i-iv. Correctas i, ii, iv. iii falsa */
    [
      "i, ii y iv son ciertas. iii no lo es: reescribir el prompt a mano no es meta-prompting.",
      "Incluye iii, que describe un ajuste manual, y deja fuera el encadenamiento.",
      "ii es cierta, pero iii es falsa.",
      "Se queda con iii, que es falsa, y con iv, y pierde las dos técnicas bien descritas."
    ],
    /* 81 sistema y usuario. Correctas i y ii */
    [
      "i y ii son ciertas: el de sistema fija el marco de la sesión y el de usuario lleva la petición de cada turno.",
      "iv es falsa: las reglas globales no las pone el prompt de usuario.",
      "iii es falsa: el prompt de sistema no se ajusta solo con cada mensaje.",
      "iii y iv son las dos afirmaciones falsas."
    ],
    /* 82 secuencia API. Correcta i, ii, iii */
    [
      "i, ii y iii encadenan de verdad: generar, clasificar lo generado y analizar cobertura sobre lo clasificado.",
      "iv pide todo en un solo paso, así que no es encadenamiento, aunque después aparezca iii.",
      "Se salta la clasificación (ii) e incluye v, buscar contradicciones, que no toca porque la especificación ya fue revisada.",
      "v no forma parte del encargo e iv vuelve a juntar los pasos en un solo prompt."
    ],
    /* 83 métricas i-iv. Correctas i, ii, iii. iv falsa */
    [
      "i, ii y iii son métricas del programa: exactitud y completitud, diversidad y tasa de éxito de ejecución.",
      "Incluye iv, que es falsa: la relevancia no se mide contando tokens.",
      "ii es cierta, pero iv no lo es, y faltan i y iii.",
      "Mezcla una métrica cierta (i) con la falsa (iv)."
    ],
    /* 84 alucinación i-iv. Correctas i y ii */
    [
      "i y ii distinguen bien la alucinación del error de razonamiento.",
      "iii es falsa: el idioma no define la alucinación.",
      "iv es falsa: un sesgo heredado de los datos no es lo mismo que una alucinación.",
      "iii y iv son las dos afirmaciones falsas."
    ],
    /* 85 privacidad i-iv. Correctas i, ii, iii. iv falsa */
    [
      "i, ii y iii son preocupaciones reales de privacidad. iv no lo es.",
      "Incluye iv: alucinar datos sintéticos no implica filtrar datos reales con independencia del entrenamiento.",
      "También incluye iv, que es la afirmación falsa.",
      "Junta i, que es cierta, con iv, que es falsa, y deja fuera dos preocupaciones reales."
    ],
    /* 86 energía i-iv. Correctas i, ii, iv. iii falsa */
    [
      "i, ii y iv son ciertas. iii no lo es: a escala de millones de usuarios el texto sí suma un consumo relevante.",
      "Incluye iii, que niega ese consumo acumulado.",
      "ii es cierta, pero iii es falsa, y faltan i y iv.",
      "Se queda con la afirmación falsa y pierde las dos primeras."
    ],
    /* 87 RAG i-iv. Correctas i, ii, iv. iii falsa */
    [
      "i, ii y iv describen RAG: recuperar, combinar con la consulta y alinear con documentación vigente.",
      "Incluye iii, que es falsa: RAG no sustituye al entrenamiento ni elimina las alucinaciones.",
      "ii es cierta, pero iii promete algo que RAG no garantiza.",
      "iii es falsa y falta la recuperación, que es la base de la técnica."
    ],
    /* 88 ajuste fino i-iv. Correctas i, ii, iv. iii falsa */
    [
      "i, ii y iv son ciertas. iii no lo es: el ajuste fino no sustituye el conocimiento general ni garantiza que no haya sobreajuste.",
      "Incluye iii, que es justo la afirmación incorrecta sobre el ajuste fino.",
      "ii es cierta, pero iii es falsa.",
      "Deja fuera los datos de calidad (iv) y conserva la afirmación falsa."
    ],
    /* 89 sombra i-iv. Correctas i y ii */
    [
      "i y ii son ciertas: herramientas no aprobadas, con riesgo de acceso indebido a información sensible.",
      "iii es falsa: la IA en la sombra no hace cumplir las políticas de datos.",
      "iv es falsa: no reduce las disputas de propiedad intelectual, las aumenta.",
      "iii y iv son las dos afirmaciones falsas."
    ],
    /* 90 roles i-iv. Correctas i y iii */
    [
      "i y iii reparten bien: el probador guía y verifica, y quien dirige sigue gestionando e incorpora estrategia, riesgos y competencias.",
      "ii es falsa: quien dirige no pasa a centrarse en el funcionamiento interno de los LLM.",
      "ii y iv son falsas. iv, además, sustituye a las personas por la IA.",
      "iv es falsa y deja fuera el cambio real del probador."
    ],
    /* 91 mitigar DOS. Correctas 0 y 1 */
    [
      "Anonimizar o sustituir por datos sintéticos antes de enviarlos al modelo reduce la exposición.",
      "Cifrar en tránsito y en reposo protege los datos de prueba sensibles.",
      "El acceso sin restricciones aumenta el riesgo de privacidad.",
      "Desactivar el cifrado va en contra de la mitigación.",
      "Comparar varios modelos busca exactitud, no protege los datos."
    ],
    /* 92 componentes DOS. Correctas 0 y 1 */
    [
      "El front-end es la interfaz: recoge la entrada y muestra la salida.",
      "El back-end combina la entrada con datos recuperados y arma el prompt.",
      "Autenticar controla el acceso. No arma el prompt.",
      "El posprocesamiento trabaja sobre la salida del modelo, no recupera de la base vectorial.",
      "La base vectorial es un almacén aparte. No la guarda el LLM."
    ],
    /* 93 estrategia DOS. Correctas 0 y 1 */
    [
      "Elegir modelos que se integren con los entornos y las herramientas existentes es parte de la estrategia.",
      "Definir políticas de uso y de gobernanza de datos también lo es.",
      "Un certificado por cada modelo no es un aspecto clave de la estrategia.",
      "Acumular datos sin criterio de calidad no es lo que pide el programa.",
      "Las métricas del aprendizaje supervisado, copiadas tal cual, no miden las salidas de una tarea de prueba."
    ],
    /* 94 1.1.1 espectro. Correcta 3 */
    [
      "Las reglas ya escritas describen la IA simbólica, no la creación de mensajes nuevos.",
      "Elegir características a mano es aprendizaje automático clásico.",
      "Clasificar mensajes que ya existen, sin crear otros, no es IA generativa.",
      "Inventar mensajes que el sistema no ha mostrado, parecidos a los reales, es crear datos nuevos: IA generativa."
    ],
    /* 95 1.1.4 multimodal. Correcta 1 */
    [
      "Un modelo solo de texto no interpreta la captura como imagen.",
      "La entrada es una imagen más una petición en texto. Eso lo cubre un modelo multimodal de visión y lenguaje.",
      "Las reglas simbólicas no ven la pantalla.",
      "La captura no trae características ya elegidas para un modelo clásico."
    ],
    /* 96 1.2.1 DOS. Correctas 0 y 2 */
    [
      "Resumir un informe y marcar contradicciones es una capacidad de lenguaje aplicada a la prueba.",
      "Cerrar un defecto sin lectura humana delega el juicio que el programa deja en la persona.",
      "Proponer oráculos desde los criterios de aceptación es un encargo realista para el modelo.",
      "El entrenamiento con internet no vuelve cierta la salida.",
      "Ejecutar un parche en producción sin revisión no es una capacidad clave de apoyo a la prueba."
    ],
    /* 97 1.2.2 aplicación. Correcta 1 */
    [
      "La charla abierta es un chatbot, no un flujo de prueba cerrado.",
      "Historia, criterio recuperado y plantilla fija describen una aplicación de prueba que usa el modelo dentro de un proceso.",
      "Cambiar el nombre del chat no define un recorrido ni un formato.",
      "Una hoja de cálculo sin modelo no es una aplicación impulsada por un modelo."
    ],
    /* 98 2.1.2 un ejemplo. Correcta 1 */
    [
      "Sin ejemplos no se muestra el caso aceptado, y aquí sí se muestra.",
      "Mostrar un único caso para imitar su formato es la técnica de un ejemplo.",
      "Pocos ejemplos usa varios casos. Uno solo no es esa colección.",
      "El meta-prompting refina el prompt. No consiste en imitar ese caso Gherkin."
    ],
    /* 99 2.2.2 diseño. Correcta 1 */
    [
      "Un pedido vago no nombra criterios ni la dependencia del pago respecto del acceso.",
      "Separar la generación por criterio y el orden por dependencias aplica el diseño con encadenamiento.",
      "Solo datos límite no producen los casos ni su prioridad.",
      "Ejecutar en producción no es diseñar ni implementar la prueba."
    ],
    /* 100 2.2.3 regresión. Correcta 0 */
    [
      "Localizar los guiones del descuento y proponer su actualización es el uso de IA generativa en la regresión.",
      "Borrar la batería y generar otra aplicación no mantiene la regresión.",
      "El correo de la release no revisa ni actualiza los guiones.",
      "Descartar la regresión por el tamaño aparente del cambio no es una decisión del modelo."
    ],
    /* 101 2.2.4 monitorización. Correcta 0 */
    [
      "Resumir avance, desvíos y riesgos con los datos del ciclo es monitorizar y controlar.",
      "Casos de una historia nueva pertenecen al diseño, no al control del ciclo.",
      "Reescribir producción no es una tarea de monitorización de la prueba.",
      "Definir una palabra sin los resultados del ciclo no controla nada."
    ],
    /* 102 2.2.5 elegir técnica. Correcta 1 */
    [
      "Sin ejemplos se ignora un formato que el equipo ya tiene en cuatro filas.",
      "Mostrar esas filas es pocos ejemplos: fijan formato y contenido.",
      "La tabla de decisiones no es un prompt de sistema, y el meta-prompting no es la técnica directa aquí.",
      "Un paso por celda parte una transformación que se puede hacer de una vez con ejemplos."
    ],
    /* 103 2.3.2 afinar. Correcta 1 */
    [
      "Aceptar la primera salida no evalúa ni ajusta el prompt.",
      "Ver qué faltó, cambiar la instrucción o los ejemplos y comparar es el ciclo de afinado.",
      "Más temperatura aumenta el azar. No incorpora los límites de forma controlada.",
      "Cambiar de tarea evita la revisión en lugar de hacerla."
    ],
    /* 104 3.1.2 sesgo. Correcta 1 */
    [
      "La regla de edad está en la especificación. Esa frase no inventa un campo.",
      "Atribuir una cualidad a un grupo de países sin apoyo en la especificación es un sesgo.",
      "No hay un fallo al calcular 18. La regla se escribió bien.",
      "Esa frase no es una técnica para estabilizar las respuestas."
    ],
    /* 105 3.1.3 mitigar. Correcta 0 */
    [
      "Citar el fragmento y revisar lo que no cita obliga a la salida a apoyarse en la especificación.",
      "Subir la temperatura no reduce las invenciones.",
      "Quitar la especificación deja al modelo sin la fuente que debería respetar.",
      "El tono profesional no demuestra que los campos existan."
    ],
    /* 106 3.1.4 no determinismo. Correcta 0 */
    [
      "Temperatura baja, semilla si existe y reglas de comprobación reducen y controlan la variación.",
      "Subir la temperatura aumenta las diferencias entre corridas.",
      "Borrar el prompt de sistema quita un ancla estable.",
      "La prosa libre sin comparación no mitiga la variación."
    ],
    /* 107 3.4.1 DOS marcos. Correctas 0 y 1 */
    [
      "El Reglamento europeo de IA es el marco legal que el programa cita para clasificar usos según el riesgo.",
      "El marco NIST es la referencia de gestión de riesgos de IA que el programa incluye junto a las normas ISO.",
      "ISO/IEC/IEEE 29119-2 cubre procesos de prueba, no este marco de IA.",
      "ISO/IEC 25010 es calidad de producto, no el gobierno de la IA generativa en la prueba.",
      "El glosario de fundamentos no reemplaza esas referencias."
    ],
    /* 108 4.1.3 agente. Correcta 0 */
    [
      "El agente puede preparar los datos con un objetivo, y la aceptación humana se mantiene en el pago.",
      "Tener un objetivo no autoriza a quitar la revisión donde el riesgo la pide.",
      "Un agente de este tipo sí puede llamar herramientas. No se limita a charlar.",
      "Desplegar sin registro elimina el control que el uso del agente debe conservar."
    ],
    /* 109 4.2.2 operaciones. Correcta 0 */
    [
      "Versiones, vigilancia de la calidad y control de cambios son operaciones del modelo en uso.",
      "Elegir características a mano y no medir es propio de otro tipo de modelo, no de estas operaciones.",
      "El log de entrenamiento no sustituye el informe de prueba.",
      "Publicar el modelo sin acceso controlado va contra la gestión del cambio."
    ],
    /* 110 5.1.3 modelo pequeño. Correcta 1 */
    [
      "El modelo más grande en una nube pública saca los datos y no atiende el coste.",
      "Un modelo pequeño interno puede cubrir una clasificación corta sin sacar los datos, si la calidad alcanza.",
      "El tamaño sí cambia el coste y el lugar donde se procesan los datos.",
      "Que la tarea sea corta no obliga a usar solo reglas simbólicas."
    ],
    /* 111 5.1.4 fases. Correcta 1 */
    [
      "Ese orden invierte las fases. El descubrimiento va primero.",
      "Las tres fases son descubrimiento, inicio y definición del uso, y uso e iteración. Pueden avanzar en paralelo según el caso de uso.",
      "Comprar un modelo y disolver el equipo no son las fases del programa.",
      "Desplegar en todos los procesos el primer día se salta el descubrimiento y la definición del uso."
    ],
    /* 112 5.2.1 habilidad. Correcta 0 */
    [
      "Escribir prompts, revisar la salida y detectar alucinaciones y sesgos es la habilidad que el programa pide.",
      "Memorizar el código del modelo no es necesario para probar con él.",
      "Los criterios de prueba siguen haciendo falta. El modelo no los trae cerrados.",
      "Más llamadas no sustituyen el trabajo en equipo."
    ],
    /* 113 5.2.2 equipo. Correcta 0 */
    [
      "Práctica guiada, de lo simple a lo fino, y el intercambio interno construyen la capacidad del equipo.",
      "Una charla seguida de una prohibición no deja practicar.",
      "Las herramientas no autorizadas son IA en la sombra, no un plan de formación.",
      "Sustituir al equipo en el piloto elimina a quien debía aprender."
    ]
  ];

  if (!window.BANCO || window.BANCO.length !== R.length) {
    throw new Error("porques.js no coincide con el banco: " + (window.BANCO ? window.BANCO.length : 0) + " frente a " + R.length);
  }
  window.BANCO.forEach(function (p, i) {
    if (!R[i] || R[i].length !== p.opciones.length) {
      throw new Error("Justificaciones desalineadas en la pregunta " + i + " (" + p.lo + ")");
    }
    p.porques = R[i];
  });
})();
