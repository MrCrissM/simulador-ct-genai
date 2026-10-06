const CACHE = "ct-genai-v2";
const ARCHIVOS_ESENCIALES = [
  "./",
  "./index.html",
  "./estilos.css",
  "./banco.js",
  "./porques.js",
  "./silabo.js",
  "./supabase-config.js",
  "./app.js",
  "./manifest.webmanifest",
  "./favicon-32.png",
  "./icon-180.png",
  "./icon-512.png",
  "./offline.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(ARCHIVOS_ESENCIALES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((nombres) => Promise.all(
        nombres
          .filter((nombre) => nombre !== CACHE)
          .map((nombre) => caches.delete(nombre))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((enCache) => {
      const desdeRed = fetch(event.request)
        .then((respuesta) => {
          if (respuesta.ok && new URL(event.request.url).origin === self.location.origin) {
            const copia = respuesta.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, copia));
          }
          return respuesta;
        });

      if (enCache) {
        event.waitUntil(desdeRed.catch(() => undefined));
        return enCache;
      }

      return desdeRed.catch(() => {
        if (event.request.mode === "navigate") {
          return caches.match("./offline.html");
        }
        return Response.error();
      });
    })
  );
});
