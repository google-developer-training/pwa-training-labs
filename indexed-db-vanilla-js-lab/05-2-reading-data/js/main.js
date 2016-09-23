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

  //Start listening for button clicks
  document.getElementById('addItem').addEventListener('click', addItem);
  document.getElementById('addNote').addEventListener('click', addNote);
  document.getElementById('getItem').addEventListener('click', getItem);
  document.getElementById('getNote').addEventListener('click', getNote);
  document.getElementById('updateItem').addEventListener('click',
    updateItem);
  document.getElementById('deleteItem').addEventListener('click',
    deleteItem);
  document.getElementById('getAll').addEventListener('click', getAll);
  document.getElementById('showAll').addEventListener('click', getItems);
  document.getElementById('search').addEventListener('click', searchItems);

  if (!('indexedDB' in window)) {
    console.log('IndexedDB not supported by this browser!');
  }

  var dbPromise = idb.open('test-db1', 4, function(upgradeDb) {
    console.log('making a new object store');
    if (!upgradeDb.objectStoreNames.contains('firstOS')) {
      upgradeDb.createObjectStore('firstOS');
    }
    console.log('Creating object stores');
    if (!upgradeDb.objectStoreNames.contains('people')) {
      var peopleOS = upgradeDb.createObjectStore('people', {keyPath: 'email'});
    }
    if (!upgradeDb.objectStoreNames.contains('notes')) {
      var notesOS = upgradeDb.createObjectStore('notes', {autoIncrement: true});
    }
    if (!upgradeDb.objectStoreNames.contains('logs')) {
      var logsOS = upgradeDb.createObjectStore('logs', {keyPath: 'id',
        autoIncrement: true});
    }
    if (!upgradeDb.objectStoreNames.contains('store')) {
      var storeOS = upgradeDb.createObjectStore('store', {keyPath: 'name'});
    }
    if (upgradeDb.objectStoreNames.contains('people')) {
      var store = upgradeDb.transaction.objectStore('people');
      store.createIndex('gender', 'gender', {unique: false});
      store.createIndex('ssn', 'ssn', {unique: true});
    }
    if (upgradeDb.objectStoreNames.contains('notes')) {
      var store = upgradeDb.transaction.objectStore('notes');
      store.createIndex('title', 'title', {unique: false});
    }
    if (upgradeDb.objectStoreNames.contains('store')) {
      var store = upgradeDb.transaction.objectStore('store');
      store.createIndex('price', 'price');
    }
  });

  function addItem() {
    var name = document.getElementById('name').value;
    var price = document.getElementById('price').value;
    var desc = document.getElementById('desc').value;
    console.log('About to add ' + name + '/' + price + '/' + desc);

    dbPromise.then(function(db) {
      //Get a transaction
      var tx = db.transaction(['store'], 'readwrite');
      //Open the objectStore on the transaction object
      var store = tx.objectStore('store');
      //Define an item
      var item = {
        name: name,
        price: price,
        description: desc,
        created: new Date().getTime()
      };
      //Perform the add
      store.add(item);
      return tx.complete;
    }).then(function() {
      console.log('added item to the store os!');
    });
  }

  function addNote() {
    var noteText = document.getElementById('note').value;
    console.log('About to add ' + noteText);

    dbPromise.then(function(db) {
      var note = {
        text: noteText,
        created: new Date().getTime()
      };
      var tx = db.transaction(['notes'], 'readwrite');
      //Open the objectStore on the transaction object
      var store = tx.objectStore('notes');
      store.add(note);
      return tx.complete;
    }).then(function() {
      console.log('added note to the notes os!');
    });
  }

  function getItem() {
    var key = document.getElementById('getname').value;
    if (key === '') {return;}
    dbPromise.then(function(db) {
      var tx = db.transaction(['store'], 'readonly');
      var store = tx.objectStore('store');
      return store.get(key);
    }).then(function(val) {
      console.dir(val);

      // TODO 10 - put object values into Update Item fields on page

    });
  }

  function getNote() {
    var key = document.getElementById('getnote').value;
    if (key === '') {return;}
    dbPromise.then(function(db) {
      var tx = db.transaction(['notes'], 'readonly');
      var store = tx.objectStore('notes');
      return store.get(Number(key));
    }).then(function(val) {
      console.dir(val);
    });
  }

  function updateItem() {

    // TODO 11 - update item in the object store

  }

  function deleteItem() {

    // TODO 12 - delete item from the store

  }

  function getAll() {

    // TODO 13 - get all objects from the store object store

  }

  function getItems() {

    // TODO 14 - iterate through items in the object store

  }

  function searchItems() {

    // TODO 15 - iterate through items in specific range

  }

  // TODO 16 - database versioning best practices
};
