/*
* Copyright 2018 Google Inc. All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

// Return event as a Promise, because we don't want to show it until
// after our API data loads
const deferredPromptPromise = new Promise((resolve, reject) => {

  window.addEventListener('beforeinstallprompt', event => {

    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();

    resolve(event);
  });
});

function tryInitInstallBtn() {

  // Only initialize the install button if/after beforeinstallprompt event occurs
  deferredPromptPromise.then(deferredPrompt => {

    // Add install functionality to user gesture
    const btnInstall = document.getElementById('btn-install');
    btnInstall.addEventListener('click', () => {

      // Show the prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice
        .then(choiceResult => {
          console.log('choiceResult', choiceResult);
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }

          // Hide our user interface interface
          document.getElementById('install-wrapper').style.display = 'none';
        });
    });

    // Show the user gesture interface
    document.getElementById('install-wrapper').style.display = 'flex';
  })
}




