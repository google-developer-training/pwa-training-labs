// TODO Step 3 - include gulp
var gulp = require('gulp');
// TODO Step 4.1 - include gulp-uglify
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
// TODO Step 6.3a - include browserSync
var browserSync = require('browser-sync');

// TODO Step 4.2 - uglify / minify JavaScript
gulp.task('minify', function() {
  gulp.src('js/main.js')
  .pipe(uglify())
  .pipe(gulp.dest('build'));
});

gulp.task('processCSS', function() {
  gulp.src('styles/main.css')
  .pipe(sourcemaps.init())
  .pipe(autoprefixer())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('build'));
});

// TODO Step 6.1 - add default tasks
gulp.task('default', ['serve']);

// TODO Step 6.2 - watch files
gulp.task('watch', function() {
  gulp.watch('styles/**/*.css', ['processCSS']);
  gulp.watch('js/**/*.js', ['minify']);
});

// TODO Step 6.3b - run a local server
gulp.task('serve', ['processCSS', 'minify'], function() {
  browserSync.init({
    server: '.'
  });
  gulp.watch('styles/**/*.css', ['processCSS']);
  gulp.watch('js/**/*.js', ['minify']);
  gulp.watch('*.html').on('change', browserSync.reload);
});
