
import gulp from 'gulp';
import { join } from 'path';
import { watch, server } from '../config';

gulp.task('fonts', () => {
  gulp.src(watch.fonts).pipe(gulp.dest(join(server.dest, 'fonts')));
});
