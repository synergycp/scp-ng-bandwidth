var util = require('./util');
var sources = require('./sources');
var paths = require('./paths');
var settings = require('./settings');
var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var compassOpts = require('./options.compass.js');
var cssnanoOpts = require('./options.css-nano.js');

module.exports = {
  app: app,
};

function app() {
  util.log('Building application styles..');

  return gulp
    .src(sources.styles.app)

    .pipe($.compass(compassOpts.app))
    .on('error', util.error)

    .pipe($.if(settings.isProduction, $.cssnano(cssnanoOpts)))

    .pipe(gulp.dest(paths.dist.base))
    /*.pipe(reload({
      stream: true,
    }))*/
    ;
}
