
import gulp from 'gulp';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import { join } from 'path';

import browserSync from './connect';
import { libraries, server, browserify as blabla } from '../config';

const { dest } = server
const config = Object.assign({}, watchify.args, blabla);
const bundler = watchify(browserify(config));
const buildBundler = browserify(config);

function bundle() {
  return bundler.bundle()
    .on('error', err => gutil.log.call(this, err))
    .pipe(source('bundle.min.js'))
    .pipe(buffer())
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
}

function buildBundle() {
  return buildBundler.bundle()
    .on('error', err => gutil.log.call(this, err))
    .pipe(source('bundle.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(dest));
}

gulp.task('scripts:libs', () => {
  gulp.src(libraries.js)
    .pipe(gulp.dest(join(dest, 'lib')));
})

gulp.task('scripts', bundle);
gulp.task('scripts:build', buildBundle);
bundler.on('update', bundle);
bundler.on('log', gutil.log);
