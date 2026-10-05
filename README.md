# Simulador de práctica CT-GenAI

Aplicación de un solo directorio para ensayar el examen ISTQB® Certified Tester – Testing with Generative AI.

En la pantalla de inicio se elige el modo. Antes de entrar, un cuadro pide confirmar: se puede cancelar y seguir en el inicio.

- **Examen real.** 40 preguntas, sin comentarios mientras se responde. La nota y la corrección aparecen al entregar.
- **Examen de prueba.** Al confirmar cada respuesta se muestra enseguida cuál es la correcta y por qué. La respuesta queda fija después de confirmarla.

Los dos modos arman un examen de 40 preguntas y 46 puntos, con el mismo reparto de objetivos de aprendizaje, niveles K y puntos que el examen de muestra (se aprueba con 30 puntos, en 60 minutos, u 75 con el tiempo adicional). Las preguntas son formulaciones originales a partir del programa de estudios y del estilo del examen de muestra: no son los ítems oficiales y no sirven para un examen real.

Los formatos de pregunta siguen los del examen de muestra: una opción correcta entre cuatro, afirmaciones (i-v) con opciones que las combinan («i, ii y iv»), relacionar elementos (1-4 con A-D) y «elija DOS opciones» entre cinco.

Durante el examen, la barra superior tiene dos botones. **Pausar** detiene el tiempo y guarda el examen en el navegador; desde la pantalla de inicio se puede continuar después, con el tiempo que quedaba, o descartarlo. **Terminar** cierra el examen en ese momento: se corrige lo respondido y el intento queda en el historial como incompleto.

A la derecha de la página, el botón «Arriba» aparece al bajar y vuelve al comienzo. Sirve sobre todo en el repaso, cuando las cuarenta preguntas quedan muy abajo.

Cada intento entregado queda en el historial de la pantalla de inicio con el examen completo. Con «Revisar» se vuelve a abrir: preguntas, respuestas dadas, respuestas correctas y, en cada opción, por qué es correcta o por qué no lo es. En el examen de prueba esa misma justificación aparece al confirmar la respuesta. En ambos casos, «Ver en el sílabo» resume en un párrafo la idea del objetivo, recuerda por qué vale la respuesta de esa pregunta y abre la página del programa de estudios oficial (CT-GenAI v1.0, español). En el inicio, «Sílabo completo para repaso» lista los capítulos y los objetivos, y «Términos para repasar» recoge las palabras clave con su nombre en inglés, tal como aparece en el sílabo original, y una definición breve. El texto del sílabo no se copia: sigue en el PDF del ISTQB. El banco tiene varias formulaciones originales por objetivo. Una tanda adicional plantea situaciones nuevas (otros oficios, otros datos) sobre las mismas habilidades del examen de muestra, sin reproducir sus enunciados. Al armar un examen nuevo, si el intento anterior usó una formulación y queda otra del mismo objetivo, se elige una distinta.

## Cómo usarlo en el celular, el iPad o el computador

Esta carpeta es el sitio completo: al publicarla como repositorio propio, `index.html` queda en la raíz y GitHub Pages lo sirve tal cual.

1. En GitHub, crea un repositorio **público** nuevo (por ejemplo `simulador-ct-genai`), sin README.
2. Desde esta carpeta:

```bash
git init
git add .
git commit -m "Simulador CT-GenAI"
git branch -M main
git remote add origin https://github.com/cristianmirandaLatam/simulador-ct-genai.git
git push -u origin main
```

3. En ese repositorio: Settings → Pages → Build and deployment → Source: **Deploy from a branch** → rama `main`, carpeta `/ (root)` → Save.
4. En uno o dos minutos queda en `https://cristianmirandalatam.github.io/simulador-ct-genai/`.

En el iPhone o el iPad, abre esa dirección con Safari, pulsa Compartir y elige **Añadir a pantalla de inicio**. Queda con icono y se abre a pantalla completa. En Android, Chrome ofrece «Instalar aplicación» o «Añadir a pantalla principal».

El historial de intentos y el examen en pausa se guardan en el navegador de cada dispositivo. En «Intentos anteriores» puedes **Descargar historial** (un archivo JSON, con el examen en pausa si hay uno) y, en el otro aparato, **Traer historial**. Los intentos que ya estaban no se duplican y se conservan los 20 más recientes. Cada intento tiene «Eliminar», y «Borrar todo el historial» vacía la lista; las dos acciones piden confirmación.

## Cómo abrirlo en local

Dentro de esta carpeta:

```bash
python3 -m http.server 8765
```

y entrar en `http://localhost:8765/`.
