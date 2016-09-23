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
window.onload = function() {
  'use strict';

  document.getElementById('addProducts').addEventListener('click', addProducts);
  document.getElementById('byName').addEventListener('click', getByName);
  document.getElementById('byPrice').addEventListener('click', getByPrice);
  document.getElementById('byDesc').addEventListener('click', getByDesc);
  document.getElementById('addOrders').addEventListener('click', addOrders);
  document.getElementById('showOrders').addEventListener('click', showOrders);
  document.getElementById('fulfill').addEventListener('click', fulfillOrders);

  // TODO 1 - check for support

  // TODO 2 - open a database

  // TODO 3 - create an object store

  function addProducts() {

    // TODO 4 - add objects to the products store

  }

  function getByName() {

    // TODO 7 - use the get method to get an object by name

  }

  function getByPrice() {

    // TODO 8 - use a cursor to get objects by price

  }

  function getByDesc() {
    var key = document.getElementById('desc').value;
    if (key === '') {return;}
    var range = IDBKeyRange.only(key);
    var s = '';
    dbPromise.then(function(db) {

      // TODO 9 - get items by their description

    }).then(function() {
      if (s === '') {s = '<p>No results.</p>';}
      document.getElementById('results').innerHTML = s;
    });
  }

  function addOrders() {

    // TODO 11 - add items to the 'orders' object store

  }

  function showOrders() {
    var s = '';
    dbPromise.then(function(db) {

      // TODO 12 - use a cursor to display the orders on the page

    }).then(function() {
      if (s === '') {s = '<p>No results.</p>';}
      document.getElementById('orders').innerHTML = s;
    });
  }

  function fulfillOrders() {
    dbPromise.then(function(db) {

      // TODO 13 - get all objects from 'orders' object store

    }).then(function(orders) {
      return processOrders(orders);
    }).then(function(updatedProducts) {
      updateProductsStore(updatedProducts);
    });
  }

  function processOrders(orders) {

    // TODO 14 - get items in the 'products' store matching the orders

  }

  function decrementQuantity(product, order) {

    // TODO 15 - check the quantity of remaining products

  }

  function updateProductsStore(products) {
    dbPromise.then(function(db) {

      // TODO 16 - update the items in the 'products' object store

    }).then(function() {
      console.log('Orders processed successfully!');
      document.getElementById('receipt').innerHTML =
      '<h3>Order processed successfully!</h3>';
    });
  }
};
