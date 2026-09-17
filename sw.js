const CACHE_NAME = 'danny-portfolio-v1';

// Recursos estáticos esenciales a guardar en caché durante la instalación
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/resume.html',
    '/dashboard.html',
    '/login.html',
    '/stylesheets/base.css', // Asegúrate de incluir aquí base_3.css o index.css según el nombre final en tu servidor
    '/js/download.js',
    // Librerías externas
    'https://unpkg.com/vue@3/dist/vue.global.prod.js',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css',
    'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'
];

// 1. INSTALACIÓN: Pre-caching de recursos estáticos
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Service Worker: Guardando archivos estáticos en caché');
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// 2. ACTIVACIÓN: Limpieza de cachés antiguas
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Eliminando caché antigua', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// 3. INTERCEPCIÓN DE PETICIONES (Fetch)
self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);

    // Estrategia: Network First (Red primero) para la API
    // Se aplica a las rutas de tu API para obtener los datos JSON
    if (requestUrl.origin === 'https://api.vasconez.work') {
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    // Si la red funciona, clonamos la respuesta y la guardamos en caché
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch(() => {
                    // Si no hay red, devolvemos la versión almacenada en caché
                    return caches.match(event.request);
                })
        );
        return;
    }

    // Estrategia: Stale-While-Revalidate para recursos estáticos y fuentes
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                });
                return networkResponse;
            }).catch(() => {
                // Falla silenciosa si no hay red, ya que devolveremos la caché de todas formas
            });

            // Retorna la caché si existe, si no, espera a la red
            return cachedResponse || fetchPromise;
        })
    );
});