'use strict'

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import streamCombiner from 'stream-combiner2';
import cssnano from 'cssnano';
import webpackStream from 'webpack-stream';
import gulplog from 'gulplog';
import del from 'del';
import bs from 'browser-sync';
import moduleImporter from 'sass-module-importer';

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const $ = gulpLoadPlugins();
const combine = streamCombiner.obj;
const browserSync = bs.create();

gulp.task('html', function() {
  return combine(
    gulp.src('src/*.twig'),
    $.twig(),
    gulp.dest('build')
  ).on('error', $.notify.onError({title: 'html'}))
});

gulp.task('styles', function() {
  return combine(
    gulp.src('src/styles/main.scss'),
    $.if(isDevelopment, $.sourcemaps.init()),
    $.sassGlob(),
    $.sass({importer: moduleImporter()}),
    $.groupCssMediaQueries(),
    $.autoprefixer({ cascade: false }),
    $.if(!isDevelopment,  $.postcss([cssnano({preset: 'default'})])),
    $.if(isDevelopment, $.sourcemaps.write()),
    gulp.dest('build/styles')
  ).on('error', $.notify.onError({title: 'styles'}))
});

gulp.task('assets', function() {
  return combine(
    gulp.src(['src/assets/**/*.*', '!src/assets/svg-icons/**/*.svg'], {since: gulp.lastRun('assets'), base: 'src'}),
    $.changed('build'),
    gulp.dest('build')
  ).on('error', $.notify.onError({title: 'assets'}))
});

gulp.task('webpack', function(callback) {
  console.log('dev', isDevelopment)
  let firstBuildReady = false;

  function done(err, stats) {
    firstBuildReady = true;

    if(err) return  //hard error, обрабатывается gulp

    gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({ color: true}));  // логирование
  }

  const options = {
    mode: isDevelopment ? 'development' : 'production',
    watch: isDevelopment,
    devtool: isDevelopment ? 'eval' : false,
    output: {
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: true
            }
          }
        }
      ]
    },
  }

  return combine(
    gulp.src('src/js/main.js', {base: 'src'}),            // return можно убрать, так как мы вызываем callback.
    webpackStream(options, null, done),    //  Однако может подвиснуть если первая сборка завершилась с ошибкой, так как не сработает on data
    gulp.dest('build/js')
  ).on('data', function() {
    if(firstBuildReady)
      callback()    // просигнализировать завершение компиляции, async-done  внутри gulp игнорирует повторные вызовы callback
  }).on('error', $.notify.onError({ title: 'webpack' }))
});

gulp.task('clean', function() {
  return del('build')
});

gulp.task('sprite', function() {
  return combine(
    gulp.src('src/assets/svg-icons/**/*.svg'),
    $.svgstore(),
    $.rename('sprite.svg'),
    gulp.dest('build/assets')
  )
});

gulp.task('server', function() {
  browserSync.init({
    watch: true,
    server: './build'
  });
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.twig', gulp.series('html'));
  gulp.watch('src/styles/**/*.scss', gulp.series('styles'));
  gulp.watch(['src/assets/**/*.*', '!src/assets/svg-icons/**/*.svg'], gulp.series('assets'));
  gulp.watch('src/assets/svg-icons/**/*.svg', gulp.series('sprite'));
});

gulp.task('build', gulp.parallel('styles', 'webpack', 'html', 'assets', 'sprite'));

gulp.task('dev', gulp.series('clean', 'build', gulp.parallel('watch', 'server')));

gulp.task('prod', gulp.series('clean', 'build'));
