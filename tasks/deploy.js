import gulp from 'gulp';
import ghPages from 'gulp-gh-pages';
import { rsync } from 'rsyncwrapper';
import { dest, remote } from './config';

gulp.task('deploy:rsync', done => {
  rsync({
    src: dest,
    dest: `${remote.user}@${remote.host}:${remote.dest}`,
    ssh: true,
    recursive: true,
    deleteAll: true,
    exclude: ['styleguide/', '.DS_Store'],
  }, done);
});

gulp.task('deploy:github', () => {
  gulp.src('./dist/**/*')
    .pipe(ghPages());
});
