/*
Copyright 2018 Google Inc.

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
const gulp = require('gulp');
const browserSync = require('browser-sync');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');

function copy() {
  return gulp.src([
    'app/*.html',
    'app/**/*.jpg',
    // 'app/**/*.css', // processed by processCss
    // 'app/**/*.js' // processed by processJs
  ])
  .pipe(gulp.dest('build'));
}
gulp.task('copy', copy);

function serve() {
  return browserSync.init({
    server: 'build',
    open: false,
    port: 3000
  });
}
gulp.task(
  'buildAndServe',
  gulp.series(
    copy, processJs, processCss,
    gulp.parallel(serve, watch)
  )
);

function processJs() {
  return gulp.src('app/scripts/*.js')
  .pipe(babel({
      presets: ['env']
  }))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('build/scripts'));
}
gulp.task('processJs', processJs);

function watch() {
  gulp.watch('app/scripts/*.js', processJs);
  gulp.watch('app/styles/*.css', processCss);
}
gulp.task('watch', watch);

function processCss() {
  return gulp.src('app/styles/*.css')
  .pipe(cleanCss())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('build/styles'));
}
gulp.task('processCss', processCss);
