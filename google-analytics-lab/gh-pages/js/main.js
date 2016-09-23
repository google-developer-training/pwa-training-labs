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
    ga('send', 'event', 'notification', 'unsupported');
    return;
  }

  if (!('serviceWorker' in navigator)) {
    console.log('This browser does not support service worker');
    ga('send', 'event', 'service-worker', 'unsupported');
    return;
  }

  var purchaseButton = document.getElementById('purchase');
  purchaseButton.addEventListener('click', function() {
    ga('send', 'event', 'products', 'purchase', 'Summer product launch');
  });

  var registration; // Store service worker registration
  navigator.serviceWorker.register('service-worker.js')
  .then(function(reg) {
    console.log('Service worker registered!', reg);
    registration = reg;
  })
  .catch(function(error) {
    console.log('Service Worker registration failed:', error);
  });

  // Browser may prompt user with permission request
  Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
  });

  var notifyButton = document.getElementById('notify');
  notifyButton.addEventListener('click', function() {
    displayNotification();
  });

  function displayNotification() {
    if (Notification.permission == 'granted') {
      var options = {
        body: 'You have a new notification!',
        icon: 'images/notification-flat.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [
          {action: 'open', title: 'Open the site!',
            icon: 'images/checkmark.png'},
          {action: 'close', title: 'Go away!',
            icon: 'images/xmark.png'},
        ]
      };
      registration.showNotification('Hello world!', options);
      ga('send', 'event', 'notification', 'displayed-standard');
    } else {
      console.warn('Notifications are blocked');
      ga('send', 'event', 'notification', 'blocked');
    }
  }

  function openCommunication() {
    var msgChannel = new MessageChannel();
    msgChannel.port1.onmessage = function(msgEvent) {
      sendAnalytics(msgEvent.data);
    };
    navigator.serviceWorker.controller.postMessage(
      'Establishing contact with service worker', [msgChannel.port2]
    );
  }
  openCommunication();

  function sendAnalytics(message) {
    var eventCategory = message.eventCategory;
    var eventAction = message.eventAction;
    ga('send', 'event', eventCategory, eventAction);
  }

  var subscription;
  var isSubscribed = false;
  var subscribeButton = document.getElementById('subscribe');

  subscribeButton.addEventListener('click', function() {
    if (isSubscribed) {
      unsubscribe();
    } else {
      subscribe();
    }
  });

  function subscribe() {
    registration.pushManager.subscribe({userVisibleOnly: true})
    .then(function(pushSubscription) {
      subscription = pushSubscription;
      console.log('Subscribed!', subscription);
      ga('send', 'event', 'push', 'subscribe');
      subscribeButton.textContent = 'Unsubscribe';
      isSubscribed = true;
    })
    .catch(function(error) {
      if (Notification.permission === 'denied') {
        console.warn('Subscribe failed, notifications are blocked');
        ga('send', 'event', 'push', 'subscribe-blocked');
      } else {
        console.warn('Error subscribing', error);
        ga('send', 'event', 'push', 'subscribe-error');
      }
    });
  }

  function unsubscribe() {
    subscription.unsubscribe()
    .then(function() {
      console.log('Unsubscribed!');
      ga('send', 'event', 'push', 'unsubscribe');
      subscribeButton.textContent = 'Subscribe';
      isSubscribed = false;
    })
    .catch(function(error) {
      console.warn('Error unsubscribing', error);
      ga('send', 'event', 'push', 'unsubscribe-error');
      subscribeButton.textContent = 'Subscribe';
    });
  }

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
