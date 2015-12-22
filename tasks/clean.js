import gulp from 'gulp';

import rimraf from 'rimraf';
import { dest } from './config';

gulp.task('clean', done => {
  rimraf(dest, done);
});
