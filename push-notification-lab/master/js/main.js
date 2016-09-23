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

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(function(reg) {
    reg.pushManager.getSubscription().then(function(sub) {
      if (sub == undefined) {
        // Update UI to ask user to register for Push
      } else {
        // We have a subscrition, update the database
        console.log('Subscription object: ', sub);
      }
    });
  });
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function(reg) {
    console.log('Service Worker Registered!', reg);
    reg.pushManager.subscribe({
      userVisibleOnly: true
    }).then(function(sub) {
      console.log('Endpoint URL: ', sub.endpoint);
      // send the subscription object to the server
    }).catch(function(e) {
      if (Notification.permission === 'denied') {
        console.warn('Permission for notifications was denied');
      } else {
        console.error('Unable to subscribe to push', e);
      }
    });
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
          {action: 'close', title: 'No thank you',
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
