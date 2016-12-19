var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', ['scripts', 'jsmodules', 'cssmodules'], function () {
    // place code for your default task here
});


gulp.task('scripts', function () {
    return gulp.src([
        './controllers/*.js',
        './modules/*.js',
        './directives/*.js',
        './services/*.js',
        './app.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('jsmodules', function () {
    return gulp.src([
        './node_modules/angular/angular.js',
        './node_modules/angular-animate/angular-animate.js',
        './node_modules/angular-ui-router/release/angular-ui-router.js',
        './node_modules/angular-sanitize/angular-sanitize.min.js',
        './node_modules/angular-touch/angular-touch.min.js',
        './node_modules/angular-bootstrap-contextmenu/contextMenu.js',
        './node_modules/markdown-it/dist/markdown-it.min.js',
        './node_modules/angular-markdown-it/dist/ng-markdownit.min.js',
        './node_modules/angular-loading-bar/build/loading-bar.min.js',
        './node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
        './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'])
        .pipe(concat('jsmodules.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('cssmodules', function () {
    return gulp.src([
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css'])
        .pipe(concat('cssmodules.css'))
        .pipe(gulp.dest('./dist/'));
});
