var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var browserify  = require('gulp-browserify');
var jade        = require('gulp-jade');
var data        = require('gulp-data');
var sass        = require('gulp-sass');
var uglify      = require('gulp-uglify');

// Compile jade to html
gulp.task('templates', function() {
  return gulp.src('app/templates/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
});

// Copy assets
gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.stream());
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

// Process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('app/js/*.js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js']);

// use default task to launch Browsersync and watch JS files
gulp.task('serve',['templates','images','sass','js'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("app/js/*.js", ['js-watch']);
    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/images/*", ['images']);
    gulp.watch("app/templates/*.jade", ['templates']);
});

gulp.task('default', ['serve']);
