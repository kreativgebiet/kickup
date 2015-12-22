import gulp from 'gulp';
import { src } from './config';
import { join } from 'path';

gulp.task('default', ['clean'], () => {
  gulp.start('server');
  gulp.start('scripts');
  gulp.start('fonts');

  const initTask = (files, task) => {
    if ( typeof task === 'string' ) {
      gulp.start(task);
      gulp.watch(files, [ task ]);
    } else {
      task.map(subtask => gulp.start(subtask));
      gulp.watch(files, task);
    }
  };

  initTask(join(src, 'images', '**/*'), 'images');
  initTask(join(src, 'html', '**/*.html'), 'markup');
  initTask(join(src, 'styles', '**/*.{scss,sass}'), 'styles');
});
