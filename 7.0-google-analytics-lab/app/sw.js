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

// TODO Import the helper script

// TODO Add offline analytics script

self.addEventListener('notificationclose', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  console.log('Closed notification: ' + primaryKey);
  // TODO Send notification close event
});

self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  notification.close();
  e.waitUntil(
    Promise.all([
      clients.openWindow('pages/page' + primaryKey + '.html'),
      // TODO Send notification click event
    ])
  );
});

self.addEventListener('push', function(e) {
  var options = {
    body: 'This notification was generated from a push!',
    icon: 'images/notification-flat.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '-push-notification'
    }
  };
  e.waitUntil(Promise.all([
      self.registration.showNotification('Hello world!', options),
      // TODO Send push recieved event
    ])
  );
});
