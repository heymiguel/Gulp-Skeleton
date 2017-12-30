'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const prefix = require('gulp-autoprefixer')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const imagemin = require('gulp-imagemin')
const browserSync = require('browser-sync').create()

// Compile html
gulp.task('html', function () {
  return gulp.src('src/**/*.html')
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
    .pipe(concat('app.js'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
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

gulp.task('default', ['html', 'sass', 'js', 'images'], function () {
  browserSync.init({
    server: './dist'
  })

  gulp.watch('src/**/*.html', ['html'])
  gulp.watch('src/scss/**/*.scss', ['sass'])
  gulp.watch('src/js/**/*.js', ['js']).on('change', browserSync.reload)
  gulp.watch('./dist/*.html').on('change', browserSync.reload)
})
