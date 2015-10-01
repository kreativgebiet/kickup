import gulp from 'gulp';

import concat from 'gulp-concat';
import csso from 'gulp-csso';
import eslint from 'gulp-eslint';
import imagemin from 'gulp-imagemin';
import karma from 'gulp-karma';
import sass from 'gulp-sass';
import uglify from 'gulp-uglify';
import postcss from 'gulp-postcss';
import gutil from 'gulp-util';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import minifyHtml from 'gulp-minify-html';

import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import rimraf from 'rimraf';
import autoprefixer from 'autoprefixer';

import connect from 'gulp-connect';

import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';

const LR_PORT = 35729;
const SERVER_PORT = 8888;
const DEST_PATH = 'dist/';

function compileScripts (watch = false) {
  gutil.log('Starting browserify');

  let entryConfig = {
    entries: './source/scripts/main.js',
    extensions: [ '.jsx', '.js' ],
    debug: true,
    transform: [ babelify ]
  };

  var b;
  if (watch) {
    b = watchify(entryConfig);
  } else {
    b = browserify(entryConfig);
  }

  var rebundle = () => {
    b.bundle()
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(eslint())
      .pipe(rename('bundle.min.js'))
      .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', gutil.log)
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(DEST_PATH));
  };

  b.on('update', rebundle);
  return rebundle();
};

gulp.task('markup', () => {
  gulp.src('./source/html/**/*.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest(DEST_PATH));
});

gulp.task('styles', () => {
  gulp.src('./source/styles/main.scss')
    .pipe(sass())
    .pipe(postcss([ autoprefixer({ browsers: [ 'last 2 versions' ] }) ]))
    .pipe(sourcemaps.init())
    .pipe(csso())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(DEST_PATH + 'styles'));
});

gulp.task('server', next => {
  connect.server({
    port: SERVER_PORT,
    root: DEST_PATH,
    livereload: true
  });
});

gulp.task('default', () => {
  gulp.start('server');

  var initTask = (files, task) => {
    if ( typeof task === 'string' ) {
      gulp.start(task);
      gulp.watch(files, [ task ]);
    } else {
      task.map(t => { gulp.start(t); });
      gulp.watch(files, task);
    }
  };

  compileScripts();

  initTask('source/html/**/*.html', 'markup');
  initTask('source/styles/**/*.scss', 'styles');

  gulp.watch([DEST_PATH + '/**/*'], connect.reload());
});
