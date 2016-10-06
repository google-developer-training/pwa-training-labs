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
var app = (function() {
  'use strict';

  if (!('Notification' in window)) {
    console.log('This browser does not support notifications!');
    return;
  }

  Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function(reg) {
      console.log('Service Worker Registered!', reg);
      navigator.serviceWorker.ready.then(function(reg) {
        reg.pushManager.subscribe({
          userVisibleOnly: true
        }).then(function(sub) {
          console.log('Endpoint URL: ', sub);
        }).catch(function(e) {
          if (Notification.permission === 'denied') {
            console.warn('Permission for notifications was denied');
          } else {
            console.error('Unable to subscribe to push', e);
          }
        });
      });
    }).catch(function(err) {
      console.log('Service Worker registration failed: ', err);
    });
  }

  function displayNotification() {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        var options = {
          body: 'First notification!',
          icon: 'images/notification-flat.png',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          },
          actions: [
            {action: 'explore', title: 'Go to the site',
              icon: 'images/checkmark.png'},
            {action: 'close', title: 'Close the notification',
              icon: 'images/xmark.png'},
          ]

          // TODO 16 - add a tag to the notification

        };
        reg.showNotification('Hello world!', options);
      });
    }
  }

  function getSubObject() {
    navigator.serviceWorker.ready.then(function(reg) {
      return reg.pushManager.getSubscription();
    }).then(function(subscription) {
      if (subscription) {
        document.getElementById('subObject').innerHTML = JSON.stringify(
          subscription);
      }
    });
  }

  function getSubId() {
    navigator.serviceWorker.ready.then(function(reg) {
      return reg.pushManager.getSubscription();
    }).then(function(subscription) {
      if (subscription) {
        document.getElementById('subId').innerHTML =
        subscription.endpoint.slice(subscription.endpoint.lastIndexOf('/') + 1);
      }
    });
  }

  return {
    displayNotification: (displayNotification),
    getSubObject: (getSubObject),
    getSubId: (getSubId)
  };
})();
