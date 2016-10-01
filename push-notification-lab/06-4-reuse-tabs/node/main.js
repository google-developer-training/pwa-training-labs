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
var webPush = require('web-push');

var serviceKeys = webPush.generateVAPIDKeys();

var subscription = {"endpoint":"https://android.googleapis.com/gcm/send/d8vGk-cGnoo:APA91bEt8UEK_CHNKhwFvAMEPl-qu2Z-y7BvNmC5ETgUYb8G0Zx081fRyXgJRN-Rfm4EcF9WMl60OhPjp5AdBr_vdwSdVVD0XyqlLSawzEi_L-Y1yobGQ4BHr2hxMbpO0xtXhAYoZ5Ii","keys":{"p256dh":"BMtHh2IGPioVeF-dMV5UN2HapC5Si94he3L9rwf_y_f3SPaAk4m3GOob8DufWRo_3g4g8KUdFfRDTLGN48viXc8=","auth":"dNI70P-m7V7b9ZdmeTVOJA=="}}

webPush.setGCMAPIKey('AIzaSyD1JcZ8WM1vTtH6Y0tXq_Pnuw4jgj_92yg');

webPush.sendNotification(subscription.endpoint, {
  userPublicKey: subscription.keys.p256dh,
  userAuth: subscription.keys.auth,
  vapid: {
    subject: 'mailto: YOUR_EMAIL',
    publicKey: serviceKeys.publicKey,
    privateKey: serviceKeys.privateKey
  },
  payload: JSON.stringify({
    'title': 'First push message!',
    'body': 'From a server!',
    'primaryKey': '-push-notification'
  })
})
.then(function(r) {
  console.log('Pushed message successfully!', r);
})
.catch(function(e) {
  console.log('Error', e);
});
