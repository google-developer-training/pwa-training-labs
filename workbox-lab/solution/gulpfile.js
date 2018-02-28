/**
 * Copyright 2018 Google Inc. All rights reserved.
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
const workboxBuild = require('workbox-build');

// Clean "build" directory
gulp.task('clean', () => del(['build/*'], {dot: true}));

// Copy "src" directory to "build" directory
gulp.task('copy', () =>
  gulp.src(['src/**/*']).pipe(gulp.dest('build'))
);

// Build the app, run a local dev server, and rebuild on "src" file changes
gulp.task('serve', ['default'], () => {
  browserSync.init({
    server: 'build',
    port: 8081,
    open: false
  });
  gulp.watch('src/**/*', ['default']).on('change', browserSync.reload);
});

// Inject a precache manifest into the service worker
gulp.task('build-sw', () => {
  return workboxBuild.injectManifest({
    swSrc: 'src/sw.js',
    swDest: 'build/sw.js',
    globDirectory: 'build',
    globPatterns: [
      '**\/*.css',
      'index.html',
      'js\/animation.js',
      'images\/home\/*.jpg',
      'images\/icon\/*.svg',
      'pages/offline.html',
      'pages/404.html'
    ]
  }).catch(err => {
    console.log('Uh oh 😬', err);
  });
});

// This is the default task and app's build process
gulp.task('default', ['clean'], cb => {
  runSequence(
    'copy',
    'build-sw',
    cb
  );
});
