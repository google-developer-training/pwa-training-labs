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

self.importScripts('js/analytics-helper.js');

importScripts(
  'node_modules/sw-offline-google-analytics/offline-google-analytics-import.js'
);
goog.offlineGoogleAnalytics.initialize();

(function() {
  'use strict';

  self.addEventListener('notificationclose', function(e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
    console.log('Closed notification: ' + primaryKey);
    e.waitUntil(
      sendAnalyticsEvent('close', 'notification')
    );
  });

  self.addEventListener('notificationclick', function(e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
    notification.close();
    var action = e.action;
    if (action === 'delay') {
      // Notificaion delay logic could go here in a real app
      e.waitUntil(
        sendAnalyticsEvent('delay', 'notification')
      );
    } else if (action === 'buy') {
      // Purchase logic could go here in a real app
      e.waitUntil(
        sendAnalyticsEvent('purchase', 'notification')
      );
    } else {
      e.waitUntil(
        Promise.all([
          clients.openWindow('pages/page' + primaryKey + '.html'),
          sendAnalyticsEvent('click', 'notification')
        ])
      );
    }
  });

  self.addEventListener('push', function(e) {
    var options = {
      body: 'This notification was generated from a push!',
      icon: 'images/notification-flat.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '-push-notification'
      },
      actions: [
        {action: 'buy', title: 'Buy on sale!',
          icon: 'images/checkmark.png'},
        {action: 'delay', title: 'Not right now',
          icon: 'images/xmark.png'},
      ]
    };
    e.waitUntil(Promise.all([
        self.registration.showNotification('Hello world!', options),
        sendAnalyticsEvent('recieved', 'push')
      ])
    );
  });
})();
