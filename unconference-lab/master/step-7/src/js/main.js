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

/* global google */
/* exported initMap */

'use strict';

var installButton = document.getElementById('install');

function initMap() {
  new google.maps.Map(document.getElementById('map'), {
    center: {lat: 52.3920646321, lng: 4.88550824602},
    scrollwheel: false,
    zoom: 14
  });
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(() => {
    return navigator.serviceWorker.ready;
  }).then(function(reg) {
    console.log('Service Worker ready :^)', reg);
  // TODO
  }).catch(function(error) {
    console.log('Service Worker error :^(', error);
  });
}

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  installButton.removeAttribute('hidden');
  installButton.addEventListener('click', () => {
    event.prompt();
    installButton.setAttribute('disabled', true);
  });
});
