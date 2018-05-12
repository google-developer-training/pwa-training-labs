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

SpaceRace.prototype.initTemplates = function() {
  this.templates = {};
  document.querySelectorAll('.template').forEach(el => {
    this.templates[el.getAttribute('id')] = el;
  });
};

SpaceRace.prototype.viewHome = function() {
  this.getAllShips();
};

SpaceRace.prototype.viewList = function() {
  const mainEl = this.renderTemplate('main');
  this.replaceElement(document.querySelector('main'), mainEl);

  let data = {};
  data['add_ship'] = () => {
    const name = addShipCard.querySelector('#name').value;
    const speed = Number(addShipCard.querySelector('#speed').value);
    const acceleration = Number(addShipCard.querySelector('#acceleration').value);
    const weight = Number(addShipCard.querySelector('#weight').value);
    const handling = Number(addShipCard.querySelector('#handling').value);
    const braking = Number(addShipCard.querySelector('#braking').value);
    const special = addShipCard.querySelector('#special').value;
    const random = Math.floor(Math.random() * 10);
    const photo = `/images/ship_${random}.jpg`;

    mainEl.querySelector('form').reset();

    this.addShip({
      name,
      speed,
      acceleration,
      weight,
      handling,
      braking,
      special,
      photo
    });
  };

  data['clear_form'] = () => {
    mainEl.querySelector('form').reset();
  };

  const addShipCard = this.renderTemplate('add-card', data);
  mainEl.querySelector('#cards').append(addShipCard);

  const renderResults = doc => {
    if (!doc) {
      this.viewSetup();
      return;
    }
    const data = doc.data();
    data['delete_ship'] = () => {
      this.deleteShip(doc.id);
    };
    const el = this.renderTemplate('ship-card', data);
    el.id = doc.id;
    mainEl.querySelector('#add-card').insertAdjacentElement('beforebegin', el);
  };
  this.getAllShips(renderResults);
};

SpaceRace.prototype.viewSetup = function() {
  const config = this.getFirebaseConfig();
  const noShipsEl = this.renderTemplate('no-ships', config);

  const button = noShipsEl.querySelector('#add_mock_data');
  let addingMockData = false;

  button.addEventListener('click', event => {
    if (addingMockData) return;
    addingMockData = true;

    event.target.style.opacity = '0.4';
    event.target.innerText = 'Please wait...';

    this.addMockShips().then(() => {
      this.rerender();
    });
  });

  this.replaceElement(document.querySelector('main'), noShipsEl);

  firebase
  .firestore()
  .collection('ships')
  .limit(1)
  .onSnapshot(snapshot => {
    if (snapshot.size && !addingMockData) {
      this.router.navigate('/');
    }
  });
};

SpaceRace.prototype.renderTemplate = function(id, data) {
  const template = this.templates[id];
  const el = template.cloneNode(true);
  el.removeAttribute('hidden');
  this.render(el, data);
  return el;
};

SpaceRace.prototype.render = function(el, data) {
  if (!data) return;

  const modifiers = {
    'data-fir-content': tel => {
      const field = tel.getAttribute('data-fir-content');
      const value = this.getDeepItem(data, field);
      if (typeof value == 'number') {
        tel.innerText = '●'.repeat(value);
      } else {
        tel.innerText = value;
      }
    },
    'data-fir-click': tel => {
      tel.addEventListener('click', (event) => {
        event.preventDefault();
        const field = tel.getAttribute('data-fir-click');
        this.getDeepItem(data, field)();
      });
    },
    'data-fir-image': tel => {
      const field = tel.getAttribute('data-fir-image');
      const value = this.getDeepItem(data, field);

      tel.src = value;
      tel.removeAttribute('hidden');
    }
  };

  Object.keys(modifiers).forEach(selector => {
    const modifier = modifiers[selector];
    this.useModifier(el, selector, modifier);
  });
};

SpaceRace.prototype.useModifier = function(el, selector, modifier) {
  el.querySelectorAll(`[${selector}]`).forEach(modifier);
};

SpaceRace.prototype.getDeepItem = function(obj, path) {
  path.split('/').forEach(chunk => {
    obj = obj[chunk];
  });
  return obj;
};

SpaceRace.prototype.replaceElement = function(parent, content) {
  parent.innerHTML = '';
  parent.append(content);
};

SpaceRace.prototype.rerender = function() {
  this.router.navigate(document.location.pathname + '?' + new Date().getTime());
};
