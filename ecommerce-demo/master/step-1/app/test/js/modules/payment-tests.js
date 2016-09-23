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
// jshint esversion: 6
import Cart from 'modules/cart';
import Product from 'modules/product';
import pay from 'modules/payment';

QUnit.module('Payments');

QUnit.test('payment works', assert => {
    // jQuery defines assert.async() to return a fucntion to call at the end
    // of the test. gulp-qunit defines start() at the beginning of the test
    // and stop() at the end. So we have to shim this a bit.

    if (start) start();
    let done = stop || assert.async();

    const c10 = new Product('C10', 'C10 Chair', 100.00, 'C10.jpg', 'PUT TEXT HERE');
    const cart = new Cart();

    cart.add(c10);
    pay(cart)
      .then((response) => {
        // TODO check if the response is OK
        assert.ok(payment.ok);
        stop();
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
