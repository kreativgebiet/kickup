import gulp from 'gulp';
import { join } from 'path';
import { src, dest } from './config';

gulp.task('fonts', () => {
  gulp.src(join(src, 'fonts', '**/*'))
    .pipe(gulp.dest(join(dest, 'fonts')));
});
