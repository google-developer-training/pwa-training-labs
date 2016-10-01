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
function getCountryInfo(country) {
  var apiCall = 'http://api.geonames.org/searchJSON?q=' + country +
  '&maxRows=1' + '&username=caraya';

  console.log(apiCall);
  return fetch(apiCall)
  .then(response => {
    if (response.status !== 200) {
      throw new Error('Unable to fetch file');
    }
    console.log(response);
    return response.json();
  })
  .catch((err) => {
    console.log('Fetch failed: ' + err);
  });
}

function getCountryName(json) {
  var country = json.geonames[0].countryName;
  return country;
}

function fetchFlag(country) {
  var url = '';
  var countryFlag = url + country + '.png';
  console.log(countryFlag);
  return fetch(countryFlag, {mode: 'cors'})
  .then(response => {
    if (!response.ok) {
      throw new Error('Fetch failed' + response.status);
    }
    return response.blob();
  });
}

function displayFlag(flagBlob) {
  var flagImage = document.createElement('img');
  var flagDataURL = URL.createObjectURL(flagBlob); // NOTE THIS STEP FOR STUDENT
  flagImage.src = flagDataURL;
  document.body.appendChild(flagImage);
}

function promiseFlag(country) {
  getCountryInfo(country)
  .then(getCountryName)
  .then(fetchFlag)
  .then(displayFlag)
  .catch(function(err) {
    console.log(err);
  });
}
