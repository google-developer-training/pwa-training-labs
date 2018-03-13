// unregister all service workers
navigator.serviceWorker.getRegistrations()
  .then(registrations => {
    for(let registration of registrations) {
      registration.unregister();
    }
  });

// register SW & log Scope
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => {
        console.log('Service worker registered! 😎');
        console.log('Scope:', reg.scope);
      })
      .catch(err => {
        console.log('😥 Service worker registration failed:\n', err);
      });
  });
}

// register SW with custom scope
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/scripts/sw.js', {
      scope: '/styles'
    })
      .then(reg => {
        console.log('Service worker registered! 😎');
        console.log('Scope:', reg.scope);
      })
      .catch(err => {
        console.log('😥 Service worker registration failed:\n', err);
      });
  });
}

// fix promise chain error
event.respondWith(
  caches.open('my-cache').then(cache => {
    return cache.match(event.request)
      .then(response => {
        const fetchPromise = fetch(event.request)
          .then(networkResponse => {
            cache.put(event.request, networkResponse);
            return networkResponse;
          });
        return response || fetchPromise;
      });
  })
);

// fix response cloning error
event.respondWith(
  caches.open('my-cache').then(cache => {
    return cache.match(event.request)
      .then(response => {
        const fetchPromise = fetch(event.request)
          .then(networkResponse => {
            // clone the network response
            const responseToCache = networkResponse.clone();
            cache.put(event.request, responseToCache);
            return networkResponse;
          });
        return response || fetchPromise;
      });
  })
);
