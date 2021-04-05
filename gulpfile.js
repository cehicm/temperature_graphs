const { src, dest, watch, series } = require("gulp");
const gulp = require("gulp");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();
const babel = require("gulp-babel");

function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

function jsTask() {
  return src("src/js/scripts.js", { sourcemaps: true })
    .pipe(terser())
    .pipe(dest("dist"), { sourcemaps: "." });
}

// babel task
function babelTask() {
  return src("src/js/scripts.js", { sourcemaps: true })
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulp.dest("dist"));
}

function watchTask() {
  watch("*html", browsersyncReload); // changes in all html docs
  watch(["src/js/**/*.js"], series(jsTask, babelTask, browsersyncReload));
}
exports.default = series(babelTask, jsTask, watchTask);
