/*eslint-env node*/
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	eslint = require('gulp-eslint'),
	jasmine = require('gulp-jasmine-phantom'),
	concat = require('gulp-concat'),
	concatCss = require('gulp-concat-css'),
	minCss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	htmlReplace = require('gulp-html-replace'),
	multiDest = require('gulp-multi-dest');

var browserSync = require('browser-sync').create();

//  browser sync
gulp.task('sync', function() {
	browserSync.init({
		server: {
			baseDir: './src',
			routes: {
				'/bower_components': 'bower_components'
			}
		}
	});
	browserSync.stream();	
});

// js lint
gulp.task('lint', function() {
	return gulp.src(['src/**/*.js', '!node_modules/**', '!bower_components/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

// markup
gulp.task('html', function() {
	gulp.src('src/index.html')
	.pipe(htmlReplace({
		'mainCss': 'css/main.css',
		'bootstrapCss': 'css/bootstrapCss.min.css',
		// 'headScripts': [
		// 	'js/jquery.min.js',
		// 	'js/angular.min.js',
		// 	'js/angular-route.min.js',
		// 	'js/angular-mocks.js',
		// 	'js/angularfire.min.js',
		// 	'js/moment.min.js',
		// 	'js/bootstrap.min.js',
		// 	'js/bootstrap-select.min.js',
		// 	'js/bootstrap-datetimepicker.min.js'
		// ],
		'headScripts': 'js/headScripts.min.js',
		'appScripts': 'js/app.min.js'
	}))
	.pipe(gulp.dest('dist/'))
	.pipe(browserSync.stream());
});
gulp.task('watch-html', function() {
	gulp.watch('src/**/*.html', ['html']);
});

// templates
gulp.task('templates', function() {
	gulp.src('src/templates/**/*')
	.pipe(gulp.dest('dist/templates'));
});

// styles
gulp.task('styles', function() {
	gulp.src('src/sass/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 3 versions']
	}))
	// TODO: switch to dist directory on build
	// .pipe(gulp.multiDest(['./src/css', './dist/css']));
	.pipe(gulp.dest('src/css'))
	.pipe(minCss())
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.stream());
});
gulp.task('watch-css', function() {
	gulp.watch('src/sass/**/*.scss', ['styles']);	
});

// bootstrap css
gulp.task('bootstrapCss', function() {
	gulp.src([
		'bower_components/bootstrap/dist/css/bootstrap.min.css',
	 	'bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css'
	])
	.pipe(concatCss('bootstrapCss.min.css'))
	.pipe(minCss())
	.pipe(gulp.dest('dist/css'));
});

// head scripts
gulp.task('headScripts', function() {
	gulp.src([
		'bower_components/jquery/dist/jquery.min.js',
		'bower_components/angular/angular.min.js',
		'bower_components/angular-route/angular-route.min.js',
		'bower_components/angular-mocks/angular-mocks.js',
		'bower_components/angularfire/dist/angularfire.min.js',
		'bower_components/moment/min/moment.min.js',
		'bower_components/bootstrap/dist/js/bootstrap.min.js',
		'bower_components/bootstrap-select/dist/js/bootstrap-select.min.js',
		'bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js'
	])
	// .pipe(concat('headScripts.min.js'))
	.pipe(gulp.dest('dist/js'));
});

// app scripts
gulp.task('js', function() {
	gulp.src(['src/js/app.module.js', 'src/js/app.config.js', 'src/js/**/*.js'])
	.pipe(concat('app.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.stream());
});
gulp.task('watch-js', function() {
	gulp.watch('src/js/**/*.js', ['js']);
});

// tests
gulp.task('tests', function() {
	gulp.src('src/tests/**/*.js')
	// .pipe(jasmine({
	// 	integration: true,
	// 	vendor: 'src/js/**/*.js'
	// }))
	.pipe(browserSync.stream());
});
gulp.task('watch-tests', function() {
	gulp.watch('src/tests/**/*.js', ['tests']);
});

// build
gulp.task('build', ['html', 'styles', 'js', 'headScripts', 'templates', 'bootstrapCss']);

gulp.task('default', ['watch-html', 'watch-css', 'lint', 'watch-js', 'watch-tests', 'sync']);
