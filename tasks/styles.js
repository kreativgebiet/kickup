
import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import csso from 'gulp-csso';
import rucksack from 'gulp-rucksack';
import rev from 'gulp-rev';

import autoprefixer from 'autoprefixer';
import { join } from 'path';
import { libraries, server } from '../config';
import browserSync from './connect';

const { src, dest } = server

const sassSettings = {
  includePaths: libraries.scss,
};

gulp.task('styles', () => {
  gulp.src(join(src, 'styles', 'main.scss'))
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(sass(sassSettings))
      .pipe(postcss([autoprefixer({ browsers: ['last 2 versions'] })]))
      .pipe(rucksack())
      .pipe(csso())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(join(dest, 'styles')))
    .pipe(browserSync.stream());
});

gulp.task('styles:build', () => {
  const manifest = gulp.src(join(dest, '..', 'rev-manifest.json'));

  gulp.src(join(src, 'styles', 'main.scss'))
    .pipe(plumber())
    .pipe(sass(sassSettings))
    .pipe(postcss([autoprefixer({ browsers: ['last 2 versions'] })]))
    .pipe(rucksack())
    .pipe(csso())
    .pipe(gulp.dest(join(dest, 'styles')));
});
