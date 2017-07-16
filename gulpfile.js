var
  gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  gulpsync = $.sync(gulp)
  ;

var isProduction = true;

var paths = {
  scripts: 'src/',
};

var source = {
  scripts: [
    paths.scripts + 'core.module.js',

    // modules
    paths.scripts + '**/*.module.js',
    paths.scripts + '**/*.js'
  ],
  templates: paths.scripts + '**/*.pug',
};

var build = {
  dir: './build',
  src: {
    js: 'src.min.js',
  },
  vendor: {
    js: 'vendor.min.js',
    css: 'vendor.min.css',
  },
  dist: {
    js: 'dist.min.js',
    dir: './dist',
  }
};

var vendor = {
  source: require('./vendor.json'),
};

var cssnanoOpts = {};
var pugOptions = {
  basedir: './',
};
var styles = require('./gulp/styles');

gulp.task('scripts', function () {
  return gulp
    .src(source.scripts)
    .pipe($.jsvalidate())
    .on('error', handleError)
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.concat(build.src.js))
    .pipe($.ngAnnotate())
    .on('error', handleError)
    .pipe($.uglify({
      preserveComments: 'some'
    }))
    .pipe($.sourcemaps.write('./'))
    .on('error', handleError)
    .pipe(gulp.dest(build.dir))
    ;
});

// Build the base script to start the application from vendor assets
gulp.task('vendor', function () {
  log('Copying base vendor assets..');

  var jsFilter = $.filter('**/*.js', {
    restore: true
  });
  var cssFilter = $.filter('**/*.css', {
    restore: true
  });

  return gulp
    .src(vendor.source)
    .pipe($.expectFile(vendor.source))
    .pipe(jsFilter)
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.concat(build.vendor.js))
    .pipe($.if(isProduction, $.uglify()))
    .pipe(gulp.dest(build.dir))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.concat(build.vendor.css))
    .pipe($.cssnano(cssnanoOpts))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(build.dir))
    .pipe(cssFilter.restore())
    ;
});

gulp.task('styles', styles.app);

gulp.task('templates', function () {
  return gulp
    .src(source.templates)
    .pipe($.pug(pugOptions))
    .on('error', handleError)
    .pipe(gulp.dest(build.dist.dir))
    ;
});

gulp.task('merge', function () {
  return gulp
    .src([
      build.dir +'/'+build.vendor.js,
      build.dir +'/'+build.src.js,
    ])
    .pipe($.concat(build.dist.js))
    .pipe(gulp.dest('./'))
    ;
});

gulp.task('default', gulpsync.sync([
  'scripts',
  'styles',
  'vendor',
  'templates',
  'merge',
]));

function handleError(err) {
  log(err.toString());
  this.emit('end');
}

// log to console using
function log(msg) {
  $.util.log($.util.colors.blue(msg));
}
