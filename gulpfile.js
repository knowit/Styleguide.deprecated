var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;
var autoprefixer = require('gulp-autoprefixer');
var sassLint = require('gulp-sass-lint');
var cleanCSS = require('gulp-clean-css');
var bourbonPaths = require("bourbon").includePaths;
var bourbonNeatPaths = require("bourbon-neat").includePaths;
var paths = bourbonPaths.concat(bourbonNeatPaths);

gulp.task('copy-assets', function() {
  gulp.src('./node_modules/font-awesome/fonts/*.*').pipe(gulp.dest('./styleguide/fonts'));
  gulp.src('./images/**/*').pipe(gulp.dest('./styleguide/images'));
  gulp.src('./fonts/**/*').pipe(gulp.dest('./styleguide/fonts'));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './styleguide'
    }
  });
});

gulp.task('kss', function() {
  exec('npm run kss', function(err) {
    if (err !== null) {
      console.log(err);
    }
  });
});

gulp.task('sass', function() {
  gulp.src('./sass/style.scss')
  .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: paths
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('styleguide/css'))
    .pipe(browserSync.stream());
});

gulp.task('sass-lint', function () {
  return gulp.src(['sass/**/*.s+(a|c)ss', '!sass/vendor/**/*.*', '!sass/styleguide/**/*.*'])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('default', ['copy-assets', 'sass-lint', 'sass', 'kss', 'browser-sync'], function() {
  gulp.watch(['./sass/**/*.hbs', './template/index.html'], ['kss'])
  gulp.watch(['./sass/**/*.scss'], ['sass-lint', 'sass']);
  gulp.watch(['./readme.md'], ['kss']);
  gulp.watch('./styleguide/index.html').on('change', browserSync.reload);
});
