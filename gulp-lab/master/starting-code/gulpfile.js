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
/*jshint node:true*/
var gulp = require('gulp');
var path = require('path');
// TODO 2.1: Add the code to require Gulp
// TODO 3.1: Add the code to require the uglify plugin
// TODO 4.1: Add the code to require sourcemaps and autoprefixer plugins
// TODO 5.1: Add the code to require browserSync

var paths = {
  src: 'app/'
};

// TODO 3.2: Add the code for the Uglify task

// TODO 4.2: Add the code for the processCSS task

// TODO 5.2: Add the code for the serve task

gulp.task('default', ['serve']);
