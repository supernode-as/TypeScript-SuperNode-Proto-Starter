'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');


gulp.task('default', ['browser-sync'], function () {
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:35627",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 7000,
    });
    gulp.watch("src/public/css/*.scss", ['sass']);
    gulp.watch("views/*").on('change', browserSync.reload);
});
gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
        ext: "ts",
        exec: "npm run watch"
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});

gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});