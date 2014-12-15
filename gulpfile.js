var gulp = require('gulp'),
		gutil = require('gulp-util'),
		coffee = require('gulp-coffee'),
		browserify = require('gulp-browserify'),
		compass = require('gulp-compass'),
		concat = require('gulp-concat'),
		webserver = require('gulp-webserver');

var env,coffeeSrc,jsSource,sassSrc,outputDir,sassStyle;

env = process.env.NODE_ENV || 'development';
if(env === 'development'){
	outputDir = 'builds/development/';
	sassStyle = 'expanded';
} else{
	outputDir = 'builds/production/';
	sassStyle = 'compressed';
}

coffeeSrc = ['components/coffee/tagline.coffee'];
jsSource = [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js'
	];
sassSrc = ['components/sass/style.scss'];
htmlSrc = [outputDir + '*.html'];
jsonSrc = [outputDir + 'js/*.json'];

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
		.pipe(gulp.dest(outputDir + 'js'))
});

gulp.task('sass', function(){
	gulp.src(sassSrc)
	.pipe(compass({
		sass: 'components/sass',
		image: outputDir + 'img',
		style: sassStyle
	})
		.on('error', gutil.log))
	.pipe(gulp.dest(outputDir + 'css'))
});

gulp.task('watch', function(){
	gulp.watch(coffeeSrc,['coffee']);
	gulp.watch(jsSource,['js']);
	gulp.watch('components/sass/*.scss',['sass']);
});

gulp.task('webserver', function() {
  gulp.src('builds/development/')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default',['coffee','js','sass','webserver','watch']);