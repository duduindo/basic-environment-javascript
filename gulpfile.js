const fs = require('fs');
const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const babelify = require('babelify');
const browserSync = require('browser-sync').create();
const stylus = require('gulp-stylus');
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
    .pipe(uglify()).on('error', e => console.error(e))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));

  return b;
});

gulp.task('css', () => {
  gulp.src('./src/stylus/app.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
      compress: true,
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('server', ['css', 'js'], () => {
  browserSync.init({
    port: 3001,
    server: "./",
    open: false
  });

  gulp.watch(['./src/stylus/**/*.styl', './src/js/**/*.js'], ['css','js']);
  gulp.watch(['./index.html', './dist/**/*.js']).on('change', browserSync.reload);
});
