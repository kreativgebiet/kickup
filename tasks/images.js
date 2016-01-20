import gulp from 'gulp';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import rev from 'gulp-rev';

import { join } from 'path';
import browserSync from './connect';
import { src, dest } from './config';

gulp.task('images', () => {
  gulp.src(join(src, 'images', '**/*'))
    .pipe(changed(join(dest, 'images')))
    .pipe(gulp.dest(join(dest, 'images')))
    .pipe(browserSync.stream());
});

gulp.task('images:build', () => {
  gulp.src(join(src, 'images', '**/*'))
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest(join(dest, 'images')))
    .pipe(rev.manifest({ merge: true }))
    .pipe(gulp.dest(join(dest, '..')));
});
