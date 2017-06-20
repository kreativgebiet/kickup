
import gulp from 'gulp';
import changed from 'gulp-changed';
import imageMinify from 'gulp-imagemin';
import { join } from 'path';

import browserSync from './connect';
import { server, watch, imagemin } from '../config';

gulp.task('images', () => {
  const images = gulp.src(watch.images)
    .pipe(changed(join(server.dest, 'images')))
    .pipe(gulp.dest(join(server.dest, 'images')))
    .pipe(browserSync.stream());

  return images;
});

gulp.task('images:build', () => {
  const buildImages = gulp.src(watch.images)
    .pipe(imageMinify(imagemin))
    .pipe(gulp.dest(join(server.dest, 'images')));

  return buildImages;
});
