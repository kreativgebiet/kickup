import gulp from 'gulp';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import { join } from 'path';
import browserSync from './connect';
import { src, dest } from './config';

gulp.task('images', () => {
  gulp.src(join(src, 'images', '**/*'))
    .pipe(changed(join(dest, 'images')))
    .pipe(imagemin())
    .pipe(gulp.dest(join(dest, 'images')))
    .pipe(browserSync.stream());
});
