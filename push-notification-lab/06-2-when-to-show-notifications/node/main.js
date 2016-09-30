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

var subscription = {"endpoint":"https://android.googleapis.com/gcm/send/f0KET8aAw1o:APA91bEM1vfZprNeDQA1ujPhd5B8F4bh2y5zPNE47PIo7NH3CsMirq0X9HPlapM9DYJt440kjDwC6k_ratiVYUkre16Hm66RiCyTlNQV-FjCIDwtprk1JdgSfG4uhfVuhGX8je5ag_Su","keys":{"p256dh":"BIiaJaQjDFX7lrbuuDHSRHuuy2RiRi927U1RqEzB9nJP3jT_i5eoL-03btlLQGvDbZ8nWaGvRWYinRwE3k8FlsA=","auth":"Rcp0FqWYvFgoj0b_cBqC2w=="}}

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
