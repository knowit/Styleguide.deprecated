var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');

var styleguide = {
  sassFilePath: './sass/styleguide.scss',
  cssFilePath: './styleguide/css/styleguide.css',
  cssDirectory: './styleguide/css',
  cssFileName: 'styleguide.css'
};
var style = {
  sassFilePath: './sass/screen.scss',
  cssFilePath: './styleguide/css/screen.css',
  cssDirectory: './css',
  cssFileName: 'screen.css'
};

gulp.task('fonts', function() {
  gulp.src('./node_modules/font-awesome/fonts/*.*')
    .pipe(gulp.dest('./styleguide/fonts'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './styleguide'
        }
    });
});

gulp.task('sass', function () {
  gulp.src(style.sassFilePath)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: require('node-neat').includePaths
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(concat(style.cssFileName))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(style.cssDirectory));
});

gulp.task('sass-styleguide', function () {
  gulp.src(styleguide.sassFilePath)
    .pipe(sass({
      includePaths: require('node-neat').includePaths
    }).on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(concat(styleguide.cssFileName))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(styleguide.cssDirectory));
});

gulp.task('kss', function () {
  exec('npm run kss', function (err) {
    if(err !== null) {
      console.log(err);
    }
  });
});

gulp.task('default', ['fonts', 'sass', 'sass-styleguide', 'kss', 'browser-sync'], function() {
  gulp.watch('./sass/**/*.scss', ['sass', 'sass-styleguide', 'kss']);
  gulp.watch('./styleguide/index.html').on('change', browserSync.reload);
});
