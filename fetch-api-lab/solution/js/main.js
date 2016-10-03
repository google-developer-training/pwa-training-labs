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
var app = (function() {
  'use strict';

  function logResult(result) {
    console.log(result);
  }

  function logError(error) {
    console.log('Looks like there was a problem: \n', error);
  }

  // TODO Step 2.1: Fetch a JSON file

  if (!('fetch' in window)) {
    console.log('Fetch API not found, try including the polyfill');
    return;
  }

  function fetchJSON(pathToResource) {
    fetch(pathToResource) // 1
    .then(validateResponse) // 2
    .then(readResponseAsJSON) // 3
    .then(logResult) // 4
    .catch(logError);
  }

  fetchJSON('examples/animals.json');

  function validateResponse(response) {
    // TODO Step 2.3
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  function readResponseAsJSON(response) {
    // TODO Step 2.4
    return response.json();
  }

  function showImage(responseAsBlob) {
    //  TODO Step 3a
    var container = document.getElementById('container');
    var imgElem = document.createElement('img');
    container.appendChild(imgElem);
    var imgUrl = URL.createObjectURL(responseAsBlob);
    imgElem.src = imgUrl;
  }

  function readResponseAsBlob(response) {
    // TODO Step 3b
    return response.blob();
  }

  function fetchImage(pathToResource) {
    // TODO Step 3c
    fetch(pathToResource)
    .then(validateResponse)
    .then(readResponseAsBlob)
    .then(showImage)
    .catch(logError);
  }

  // TODO Step 3d: Fetch an image file
  fetchImage('examples/kitten.jpg');

  function showText(responseAsText) {
    //  TODO Step 4a
    var message = document.getElementById('message');
    message.textContent = responseAsText;
  }

  function readResponseAsText(response) {
    // TODO Step 4b
    return response.text();
  }

  function fetchText(pathToResource) {
    // TODO Step 4c
    fetch(pathToResource)
    .then(validateResponse)
    .then(readResponseAsText)
    .then(showText)
    .catch(logError);
  }

  // TODO Step 4d: Fetch a text file
  fetchText('examples/words.txt');

  function headRequest(pathToResource) {
    // TODO Step 5.1a
    fetch(pathToResource, {
      method: 'HEAD'
    })
    .then(validateResponse)
    // Updated in Step 5.1
    .then(logSize)
    .then(readResponseAsText)
    .then(logResult)
    .catch(logError);
  }

  // TODO Step 5.1b: Make a HEAD request
  headRequest('examples/words.txt');

  function logSize(response) {
    // TODO Step 5.2
    console.log(response.headers.get('content-length'));
    return response;
  }

  /* NOTE: Never send unencrypted user credentials in production! */
  function postRequest(pathToResource) {
    // TODO Step 6.2a
    fetch(pathToResource, {
      method: 'POST',
      body: 'username=david&password=12345'
    })
    .then(validateResponse)
    .then(readResponseAsText)
    .then(logResult)
    .catch(logError);
  }

  // TODO Step 6.2b: Make a POST request
  postRequest('http://localhost:5000/');

  // Don't worry if you don't understand this, it's not part of the Fetch API.
  // We are using the JavaScript Module Pattern to enable unit testing of
  // our functions.
  return {
    readResponseAsJSON: (readResponseAsJSON),
    readResponseAsBlob: (readResponseAsBlob),
    readResponseAsText: (readResponseAsText),
    validateResponse: (validateResponse)
  };

})();
