
import gulp from 'gulp';
import seq from 'run-sequence';
import { watch } from '../config';

gulp.task('default', ['clean'], () => {
  seq(['scripts', 'scripts:libs', 'fonts', 'images', 'markup', 'styles'], 'server');

  gulp.watch(watch.images, ['images']);
  gulp.watch(watch.html, ['markup']);
  gulp.watch(watch.scss, ['styles']);
  gulp.watch(watch.fonts, ['fonts']);
});
