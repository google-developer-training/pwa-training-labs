/*
* Copyright 2018 Google Inc. All rights reserved.
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

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

if (workbox) {

  // Pre-cache HTML, CSS, and image assets
  workbox.precaching.precacheAndRoute([
    {
      "url": "index.html",
      "revision": "a7a5b45e7a48ecf2cb10fd8bddf70342"
    },
    {
      "url": "style/main.css",
      "revision": "7ca18ea2f5608b3c3f67339a57a4fc8e"
    },
    {
      "url": "images/delete.svg",
      "revision": "840ae217e9fe8c73c6d76286aefef63f"
    },
    {
      "url": "images/rocket-form.svg",
      "revision": "6bcd12b01e14547c1f9e0069c3da5f0d"
    },
    {
      "url": "images/rocket-icon.png",
      "revision": "f61c19851368484e8cb7efebf4d26a77"
    },
    {
      "url": "images/rocket.svg",
      "revision": "19df337059a0d6420869bcd20bdc6fab"
    },
    {
      "url": "images/ship_0.jpg",
      "revision": "58bb2ed6c80b6ca362c18515f07f2aee"
    },
    {
      "url": "images/ship_1.jpg",
      "revision": "94895878d03c00fae4f19583efb53ad2"
    },
    {
      "url": "images/ship_2.jpg",
      "revision": "992f720b3d4d3d21c83a7e71057effc9"
    },
    {
      "url": "images/ship_3.jpg",
      "revision": "06c2a683898186f728c564c9e518d16c"
    },
    {
      "url": "images/ship_4.jpg",
      "revision": "04673dcead6d46a65fdfb7c78984afd8"
    },
    {
      "url": "images/ship_5.jpg",
      "revision": "d08b0352c8971af5f881dcde0542ed97"
    },
    {
      "url": "images/ship_6.jpg",
      "revision": "0ccd8c0c257264e0496eed72d4beb936"
    },
    {
      "url": "images/ship_7.jpg",
      "revision": "af52e423fd57b2205c95bd308d50663e"
    },
    {
      "url": "images/ship_8.jpg",
      "revision": "00a5102cdfac3dbc041fb5b286e6b0e7"
    },
    {
      "url": "images/ship_9.jpg",
      "revision": "4b57c477216cb8c106b0c09ee9376249"
    }
  ]);

  // Force update of newest service worker
  workbox.skipWaiting();
  workbox.clientsClaim();

  // Google Fonts
  workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.staleWhileRevalidate()
  );

  // Material Design & navigation library
  workbox.routing.registerRoute(
    new RegExp('https://unpkg.com/(.*)'),
    workbox.strategies.staleWhileRevalidate()
  );

  // App scripts
  workbox.routing.registerRoute(
    new RegExp('/scripts/(.*)'),
    workbox.strategies.staleWhileRevalidate()
  );

  // Firebase libraries
  workbox.routing.registerRoute(
    new RegExp('http://localhost:5000/__/firebase'),
    workbox.strategies.staleWhileRevalidate()
  );

} else {
  console.log(`Workbox didn't load 😬`);
}
