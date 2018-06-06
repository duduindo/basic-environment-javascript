const fs = require('fs');
const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const log = require('gulplog');
const babelify = require('babelify');
const browserSync = require('browser-sync').create();

const babelrc = JSON.parse(fs.readFileSync('./.babelrc'));

gulp.task('js', () => {
  const b = browserify({
    entries: './src/js/app.js',
    extensions: ['.js'],
  })
    .transform(babelify, babelrc)
    .bundle()
    .pipe(source('common.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify()).on('error', log.error)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));

  return b;
});


gulp.task('watch', ['js'], () => {
  browserSync.init({
    port: 3001,
    server: "./",
    open: false
  });

  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch(['./index.html', './dist/**/*.js']).on('change', browserSync.reload);
});
