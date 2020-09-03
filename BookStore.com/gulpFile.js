var gulp = require('gulp');
var uglify = require('gulp-uglify');
// var sass = require('gulp-sass');
var {series} = require('gulp');
var {src, dest} = require('gulp');
var concat = require('gulp-concat');


//task to minify js file
async function scripts()  {
  gulp.src('source/assets/javaScript/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('main/js'));
}


//task to copy html file
async function copyHtml() {
  gulp.src('source/index.html').pipe(gulp.dest('main'));
}

//task to copy templates
async function copyMustache() {
  gulp.src('assets/templates/template.mustache').pipe(gulp.dest('main/templates'));
}

//task to compile sass
async function copyCss() {
  gulp.src('source/assets/css/style.css')
    .pipe(gulp.dest('main/css'));
}

exports.myGulpTasks = series(copyHtml, copyMustache, scripts, copyCss);
