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
// Does the browser support Service Workers?
if ('serviceWorker' in navigator) {
  // If it does register the ServiceWorker. By default it's scoped to /
  navigator.serviceWorker.register('service-worker.js', {scope: './'})
  .then(function(registration) {
    // Log success to the console along with the scope this worker is registered to
    console.log('Service Worker registration successful with scope: ',
     registration.scope);
  })
  .catch(function(err) {
    // Oh, no. Something happened
    console.log('Service Worker registration failed: ', err);
  });
}
