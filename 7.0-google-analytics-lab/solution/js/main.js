/*
Copyright 2018 Google Inc.

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

  window.addEventListener('load', () => {
    // Register service worker
    navigator.serviceWorker.register('sw.js')
      .then(reg => {
        console.log('Service Worker Registered!', reg);
      })
      .catch(err => {
        console.log('Service Worker registration failed: ', err);
      });

    // Request notification permission
    Notification.requestPermission(function(status) {
      console.log('Notification permission status:', status);
    });
  });

  // Send custom analytics event

  // TODO RENAME

  const favorite = () => {
    gtag('event', 'favorite', {
      'event_category': 'photos',
      'event_label': 'cats'
    });
  };
  const favoriteButton = document.getElementById('favorite');
  favoriteButton.addEventListener('click', favorite);

  // Subscribe functionality

  const subscribe = () => {
    navigator.serviceWorker.ready
    .then(reg => {
      reg.pushManager.getSubscription()
      .then(sub => {
        if (!sub) {
          reg.pushManager.subscribe({userVisibleOnly: true})
          .then(subscription => {
            console.log('Subscribed to push,', subscription);
            gtag('event', 'subscribe', {
              'event_category': 'push',
              'event_label': 'cat updates'
            });
          })
          .catch(error => {
            if (Notification.permission === 'denied') {
              console.warn('Subscribe failed, notifications are blocked');
              gtag('event', 'subscribe_blocked', {
                'event_category': 'push',
                'event_label': 'cat updates'
              });
            } else {
              console.error('Unable to subscribe to push', error);
              gtag('event', 'subscribe_error', {
                'event_category': 'push',
                'event_label': 'cat updates'
              });
            }
          });
        } else {
          console.log('Already subscribed');
        }
      }).catch(error => {
        console.log('Cannot access Subscription object', error);
      });
    });
  };
  const subscribeButton = document.getElementById('subscribe');
  subscribeButton.addEventListener('click', subscribe);

  // Unsubscribe functionality

  const unsubscribe = () => {
    navigator.serviceWorker.ready
    .then(reg => {
      reg.pushManager.getSubscription()
      .then(sub => {
        if (sub) {
          sub.unsubscribe()
          .then(() => {
            console.log('Unsubscribed!');
            gtag('event', 'unsubscribe', {
              'event_category': 'push',
              'event_label': 'cat updates'
            });
          });
        } else {
          console.log('Not currently subscribed');
        }
      });
    })
    .catch(error => {
      console.warn('Error unsubscribing', error);
      gtag('event', 'unsubscribe_error', {
        'event_category': 'push',
        'event_label': 'cat updates'
      });
    });
  };
  const unsubscribeButton = document.getElementById('unsubscribe');
  unsubscribeButton.addEventListener('click', unsubscribe);

})();
