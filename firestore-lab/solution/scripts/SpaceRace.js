/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

/**
 * Initializes the SpaceRace app.
 */
function SpaceRace() {
  firebase.auth().signInAnonymously().then(() => {
    firebase.firestore().enablePersistence()
      .then(() => {
        this.initTemplates();
        this.initRouter();
      });
  }).catch(err => {
    console.log(err);
  });
}

/**
 * Initializes the router for the SpaceRace app.
 */
SpaceRace.prototype.initRouter = function() {
  this.router = new Navigo();

  this.router
    .on({
      '/': () => {
        this.viewList();
      }
    })
    .on({
      '/setup': () => {
        this.viewSetup();
      }
    })
    .resolve();

  firebase
    .firestore()
    .collection('ships')
    .limit(1)
    .onSnapshot(snapshot => {
      if (snapshot.empty) {
        this.router.navigate('/setup');
      }
    });
};

SpaceRace.prototype.getCleanPath = function(dirtyPath) {
  if (dirtyPath.startsWith('/index.html')) {
    return dirtyPath.split('/').slice(1).join('/');
  } else {
    return dirtyPath;
  }
};

SpaceRace.prototype.getFirebaseConfig = function() {
  return firebase.app().options;
};

SpaceRace.prototype.getRandomItem = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

SpaceRace.prototype.data = {
  names: [
    'Eden',
    'Octavia',
    'Arcadian',
    'Brazen',
    'Cayman',
    'Lanark',
    'Vega',
    'Kestrel',
    'Polaris',
    'Voltaire'
  ],
  specials: [
    'Teleportation',
    'Warp Speed',
    'Time Shift',
    'Mines',
    'Cannons',
    'Cloaking',
    'Invulnerability',
    'Defense Drones',
    'Shields',
    'Oil Slick'
  ]
};

window.onload = () => {
  window.app = new SpaceRace();
};
