/*jshint esversion:6*/
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
// const swPrecache = require('sw-precache');
const workboxBuild = require('workbox-build');

// Clean "build" directory
const clean = () => {
  return del(['build/*'], {dot: true});
};
gulp.task('clean', clean);

// Copy "app" directory to "build" directory
const copy = () => {
  return gulp.src(['app/**/*']).pipe(gulp.dest('build'));
};
gulp.task('copy', copy);

// Inject a precache manifest into the service worker with workbox-build
const serviceWorker = () => {
  return workboxBuild.injectManifest({
    swSrc: 'app/sw.js',
    swDest: 'build/sw.js',
    globDirectory: 'build',
    globPatterns: [
      'index.html',
      'styles/main.css'
    ]
  }).then(resources => {
    console.log(`Injected ${resources.count} resources for precaching, ` +
        `totaling ${resources.size} bytes.`);
  }).catch(err => {
    console.log('[ERROR] This happened: ' + err);
  });
}
gulp.task('service-worker', serviceWorker);

// This is the app's build process
const build = gulp.series('clean', 'copy', 'service-worker');
gulp.task('build', build);

// Build the app, run a local dev server, and rebuild on "app" file changes
const browserSyncOptions = {
  server: 'build',
  port: 8002
};
const serve = gulp.series(build, () => {
  browserSync.init(browserSyncOptions);
  return gulp.watch('app/**/*', build).on('change', browserSync.reload);
});
gulp.task('serve', serve);

// Set the default task to "build"
gulp.task('default', build);