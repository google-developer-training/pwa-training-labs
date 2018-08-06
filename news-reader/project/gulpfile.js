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

const DIST_MODE = process.argv[process.argv.length-1] === 'dist';

// Dependencies
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const uglify = composer(uglifyes, console);
const gulp = require('gulp');
const noop = require('gulp-noop');
const replace = require('gulp-replace');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const fs = require('fs');
const del = require('del');

const paths = {
  styles: {
    src: 'src/styles/*.css',
    dest: '.tmp/'
  },
  scripts: {
    src: [
      'src/scripts/*.js'
    ],
    dest: '.tmp/'
  },
  root: {
    src: 'src/*.*',
    dest: 'dist/'
  },
  images: {
    src: 'src/images/**/*',
    dest: 'dist/images'
  }
}

// Copy images & root files like index.html
function copy() {
  gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
  return gulp.src(paths.root.src)
    .pipe(gulp.dest(paths.root.dest));
}

// Copy and process CSS
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({ browsers: ['> 10%'] }))
    .pipe(gulp.dest(paths.styles.dest));
}

// Copy and process scripts
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(plumber())
    .pipe(concat('scripts.js'))
    .pipe(DIST_MODE ? uglify({
      mangle: {
        safari10: true
      }
    }) : noop())
    .pipe(gulp.dest(paths.scripts.dest));
}

// Inline processed CSS & scripts into index.html
function inline() {

  let css = fs.existsSync('./.tmp/main.css');
  let scripts = fs.existsSync('./.tmp/scripts.js');

  return gulp.src('src/index.html')
    .pipe(css ?
      replace('/* REPLACED-INLINE-STYLESHEET */', fs.readFileSync('./.tmp/main.css', 'utf8')) :
      noop())
    .pipe(scripts ?
      replace('/* REPLACED-INLINE-JAVASCRIPT */', fs.readFileSync('./.tmp/scripts.js', 'utf8')) :
      noop())
    .pipe(gulp.dest('dist/'));
}

// Clean temporary directories
function clean() {
  return del([
    '.tmp'
  ]);
}

// Start local dev server and rebuild on file changes
function watch() {

  browserSync.init({
    server: {
      baseDir: 'dist/'
    },
    files: 'src/**/*',
    port: 8081,
    open: false,
    ui: false,
    injectChanges: true
  });

  gulp.watch(paths.scripts.src, gulp.series(scripts, inline));
  gulp.watch(paths.styles.src, gulp.series(styles, inline));
  gulp.watch(paths.root.src, dist);
  gulp.watch(paths.images.src, copy);

  gulp.watch('dist/index.html', browserSync.reload);
}

const dist = gulp.series(gulp.parallel(copy, styles, scripts), inline);
const dev = gulp.series(dist, watch);

gulp.task('dev', dev);
gulp.task('dist', dist);
gulp.task('default', dev);

