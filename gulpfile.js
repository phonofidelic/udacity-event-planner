/*eslint-env node*/
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	eslint = require('gulp-eslint');

var browserSync = require('browser-sync').create();
browserSync.init({
	server: {
		baseDir: './src',
		routes: {
			'/bower_components': 'bower_components'
		}
	}
});
browserSync.stream();

gulp.task('lint', function() {
	return gulp.src(['src/**/*.js', '!node_modules/**', '!bower_components/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('html', function() {
	gulp.src('src/index.html')
	.pipe(gulp.dest('dist/'))
	.pipe(browserSync.stream());
});
gulp.task('watch-html', function() {
	gulp.watch('src/index.html', ['html']);
});

gulp.task('styles', function() {
	gulp.src('src/sass/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 3 versions']
	}))
	// TODO: switch to dist directory on build
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.stream());
});
gulp.task('watch-css', function() {
	gulp.watch('src/sass/**/*.scss', ['styles']);	
});

gulp.task('js', function() {
	gulp.src('src/js/**/*.js')
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.stream());
});
gulp.task('watch-js', function() {
	gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('default', ['watch-html', 'watch-css', 'lint', 'watch-js']);