/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren */
'use strict';




importScripts("./vendor/sw-toolbox/sw-toolbox.js","./js/toolbox-scripts.js");


/* eslint-disable quotes, comma-spacing */
var PrecacheConfig = [["css/main.css","3a78f101efdbf4c896cef53c323c7bb7"],["images/cockatoos-1600_large_2x.jpg","b265e8d3fd39b1eb06143bde32cbb756"],["images/cockatoos-800_large_1x.jpg","b71c639208a8b0daa653ebb65c1c9d07"],["images/cockatoos_medium.jpg","2ea5dc5ef91b661ce932cd2ece6e2953"],["images/cockatoos_small.jpg","2b16dba6d2a0cc80c3956a2e7b2f0cfb"],["images/grasshopper-1600_large_2x.jpg","ffb6720698864333181be02e9ca93920"],["images/grasshopper-800_large_1x.jpg","bdd725d75d7f024c71664b3305ad4efc"],["images/grasshopper_medium.jpg","042fb4afe821367af5d8527b966d0e7b"],["images/grasshopper_small.jpg","c2e0c560412b4aa943857f6a033312ab"],["images/horses-1600_large_2x.jpg","27c1a386ba79348c847c5d6c72e1bec0"],["images/horses-800_large_1x.jpg","870fd4aef5c89fc925c024358d11ba37"],["images/horses_medium.jpg","0dd2afddacea071a80d24619ab79bb14"],["images/horses_small.jpg","c730792a4b46a0c4679d7c5fa5a774f2"],["images/icon.png","8c5153852b6107316b8aba3154a19a34"],["images/postcard-1600_large_2x.jpg","a72fd9756d402c53b1cb4c3d87c6bb32"],["images/postcard-800_large_1x.jpg","992ae53efacd4f5676fe037b84640f52"],["images/postcard_large.jpg","a0650e8cd241c5e62cbfcc733fdc0afb"],["images/postcard_medium.jpg","b48693a67968b36e0de04ba54a076e81"],["images/postcard_small.jpg","2b508215263dd03c77dfebb9dc49195e"],["images/rosella-1600_large_2x.jpg","4d597f5622d5c8d28028efe48fb211d7"],["images/rosella-800_large_1x.jpg","df0e6818461299bb766f1bbfd3bb4b8e"],["images/rosella_medium.jpg","bd2d9fe66ebe8899fe7b870b19f3290c"],["images/rosella_small.jpg","1c33172f88ca6fcf6054f027ec03bf67"],["images/sfo-1600_large_2x.jpg","69996a270bde340c461e80cb33928ddd"],["images/sfo-800_large_1x.jpg","74b763d01482719573f4bc86f31df400"],["images/sfo_medium.jpg","42de649ab5788adc16d7e395ec0aae44"],["images/sfo_small.jpg","7c0eca180fb2dd0fa9c0de6f2e08fc8f"],["images/still_life-1600_large_2x.jpg","2ce2f59a2b8464702c55e90490373e22"],["images/still_life-800_large_1x.jpg","ddb3a059311f9ebf7bd9c4e916588354"],["images/still_life_medium.jpg","6fd675cc848aa455d0fc80af8823386a"],["images/still_life_small.jpg","63f7e8e4445f3c91a4acbb746aa3ef46"],["images/touch/chrome-splashscreen-icon-384x384.png","6f1a5f09cdf2eb63215cbdf5edb400b3"],["images/touch/chrome-touch-icon-192x192.png","6a0551f0c9b53ca62f3c67a5eaf51846"],["images/touch/icon-128x128.png","c8963c64c1c01c6c5d7d2cc1ccd84829"],["images/touch/icon-512x512.png","d41b4a1bb1eb580b3f04906231641c44"],["images/touch/icon-72x72.png","a1641ead284b6a8bf96d4d69389ba237"],["images/touch/icon-96x96.png","246b1e544896a01073efa10e1bf5dd45"],["images/touch/ms-icon-144x144.png","6faac4faf5283236ff9efd1ffa23f40f"],["images/touch/ms-touch-icon-144x144-precomposed.png","815effb69e6f857f36a91ce6b277dd13"],["images/volt-1600_large_2x.jpg","a99f0c8da0afff711f3c4a35f25f0de9"],["images/volt-800_large_1x.jpg","acc344b806d971e16233c5820010bf21"],["images/volt_medium.jpg","0ba8cba11ced34fd2ea045cf19bc539b"],["images/volt_small.jpg","125d1fe1ee927d767855915616348619"],["index.html","81e7d14de0e3ca734b725cf696e89702"]];
/* eslint-enable quotes, comma-spacing */
var CacheNamePrefix = 'sw-precache-v1--' + (self.registration ? self.registration.scope : '') + '-';


var IgnoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var getCacheBustedUrl = function (url, param) {
    param = param || Date.now();

    var urlWithCacheBusting = new URL(url);
    urlWithCacheBusting.search += (urlWithCacheBusting.search ? '&' : '') +
      'sw-precache=' + param;

    return urlWithCacheBusting.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var populateCurrentCacheNames = function (precacheConfig,
    cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};

    precacheConfig.forEach(function(cacheOption) {
      var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
      var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
      currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
      absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
      absoluteUrlToCacheName: absoluteUrlToCacheName,
      currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    // Take a look at each of the cache names we expect for this version.
    Promise.all(Object.keys(CurrentCacheNamesToAbsoluteUrl).map(function(cacheName) {
      return caches.open(cacheName).then(function(cache) {
        // Get a list of all the entries in the specific named cache.
        // For caches that are already populated for a given version of a
        // resource, there should be 1 entry.
        return cache.keys().then(function(keys) {
          // If there are 0 entries, either because this is a brand new version
          // of a resource or because the install step was interrupted the
          // last time it ran, then we need to populate the cache.
          if (keys.length === 0) {
            // Use the last bit of the cache name, which contains the hash,
            // as the cache-busting parameter.
            // See https://github.com/GoogleChrome/sw-precache/issues/100
            var cacheBustParam = cacheName.split('-').pop();
            var urlWithCacheBusting = getCacheBustedUrl(
              CurrentCacheNamesToAbsoluteUrl[cacheName], cacheBustParam);

            var request = new Request(urlWithCacheBusting,
              {credentials: 'same-origin'});
            return fetch(request).then(function(response) {
              if (response.ok) {
                return cache.put(CurrentCacheNamesToAbsoluteUrl[cacheName],
                  response);
              }

              console.error('Request for %s returned a response status %d, ' +
                'so not attempting to cache it.',
                urlWithCacheBusting, response.status);
              // Get rid of the empty cache if we can't add a successful response to it.
              return caches.delete(cacheName);
            });
          }
        });
      });
    })).then(function() {
      return caches.keys().then(function(allCacheNames) {
        return Promise.all(allCacheNames.filter(function(cacheName) {
          return cacheName.indexOf(CacheNamePrefix) === 0 &&
            !(cacheName in CurrentCacheNamesToAbsoluteUrl);
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      });
    }).then(function() {
      if (typeof self.skipWaiting === 'function') {
        // Force the SW to transition from installing -> active state
        self.skipWaiting();
      }
    })
  );
});

if (self.clients && (typeof self.clients.claim === 'function')) {
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function(event) {
  if (event.data.command === 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches().then(function() {
      console.log('Caches deleted.');
      event.ports[0].postMessage({
        error: null
      });
    }).catch(function(error) {
      console.log('Caches not deleted:', error);
      event.ports[0].postMessage({
        error: error
      });
    });
  }
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    var urlWithoutIgnoredParameters = stripIgnoredUrlParameters(event.request.url,
      IgnoreUrlParametersMatching);

    var cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    var directoryIndex = 'index.html';
    if (!cacheName && directoryIndex) {
      urlWithoutIgnoredParameters = addDirectoryIndex(urlWithoutIgnoredParameters, directoryIndex);
      cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    }

    var navigateFallback = '';
    // Ideally, this would check for event.request.mode === 'navigate', but that is not widely
    // supported yet:
    // https://code.google.com/p/chromium/issues/detail?id=540967
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1209081
    if (!cacheName && navigateFallback && event.request.headers.has('accept') &&
        event.request.headers.get('accept').includes('text/html') &&
        /* eslint-disable quotes, comma-spacing */
        isPathWhitelisted([], event.request.url)) {
        /* eslint-enable quotes, comma-spacing */
      var navigateFallbackUrl = new URL(navigateFallback, self.location);
      cacheName = AbsoluteUrlToCacheName[navigateFallbackUrl.toString()];
    }

    if (cacheName) {
      event.respondWith(
        // Rely on the fact that each cache we manage should only have one entry, and return that.
        caches.open(cacheName).then(function(cache) {
          return cache.keys().then(function(keys) {
            return cache.match(keys[0]).then(function(response) {
              if (response) {
                return response;
              }
              // If for some reason the response was deleted from the cache,
              // raise and exception and fall back to the fetch() triggered in the catch().
              throw Error('The cache ' + cacheName + ' is empty.');
            });
          });
        }).catch(function(e) {
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});




