// TODO Step 2.1 - Cache static assets on install
var CACHE_NAME = 'static-cache';
var urlsToCache = [
  '.',
  'index.html',
  'styles/main.css'
];
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
    .catch(function(error) {
      console.log('Could not cache assets:', error);
    })
  );
});

// TODO Step 2.2 - Fetch from the cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request)
      .then(function(response) {
        // Check if we received a valid response
        if (!response.ok) {
          throw Error(response.statusText);
        }
        var responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then(function(cache) {
            cache.put(event.request, responseToCache);
          });
        return response;
      })
      .catch(function(error) {
        console.log('Request failed:', error);
        // You could return a custom offline 404 page here
      });
    })
  );
});
