import gulp from 'gulp';
import rsync from 'rsyncwrapper';
import { dest, remote } from './config';

gulp.task('deploy', done => {
  rsync({
    src: dest,
    dest: `${remote.user}@${remote.host}:${remote.dest}`,
    ssh: true,
    recursive: true,
    deleteAll: true,
    exclude: ['styleguide/', '.DS_Store'],
  }, done);
});
