import gulp from 'gulp';
import svgmin from 'gulp-svgmin';
import cheerio from 'gulp-cheerio';
import svgstore from 'gulp-svgstore';
import inject from 'gulp-inject';
import fileinclude from 'gulp-file-include';
import plumber from 'gulp-plumber';
import { join } from 'path';

import browserSync from './connect';
import { src, dest } from './config';

let sprites;

gulp.task('sprites', () => {
  sprites = gulp.src(join(src, 'images', '**/*.svg'))
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

  const mainPath = join(src, 'html', '**/*.html');
  const includesPath = join('!.', src, 'html', 'includes', '**/*.html');

  gulp.src([
    mainPath,
    includesPath,
  ])
    .pipe(plumber())
    .pipe(inject(sprites, { transform: spriteTransform }))
    .pipe(fileinclude({
      basepath: join(__dirname, '..', src, 'html'),
    }))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
});
