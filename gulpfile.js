var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;
var autoprefixer = require('gulp-autoprefixer');
var scsslint = require('gulp-scss-lint');
var minifyCss = require('gulp-minify-css');

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

gulp.task('sass', function() {
  gulp.src('./sass/screen.scss')
  .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: require('node-neat').includePaths
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
    .pipe(gulp.dest('./styleguide/css'))
    .pipe(browserSync.stream());
});

gulp.task('sass-lint', function() {
  gulp.src("./sass/**/*.scss")
    .pipe(scsslint({
      'bundleExec': true,
      'config': '.scss-lint.yml'
    }));
});

gulp.task('kss', function() {
  exec('npm run kss', function(err) {
    if (err !== null) {
      console.log(err);
    }
  });
});

gulp.task('default', ['fonts', 'sass-lint', 'sass', 'kss', 'browser-sync'], function() {
  gulp.watch(['./sass/**/*.hbs', './template/index.html'], ['kss'])
  gulp.watch(['./sass/**/*.scss'], ['sass-lint', 'sass']);
  gulp.watch(['./readme.md'], ['kss']);
  gulp.watch('./styleguide/index.html').on('change', browserSync.reload);
});
