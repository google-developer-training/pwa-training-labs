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
/*jshint esversion: 6*/
/*jshint -W086*/

const DBNAME = 'users';
const DBVERSION = 1;

var records = [
  {name: 'carlos',
  url:
    'https://placeholdit.imgix.net/~text?txtsize=33&txt=200x200&w=200&h=200'},
  {name: 'david',
  url:
    'https://placeholdit.imgix.net/~text?txtsize=33&txt=200x200&w=200&h=200'},
  {name: 'stillman',
  url:
    'https://placeholdit.imgix.net/~text?txtsize=33&txt=200x200&w=200&h=200'},
  {name: 'marcj',
  url:
    'https://placeholdit.imgix.net/~text?txtsize=33&txt=200x200&w=200&h=200'}
];

// IDB CODE
function installDB() {
  var dbPromise = idb.open(DBNAME, DBVERSION, upgradeDB => {
    // Note: we don't use 'break' in this switch statement,
    // we want to fall through and get all the results.
    switch (upgradeDB.oldVersion) {
      case 0:
        upgradeDB.createObjectStore(DBNAME, {keyPath: 'name'});
    }
  })
  .then(db => console.log('DB opened!', db))
  .catch(error => {
    console.log('TRY AGAIN', error);
  });
}

function addUsers() {
  var dbPromise = idb.open(DBNAME, DBVERSION);

  dbPromise.then(db => {
    //Get a transaction
    //default for OS list is all, default for type is read
    var tx = db.transaction(['users'], 'readwrite');
    //Open the objectStore on the transaction object
    var store = tx.objectStore('users');
    //Perform the add
    // Map the records array and put individual entries for name and URL
    records.map(record => {
        store.put({
          name: record.name,
          url: record.url,
        });
      });
    return tx.complete;
  })
  .then(() => {
    console.log('added users to the users os!');
  })
  .catch(error => {
    console.log('Could not add users to database', error);
  });
}

function showUsers() {
  var dbPromise = idb.open(DBNAME, DBVERSION);

  dbPromise.then(db => {
    return db.transaction('users')
      .objectStore('users').getAll()
      .then(allUsers => console.log(allUsers));
  })
  .catch(error => {
    console.log('Could not access users in database', error);
  });
}
