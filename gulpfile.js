const gulp = require("gulp");
const nodemon = require("gulp-nodemon");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");

browserSync.create();

const nodemonOptions = {
	script: "dist/server.js",
	env: { "NODE_ENV": "development" },
	verbose: true,
	ignore: [
		"./node_modules/*",
		"./dist/public/*",
		"./data/temp/*",
		"./src/*"
	],
	watch: [
		"/lib/**/*.*",
		"/data/local.js",
		"/views/**/*.*"
	],
	ext: "html,js,ts"
};

function runNodeMon(done) {
	nodemon(nodemonOptions)
		.on("start", function () {
			console.log("\nNode (Apostrophe CMS) started on port 35627\n");
		})
		.on("restart", function () {
			console.log("Restarted!");
			browserSync.notify("Nodemon is restarting the application, reloading browser in 10 seconds...", 10000);
			setTimeout(() => {
				browserSync.reload();
			}, 10000);
		});
	done();
}

// Static Server + watching scss/html files
function runBrowserSync(done) {
	browserSync.init({
		proxy: "http://127.0.0.1:35627",
		port: 3001,
		reloadOnRestart: true,
		open: false
	});

	gulp.watch("src/public/css/**/*.scss", gulp.series(compileSass, watchSass));
	done();
}

// Compile sass into CSS & auto-inject into browsers
function compileSass(done) {
	return gulp.src("src/public/css/main.scss")
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(sass())
		.pipe(gulp.dest("dist/public/css/"));
}

function watchSass(done) {
	gulp.src("public/css/styles.css")
		.pipe(browserSync.stream());
	done();
}

function build(done) {
	run('npm run build')
	done();
}

gulp.task("build", gulp.series(build));
gulp.task("serve", gulp.series(compileSass, runNodeMon, runBrowserSync));
gulp.task("styles", gulp.series(compileSass));
gulp.task("default", gulp.parallel("serve"));