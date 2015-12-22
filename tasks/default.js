import gulp from 'gulp';

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

  initTask('source/images/**/*', 'images');
  initTask('source/html/**/*.html', 'markup');
  initTask('source/styles/**/*.scss', 'styles');
});
