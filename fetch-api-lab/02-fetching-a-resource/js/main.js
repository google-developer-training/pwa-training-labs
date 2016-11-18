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

  // TODO Step 2.1a
  if (!('fetch' in window)) {
    console.log('Fetch API not found, try including the polyfill');
    return;
  }

  function fetchJSON() {
    fetch('examples/animals.json') // 1
    .then(validateResponse) // 2
    .then(readResponseAsJSON) // 3
    .then(logResult) // 4
    .catch(logError);
  }

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
  }

  function readResponseAsBlob(response) {
    // TODO Step 3b
  }

  function fetchImage() {
    // TODO Step 3c
  }

  function showText(responseAsText) {
    //  TODO Step 4a
  }

  function readResponseAsText(response) {
    // TODO Step 4b
  }

  function fetchText() {
    // TODO Step 4c
  }

  function headRequest() {
    // TODO Step 5.1
  }

  function logSize(response) {
    // TODO Step 5.2
  }

  /* NOTE: Never send unencrypted user credentials in production! */
  function postRequest() {
    // TODO Step 6.2
  }

  // Don't worry if you don't understand this, it's not part of the Fetch API.
  // We are using the JavaScript Module Pattern to enable unit testing of
  // our functions.
  return {
    readResponseAsJSON: (readResponseAsJSON),
    readResponseAsBlob: (readResponseAsBlob),
    readResponseAsText: (readResponseAsText),
    validateResponse: (validateResponse),
    fetchJSON: (fetchJSON),
    fetchImage: (fetchImage),
    fetchText: (fetchText),
    headRequest: (headRequest),
    postRequest: (postRequest)
  };

})();
