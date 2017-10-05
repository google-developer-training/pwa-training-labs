/*jshint esversion:6*/
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
const gulp = require('gulp');
const browserSync = require('browser-sync');
const del = require('del');
const runSequence = require('run-sequence');
const swPrecache = require('sw-precache');

// Clean build directory
gulp.task('clean', () => del(['.tmp', 'build/*', '!build/.git'], {dot: true}));

gulp.task('copy', () =>
  gulp.src([
    'app/**/*'
  ]).pipe(gulp.dest('build'))
);

gulp.task('service-worker', function(callback) {
  swPrecache.write('build/sw.js', {
    staticFileGlobs: [
      'build/index.html',
      'build/css/main.css',
    ],
    importScripts: [
      'sw-toolbox.js',
      'js/toolbox-script.js'
    ],
    stripPrefix: 'build'
  }, callback);
});

gulp.task('default', ['clean'], cb => {
  runSequence(
    'copy',
    'service-worker',
    cb
  );
});

gulp.task('serve', ['default'], () => {
  browserSync.init({
    server: 'build',
    port: 8002
  });
  gulp.watch('app/*', ['default']).on('change', browserSync.reload);
});
