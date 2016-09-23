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
(function() {
  'use strict';

  if (!('Notification' in window)) {
    console.log('This browser does not support notifications!');
    // TODO Optional step 8x: Send notification unsupported event
    return;
  }

  if (!('serviceWorker' in navigator)) {
    console.log('This browser does not support service worker');
    // TODO Optional step 8y: Send service worker unsupported event
    return;
  }

  var purchaseButton = document.getElementById('purchase');
  purchaseButton.addEventListener('click', function() {

    // TODO Step 7: Send custom Google Analytics event

  });

  // TODO Step 8a: Register the service worker

  // TODO Step 8b: Add notifications

  // TODO Step 8c: Add manual notification trigger to button

  // TODO Step 8d: Display manual notifications

  // TODO Step 8i: Open communication with service worker

  // TODO Step 9b: Add push notification

})();
