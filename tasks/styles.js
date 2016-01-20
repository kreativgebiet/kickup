import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import plumber from 'gulp-plumber';
import csso from 'gulp-csso';
import rev from 'gulp-rev';
import revReplace from 'gulp-rev-replace';

import autoprefixer from 'autoprefixer';
import stylePaths from 'style-paths';
import { join } from 'path';
import { src, dest } from './config';
import browserSync from './connect';

gulp.task('styles', () => {
  gulp.src(join(src, 'styles', 'main.scss'))
    .pipe(plumber())
    .pipe(sass({
      includePaths: stylePaths(['scss', 'sass']),
    }))
    .pipe(postcss([autoprefixer({ browsers: ['last 2 versions'] })]))
    .pipe(gulp.dest(join(dest, 'styles')))
    .pipe(browserSync.stream());
});

gulp.task('styles:build', () => {
  const manifest = gulp.src(join(dest, '..', 'rev-manifest.json'));

  gulp.src(join(src, 'styles', 'main.scss'))
    .pipe(plumber())
    .pipe(sass({
      includePaths: stylePaths(['scss', 'sass']),
    }))
    .pipe(postcss([autoprefixer({ browsers: ['last 2 versions'] })]))
    .pipe(csso())
    .pipe(revReplace({ manifest }))
    .pipe(rev())
    .pipe(gulp.dest(join(dest, 'styles')))
    .pipe(rev.manifest({ merge: true }))
    .pipe(gulp.dest(join(dest, '..')));
});
