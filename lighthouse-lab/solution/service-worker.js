/*
Copyright 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('static-cache-v1')
    .then(function(cache) {
      return cache.addAll([
        '.',
        'index.html',
        'css/main.css',
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
        'images/still_life-1600_large_2x.jpg',
        'images/still_life-800_large_1x.jpg',
        'images/still_life_medium.jpg',
        'images/still_life_small.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request)
  .then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
