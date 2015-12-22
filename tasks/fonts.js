import gulp from 'gulp';
import { join } from 'path';
import { dest } from './config';

gulp.task('fonts', () => {
  gulp.src('./source/fonts/**/*')
    .pipe(gulp.dest(join(dest, 'fonts')));
});
