const STATIC_CACHE_NAME = 'site-static-cache-v5';
const DYNAMIC_CACHE_NAME = 'site-dynamic-cache';
const API_CACHE_NAME = 'site-api-cache';
const assets = ['/offline', '/icons/BeehazLogo96.png', '/icons/Logo_Beehaz.png', '/favicon.ico'];

const ignored = self.__WB_MANIFEST;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', (event) => {
  // Clear all cache on Service Worker activation except the static cache
  const cacheWhitelist = [];
  cacheWhitelist.push(STATIC_CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('https://beehaz.com/api/')) {
    if (event.request.method === 'POST') console.log(event);
    event.respondWith(
      fetch(event.request)
        .then((fetchRes) => {
          return caches.open(API_CACHE_NAME).then((cache) => {
            cache.put(event.request.url, fetchRes.clone());
            return fetchRes;
          });
        })
        .catch(() => {
          console.log('Unable to fetch API Data, retrieving Cache Data');
          caches.match(event.request).then((cacheRes) => {
            if (cacheRes) {
              return JSON.stringify(cacheRes.body);
            } else {
              console.log('Unable to fetch API Data and Cache Data');
            }
          });
        })
    );
  } else {
    if (!(event.request.url.indexOf('http') === 0)) return;
    event.respondWith(
      caches.match(event.request).then((cacheRes) => {
        return (
          cacheRes ||
          fetch(event.request)
            .then((fetchRes) => {
              return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                cache.put(event.request.url, fetchRes.clone());
                return fetchRes;
              });
            })
            .catch(() => caches.match('/offline'))
        );
      })
    );
  }
});
