
import gulp from 'gulp';
import rimraf from 'rimraf';
import { server } from '../config';

gulp.task('clean', (done) => {
  rimraf(server.dest, done);
});
