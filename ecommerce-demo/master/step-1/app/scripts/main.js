/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
import Cart from './modules/cart';
import products from './modules/products';
import processPayment from './modules/payment';

(function() {
'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  let cart = new Cart();

  // Your custom JavaScript goes here
  document.addEventListener('DOMContentLoaded', e => {
    let dialog = document.querySelector('#dialog');
    document.querySelector('#close').addEventListener('click', e => {
      dialog.close();
    });

    if (location.pathname == '/cart.html') {
      let _cart = document.querySelector('#cart');
      let total = 0;
      for (let product of cart.cart) {
        let item = document.createElement('template');
        item.innerHTML = `<tr>
  <td class="mdl-data-table__cell-non-numeric">${product.title}</td>
  <td>${product.quantity}</td>
  <td>$${product.price}</td>
  <td><img class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent delete" src="images/delete.svg"></td>
</tr>`;
        item.content.querySelector('.delete').addEventListener('click', e => {
          cart.remove(product);
          location.reload();
        });
        _cart.appendChild(item.content);

        total += product.total;
      }
      let item = document.createElement('template');
      item.innerHTML = `<tr>
  <td class="mdl-data-table__cell-non-numeric">Total</td>
  <td></td>
  <td>$${total}</td>
  <td></td>
</tr>`;
      _cart.appendChild(item.content);

      if (!window.PaymentRequest) {
        document.querySelector('#form').style = 'display:block;';
      }

      let checkout_form = document.querySelector('#checkout_form');

      checkout_form.addEventListener('submit', e => {
        e.preventDefault();

        var data = new FormData(e.target);

        if (!window.PaymentRequest) {
          fetch('/checkout', {
            method: 'POST',
            credentials: 'include',
            body: data
          }).then(result => {
            if (result.status === 200) {
              return result.json();
            } else {
              throw 'Payment failure';
            }
          }).then(result => {
            location.href = '/checkout.html';
          }).catch(e => {
            dialog.showModal();
          });
          return;
        }

        processPayment(cart)
        .then(result => {
          location.href = '/checkout.html';
        }).catch(e => {
          // TODO: failure notice
          dialog.showModal();
        });
      });

    } else {
      let items = document.querySelector('#items');
      for (let product of products) {
        let item = document.createElement('template');
        item.innerHTML = `<div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
  <div class="mdl-card__media">
    <img class="article-image" src=" images/products/${product.image}" border="0" alt="">
  </div>
  <div class="mdl-card__title">
    <h2 class="mdl-card__title-text">${product.title}</h2>
  </div>
  <div class="mdl-card__supporting-text">
    Enim labore aliqua consequat ut quis ad occaecat aliquip incididunt.
  </div>
  <div class="mdl-card__actions mdl-card--border">
    <span class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent add-to-cart">Add to Cart</span>
  </div>
</div>`;
        item.content.querySelector('.add-to-cart').addEventListener('click', e => {
          cart.add(product);
          dialog.showModal();
        });
        items.appendChild(item.content);
      }
    }
  });
})();
