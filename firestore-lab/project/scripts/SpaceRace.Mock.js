/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

/**
 * Adds a set of mock Ships to the Cloud Firestore.
 */
SpaceRace.prototype.addMockShips = function() {
  const promises = [];

  for (let i = 0; i < 10; i++) {
    let name = this.data.names[i];
    let speed = Math.floor(Math.random() * 10) + 1;
    let acceleration = Math.floor(Math.random() * 10) + 1;
    let weight = Math.floor(Math.random() * 10) + 1;
    let handling = Math.floor(Math.random() * 10) + 1;
    let braking = Math.floor(Math.random() * 10) + 1;
    let special = this.getRandomItem(this.data.specials);
    let photo = `/images/ship_${i}.jpg`;

    const promise = this.addShip({
      name,
      speed,
      acceleration,
      weight,
      handling,
      braking,
      special,
      photo
    });

    if (!promise) {
      alert('addShip() is not implemented yet!');
      return Promise.reject();
    } else {
      promises.push(promise);
    }
  }

  return Promise.all(promises);
};
