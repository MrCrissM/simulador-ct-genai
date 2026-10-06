# Simulador de práctica CT-GenAI

Aplicación de un solo directorio para ensayar el examen ISTQB® Certified Tester – Testing with Generative AI.

En la pantalla de inicio se elige el modo. Antes de entrar, un cuadro pide confirmar: se puede cancelar y seguir en el inicio. El interruptor «Modo oscuro», también visible durante el examen y en el resultado, sigue el modo del dispositivo hasta que se cambia; a partir de ahí la elección queda guardada en ese navegador.

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

Después de la primera visita con conexión, el simulador guarda sus archivos esenciales en el dispositivo. Por ello puede abrirse y utilizarse sin conexión. Cuando vuelva a haber red, el service worker busca una versión actualizada. Si se publica un cambio importante, se debe aumentar la versión `CACHE` de `sw.js` para que los dispositivos renueven su caché.

El historial de intentos y el examen en pausa se guardan en el navegador de cada dispositivo. En «Intentos anteriores» puedes **Descargar historial** (un archivo JSON, con el examen en pausa si hay uno) y, en el otro aparato, **Traer historial**. Los intentos que ya estaban no se duplican y se conservan los 20 más recientes. Cada intento tiene «Eliminar», y «Borrar todo el historial» vacía la lista; las dos acciones piden confirmación.

## Cómo abrirlo en local

Dentro de esta carpeta:

```bash
python3 -m http.server 8765
```

y entrar en `http://localhost:8765/`.

## Verificar cambios antes de publicar

Desde la raíz del repositorio, ejecuta:

```bash
node tools/verificar-datos.js
```

No requiere instalar dependencias. La comprobación valida:

- identificadores únicos y estables de las preguntas;
- asociación de cada explicación con el identificador de su pregunta, no con su posición en el banco;
- número de explicaciones y opciones;
- índices de respuestas correctas y cantidad exigida al responder;
- correspondencia de objetivos entre banco y sílabo;
- disponibilidad de preguntas para cada entrada del plan;
- estructura oficial del simulacro: **40 preguntas y 46 puntos**.

Si el comando falla, no publiques hasta corregir el mensaje indicado. Al añadir una pregunta, su identificador se calcula a partir de su contenido; añade también sus justificaciones en `porques.js` bajo ese identificador. Reordenar el banco ya no cambia la asociación de las justificaciones.

## Crear participantes con nombre, correo y contraseña

El panel **Administración** de la aplicación incluye un formulario para crear participantes con su nombre completo, correo y contraseña en una sola operación. Solo lo ven los usuarios cuyo perfil tiene el rol `admin`.

El formulario requiere la función segura de Supabase `crear-usuario`. La clave `service_role` se usa únicamente dentro de esa función y nunca se publica en GitHub Pages ni en `supabase-config.js`.

### Desplegar la función una vez

La forma recomendada es usar la CLI de Supabase. En PowerShell, dentro de la carpeta `simulador`, ejecuta:

```powershell
npx supabase login
npx supabase link --project-ref ncawxlyzfcjuzfhbrcwo
npx supabase functions deploy crear-usuario
```

El primer comando abre el inicio de sesión de Supabase. La CLI solicita autorización en el navegador; no se debe escribir ni guardar ninguna clave `service_role` en archivos del proyecto.

La función ya está incluida en este repositorio:

```text
supabase/functions/crear-usuario/index.ts
```

Supabase entrega automáticamente a las Edge Functions las variables protegidas `SUPABASE_URL`, `SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY`. No agregues ni reemplaces esos secretos manualmente.

Como alternativa sin CLI, abre el proyecto en Supabase, entra a **Edge Functions**, crea una función llamada `crear-usuario`, copia el contenido de `supabase/functions/crear-usuario/index.ts` en el editor y pulsa **Deploy function**. Mantén activada la verificación de JWT.

Después del despliegue:

1. Entra a la aplicación con la cuenta administradora.
2. Pulsa **Administración**.
3. Escribe el nombre completo, correo y una contraseña de al menos ocho caracteres.
4. Pulsa **Crear usuario**.
5. El participante puede iniciar sesión inmediatamente; el perfil queda creado con el nombre indicado y el rol `participante`.

## Sincronización automática con GitHub

El repositorio de esta carpeta está conectado a:

```text
https://github.com/cristianmirandaLatam/simulador-ct-genai
```

Para activar la subida automática durante el trabajo, abre PowerShell dentro de `simulador` y ejecuta:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\sincronizar-automaticamente.ps1
```

Mientras esa terminal permanezca abierta, cada archivo guardado espera tres segundos para agrupar cambios. El proceso ejecuta primero `node tools/verificar-datos.js`; si la validación pasa, crea un commit con fecha, integra los cambios remotos con `git pull --rebase` y lo publica en `origin/main`.

No se suben `.graphify/`, dependencias, coberturas ni archivos de registro. Si la validación o la integración remota fallan, el proceso no hace `push`; el mensaje de la terminal indica qué se debe corregir. Pulsa `Ctrl+C` en esa terminal para detener la sincronización automática.
