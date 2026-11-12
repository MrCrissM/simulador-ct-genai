/* Tercera tanda exigente, en español. Cubre ángulos del examen de muestra
   que las dos anteriores no preguntaban, con escenarios propios. */
(function () {
  function idPregunta(lo, enunciado, opciones) {
    var texto = lo + "|" + enunciado + "|" + opciones.join("|");
    var hash = 2166136261;
    for (var i = 0; i < texto.length; i++) {
      hash ^= texto.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return "genai-" + lo.replace(/\./g, "-") + "-" + (hash >>> 0).toString(36);
  }

  function q(lo, k, puntos, elegir, enunciado, opciones, correctas, porque, porques) {
    return {
      id: idPregunta(lo, enunciado, opciones),
      lo: lo,
      k: k,
      puntos: puntos,
      elegir: elegir,
      enunciado: enunciado,
      lista: null,
      opciones: opciones,
      correctas: correctas,
      porque: porque,
      exigente: true,
      _porquesLista: porques
    };
  }

  var nuevas = [
    q("1.1.1", "K1", 1, 1,
      "Quieren detectar grietas en fotos de tuberías, sin definir a mano las características de la imagen y sin generar fotos nuevas. ¿Qué tipo de IA encaja?",
      [
        "IA simbólica, porque una regla puede describir cada grieta posible.",
        "Aprendizaje automático clásico, porque alguien elige las características y luego el modelo clasifica.",
        "Aprendizaje profundo: la red aprende las características de la imagen y clasifica. No crea contenido.",
        "IA generativa, porque mirar una foto ya es producir una imagen nueva."
      ],
      [2],
      "Aprender rasgos de una imagen y clasificar, sin inventar otra imagen, es aprendizaje profundo. La generativa crearía contenido nuevo.",
      [
        "La simbólica no descubre patrones en fotos: aplica reglas escritas.",
        "El clásico pide que una persona elija las características. Aquí se pide no hacerlo.",
        "La red aprende los rasgos de la foto y se queda en clasificar. Eso es aprendizaje profundo.",
        "Detectar una grieta no es generar una foto. La generativa imita patrones para crear datos nuevos."
      ]),

    q("1.1.2", "K2", 1, 1,
      "En el recibo del agua, «impago» y «deuda» acaban cerca en el espacio numérico del modelo, y «litro» queda lejos de las dos. ¿Qué pieza explica esa cercanía?",
      [
        "La tokenización, que ya guarda el significado de cada palabra.",
        "La incrustación: el número de cada token acerca a los que se parecen en significado.",
        "La ventana de contexto, que ordena las palabras por fecha de factura.",
        "La semilla, que obliga a que dos sinónimos salgan en la misma posición."
      ],
      [1],
      "La incrustación es el vector que coloca cerca a los tokens de significado parecido. Tokenizar solo parte el texto.",
      [
        "Tokenizar parte el texto. No coloca los sinónimos cerca.",
        "Ese número representa el token y acerca a los que se parecen. Eso es la incrustación.",
        "La ventana limita cuánto texto entra. No ordena por fecha ni mide parecido.",
        "La semilla repite una secuencia aleatoria. No define la vecindad de los sinónimos."
      ]),

    q("1.1.3", "K2", 1, 1,
      "¿Cuál es la relación correcta entre el modelo fundacional, el ajustado por instrucciones y el de razonamiento?",
      [
        "El fundacional ya sigue encargos de prueba. El ajustado solo sirve para formato, y el de razonamiento es otro modelo de visión.",
        "El ajustado por instrucciones sale del fundacional y se afina para seguir mejor lo que se pide. El de razonamiento añade pasos cuando el problema hay que encadenarlo.",
        "Los tres se entrenan igual. Cambia el nombre según quién escriba el prompt.",
        "El de razonamiento es el general, y el fundacional es el que ya resuelve inferencias de varios pasos."
      ],
      [1],
      "El fundacional es el entrenamiento general. El ajustado sigue mejor la consigna. El de razonamiento encadena pasos. No son el mismo modelo con otro rótulo.",
      [
        "El fundacional no está especializado en seguir encargos, y el de razonamiento no es un modelo de visión.",
        "Esa es la cadena: general, luego seguimiento de la instrucción, y pasos extra si el problema se encadena.",
        "El tipo de entrenamiento cambia lo que el modelo hace bien. El nombre no es cosmético.",
        "Invierte los papeles. El general es el fundacional, no el de razonamiento."
      ]),

    q("1.1.4", "K2", 1, 1,
      "Hay wireframes de la pantalla de turnos de una veterinaria y las historias en texto. Quieren ver si un botón del dibujo no está en la historia. ¿Por qué ayuda un modelo de visión y lenguaje?",
      [
        "Porque valida solo todos los requisitos, sin que nadie mire la pantalla.",
        "Porque convierte el wireframe en el código de producción de la clínica.",
        "Porque puede mirar el dibujo y el texto juntos y señalar el desajuste.",
        "Porque optimiza el tiempo de carga de la aplicación en el móvil."
      ],
      [2],
      "Imagen y texto en la misma entrada permiten contrastar el dibujo con la historia. No valida solo, no genera el producto y no afina el rendimiento.",
      [
        "El programa no le atribuye validar requisitos sin una persona.",
        "El uso de prueba es contrastar y proponer casos, no entregar el código de producción.",
        "Ve el botón en el dibujo y lo compara con lo que dice la historia.",
        "El tiempo de carga no es lo que aporta el modelo de visión y lenguaje."
      ]),

    q("1.2.1", "K2", 1, 2,
      "En la prueba de los abonos de un ferry, ¿cuáles DOS encargos son capacidades realistas del modelo, con una persona que revisa?",
      [
        "Proponer valores límite de edad, ruta y tarifa.",
        "Bosquejar guiones a partir de los casos escritos y sugerir cómo mejorarlos.",
        "Ejecutar la batería y dar el veredicto sin un marco de prueba.",
        "Corregir en producción el defecto que describa el caso.",
        "Garantizar que los datos generados no tienen sesgo ni error."
      ],
      [0, 1],
      "Proponer datos y bosquejar guiones son apoyos. Ejecutar sin marco, corregir en producción o garantizar la ausencia de sesgo no son capacidades del modelo.",
      [
        "Los valores límite son una generación de datos que el equipo puede revisar.",
        "Pasar de un caso escrito a un guion, y proponer mejoras, es otro apoyo realista.",
        "La ejecución y el veredicto piden un marco. El modelo no los cierra solo.",
        "Corregir el producto en producción no es una tarea de apoyo a la prueba.",
        "El modelo no garantiza que lo generado esté libre de sesgo o de error."
      ]),

    q("1.2.2", "K2", 1, 1,
      "Quieren que el pipeline analice defectos del ferry y genere datos sintéticos, sin que nadie pegue el informe en un chat. ¿Qué modelo de interacción encaja?",
      [
        "Un chatbot en el que cada persona pega el defecto a mano y el modelo improvisa.",
        "Una aplicación de prueba por API, con un prompt claro y un formato de salida previsto.",
        "Un chatbot, porque escalar tareas automáticas se hace conversando.",
        "Una API cuya interfaz sea una charla abierta para quien no es técnico."
      ],
      [1],
      "El pipeline es un recorrido definido: entra el defecto, sale el dato. Eso es la aplicación por API, no la charla abierta.",
      [
        "Pegar a mano en un chat no es la integración automática, y sin consigna clara la salida se dispersa.",
        "La API mete el modelo en el proceso, con entrada y formato fijos.",
        "La conversación abierta no es el mecanismo para escalar el pipeline.",
        "La charla para ampliar el público es el chatbot. La API no se vuelve chat por usarse en un pipeline."
      ]),

    q("2.1.1", "K2", 1, 1,
      "En un prompt del recibo del agua, la línea dice: «Genera casos de límite para el campo importe». ¿Qué parte es?",
      [
        "Rol, porque habla como quien prueba importes.",
        "Contexto, porque describe el sistema de facturación.",
        "Instrucción: es la orden concreta de qué hay que hacer.",
        "Formato de salida, porque «casos» ya implica una tabla."
      ],
      [2],
      "Es una orden imperativa sobre la tarea. No asigna rol, no describe el sistema y no dice la forma de la respuesta.",
      [
        "No dice quién es el modelo. Dice qué debe generar.",
        "El contexto describiría el recibo o el portal. Esta línea no lo hace.",
        "«Genera casos de límite» es la instrucción.",
        "No pide columnas, viñetas ni JSON. Nombrar «casos» no fija el formato."
      ]),

    q("2.1.2", "K2", 1, 1,
      "Quien prueba no sabe cómo armar el prompt de los escenarios del ferry. Le pide al modelo un prompt mejor, lo revisa con él y repite hasta que la salida sirve. ¿Qué técnica es?",
      [
        "Encadenamiento, porque hay más de un mensaje.",
        "Un ejemplo, porque el primer prompt sirve de muestra de un caso.",
        "Pocos ejemplos, porque se iteró varias veces.",
        "Meta-prompting: el modelo propone y afina el propio prompt, con la persona."
      ],
      [3],
      "El objeto del trabajo es el prompt, no un caso ni un paso intermedio de la prueba. Eso es meta-prompting.",
      [
        "Encadenar parte la tarea de prueba y revisa salidas intermedias. Aquí se está reescribiendo el prompt.",
        "No se mostró un caso aceptado. Se pidió una redacción mejor del encargo.",
        "Iterar no convierte la técnica en pocos ejemplos. Pocos ejemplos muestra varios casos dentro del prompt.",
        "El modelo genera y refina el prompt junto con quien prueba."
      ]),

    q("2.1.3", "K2", 1, 1,
      "El prompt de sistema fija el rol de asistente de prueba y un tono formal para toda la sesión. En este turno la persona escribe: «Explica el muestreo del ferry en viñetas y con dos ejemplos». ¿Qué corresponde?",
      [
        "Las viñetas sustituyen al prompt de sistema desde este turno.",
        "El pedido de viñetas y ejemplos es el prompt de usuario de este turno. El de sistema sigue vigente.",
        "Lo que acaba de escribir la persona es el prompt de sistema, porque es más concreto.",
        "Los dos textos son formato de salida del modelo."
      ],
      [1],
      "El sistema permanece. El encargo de este turno, incluido el formato que pide ahora, es el prompt de usuario.",
      [
        "Un turno no reescribe la regla de la sesión.",
        "La persona cambia el encargo en cada turno. El rol y el tono siguen en el sistema.",
        "Que sea concreto no lo vuelve sistema. El sistema es el marco que no se muestra como encargo del día.",
        "El pedido describe cómo quiere la respuesta, pero el texto de la persona es el prompt de usuario, no la salida."
      ]),

    q("2.2.1", "K3", 2, 1,
      "Hay demasiadas condiciones de prueba del ferry y no da el tiempo. Se dispone de defectos anteriores, reglas de tarifa y requisitos de embarque. ¿Cuál es el mejor uso del modelo?",
      [
        "Pedirle un calendario que demuestre que el tiempo no alcanza.",
        "Pasarle defectos, tarifas y requisitos para que ordene las condiciones por riesgo, y probar primero las altas.",
        "Pedirle que genere y ejecute todas las condiciones antes del cierre.",
        "Pedirle un dato para cada combinación posible de tarifa, para no dejar ningún rincón fuera."
      ],
      [1],
      "Si el tiempo no alcanza, el análisis útil es priorizar con el riesgo que sale de defectos y reglas. Un calendario, ejecutarlo todo o cubrir cada combinación alarga o no decide.",
      [
        "Demostrar que falta tiempo no elige qué se prueba.",
        "El modelo usa la información de riesgo para ordenar. El equipo ejecuta por esa prioridad.",
        "Generar y ejecutar todo es justo lo que el plazo no permite, y el modelo no ejecuta la batería por su cuenta.",
        "Cubrir cada combinación alarga la prueba en vez de recortarla a lo que importa."
      ]),

    q("2.2.2", "K3", 2, 1,
      "El caso de cobrar el abono del ferry no tiene sentido si antes no se cubrió identificar al pasajero. ¿Cómo se le pide al modelo el diseño?",
      [
        "Un solo prompt: «casos buenos del abono», sin nombrar la identificación.",
        "Primero los casos de identificar al pasajero. Después, los del cobro, diciendo que dependen de esa identificación.",
        "Solo valores límite del importe, porque el diseño es un tema de datos.",
        "Que ejecute el cobro en producción para ver si el abono existe."
      ],
      [1],
      "El diseño tiene que respetar la dependencia. El segundo paso recibe la condición de que el pasajero ya está identificado.",
      [
        "Sin la dependencia, el modelo puede cobrar un abono de alguien que el caso no identificó.",
        "Separa el paso previo y se lo dice al modelo al pedir el cobro.",
        "Los límites del importe no ordenan los casos ni cubren la identificación.",
        "Ejecutar en producción no es diseñar la prueba."
      ]),

    q("2.2.3", "K3", 2, 1,
      "El campo de la tarifa del ferry cambió de nombre. El diff es de tres líneas y alguien propone no regresar. ¿Qué uso del modelo es el adecuado?",
      [
        "Aceptar que el cambio es pequeño y no tocar la batería.",
        "Usar el correo de la release como si fuera el guion actualizado.",
        "Pedirle qué guiones mencionan el campo viejo y una propuesta de actualización, y que el equipo acepte el cambio.",
        "Dejar que borre los guiones que fallen, para que el pipeline quede verde."
      ],
      [2],
      "En regresión el modelo señala qué guiones toca el cambio y propone cómo actualizarlos. La persona acepta. El tamaño del diff no cancela la regresión.",
      [
        "Tres líneas pueden romper el guion que aún nombra el campo viejo.",
        "El correo informa del cambio. No es el guion.",
        "Nombra el campo, los guiones y la actualización, y deja la aceptación en el equipo.",
        "Borrar lo que falla quita cobertura. No adapta el nombre nuevo."
      ]),

    q("2.2.4", "K3", 2, 1,
      "La dirección del ferry quiere, además de las cifras del ciclo, saber qué se desvía del plan y en qué trayecto importa. Los datos del ciclo ya están. ¿Qué encargo es monitorización?",
      [
        "Diseñar casos de una historia nueva de la cafetería del barco.",
        "Analizar la ejecución y los defectos de este ciclo y resumir desvíos, riesgos y decisiones, ligados al plan y a los trayectos.",
        "Reenviar por correo los tableros que ya existen, sin leerlos.",
        "Reescribir el código de la taquilla para que las cifras cuadren."
      ],
      [1],
      "Monitorizar usa los datos del ciclo que ya corre: avance, desvíos y riesgo. No diseña una historia nueva ni sustituye el código.",
      [
        "Una historia nueva es diseño, no lectura del ciclo en curso.",
        "El resumen sale de la ejecución y de los defectos, y dice qué se desvía y dónde importa.",
        "Reenviar el tablero no analiza. La información ya estaba disponible.",
        "Corregir el producto no es el informe del ciclo."
      ]),

    q("2.2.5", "K3", 2, 1,
      "No hay casos aceptados ni una rúbrica cerrada. Quien prueba tampoco tiene claro cómo pedir los escenarios del ferry y quiere que el modelo le proponga el prompt y lo afinen juntos. La tarea no se parte en pasos. ¿Qué técnica toca?",
      [
        "Pocos ejemplos, aunque no haya casos que mostrar.",
        "Encadenamiento, con un prompt por cada palabra del requisito.",
        "Sin ejemplos, escribiendo una rúbrica que el equipo todavía no tiene.",
        "Meta-prompting: el hueco está en el propio prompt, y el modelo ayuda a redactarlo."
      ],
      [3],
      "Si no hay ejemplos ni una forma ya escrita, y lo que se quiere mejorar es el prompt, la técnica es meta-prompting. Las otras piden material que no existe.",
      [
        "Sin casos no hay pocos ejemplos.",
        "La tarea no son pasos distintos. Partir por palabra no está pedido.",
        "Inventar una rúbrica que el equipo no tiene no es prompting sin ejemplos: esa técnica exige que la consigna ya baste.",
        "El modelo propone y afina el prompt junto con la persona."
      ]),

    q("2.3.1", "K2", 1, 1,
      "Se pidieron casos que cubran la tabla de decisión de las tarifas del ferry. El texto es correcto en la primera fila y se ejecuta, pero faltan combinaciones de la tabla. ¿Qué métrica ve ese hueco?",
      [
        "La completitud frente a la tabla: falta parte del objetivo pedido.",
        "La diversidad, porque hay más de un caso.",
        "El tiempo de escribir el caso a mano.",
        "El número de tokens del prompt."
      ],
      [0],
      "La completitud mira si la salida cubre el objetivo, aquí las combinaciones de la tabla. Que una fila sea exacta o que el guion corra no rellena lo que falta.",
      [
        "Faltan combinaciones que la tabla exigía. Eso es completitud, no un detalle de redacción.",
        "Tener varios casos no dice si están las combinaciones de la tabla.",
        "El tiempo habla de eficiencia. No cuenta las filas que faltan.",
        "Contar tokens no dice si la tabla quedó cubierta."
      ]),

    q("2.3.2", "K2", 1, 1,
      "Llevan varias vueltas cambiando el prompt de las tarifas y el mismo error de fecha vuelve. ¿Qué sigue, dentro del ciclo de afinar?",
      [
        "Otra prueba A/B que solo cambie la temperatura.",
        "Analizar esa salida repetida para ver por qué la fecha falla, ajustar con eso y comparar la corrida nueva con la anterior.",
        "Dar por buena la técnica porque ya se editó el prompt varias veces.",
        "Cambiar de tarea y dejar la fecha para otro ciclo."
      ],
      [1],
      "Si el mismo fallo vuelve, hay que mirar la salida y entenderlo antes de seguir editando a ciegas. Luego se compara con la corrida anterior.",
      [
        "Mover la temperatura no explica por qué la fecha se repite.",
        "El análisis dice qué ajustar. La comparación cierra el ciclo.",
        "Haber editado no es el ciclo. El ciclo mira la salida y comprueba si el ajuste sirvió.",
        "Dejar la fecha no afina el prompt que la está fallando."
      ]),

    q("3.1.1", "K1", 1, 1,
      "¿Cuál de estas salidas es un error de razonamiento?",
      [
        "Una que trata peor a los abonos de última hora sin que la tarifa lo diga.",
        "Una que interpreta mal un si-entonces: los datos están y la conclusión no se sigue.",
        "Una que cita un muelle que no existe en el plano ni en la entrada.",
        "Una que se corta a la mitad y no llega al resultado."
      ],
      [1],
      "El error de razonamiento falla la lógica aunque los datos estén. El trato a un grupo es sesgo, el muelle inventado es alucinación y el corte es otra cosa.",
      [
        "Un trato sistemático que la tarifa no pide es un sesgo.",
        "Los hechos están. La conclusión no respeta la condición. Eso es razonamiento.",
        "Un muelle que no está en la entrada ni en el plano es una alucinación.",
        "Quedarse a medias es un problema de completitud, no de lógica."
      ]),

    q("3.1.2", "K3", 2, 1,
      "Al modelo se le pasó la lista real de quienes prueban el ferry. En el calendario aparece una persona que no está en esa lista, para que el plazo cuadre. ¿Qué falla y qué hay que hacer?",
      [
        "Es un sesgo. Hay que darle requisitos de otros barcos para ampliar el equipo.",
        "Es una alucinación. No se acepta a esa persona: el calendario se ata a la lista dada y alguien lo revisa.",
        "Es un error de razonamiento. Hay que ejecutar los casos para ver si el plazo cierra.",
        "Es la temperatura. Bajarla hace que el modelo aprenda el nombre correcto."
      ],
      [1],
      "La persona no está en la entrada. Inventarla es una alucinación. Se descarta y se obliga al modelo a usar la lista, con revisión. Bajar la temperatura no enseña el nombre.",
      [
        "No hay un grupo tratado peor. Hay un nombre que nadie dio.",
        "El nombre no estaba en la lista. Se rechaza y el encargo vuelve a esa lista.",
        "Ejecutar casos no comprueba si la persona existe.",
        "La temperatura cambia la variación. No corrige un dato inventado ni actualiza al modelo."
      ]),

    q("3.1.3", "K2", 1, 1,
      "El mismo prompt de tarifas se lanza en tres modelos y las fechas no coinciden. ¿Para qué sirve esa comparación?",
      [
        "Para fundir las tres salidas en un conjunto que ya no tiene errores.",
        "Para quedarse con la fecha que más se repite y darla por cierta.",
        "Para ver dónde discrepan y no fiarse de la salida que no se sostiene.",
        "Para terminar antes, porque tres modelos trabajan a la vez."
      ],
      [2],
      "Comparar el mismo prompt en varios modelos destapa desacuerdos. La frecuencia no demuestra el dato, y juntar las salidas no borra el error.",
      [
        "Unir las salidas arrastra también lo que solo uno inventó.",
        "Que una fecha salga dos veces no la vuelve cierta.",
        "El desacuerdo es la pista. Se revisa y se queda lo que se puede sostener.",
        "La velocidad no es la mitigación. El objetivo es ver la fiabilidad."
      ]),

    q("3.1.4", "K1", 1, 1,
      "¿Qué hace una semilla fija sobre la variación del modelo?",
      [
        "Si el número es bajo, sube la temperatura y la salida se estrecha.",
        "Si el número es alto, el modelo usa más semillas y la lista crece.",
        "Fija el arranque del generador aleatorio, así la secuencia pseudoaleatoria puede repetirse.",
        "Si se cambia en cada llamada, recrear la salida es más fácil."
      ],
      [2],
      "La semilla es el punto de partida del azar. La misma semilla favorece la misma secuencia. No cambia la temperatura ni multiplica las semillas.",
      [
        "La semilla no reescribe la temperatura.",
        "No hay «más semillas» por usar un número alto. Hay un arranque.",
        "Mismo arranque, misma secuencia pseudoaleatoria. La revisión de la salida sigue.",
        "Cambiarla en cada llamada hace lo contrario: la secuencia no se repite."
      ]),

    q("3.2.1", "K2", 1, 1,
      "El modelo del ferry procesa datos de pasajeros porque el caso lo necesita. ¿Qué hay que asegurar?",
      [
        "Que no guarde esos datos donde pueda leerlos quien no debe, incluido otro modelo de la organización.",
        "Que no toque ningún dato sensible, aunque el caso no pueda probarse.",
        "Que los modifique y luego los restaure, para que nadie vea el original.",
        "Que el riesgo desaparece si el caso generado es útil."
      ],
      [0],
      "El riesgo es el acceso posterior: otro modelo o otra persona podrían leer lo que se guardó. Prohibir todo acceso impide la prueba, y la utilidad no devuelve el dato.",
      [
        "El dato puede hacer falta para el caso. No puede quedar a la vista de quien no está autorizado.",
        "Negar todo acceso no es la regla. La regla es controlar dónde queda y quién lo lee.",
        "Modificar y restaurar no es el control. Puede dejar el dato expuesto en el camino.",
        "Que el caso sirva no reduce quién puede leer el dato guardado."
      ]),

    q("3.2.2", "K2", 1, 1,
      "Casos generados del ferry se marcan como correctos a propósito, aunque el resultado esperado esté mal. Esas marcas se van a usar para ajustar el modelo. ¿Qué vulnerabilidad es?",
      [
        "Manipulación del contexto: la marca sonsaca el prompt de sistema.",
        "Manipulación de la solicitud de esta llamada.",
        "Envenenamiento: se falsean los datos con los que el modelo se va a ajustar.",
        "Generación de código malicioso dentro del guion."
      ],
      [2],
      "El daño está en los datos del ajuste, etiquetados mal a propósito. No es un truco de esta llamada ni un guion con una puerta trasera.",
      [
        "Nadie está pidiendo un secreto del contexto. Se está etiquetando mal el futuro entrenamiento.",
        "La solicitud de esta llamada no cambia. El efecto llega cuando esas marcas entrenan.",
        "Falsear las etiquetas del ajuste es envenenamiento.",
        "No hay un guion con una conducta oculta. Hay datos de ajuste corruptos."
      ]),

    q("3.2.3", "K2", 1, 1,
      "Alguien quiere pegar en el prompt las credenciales de la base de pasajeros «para que el modelo traiga filas frescas». ¿Qué mitigación corresponde?",
      [
        "Pegar las credenciales: si el modelo es interno, la clave no sale.",
        "No poner la clave en el prompt. Preparar un extracto sintético y limitar quién lanza ese encargo.",
        "Cifrar solo el título de la ventana del chat y pegar la clave igual.",
        "Lanzar el prompt en cuatro modelos y votar la fila."
      ],
      [1],
      "La clave no viaja en el prompt. Lo sensible se sustituye por datos sintéticos y el acceso se limita. Votar modelos no retira la clave.",
      [
        "Una clave en el prompt queda en el historial y en lo que el modelo retenga, aunque el servidor sea interno.",
        "El modelo trabaja con el extracto sintético. La clave no se envía y no cualquiera lanza el encargo.",
        "Cifrar el título no protege la clave que sigue escrita en el prompt.",
        "Votar no impide que la clave haya salido cuatro veces."
      ]),

    q("3.3.1", "K2", 1, 1,
      "Para 30 cubiertas del ferry dudan entre un párrafo por cubierta o una captura sintética de cada pantalla, y además quieren llamar al modelo para resumir un log que un script ya resume. ¿Qué baja energía y emisiones?",
      [
        "Pedir las 30 capturas y repetir el resumen en el modelo, porque el prompt mide pocos caracteres.",
        "Quedarse en el párrafo y no llamar al modelo para un resumen que el script ya hace.",
        "Entrenar otra vez el modelo para que la captura salga a la primera.",
        "Usar prompts más largos: así hay menos llamadas aunque cada una genere una imagen."
      ],
      [1],
      "La captura sintética cuesta más que el texto, y una llamada innecesaria también consume. El script ya hizo ese resumen.",
      [
        "Treinta imágenes y una llamada de más suben el cómputo, aunque el prompt sea corto.",
        "El texto basta para documentar, y se evita la llamada que no aporta.",
        "Otro entrenamiento es de lo que más energía gasta. No abarata la captura.",
        "Alargar el prompt no compensa el coste de generar las imágenes."
      ]),

    q("3.4.1", "K1", 1, 2,
      "¿Cuáles DOS referencias encajan, una con el sistema de gestión de la IA en la organización y la otra con la norma europea que clasifica los usos según el riesgo?",
      [
        "ISO/IEC 42001, gestión de la IA en la organización.",
        "ISO/IEC 23053, marco de los sistemas que usan aprendizaje automático.",
        "ISO/IEC 25010, calidad del producto de software.",
        "El Reglamento europeo de IA, que clasifica los usos según el riesgo.",
        "El marco NIST de riesgos de IA, que no es la norma europea."
      ],
      [0, 3],
      "42001 es el sistema de gestión. El Reglamento europeo clasifica por riesgo. 23053, 25010 y NIST son otras referencias.",
      [
        "Es el sistema de gestión de la IA en la organización.",
        "Es el marco técnico del aprendizaje automático, no el sistema de gestión ni la ley europea.",
        "Describe la calidad de un producto de software.",
        "Es la norma europea que clasifica los usos según el riesgo.",
        "Habla de riesgos de IA, pero no es esa norma europea ni el sistema de gestión ISO."
      ]),

    q("4.1.1", "K2", 1, 1,
      "Quien prueba escribe el caso del ferry en una pantalla y lee ahí la respuesta. ¿Qué componente es esa pantalla?",
      [
        "El modelo, que también guarda la base vectorial.",
        "El front-end: recoge la entrada y muestra la salida.",
        "La autenticación, que arma el prompt con los fragmentos parecidos.",
        "La base vectorial, que es la interfaz de la persona."
      ],
      [1],
      "La pantalla de entrada y de salida es el front-end. El modelo no guarda los vectores y la autenticación no arma el prompt.",
      [
        "El modelo no es la pantalla ni el almacén de los fragmentos.",
        "Recoge lo que se escribe y muestra lo que vuelve.",
        "La autenticación controla el acceso. El prompt lo prepara el back-end.",
        "La base vectorial guarda fragmentos. No es la interfaz."
      ]),

    q("4.1.2", "K2", 1, 1,
      "Los casos del ferry tienen que citar la tarifa de hoy, que está en un almacén y cambia cada mañana. No se quiere reentrenar. ¿Qué se gana con la generación aumentada por recuperación?",
      [
        "Más tiempo de entrenamiento, porque cada mañana se ajustan los pesos.",
        "Menos disco, porque el modelo ya no necesita documentos.",
        "Una respuesta apoyada en la tarifa recuperada, sin reentrenar y sin fiarse solo de la memoria del modelo.",
        "Prescindir de la entrada de quien prueba."
      ],
      [2],
      "Se busca el fragmento de hoy, se añade al prompt y el modelo responde con eso delante. No es un ajuste ni un sustituto de la entrada.",
      [
        "Recuperar no reentrena. El ajuste fino sí tocaría los pesos.",
        "Los documentos siguen en el almacén. La recuperación no los borra.",
        "La tarifa del día entra en el prompt. La salida puede citarla.",
        "Alguien, o el pipeline, sigue entregando la pregunta. La recuperación no elimina esa entrada."
      ]),

    q("4.1.3", "K2", 1, 1,
      "Un agente prepara datos de prueba del ferry y llama a la herramienta de la suite. Se detiene si el caso toca un reembolso. ¿Qué lectura es la correcta?",
      [
        "Sustituye a quien prueba, porque ya tiene un objetivo.",
        "Coordina pasos repetitivos y deja a una persona el caso de riesgo. No ejecuta solo toda la prueba.",
        "Solo puede revisar casos a mano. No llama herramientas.",
        "Sirve únicamente para lanzar la regresión, sin preparar datos."
      ],
      [1],
      "El agente persigue el objetivo con herramientas y para donde el riesgo pide a una persona. El objetivo no reemplaza al equipo.",
      [
        "Tener un objetivo no autoriza a quitar a quien verifica.",
        "Prepara datos, llama a la suite y se detiene en el reembolso.",
        "Puede llamar herramientas. No se limita a la lectura manual.",
        "Preparar datos es parte de lo que hace. No está encerrado en lanzar la regresión."
      ]),

    q("4.2.1", "K2", 1, 1,
      "El prompt y la recuperación no bastan para los casos del ferry. Van a ajustar el modelo con defectos y casos de ese dominio. ¿Qué se modifica?",
      [
        "La disposición de la pantalla de la herramienta.",
        "Los pesos ya entrenados, con datos de esta tarea.",
        "El consumo eléctrico, para que el ajuste no cambie las respuestas.",
        "El sistema operativo en el que corre el modelo."
      ],
      [1],
      "El ajuste fino sigue entrenando: mueve los pesos con datos de la tarea. No toca la pantalla ni el sistema operativo.",
      [
        "La pantalla no es el modelo.",
        "Los pesos se actualizan con los datos del dominio. Esos datos tienen que ser suficientes y de calidad.",
        "El ajuste cambia lo que el modelo responde. No es un recorte de consumo.",
        "El sistema operativo no es el objeto del ajuste."
      ]),

    q("4.2.2", "K2", 1, 1,
      "El modelo que redacta casos del ferry ya está en uso. ¿Qué cubre su operación?",
      [
        "Diseñar los wireframes de la taquilla.",
        "Saber qué versión de prompt y de modelo está activa, vigilar las salidas y autorizar el cambio.",
        "Sustituir el informe de prueba por el registro de entrenamiento.",
        "Elegir a mano las características de un clasificador clásico."
      ],
      [1],
      "Operar es el ciclo de lo que ya está en uso: versión, vigilancia y cambio controlado. El informe de prueba sigue siendo el informe.",
      [
        "Los wireframes no son la vida del modelo en la herramienta.",
        "Versión activa, calidad de la salida y un cambio que alguien autoriza.",
        "El registro de entrenamiento no reemplaza el informe de la prueba.",
        "Elegir características a mano es de otro tipo de modelo."
      ]),

    q("5.1.1", "K1", 1, 1,
      "La cobertura del ferry subió desde que el equipo pega datos de pasajeros en un chat personal no aprobado. La herramienta oficial sigue apagada. ¿Cuál es el riesgo principal?",
      [
        "Ninguno: si la cobertura sube, el canal queda justificado.",
        "IA en la sombra: datos de la organización salen por un canal no autorizado.",
        "Que el modelo oficial tarde más en entrenarse.",
        "Que la cobertura no pueda medirse."
      ],
      [1],
      "El daño de la sombra es de seguridad y de privacidad, aunque el atajo mejore un número de cobertura.",
      [
        "La cobertura no autoriza el canal ni devuelve los datos.",
        "Herramienta no aprobada y datos de pasajeros fuera de la vía oficial.",
        "El riesgo no es la cola de entrenamiento del modelo oficial.",
        "La cobertura sí se está midiendo. El problema es por dónde salen los datos."
      ]),

    q("5.1.2", "K2", 1, 1,
      "Al definir la estrategia de IA generativa para la prueba del ferry, ¿qué no puede faltar si no se quiere una lista de herramientas?",
      [
        "Para qué se usa, cómo encaja con el pipeline que ya existe y qué datos pueden salir.",
        "El número de casos ya automatizados y las líneas de código de la taquilla.",
        "Un certificado distinto por cada modelo y la mayor cantidad de datos posible.",
        "Solo el nombre de los modelos. El encaje con la infraestructura se decide tras el primer incidente."
      ],
      [0],
      "La estrategia fija el objetivo, el encaje con las herramientas actuales y la regla de datos. El volumen de casos o de código no la sustituye.",
      [
        "Objetivo, encaje con lo que ya hay y política de datos.",
        "Esos conteos no dicen para qué se usa el modelo ni qué dato puede salir.",
        "El certificado por modelo y volcar datos no son el contenido de la estrategia.",
        "Dejar el encaje para el incidente es no tener estrategia."
      ]),

    q("5.1.3", "K2", 1, 1,
      "Hay que clasificar defectos del ferry con notas de este dominio. Un modelo grande público no se puede ajustar y los datos no deben salir. Uno pequeño interno sí admite ajuste con esas notas. ¿Qué criterio decide?",
      [
        "El grande, porque la licencia abierta obliga a elegirlo.",
        "El pequeño interno: se puede ajustar con los datos del dominio y esos datos no salen.",
        "El que prometa pruebas de la interfaz, aunque no se ajuste y los datos viajen.",
        "Ninguno de los dos, porque clasificar defectos exige un sistema de reglas."
      ],
      [1],
      "Poder ajustarlo con datos del dominio, y no sacarlos, pesa más que el tamaño o una licencia. La tarea no obliga a volver a las reglas.",
      [
        "La licencia no decide sola, y el grande además sacaría los datos.",
        "El pequeño se ajusta con las notas del ferry y se queda en la red.",
        "Prometer pruebas de interfaz no compensa sacar los datos ni saltarse el ajuste.",
        "Clasificar defectos puede hacerlo el modelo pequeño. Las reglas no son la única salida."
      ]),

    q("5.1.4", "K1", 1, 1,
      "El equipo del ferry se está formando y prueba el modelo con una muestra pequeña de tarifas, sin integrar todavía el pipeline. ¿En qué fase está?",
      [
        "Uso e iteración, porque ya hay una muestra.",
        "Descubrimiento: formación y experimentos pequeños, antes de fijar el uso.",
        "La fase de disolver el equipo, que va antes de probar.",
        "La migración del código viejo, que el programa llama descubrimiento."
      ],
      [1],
      "Formarse y probar en pequeño es el descubrimiento. Integrar y medir vendrá después, y no hace falta disolver el equipo.",
      [
        "El uso e iteración es cuando la IA ya está integrada y se ajusta. Aquí todavía se prueba en pequeño.",
        "Formación y un experimento con una muestra son el descubrimiento.",
        "El programa no pide disolver el equipo.",
        "Migrar código viejo no es la fase de descubrimiento."
      ]),

    q("5.2.1", "K2", 1, 1,
      "¿Qué habilidad necesita quien prueba el ferry con un modelo?",
      [
        "Escribir prompts claros y revisar la salida: alucinaciones, sesgos y fugas.",
        "Memorizar el código del modelo para no tener que revisar.",
        "Dejar las técnicas de prueba, porque el modelo ya cubre el criterio.",
        "Saber de shell y de refactor del código de producción, y no de prompts."
      ],
      [0],
      "La habilidad es guiar con el prompt y verificar la salida. No es memorizar el modelo ni abandonar el criterio de prueba.",
      [
        "Redacta el encargo y lee el resultado con criterio de prueba.",
        "Memorizar el código no sustituye la revisión ni evita una fuga.",
        "Las técnicas de prueba siguen. El modelo no cubre el criterio por su cuenta.",
        "El shell y el refactor no son la habilidad que el programa pide para este uso."
      ]),

    q("5.2.2", "K1", 1, 1,
      "¿Qué construye la capacidad del equipo que prueba el ferry?",
      [
        "Ejercicios guiados, de un prompt simple a uno más fino, y una puesta en común de lo que falló.",
        "Experimentar solo cada quien, con su cuenta y con datos de pasajeros.",
        "Aislar a quien prueba del resto del equipo en cuanto aparece el modelo.",
        "Prohibir los patrones de prompt para que cada persona invente el suyo."
      ],
      [0],
      "La capacidad se practica en el trabajo, con progresión, y se comparte. La cuenta personal con datos reales es sombra, y aislar al equipo corta el aprendizaje.",
      [
        "Práctica guiada y el fallo se cuenta al equipo.",
        "La cuenta personal con datos de pasajeros es un uso no autorizado.",
        "Aislar a quien prueba le quita el sitio donde practicar con el resto.",
        "Los patrones se comparten. Prohibirlos no construye la competencia."
      ]),

    q("5.2.3", "K1", 1, 1,
      "Al entrar el modelo en la prueba del ferry, ¿qué responsabilidad nueva tiene quien dirige?",
      [
        "Dejar la gestión y programar el modelo.",
        "Seguir dirigiendo e incorporar el equilibrio entre lo que hace el modelo y lo que sigue en las personas: estrategia, riesgos y competencias.",
        "Agendar a mano cada ejecución y mantener los scripts viejos como tarea central.",
        "Sustituir a quien prueba en cuanto el primer prompt funciona."
      ],
      [1],
      "Quien dirige no abandona la gestión. Suma estrategia, riesgo y competencias, y no entrega el proceso al modelo.",
      [
        "Estudiar el interior del modelo no reemplaza la dirección.",
        "Mantiene la gestión y reparte qué queda en el modelo y qué queda en el equipo.",
        "El calendario manual y los scripts viejos no son la responsabilidad nueva.",
        "Sustituir a quien prueba es lo contrario de equilibrar las dos capacidades."
      ])
  ];

  if (!window.BANCO) throw new Error("preguntas-exigentes-3.js requiere cargar banco.js antes");
  window.PORQUES_EXTRA = window.PORQUES_EXTRA || {};
  nuevas.forEach(function (p) {
    if (!p._porquesLista || p._porquesLista.length !== p.opciones.length) {
      throw new Error("Justificaciones de la tercera tanda desalineadas en " + p.lo);
    }
    if (window.PORQUES_EXTRA[p.id]) throw new Error("Identificador repetido en la tercera tanda: " + p.id);
    window.PORQUES_EXTRA[p.id] = p._porquesLista;
    delete p._porquesLista;
    window.BANCO.push(p);
  });
})();
