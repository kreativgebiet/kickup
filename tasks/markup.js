import gulp from 'gulp';
import svgmin from 'gulp-svgmin';
import cheerio from 'gulp-cheerio';
import svgstore from 'gulp-svgstore';
import inject from 'gulp-inject';
import fileinclude from 'gulp-file-include';
import plumber from 'gulp-plumber';
import { join } from 'path';

import browserSync from './connect';
import { dest } from './config';

let sprites;

gulp.task('sprites', () => {
  sprites = gulp.src('./source/images/**/*.svg')
    .pipe(svgmin())
    .pipe(cheerio({
      run: function run(dom) {
        dom('[fill]').removeAttr('fill');
      },
      parserOptions: { xmlMode: true },
    }))
    .pipe(svgstore({ inlineSvg: true }));
});

gulp.task('markup', ['sprites'], () => {
  const spriteTransform = (filePath, file) => {
    return file.contents.toString();
  };

  gulp.src([
    './source/html/**/*.html',
    '!./source/html/includes/**/*.html',
  ])
    .pipe(plumber())
    .pipe(inject(sprites, { transform: spriteTransform }))
    // .pipe(minifyHtml())
    .pipe(fileinclude({
      basepath: join(__dirname, '..', 'source', 'html'),
    }))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
});
