import gulp from 'gulp';

gulp.task('build', ['clean'], () => {
  gulp.start('scripts:build');
  gulp.start('fonts');
  gulp.start('images');
  gulp.start('markup');
  gulp.start('styles');
});
