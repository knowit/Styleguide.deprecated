var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;

var paths = {
  scss: './sass/**/*.scss',
  styleguideSass: './sass/styleguide.scss',
  css: './css',
  styleguideCss: './styleguide/css'
};

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './styleguide'
        }
    });
});

gulp.task('sass', function () {
  gulp.src(paths.scss)
    .pipe(sass({
      includePaths: require('node-neat').includePaths
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    // .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(paths.css));
});

gulp.task('sass-styleguide', function () {
  gulp.src(paths.styleguideSass)
    .pipe(sass({
      includePaths: require('node-neat').includePaths
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    // .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(paths.styleguideCss));
});

gulp.task('kss', function () {
  exec('npm run kss', function (err, stdout, stderr) {
    console.log(err);
    console.log(stdout);
    console.log(stderr);
  });
});

gulp.task('default', ['sass', 'sass-styleguide', 'kss', 'browser-sync'], function() {
  gulp.watch('./sass/**/*.scss', ['sass', 'sass-styleguide', 'kss']);
  gulp.watch('./styleguide/**/*.html').on('change', browserSync.reload);
});
