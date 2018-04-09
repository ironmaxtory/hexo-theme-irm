var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

const IRM_THEME_PATH = path.resolve(__dirname);
const IRM_THEME_SOURCE_PATH = path.resolve(IRM_THEME_PATH, './source');
console.log(IRM_THEME_SOURCE_PATH);
console.log(path.resolve(IRM_THEME_SOURCE_PATH, 'less/_partial/*.scss'));
console.log(path.resolve(IRM_THEME_SOURCE_PATH, 'less/*.scss'));

// 一次性编译 less
gulp.task('sass', function() {
  console.log('执行更新');
  return gulp.src(path.resolve(IRM_THEME_SOURCE_PATH, 'sass/*.scss'))
    .pipe(sass())
    // .pipe(autoprefixer())
    .pipe(gulp.dest(path.resolve(IRM_THEME_SOURCE_PATH, 'css/')));
});

// 实时编译
gulp.task('default', ['sass'], function() {
  gulp.watch(path.resolve(IRM_THEME_SOURCE_PATH, 'sass/_partial/*.scss'), ['sass']);
  gulp.watch(path.resolve(IRM_THEME_SOURCE_PATH, 'sass/*.scss'), ['sass']);
});
