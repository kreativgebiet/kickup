import gulp from 'gulp';
// import connect from 'gulp-connect';
import { server, dest } from './config';

const browserSync = require('browser-sync').create();

gulp.task('server', () => {
  browserSync.init({
    port: server.port,
    notify: false,
    server: {
      baseDir: dest,
    },
    ui: {
      port: server.port + 1
    }
  });
});

export default browserSync;
