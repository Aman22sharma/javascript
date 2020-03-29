var Fiber = require('fibers'),
  gulp = require('gulp'),
  webserver = require('gulp-webserver'),
  target = 'src/',
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps');

sass.compiler = require('node-sass');

gulp.task('js', function () {
  return gulp.src([
    'node_modules/angular/angular.min.js',
    'node_modules/angular-route/angular-route.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js',
    target + 'js/**/*'])
  .pipe(gulp.dest(target + 'js'));
});

gulp.task('html', function () {
  return gulp.src(target + '**/*.html');
});

gulp.task('sass', function () {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', target + 'sass/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({
      fiber: Fiber,
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(target + 'css'));
});

gulp.task('icons', function () {
  return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
    .pipe(gulp.dest(target + 'webfonts/'));
});

gulp.task('watch', function () {
  gulp.watch(target + 'js/**/*.js', gulp.series('js'));
  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', target + 'sass/**/*.scss'], gulp.series('sass'));
  gulp.watch([target + '**/*.html',
    target + '**/*.html'
  ], gulp.series('html'));
});

gulp.task('webserver', function () {
  return gulp.src(target)
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', gulp.parallel('watch', 'icons', 'html', 'js', 'sass', 'webserver'));
gulp.task('build', gulp.parallel('icons', 'html', 'js', 'sass'));