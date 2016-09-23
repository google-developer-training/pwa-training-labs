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
if (!'Notification' in window) {
  console.log('This browser does not support notifications!');
}

Notification.requestPermission(function(status) {
  console.log('Notification permission status:', status);
});

// TODO 2 - check if we have the subscription object

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function(reg) {
    console.log('Service Worker Registered!', reg);

    // TODO 3 - subscribe to the push service

  }).catch(function(err) {
    console.log('Service Worker registration failed: ', err);
  });
} else {
  console.log('This browser does not support service workers');
}

function displayNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: 'Woohoo! First notification!',
        icon: 'images/notification-flat.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [
          {action: 'explore', title: 'Explore this new world',
            icon: 'images/checkmark.png'},
          {action: 'close', title: 'I don’t want any of this',
            icon: 'images/xmark.png'},
        ]
      };
      reg.showNotification('Hello world!', options);
    });
  }
}

function getSubObject() {
  navigator.serviceWorker.ready.then(reg => {
    return reg.pushManager.getSubscription();
  }).then(subscription => {
    document.getElementById('subObject').innerHTML = JSON.stringify(
      subscription);
  });
}
