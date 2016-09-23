# Unconference demo app

This is an app project for the Progressive Web App instructor-led training course developed by Google.

The aim of this project is to build a simple web app for an unconference-style event.

Starting out with unstyled static content, each step builds towards a dynamic site that uses Service Worker to cache resources and manage realtime updates.

Each step includes a README with a list of objectives and 'things to check'.

## [Step 1](/step-1)

**HTML only: text and images. Pure, unstyled content — but already a functional static website. Any subsequent changes must not degrade performance or usability!**

### Objectives

* Content design: text, images and media.

* HTML design: tags add meaning to content. Use HTML is to add meaning and structure, not for layout.

* File structure: standardise names, standardise image formats. This will help templating and debugging.

* Make a habit of upstream checking.

## [Step 2](/step-2)

**Add CSS.**

### Objectives

* Layout: given the target devices and viewports, what needs changing from Step 1?

* Usability: does everything work? This is an app for an event — is anything missing or broken?

* Image files: what needs to change? Look for anomalies. How low can you go? Reduce image quality as far as possible. Compare [rob_dodson.jpg](images/speakers/rob_dodson.jpg) with [tal_oppeneimer.jpg](images/speakers/tal_oppeneimer.jpg).

* Test in all target browsers and viewports.

## [Step 3](/step-3)

**Add a manifest.**

### Objectives

* Configure the homescreen experience: icon and app name.

* Configure the launch experience: splash screen, colors, icons.

* Test in all target browsers.


## [Step 4](/step-4)

**Add third party content: YouTube video, a Google Map, and Google Analytics code.**

### Objectives

* Include third party content.

* Check that third party content is functional in all target browsers and viewport sizes.

* Check effect of third party content on page layout in all target viewport sizes.

* Check effect on performance: file requests, page weight, load speed.

* Understand data cost.

* Check functionality and layout on slow connections.

* Understand testing techniques for all target browsers and viewport sizes.


## [Step 5](/step-5)

**Use the task runner Gulp to lint code.**

This step take you part of the way to implementing a build process, to automate testing and processing of code and assets before committing or deploying. Source code has all been moved to the **src** directory, and inline JavaScript from [index.html](src/index.html) has been moved to external files.

### Objectives

* Use a task runner to automate processes when building, committing and deploying code.

* Learn how to use Gulp as a task runner.

* Enable (and potentially enforce) code validation.


## [Step 6](/step-6)

**Add a service worker to enable pre-caching of files.**

### Objectives

* Learn how to use a service worker to precache files.

* Understand and test the benefits of pre-caching to improve performance and enable web content to work offline.


## [Step 7](/step-7)

**Enable engagement and re-engagement.**

### Objectives

* Add push notifications.

* Add **Install Prompt** handling.


## [Step 8](/step-8)

**Enable dynamic content updating.**

### Objectives

* Create sample data.

* Get data and update page elements.

---

## License
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

---

This is not an official Google product.
