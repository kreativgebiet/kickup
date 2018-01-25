
import { join } from 'path';
import babelify from 'babelify';

const sourceFolder = 'source';
const distFolder = 'dist';

module.exports = {
  // ----------------------------
  // LIBRARIES module
  // ----------------------------
  libraries: {
    // The entries in js are needed to be a *glob*
    js: [
      join(__dirname, 'node_modules', 'jquery', 'dist', 'jquery.min.js'),
      join(__dirname, 'source', 'scripts', 'lib', '**', '*.js'),
      // TODO: Add some more libraries to work with them in your js files
    ],

    // The entries in scss are needed to be *folders*
    scss: [
      join(__dirname, 'node_modules', 'scss'),
      // TODO: Add some more libraries to include them in your scss files
    ],
  },

  // ----------------------------
  // RSYNC module
  // ----------------------------
  rsync: {
    src: `${distFolder}/`,
    dest: 'user@host:folder/to/script',
    ssh: true,
    recursive: true,
    deleteAll: true,
    exclude: ['.DS_Store'],
  },

  // ----------------------------
  // IMAGEMIN module
  // ----------------------------
  imagemin: {},

  // ----------------------------
  // WATCH module
  // ----------------------------
  watch: {
    images: join(sourceFolder, 'images', '**/*'),
    scss: join(sourceFolder, 'styles', '**/*.{scss,sass}'),
    js: undefined, // JavaScript is watched using watchify
    html: join(sourceFolder, 'html', '**/*.ejs'),
    fonts: join(sourceFolder, 'fonts', '**/*'),
  },

  // ----------------------------
  // SERVER module
  // ----------------------------
  server: {
    src: `${sourceFolder}/`,
    dest: `${distFolder}/`,

    // ----------------------------
    // BROWSERSYNC module
    // ----------------------------
    browserSync: {
      port: 3000,
      notify: false,
      server: {
        baseDir: distFolder,
      },
    },
  },

  // ----------------------------
  // BROWSERSYNC module
  // ----------------------------
  browserify: {
    entries: join(sourceFolder, 'scripts', 'main.js'),
    extensions: ['.jsx', '.js'],
    debug: process.env.NODE_ENV === 'development',
    transform: [
      babelify,
    ],
  },
}
