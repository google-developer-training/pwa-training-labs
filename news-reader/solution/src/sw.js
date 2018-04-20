importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js');

if (workbox) {

  workbox.precaching.precacheAndRoute([]);

  workbox.skipWaiting();
  workbox.clientsClaim();

  workbox.routing.registerRoute(
    new RegExp('https://hacker-news.firebaseio.com/v0/(.*)'),
    workbox.strategies.networkFirst({
        networkTimetoutSeconds: 5,
        cacheName: 'stories',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 300,
            maxAgeSeconds: 5 * 60, // 5 minutes
          })
        ]
    })
  );

  workbox.routing.registerRoute(
    new RegExp('https://cdn.polyfill.io/(.*)'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'polyfills'
    })
  );

} else {
  console.log(`Workbox didn't load 😬`);
}
