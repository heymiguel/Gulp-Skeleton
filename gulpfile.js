'use strict'

var gulp = require('gulp')
var jade = require('gulp-jade')
var sass = require('gulp-sass')
var cssmin = require('gulp-cssmin')
var rename = require('gulp-rename')
var prefix = require('gulp-autoprefixer')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')
var imagemin = require('gulp-imagemin')
var browserSync = require('browser-sync').create()

// Compile Jade
gulp.task('jade', function () {
  return gulp.src('src/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream())
})

// Configure CSS tasks.
gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(prefix('last 2 versions'))
    .pipe(cssmin())
    .pipe(concat('styles.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
})

// Configure JS.
gulp.task('js', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream())
})

// Configure image stuff.
gulp.task('images', function () {
  return gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.stream())
})

gulp.task('default', ['jade', 'sass', 'js', 'images'], function () {
  browserSync.init({
    server: './dist'
  })

  gulp.watch('src/*.jade', ['jade'])
  gulp.watch('src/scss/**/*.scss', ['sass'])
  gulp.watch('src/js/**/*.js', ['js'])
  gulp.watch('./dist/*.html').on('change', browserSync.reload)
})
