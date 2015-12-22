import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import plumber from 'gulp-plumber';
import csso from 'gulp-csso';

import autoprefixer from 'autoprefixer';
import stylePaths from 'style-paths';
import { join } from 'path';
import { dest } from './config';
import browserSync from './connect';

gulp.task('styles', () => {
  gulp.src('./source/styles/main.scss')
    .pipe(plumber())
    .pipe(sass({
      includePaths: stylePaths(['scss', 'sass']),
    }))
    .pipe(postcss([ autoprefixer({ browsers: [ 'last 2 versions' ] }) ]))
    .pipe(csso())
    .pipe(gulp.dest(join(dest, 'styles')))
    .pipe(browserSync.stream());
});
