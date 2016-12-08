import gulp from 'gulp';
import { server } from '../config';

const browserSync = require('browser-sync').create();

gulp.task('server', () => {
  browserSync.init(server.browserSync);
});

export default browserSync;
