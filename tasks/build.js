import gulp from 'gulp';
import sequence from 'run-sequence';

gulp.task('build', ['clean'], () => {
  sequence('images:build', 'styles:build', 'scripts:build', 'fonts', 'markup');
});
