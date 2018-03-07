console.log('Service worker waking up! 😴 ');

self.addEventListener('install', event => {
  console.log('Service worker installed! 👍');
});

self.addEventListener('activate', event => {
  console.log('Service worker activated! 😁');
});

self.addEventListener('fetch', event => {
  const path = event.request.url.split('http://localhost:8081')[1];
  console.log('Intercepted request for:', path);

  if (path === '/images/sad.jpg') {
    console.log('Responding with tired.jpg instead of sad.jpg');
    event.respondWith(
      fetch('/images/tired.jpg')
    );
  }

  // event.respondWith(
  //   caches.open('my-cache').then(cache => {
  //     cache.match(event.request)
  //       .then(response => {
  //         const fetchPromise = fetch(event.request)
  //           .then(networkResponse => {
  //             cache.put(event.request, networkResponse);
  //             return networkResponse;
  //           });
  //         return response || fetchPromise;
  //       });
  //   })
  // );
});
