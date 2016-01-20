import gulp from 'gulp';
import { src } from './config';
import { join } from 'path';
import sequence from 'run-sequence';

gulp.task('default', ['clean'], () => {
  sequence(
    'clean',
    ['scripts', 'fonts', 'images', 'markup', 'styles'],
    'server'
  );

  gulp.watch(join(src, 'images', '**/*'), ['images']);
  gulp.watch(join(src, 'html', '**/*.html'), ['markup']);
  gulp.watch(join(src, 'styles', '**/*.{scss,sass}'), ['styles']);
});
