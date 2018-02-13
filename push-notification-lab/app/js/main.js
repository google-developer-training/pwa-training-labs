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
const app = (() => {
  'use strict';

  let isSubscribed = false;
  let swRegistration = null;

  const notifyButton = document.querySelector('.js-notify-btn');
  const pushButton = document.querySelector('.js-push-btn');

  // TODO 2.1 - check for notification support

  // TODO 2.2 - request permission to show notifications

  function displayNotification() {

    // TODO 2.3 - display a Notification

  }

  function initializeUI() {

    // TODO 3.3b - add a click event listener to the "Enable Push" button
    // and get the subscription object

  }

  // TODO 4.2a - add VAPID public key

  function subscribeUser() {

    // TODO 3.4 - subscribe to the push service

  }

  function unsubscribeUser() {

    // TODO 3.5 - unsubscribe from the push service

  }

  function updateSubscriptionOnServer(subscription) {
    // Here's where you would send the subscription to the application server

    const subscriptionJson = document.querySelector('.js-subscription-json');
    const endpointURL = document.querySelector('.js-endpoint-url');
    const subAndEndpoint = document.querySelector('.js-sub-endpoint');

    if (subscription) {
      subscriptionJson.textContent = JSON.stringify(subscription);
      endpointURL.textContent = subscription.endpoint;
      subAndEndpoint.style.display = 'block';
    } else {
      subAndEndpoint.style.display = 'none';
    }
  }

  function updateBtn() {
    if (Notification.permission === 'denied') {
      pushButton.textContent = 'Push Messaging Blocked';
      pushButton.disabled = true;
      updateSubscriptionOnServer(null);
      return;
    }

    if (isSubscribed) {
      pushButton.textContent = 'Disable Push Messaging';
    } else {
      pushButton.textContent = 'Enable Push Messaging';
    }

    pushButton.disabled = false;
  }

  function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  notifyButton.addEventListener('click', () => {
    displayNotification();
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      console.log('Service Worker and Push is supported');

      navigator.serviceWorker.register('sw.js')
      .then(swReg => {
        console.log('Service Worker is registered', swReg);

        swRegistration = swReg;

        // TODO 3.3a - call the initializeUI() function
      })
      .catch(err => {
        console.error('Service Worker Error', err);
      });
    });
  } else {
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
  }

})();
