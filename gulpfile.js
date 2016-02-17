var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;
var autoprefixer = require('gulp-autoprefixer');
var scsslint = require('gulp-scss-lint');
var minifyCss = require('gulp-minify-css');
var awspublish = require('gulp-awspublish');

gulp.task('publish', function() {
  var awsCredentials = require('./aws-credentials.json');
  // create a new publisher using S3 options
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
  var publisher = awspublish.create({
    region: 'eu-west-1',
    params: {
      Bucket: awsCredentials.params.Bucket
    },
    accessKeyId: awsCredentials.accessKeyId,
    secretAccessKey: awsCredentials.secretAccessKey
  });

  // define custom headers
  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
    // ...
  };

  return gulp.src('./styleguide/**/*')
     // gzip, Set Content-Encoding headers and add .gz extension
    //.pipe(awspublish.gzip({ ext: '.gz' }))

    // publisher will add Content-Length, Content-Type and headers specified above
    // If not specified it will set x-amz-acl to public-read by default
    .pipe(publisher.publish(headers))

    // create a cache file to speed up consecutive uploads
    .pipe(publisher.cache())

     // print upload updates to console
    .pipe(awspublish.reporter());
});

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

gulp.task('sass', function() {
  gulp.src('./sass/screen.scss')
  .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: require('node-neat').includePaths
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('styleguide/css'))
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

gulp.task('default', ['copy-assets', 'sass-lint', 'sass', 'kss', 'browser-sync'], function() {
  gulp.watch(['./sass/**/*.hbs', './template/index.html'], ['kss'])
  gulp.watch(['./sass/**/*.scss'], ['sass-lint', 'sass']);
  gulp.watch(['./readme.md'], ['kss']);
  gulp.watch('./styleguide/index.html').on('change', browserSync.reload);
});
