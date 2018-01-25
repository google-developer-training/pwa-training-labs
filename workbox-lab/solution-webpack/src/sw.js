importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0-alpha.6/workbox-sw.js');

workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(/(.*)fonts\.googleapis\.com(.*)/,
  workbox.strategies.cacheFirst({
    cacheName: 'googleapis',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20
      }),
      new workbox.cacheableResponse.Plugin({statuses: [0, 200]})
    ]
  })
);

workbox.routing.registerRoute(/(.*)weloveiconfonts\.com(.*)/,
  workbox.strategies.cacheFirst({
    cacheName: 'iconfonts',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20
      }),
      new workbox.cacheableResponse.Plugin({statuses: [0, 200]})
    ]
  })
);

workbox.routing.registerRoute(/\.(?:png|gif|jpg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50
      })
    ]
  })
);
