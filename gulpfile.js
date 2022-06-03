"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const del = require("del");

gulp.task("sass", () => {
  return gulp
    .src([
      "assets/sass/**/*.scss",
      "!assets/sass/**/main.scss",
      "!assets/sass/**/reset.scss",
      "!assets/sass/**/variables.scss"
    ])
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./src/css/"));
});

gulp.task("watch", () => {
  gulp.watch("assets/sass/**/*.scss", (done) => {
    gulp.series(["clean", "sass"])(done);
  });
});

gulp.task("clean", () => {
  return del(["src/css/**/*.*"]);
});

gulp.task("default", gulp.series(["clean", "sass"]));
