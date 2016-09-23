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
// jshint esversion:6
import Product from './product';

//   constructor (sku, title, price, image, description='') {

// Normally you would get these from a server
let products = [
  new Product('BarrelChair', 'Barrel Chair', 100.00, 'BarrelChair.jpg', 
    'A lovely chair made from upcycled barrel staves.'),
  new Product('C10', 'C10 Chair', 100.00, 'C10.jpg',
    'PUT TEXT HERE'),
  new Product('Cl2', 'CL2 Chair', 100.00, 'Cl2.jpg',
    'PUT TEXT HERE'),
  new Product('CP03_blue', 'CP03 Chair', 100.00, 'CP03_blue.jpg',
    'PUT TEXT HERE'),
  new Product('CPC_RECYCLED', 'CPC Upcycled', 100.00, 'CPC_RECYCLED.jpg',
    'PUT TEXT HERE'),
  new Product('CPFS', 'CPFS', 100.00, 'CPFS.jpg',
    'PUT TEXT HERE'),
  new Product('CPO2_red', 'CPO2', 100.00, 'CPO2_red.jpg',
    'PUT TEXT HERE'),
  new Product('CPT', 'CPT Table', 100.00, 'CPT.jpg',
    'PUT TEXT HERE'),
  new Product('CS1', 'CS1 Sofa', 100.00, 'CS1.jpg',
    'PUT TEXT HERE'),
];

export function findProduct(sku) {
  return products.find(product => product.sku === sku);
}

export default products;
