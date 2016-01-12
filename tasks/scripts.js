import gulp from 'gulp';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';

import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import debowerify from 'debowerify';
import assign from 'object-assign';

import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

import browserSync from './connect';
import { join } from 'path';
import { src, dest } from './config';

const customOpts = {
  entries: join(src, 'scripts', 'main.js'),
  extensions: [ '.jsx', '.js' ],
  debug: true,
  transform: [
    babelify,
    debowerify,
  ],
};

const config = assign({}, watchify.args, customOpts);
const bundler = watchify(browserify(config));
const buildBundler = browserify(config);

function bundle() {
  return bundler.bundle()
    .on('error', err => gutil.log.call(this, err))
    .pipe(source('bundle.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
}

function buildBundle() {
  return buildBundler.bundle()
    .on('error', err => gutil.log.call(this, err))
    .pipe(source('bundle.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
}

gulp.task('scripts', bundle);
gulp.task('scripts:build', buildBundle);
bundler.on('update', bundle);
bundler.on('log', gutil.log);
