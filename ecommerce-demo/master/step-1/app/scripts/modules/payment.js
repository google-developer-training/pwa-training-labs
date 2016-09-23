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
import Cart from './cart';
import Product from './product';

/*
* Given a cart set up with an order, gets payment authorization.
* The display parameter gives a place to place the UI (could be
* window or a div in the window.)
* Returns a promise that resolves when payment is complete or rejects
* (with a reason) when the payment fails.
*/
export default function processPayment(cart) {
  const _shippingOptions = {
    'standard': {
      id: 'standard',
      label: 'Standard Shipping',
      price: 0
    },
    'express': {
      id: 'express',
      label: 'Express Shipping',
      price: 10
    },
    'international': {
      id: 'international',
      label: 'International Shipping',
      price: 15
    }
  };

  // convert `addr` into a dictionary
  const toDict = function(addr) {
    let dict = {};
    if (addr) {
      dict.country           = addr.country;
      dict.region            = addr.region;
      dict.city              = addr.city;
      dict.dependentLocality = addr.dependentLocality;
      dict.addressLine       = addr.addressLine;
      dict.postalCode        = addr.postalCode;
      dict.sortingCode       = addr.sortingCode;
      dict.languageCode      = addr.languageCode;
      dict.organization      = addr.organization;
      dict.recipient         = addr.recipient;
      dict.careOf            = addr.careOf;
      dict.phone             = addr.phone;
    }
    return dict;
  };

  const toShippingOption = function(option) {
    return {
      id: option.id,
      label: option.label,
      amount: {currency: 'USD', value: String(option.price)}
    };
  };

  let getPaymentDetails = function(cart, country, shippingOptionId) {
    let displayItems = [];
    let shippingOptions = [
      toShippingOption(_shippingOptions['standard']),
      toShippingOption(_shippingOptions['express'])
    ]
    let total = cart.totalPrice;

    for (let item of cart.cart) {
      displayItems.push({
        label: item.title + ' x ' + item.quantity,
        amount: {currency: 'USD', value: String(item.total)},
        selected: false
      });
    }

    // `country` is not specified on initialization
    if (country) {
      if (country === 'US') {
        let option;
        if (shippingOptionId == 'express') {
          option = _shippingOptions['express'];
          shippingOptions[1].selected = true;
        } else {
          // Treat `shippingOptionId` not being 'express' always as 'standard'
          option = _shippingOptions['standard'];
          shippingOptions[0].selected = true;
        }
        displayItems.push({
          label: option.label,
          amount: {currency: 'USD', value: String(option.price)}
        });
        total += option.price;
      } else {
        // Outside of US has only one shipping option
        let option = _shippingOptions['international'];
        // Overwrite shipping options
        shippingOptions = [
          toShippingOption(option)
        ];
        shippingOptions[0].selected = true;

        displayItems.push({
          label: option.label,
          amount: {currency: 'USD', value: String(option.price)}
        });
        total += option.price;
      }
    }

    let details = {
      displayItems: displayItems,
      total: {
        label: 'Total due',
        amount: {currency: 'USD', value: String(total)}
      },
      shippingOptions: shippingOptions
    };
    return details;
  };

  // Supported payment instruments
  let supportedInstruments = [{
    supportedMethods: [
      'visa', 'mastercard', 'amex', 'discover', 'maestro',
      'diners', 'jcb', 'unionpay', 'bitcoin'
    ]
  }];

  // Payment details
  let details = getPaymentDetails(cart);

  // Payment options
  let options = {
    requestShipping: true,
    requestPayerEmail: true,
    requestPayerPhone: true
  };

  // Initialize
  let request = new PaymentRequest(supportedInstruments, details, options);

  // When user selects a shipping address
  request.addEventListener('shippingaddresschange', e => {
    e.updateWith(((country) => {
      let details = getPaymentDetails(cart, country);
      return Promise.resolve(details);
    })(request.shippingAddress.country));
  });

  // When user selects a shipping option
  request.addEventListener('shippingoptionchange', e => {
    e.updateWith(((country, shippingOption) => {
      let details = getPaymentDetails(cart, country, shippingOption);
      return Promise.resolve(details);
    })(request.shippingAddress.country, request.shippingOption));
  });

  // Show UI then continue with user payment info
  return request.show().then(result => {
    // Manually clone the resulting object
    var data = {};
    data.methodName = result.methodName;
    data.details    = result.details;
    data.payerEmail = result.payerEmail;
    data.payerPhone = result.payerPhone;
    data.address    = toDict(result.shippingAddress);
    data.shipping   = result.shippingOption;

    // POST the object to the server
    return fetch('/checkout.html', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      // Only if successful
      if (res.status === 200) {
        return res.json();
      } else {
        throw 'Payment failure';
      }
    }).then(response => {
      // You should have received a JSON object
      if (response.success === true) {
        result.complete('success');
        return Promise.resolve();
      } else {
        result.complete('fail');
        return Promise.reject();
      }
    }).catch(() => {
      result.complete('fail');
      return Promise.reject();
    });
  });
}
