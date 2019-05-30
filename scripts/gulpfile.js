/**
 * @name gulpfile.js
 * @description 打包项目css依赖
 */

const path = require("path");
const gulp = require("gulp");
const concat = require("gulp-concat"); //合并文件，减少网络请求。
const less = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano"); //压缩
const size = require("gulp-filesize"); //显示文件大小
// const sourcemaps = require("gulp-sourcemaps");
// const rename = require("gulp-rename");
const { name } = require("../package.json");
const browserList = [
  "last 2 versions",
  "Android >= 4.0",
  "Firefox ESR",
  "not ie < 9"
];

const DIR = {  //生成绝对路径
  less: path.resolve(__dirname, "../components/**/*.less"),
  buildSrc: [
    path.resolve(__dirname, "../components/**/index.less")
  ],
  lib: path.resolve(__dirname, "../lib"),
  es: path.resolve(__dirname, "../es"),
  dist: path.resolve(__dirname, "../dist")
};

gulp.task("copyLess", () => {
  return gulp
    .src(DIR.less)
    .pipe(gulp.dest(DIR.lib))
    .pipe(gulp.dest(DIR.es));
});

gulp.task("copyCss", () => {
  return gulp
    .src(DIR.buildSrc)
    // .pipe(sourcemaps.init())
    //编译.less文件为.css文件 
    .pipe(
      less({
        outputStyle: "compressed"
      })
    )
    .pipe(autoprefixer({ browsers: browserList }))
    .pipe(size())
    .pipe(cssnano())
    .pipe(gulp.dest(DIR.lib))
    .pipe(gulp.dest(DIR.es));
});

gulp.task("dist", () => {
  return gulp
    .src(DIR.buildSrc)
    // .pipe(sourcemaps.init())
    .pipe(
      less({
        outputStyle: "compressed"
      })
    )
    .pipe(autoprefixer({ browsers: browserList }))
    .pipe(concat(`${name}.css`))
    .pipe(cssnano())
    .pipe(concat(`${name}.min.css`))
    .pipe(size())
    .pipe(gulp.dest(DIR.dist))
  // .pipe(sourcemaps.write())
  // .pipe(rename(`${name}.css.map`))
  // .pipe(size())
  // .pipe(gulp.dest(DIR.dist))


  // .pipe(gulp.dest(DIR.dist))
  // .pipe(sourcemaps.write())
  // .pipe(rename(`${name}.min.css.map`))
  // .pipe(size())
  // .pipe(gulp.dest(DIR.dist));
});

gulp.task('default', gulp.series('copyLess', 'copyCss', 'dist', function (done) {
  done()
}))