var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

var scriptSources = [
    './app.js',
    './controllers/*.js',
    './modules/*.js',
    './directives/*.js',
    './services/*.js'
    ];

var nodemoduleSources = [
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
    './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'];

var cssSources = [
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css'];


gulp.task('default', ['scripts', 'jsmodules', 'cssmodules'], function () {
    // place code for your default task here
});


gulp.task('scripts', function () {
    return watch(scriptSources, function () {
        gulp.src(scriptSources)
            .pipe(concat('app.js'))
            .pipe(gulp.dest('./dist/'));
    });

});

gulp.task('jsmodules', function () {
    return watch(nodemoduleSources, function () {

            gulp.src(nodemoduleSources)
                .pipe(concat('jsmodules.js'))
                .pipe(gulp.dest('./dist/'));
    });
});

gulp.task('cssmodules', function () {
    return watch(cssSources, function () {
        gulp.src(cssSources)
            .pipe(concat('cssmodules.css'))
            .pipe(gulp.dest('./dist/'));
    });
});
