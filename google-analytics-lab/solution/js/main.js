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
    ga('send', {
      hitType: 'event',
      eventCategory: 'products',
      eventAction: 'purchase',
      eventLabel: 'Summer products launch'
    });
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
            ga('send', 'event', 'push', 'subscribe', 'success');
          })
          .catch(function(error) {
            if (Notification.permission === 'denied') {
              console.warn('Subscribe failed, notifications are blocked');
              ga('send', 'event', 'push', 'subscribe-err', 'blocked');
            } else {
              console.error('Unable to subscribe to push', error);
              ga('send', 'event', 'push', 'subscribe-err');
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
            ga('send', 'event', 'push', 'unsubscribe', 'success');
          });
        } else {
          console.log('Not currently subscribed');
        }
      });
    })
    .catch(function(error) {
      console.warn('Error unsubscribing', error);
      ga('send', 'event', 'push', 'unsubscribe-err');
    });
  }

  // Optional - Use hitCallback to send a hit
  var link = document.getElementById('external');
  link.addEventListener('click', function(event) {
    event.preventDefault();
    function navigate() {
      window.location.href = event.target.href;
    }
    setTimeout(navigate, 1000);
    ga('send', 'event', 'outbound', 'sponsor1', {
      hitCallback: navigate
    });
  });

})();
