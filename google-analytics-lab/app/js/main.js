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
    return;
  }

  if (!('serviceWorker' in navigator)) {
    console.log('This browser does not support service workers!');
    return;
  }

  if (!('PushManager' in window)) {
    console.log('This browser does not support push!');
    return;
  }

  // Request notification permission
  Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
  });

  // Register service worker
  navigator.serviceWorker.register('sw.js')
  .then(function(reg) {
    console.log('Service Worker Registered!', reg);
  })
  .catch(function(err) {
    console.log('Service Worker registration failed: ', err);
  });

  // Send custom analytics event

  var purchaseButton = document.getElementById('purchase');
  purchaseButton.onclick = markPurchase;

  function markPurchase() {
    // TODO 6: Send a custom event
  }

  // Subscribe functionality

  var subscribeButton = document.getElementById('subscribe');
  subscribeButton.onclick = subscribe;

  function subscribe() {
    navigator.serviceWorker.ready
    .then(function(reg) {
      reg.pushManager.getSubscription()
      .then(function(sub) {
        if (!sub) {
          reg.pushManager.subscribe({userVisibleOnly: true})
          .then(function(subscription) {
            console.log('Subscribed to push,', subscription);
            // TODO 7.2a - Subscribe event
          })
          .catch(function(error) {
            if (Notification.permission === 'denied') {
              console.warn('Subscribe failed, notifications are blocked');
              // Optional TODO - Send hits for subscribe error
            } else {
              console.error('Unable to subscribe to push', error);
              // Optional TODO - Send hits for subscribe error
            }
          });
        } else {
          console.log('Already subscribed');
        }
      }).catch(function(error) {
        console.log('Cannot access Subscription object', error);
      });
    });
  }

  // Unsubscribe functionality

  var unsubscribeButton = document.getElementById('unsubscribe');
  unsubscribeButton.onclick = unsubscribe;

  function unsubscribe() {
    navigator.serviceWorker.ready
    .then(function(reg) {
      reg.pushManager.getSubscription()
      .then(function(sub) {
        if (sub) {
          sub.unsubscribe()
          .then(function() {
            console.log('Unsubscribed!');
            // TODO 7.2b - Unsubscribe event
          });
        } else {
          console.log('Not currently subscribed');
        }
      });
    })
    .catch(function(error) {
      console.warn('Error unsubscribing', error);
      // Optional TODO - Send hits for unsubscribe error
    });
  }

})();
