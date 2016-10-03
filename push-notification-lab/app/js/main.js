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

  // TODO 1 - Test for notification support

  // TODO 2 - Request permission to display notifications

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function(reg) {
      console.log('Service Worker Registered!', reg);

      // TODO 11 - subscribe to the push service

    }).catch(function(err) {
      console.log('Service Worker registration failed: ', err);
    });
  }

  function displayNotification() {

    // TODO 3 - Display the notification

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
