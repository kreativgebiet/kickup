import gulp from 'gulp';

import csso from 'gulp-csso';
import eslint from 'gulp-eslint';
import sass from 'gulp-sass';
import uglify from 'gulp-uglify';
import postcss from 'gulp-postcss';
import gutil from 'gulp-util';
import sourcemaps from 'gulp-sourcemaps';
import minifyHtml from 'gulp-minify-html';
import connect from 'gulp-connect';
import plumber from 'gulp-plumber';
import imagemin from 'gulp-imagemin';
import inject from 'gulp-inject';
import svgmin from 'gulp-svgmin';
import cheerio from 'gulp-cheerio';
import svgstore from 'gulp-svgstore';

import rimraf from 'rimraf';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import autoprefixer from 'autoprefixer';
import stylePaths from 'style-paths';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import debowerify from 'debowerify';
import { argv } from 'yargs';
import { assign } from 'lodash';
import { join } from 'path';

const SERVER_PORT = 8888;
const DEST_PATH = 'dist/';

let sprites;

const customOpts = {
  entries: './source/scripts/main.js',
  extensions: [ '.jsx', '.js' ],
  debug: true,
  transform: [
    babelify,
    debowerify,
  ],
};

const config = assign({}, watchify.args, customOpts);
const bundler = watchify(browserify(config));

function bundle() {
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
      .pipe(eslint())
      .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(DEST_PATH));
}

gulp.task('scripts', bundle);
bundler.on('update', bundle);
bundler.on('log', gutil.log);

gulp.task('clean', done => {
  if (argv.clean) {
    rimraf(DEST_PATH, err => {
      if (err) gutil.log(err);
      done();
    });
  } else {
    done();
  }
});

gulp.task('images', () => {
  gulp.src('./source/images/**/*.{png,jpg,gif,jpeg}')
    .pipe(imagemin())
    .pipe(gulp.dest(join(DEST_PATH, 'images')));
});

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

  gulp.src('./source/html/**/*.html')
    .pipe(plumber())
    .pipe(inject(sprites, { transform: spriteTransform }))
    .pipe(minifyHtml())
    .pipe(gulp.dest(DEST_PATH))
    .pipe(connect.reload());
});

gulp.task('styles', () => {
  gulp.src('./source/styles/main.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: stylePaths(['scss', 'sass']),
    }))
    .pipe(postcss([ autoprefixer({ browsers: [ 'last 2 versions' ] }) ]))
    .pipe(csso())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(join(DEST_PATH, 'styles')))
    .pipe(connect.reload());
});

gulp.task('server', () => {
  connect.server({
    port: SERVER_PORT,
    root: DEST_PATH,
    livereload: true,
  });
});

gulp.task('default', ['clean'], () => {
  gulp.start('server');
  gulp.start('scripts');

  const initTask = (files, task) => {
    if ( typeof task === 'string' ) {
      gulp.start(task);
      gulp.watch(files, [ task ]);
    } else {
      task.map(subtask => gulp.start(subtask));
      gulp.watch(files, task);
    }
  };

  initTask('source/images/**/*', 'images');
  initTask('source/html/**/*.html', 'markup');
  initTask('source/styles/**/*.scss', 'styles');
});
