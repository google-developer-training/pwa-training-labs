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
QUnit.test('A very simple test of no value', function(assert) {
  assert.ok(1 === '1', 'Test passed! (But we didn\'t test anything)');
  assert.ok(true === true, 'True is true');
});

// Does t he URL we build match the actual URL for the flag?
QUnit.test('We can get the flag', function(assert) {
  var country = 'Argentina';
  var url = 'https://caraya.github.io/promises-lab/end-code/flags/';
  var countryFlag = url + country + '.png';
  assert.equal(countryFlag,
    'https://caraya.github.io/promises-lab/end-code/flags/Argentina.png',
    'URLs match');
});

// Did we get any data with the API call?
QUnit.test('We got data', function(assert) {
  // var done = assert.async();
  assert.async();
  getCountryName('Spain', 1, 'caraya')
  .then(function(assert) {
    assert.ok(apiCall.length() > 0, 'API call succeeded');
    assert.async();
    done();
  });
}); // closes QUnit.test

// Is the reponse in JSON format?
QUnit.test('The country name matches', function(assert) {
  assert.async();
  getCountryName('Chile', 1, 'caraya')
  .then(function(response, assert) {
    return response.json();
  })
  .then(function(response, assert) {
    var country = response.geonames[0].countryName;
    assert.equal(country, 'Chile', 'Country name matches');
    assert.async();
  });
});
