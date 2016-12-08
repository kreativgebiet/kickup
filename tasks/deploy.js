
import gulp from 'gulp';
import rsyncwrapper from 'rsyncwrapper';
import { rsync } from '../config';

gulp.task('deploy', done => {
  rsyncwrapper(rsync, done);
});
