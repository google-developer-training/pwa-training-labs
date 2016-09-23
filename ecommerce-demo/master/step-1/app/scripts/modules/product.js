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

//jshint esversion: 6

export default class Product {

  constructor (sku, title, price, image, description='') {
    this._sku = sku;
    this._title = title;
    this._price = price;
    this._image = image;
    this._description = description;
  }

  get sku() {
    return this._sku;
  }

  get title() {
    return this._title;
  }

  get price() {
    return this._price;
  }

  get image() {
    return this._image;
  }

  get description() {
    return this._description;
  }

}
