/**
* Copyright 2016 Google Inc. All rights reserved.
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

// The route for any requests from the googleapis origin
toolbox.router.get('/(.*)', toolbox.cacheFirst, {
  cache: {
    name: 'googleapis',
    maxEntries: 20,
  },
  origin: /\.googleapis\.com$/
});

// We want no more than 50 images in the cache. We check using a cache first strategy
toolbox.router.get(/\.(?:png|gif|jpg)$/, toolbox.cacheFirst, {
  cache: {
    name: 'images',
    maxEntries: 50
  }
});
