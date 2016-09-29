/*jshint esversion: 6*/
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

function promiseFlag(country) {
  return getCountryInfo(country)
  .then(getCountryName)
  .then(fetchFlag)
  .then(displayFlag)
  .catch(function(err) {
    console.log(err);
    throw Error('Fetch Flag failed');
  });
}

// This first function queries  geonames.org using the country name and a
// registered account name. It returns a Javascript object with the result.
// (Note: This throws an exception if the lookup fails. This is a common
// pattern when using promises: either returning a correct value or
// throwing an exception.)
function getCountryInfo(country, username) {
  var apiUsername = username || 'caraya';
  var apiCall = 'http://api.geonames.org/searchJSON?q=' + country +
  '&maxRows=1' + '&username=' + apiUsername;

  return fetch(apiCall)
  .then(response => {
    if (!response.ok) {
      throw new Error('Unable to fetch file');
    }
    console.log(response);
    return response.json();
  });
}

// getCountryName  parses the JSON object returned from the last getCountryInfo
// to obtain the country name. Then the function returns the name of the
// country obtained from the JSON object.
function getCountryName(json) {
  var country = json.geonames[0].countryName;
  return country;
}

// The fetchFlag function uses the country name to generate a URL that fetches
// the flag of the corresponding country from a Github pages site.  Next, it
// verifies that the response succeeded by testing for the ok value in the
// response object.  If the response succeeds, then return the response object
// parsed as a blob.
function fetchFlag(country) {
  var url = '';
  var countryFlag = url + country + '.png';
  // console.log(countryFlag);
  return fetch(countryFlag, {mode: 'cors'})
  .then(response => {
    if (!response.ok) {
      throw new Error('Fetch failed: ' + response.status);
    }
    console.log(response.url);
    return response.blob();
  });
}

// The final function, displayFlag takes the blob containing the flag and
// performs the following steps:
// 1. Create an image element (flagImage).
// 2. Create an objectURL for the blob (flagDataURL).
// 3. Attach the objectURL to the image source attribute.
// 4. Append the image to the image element to the body of the document.
function displayFlag(flagBlob) {
  var flagImage = document.createElement('img');
  var flagDataURL = URL.createObjectURL(flagBlob);
  flagImage.src = flagDataURL;
  document.body.appendChild(flagImage);
}
