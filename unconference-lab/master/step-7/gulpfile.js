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

/* globals require */

const gulp = require('gulp');

// Include plugins
const eslint = require('gulp-eslint');
const csslint = require('gulp-csslint');
const htmlhint = require('gulp-htmlhint');

// Check CSS with CSSLint using rules defined in .csslintrc
// Pipe the result into formatter
gulp.task('csslint', () => {
  return gulp.src('src/**/*.css')
  .pipe(csslint())
  // Output results and fail on error
  .pipe(csslint.formatter())
  .pipe(csslint.failFormatter());
});

// Check JavaScript with ESLint using rules defined in .eslintrc
gulp.task('eslint', () => {
  return gulp.src(['src/**/*.js'])
  .pipe(eslint())
  // Output results and fail on error
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

// Check HTML with HTMLHint
gulp.task('htmlhint', () => {
  return gulp.src('src/**/*.html')
  // Output results and fail on error
  .pipe(htmlhint())
  .pipe(htmlhint.failReporter());
});

gulp.task('default', ['csslint', 'eslint', 'htmlhint'],
  function() {
    // run only if all the lint tasks are successful
    console.log('\nCSS, JavaScript and HTML appears to be valid!\n');
  });
