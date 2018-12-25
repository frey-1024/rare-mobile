const gulp = require('gulp');
const path = require('path');
const chalk = require('chalk');
const sass = require('gulp-sass');
const ts = require('gulp-typescript');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const cwd = process.cwd();

function getProjectPath(...filePath) {
  return path.join(cwd, ...filePath);
}

const tsConfig = require(getProjectPath('tsconfig.json')).compilerOptions;

// const tsFiles = ['**/*.ts', '**/*.tsx', '!node_modules/**/*.*', 'typings/**/*.d.ts'];

// 删除上次build的文件
gulp.task('clean', function () {
  return gulp.src('lib')
    .pipe(clean());
});

// 编译components中组件tsx
gulp.task('ts', function () {
  return gulp.src('src/**/*.tsx')
    .pipe(ts(tsConfig))
    .pipe(rename(function (path) {
      path.dirname = path.dirname.replace('components\\', '\\');
    }))
    .pipe(gulp.dest('lib'));
});

// 编译index.tsx
gulp.task('ts_index', function () {
  return gulp.src('src/index.tsx')
    .pipe(ts(tsConfig))
    .pipe(replace('./components/', './'))
    .pipe(gulp.dest('lib'));
});

// 编译scss为css
gulp.task('sass', function () {
  return gulp.src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename(function (path) {
      path.dirname = path.dirname.replace('components\\', '\\');
    }))
    .pipe(gulp.dest('lib'));
});
// 最后打包
gulp.task('build', gulp.series('clean', 'ts', 'ts_index', 'sass', done => {
  done();
  console.log(chalk.green('Build lib successfully'));
}));
