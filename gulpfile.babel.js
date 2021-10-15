'use strict'

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import streamCombiner from 'stream-combiner2';
import cssnano from 'cssnano';
import { DefinePlugin } from 'webpack';
import webpackStream from 'webpack-stream';
import gulplog from 'gulplog';
import del from 'del';
import bs from 'browser-sync';
import moduleImporter from 'sass-module-importer';
import proxy from 'proxy-middleware';
import url from 'url';

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const PROD_URL = 'https://site-example.ru';
const BASE_PATH = isDevelopment ? 'build-dev' : 'build';
const $ = gulpLoadPlugins();
const combine = streamCombiner.obj;

// server
const browserSync = bs.create();
const proxyOptions = url.parse(PROD_URL);
proxyOptions.route = '/api';
//

gulp.task('html', function() {
  return combine(
    gulp.src('src/*.twig'),
    $.twig(),
    $.beautifyCode({indent_size: 2}),
    gulp.dest(BASE_PATH)
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
    gulp.dest(`${BASE_PATH}/styles`)
  ).on('error', $.notify.onError({title: 'styles'}))
});

gulp.task('assets', function() {
  return combine(
    gulp.src(['src/assets/**/*.*', '!src/assets/svg-icons/**/*.svg'], {since: gulp.lastRun('assets'), base: 'src'}),
    $.changed(BASE_PATH),
    gulp.dest(BASE_PATH)
  ).on('error', $.notify.onError({title: 'assets'}))
});

gulp.task('mock', function() {
  return combine(
    gulp.src('src/mock/**/*.*', {base: 'src'}),
    gulp.dest(BASE_PATH)
  )
})

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
    devtool: isDevelopment ? 'eval-source-map' : false,
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
    plugins: [
      new DefinePlugin({
        BASE_URL: isDevelopment ? JSON.stringify(PROD_URL) : JSON.stringify('')
      })]
  }

  return combine(
    gulp.src('src/js/main.js', {base: 'src'}),            // return можно убрать, так как мы вызываем callback.
    webpackStream(options, null, done),    //  Однако может подвиснуть если первая сборка завершилась с ошибкой, так как не сработает on data
    gulp.dest(`${BASE_PATH}/js`)
  ).on('data', function() {
    if(firstBuildReady)
      callback()    // просигнализировать завершение компиляции, async-done  внутри gulp игнорирует повторные вызовы callback
  }).on('error', $.notify.onError({ title: 'webpack' }))
});

gulp.task('clean', function() {
  return del(BASE_PATH)
});

gulp.task('sprite', function() {
  return combine(
    gulp.src('src/assets/svg-icons/**/*.svg'),
    $.svgstore(),
    $.rename('sprite.svg'),
    gulp.dest(`${BASE_PATH}/assets`)
  )
});

gulp.task('server', function() {
  browserSync.init({
    watch: true,
    server: BASE_PATH,
    middleware: [proxy(proxyOptions)]
  });
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.twig', gulp.series('html'));
  gulp.watch('src/styles/**/*.scss', gulp.series('styles'));
  gulp.watch(['src/assets/**/*.*', '!src/assets/svg-icons/**/*.svg'], gulp.series('assets'));
  gulp.watch('src/assets/svg-icons/**/*.svg', gulp.series('sprite'));
  gulp.watch('src/mock/**/*.*', gulp.series('mock'));
});

gulp.task('build', gulp.parallel('styles', 'webpack', 'html', 'assets', 'sprite', 'mock'));

gulp.task('dev', gulp.series('clean', 'build', gulp.parallel('watch', 'server')));

gulp.task('prod', gulp.series('clean', 'build'));
