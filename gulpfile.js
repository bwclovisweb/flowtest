var gulp = require('gulp'),
		gutil = require('gulp-util'),
		coffee = require('gulp-coffee'),
		browserify = require('gulp-browserify'),
		compass = require('gulp-compass'),
		concat = require('gulp-concat');

var coffeeSrc = ['components/coffee/tagline.coffee'];
var jsSource = [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js'
	];
var sassSrc = ['components/sass/style.scss'];

gulp.task('coffee',function(){
	gulp.src(coffeeSrc)
		.pipe(coffee({bare: true})
			.on('error', gutil.log))
		.pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function(){
	gulp.src(jsSource)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js'))
});

gulp.task('sass', function(){
	gulp.src(sassSrc)
	.pipe(compass({
		sass: 'components/sass',
		image: 'builds/development/img',
		style: 'expanded'
	}))
		.on('error', gutil.log)
	.pipe(gulp.dest('builds/development/css'))
});

gulp.task('watch', function(){
	gulp.watch(coffeeSrc,['coffee']);
	gulp.watch(jsSource,['js']);
	gulp.watch('components/sass/*.scss',['sass']);
});

gulp.task('default',['coffee','js','sass']);