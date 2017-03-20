const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require("gulp-babel");
const browserSync = require('browser-sync').create();
var reload = browserSync.reload;
const cssbeautify = require('gulp-cssbeautify');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
var webpack = require('gulp-webpack');
var webpackconfig = require("./webpack.config.js");


/* ====================
    GENERAL TASKS
==================== */
gulp.task('default', ["dist", "watcher", "browser-sync"]);
gulp.task('dist', ["sass", "copy-img", "copy-html", "scripts", "copy-back"]);

/* ====================
    ESPECIFIC TASKS
==================== */

//##### STYLES
gulp.task('sass', function(){
  gulp.src('src/sass/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({browsers: ['>5%']}))
  .pipe(cssbeautify())
  .pipe(gulp.dest('dist/css'))
});

//##### COPY-IMG
gulp.task('copy-img', function(){
  gulp.src('src/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'))
});

//##### COPY-HTML
gulp.task('copy-html', function(){
  gulp.src('src/*.html')
  .pipe(gulp.dest('dist/'))
});

//##### COPY-BACKEND
gulp.task('copy-back', function(){
  gulp.src('src/auth/*')
  .pipe(gulp.dest('dist/auth'))
});

//##### SCRIPTS
gulp.task('scripts', function() {
    return gulp.src('src/scripts/*.js')
        .pipe(babel())
        .pipe(webpack(webpackconfig))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));

});

//##### BROWSER-SYNC
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
});

/* ====================
    WATCHER TASKS
==================== */
gulp.task('watcher', function(){
    gulp.watch(["src/*.html"], ["copy-html", reload]);
    gulp.watch(["src/sass/*.scss"], ["sass", reload]);
    gulp.watch(["src/scripts/*.js"], ["scripts", reload]);
    gulp.watch(["src/img/*"], ["copy-img", reload]);
});
