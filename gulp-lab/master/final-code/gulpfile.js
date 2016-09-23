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
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

var paths = {
  src: 'app/'
};

gulp.task('minify', function() {
  gulp.src('app/scripts/main.js')
  .pipe(uglify())
  .pipe(gulp.dest('app/'));
});

gulp.task('processCSS', function() {
    return gulp.src('./css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'));
  });

gulp.task('serve', ['processCSS'], function() {

  browserSync.init({
      server: './app'
    });

  gulp.watch('app/css/**/*.scss', ['processCSS']);
});

gulp.task('default', ['serve']);
