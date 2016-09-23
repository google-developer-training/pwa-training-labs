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
/*jshint esversion: 6 */

(function() {
  'use strict';

  importScripts('js/idb_functions.js');
  importScripts('js/idb.js');

  const CACHENAME = 'static-cache';
  const CACHEVERSION = 1;
  const EXPECTEDCACHENAMES = [CACHENAME + '-v' + CACHEVERSION];

  var staticAssets = [
    'index.html',
    'styles/main.css'
  ];

  function cacheStaticAssets(event) {
    event.waitUntil(
        caches.open(CACHENAME + '-v' + CACHEVERSION)
          .then(cache => {
            return cache.addAll(staticAssets);
          })
          .catch(error => {
            console.log('Could not cache static assets', error);
          })
      );
  }

  function updateCaches(event) {
    event.waitUntil(
    caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheNames => {
            if (EXPECTEDCACHENAMES.indexOf(CACHENAME) === -1) {
              console.log('Deleting out of date cache:', CACHENAME);
              return caches.delete(CACHENAME);
            }
          })
        );
      })
      .catch(error => {
        console.log('Could not update caches', error);
      })
    );
  }

  function respondCacheFirst(event, altUrl) {
    event.respondWith(caches.match(altUrl || event.request)
    .then(response => {
          if (response) {
            return response;
          }
          return fetch(altUrl || event.request);
        })
      .catch(() => {
        console.log('resource not available');
      })
    );
  }

  self.addEventListener('install', event => {
    installDB();
    addUsers();
    cacheStaticAssets(event);
  });

  self.addEventListener('activate', event =>  {
    updateCaches(event);
  });

  self.addEventListener('fetch', event => {
    if (event.request.url.includes('users')) {
      respondCacheFirst(event, 'index.html');
      showUsers();
    } else {
      respondCacheFirst(event, false);
    }
  });

})();
