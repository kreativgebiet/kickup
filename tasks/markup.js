
import gulp from 'gulp';
import svgmin from 'gulp-svgmin';
import cheerio from 'gulp-cheerio';
import svgstore from 'gulp-svgstore';
import inject from 'gulp-inject';
import ejs from 'gulp-ejs';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import concat from 'gulp-concat';
import { join } from 'path';

import browserSync from './connect';
import { watch, server } from '../config';

const { src, dest } = server

gulp.task('sprites', () => {
  gulp.src(join(src, 'images', '**/*.svg'))
    .pipe(svgmin())
    .pipe(cheerio({
      run($) { $('[fill]').removeAttr('fill'); },
      parserOptions: { xmlMode: true },
    }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(concat('sprites.ejs'))
    .pipe(gulp.dest(join(src, 'html', 'partials')));
});

gulp.task('markup', () => {
  gulp.src([watch.html, join('!.', src, 'html', 'partials', '**/*.ejs')])
    .pipe(plumber())
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
});
