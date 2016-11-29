'use strict';

const gulp = require('gulp');
const path = require('path');
const branderGulp = require('brander-gulp-tasks');

var env = process.env.NODE_ENV || process.env.SYMFONY_ENV || 'dev';
var config = {
  ENV: env,
  dependencies: {
    js: {
      minify: env !== 'dev',
      paths: {
        '': ['frontend'], // "./" вначале - текущая папка
        //'подПапка': ['./src/Rt/Bundle/AdminBundle/Resources/frontend'],//Друг, исправь меня!
      },
      extensions: ['js', 'es6'],
      babel: {
        options: {
          modules: 'amd'
        }
      },
    },
    views: {
      paths: {
        '': ['views', ], // "./" вначале - текущая папка
        //'подПапка/': ['./src/Rt/Bundle/AdminBundle/Resources/frontend/views',],//Друг, исправь меня!
      },
      extensions: ['twig'],
      options: {
        module: 'amd',
        twig: 'twig',
        compileOptions: {
          viewPrefix: 'templates/'
        }
      },
      DEST_PATH: './public/dependencies/js'
    },
    stylesheets: {
      minify: env !== 'dev',
      paths: {
        '': './frontend'
      },
      extensions: ['scss', 'css'],
      autoprefixer: [
        "last 2 version",
        "ie 10",
        "ios 6",
        "android 4"
      ]
    },
    fonts: {
      paths: {
        '': './frontend'
      },
      extensions: ['eot', 'svg', 'ttf', 'woff', 'woff2']
    },
    images: {
      paths: {
        '': './frontend'
      },
      extensions: ['svg', 'jpg', 'jpeg', 'png', 'gif']
    },
    bower: {
      BOWER_JSON: 'bower.json', // relative to cwd
      BOWER_COMPONENTS: 'bower_components',
      flatten: true,
      minify: env !== 'dev',
      cwd: '.',
    },
    cp: {
      files: {
        //'node_modules/twig/twig.min.js': 'twig',
        'node_modules/riot/riot.min.js': 'riot',
        'node_modules/i18next/i18next.min.js': 'i18next',
        'node_modules/i18next-xhr-backend/i18nextXHRBackend.min.js': 'i18next-xhr-backend',
        'node_modules/i18next-browser-languagedetector/i18nextBrowserLanguageDetector.min.js': 'i18next-browser-languagedetector',
        // dev dependencies
        'frontend/data/**/': '../data/',
      },
      DEST_PATH: './public/dependencies/js'
    },
  },
  build: {
    rjs: {
      entryPoints: {
        'config/require.config': {},
      },
      defaultOptions: {
        includeNestedDependencies: true,
        findNestedDependencies: true,
        //mainConfigFile: './public/dependencies/js/config/require.config.js',
        //stubModules: ['text', 'json', 'json!/translations'],
        //inlineText: true,
        //pragmas: {
        //  excludeRequireCss: true
        //}
        inlineJSON: false,
        //inlineTWIG: false,
        //appDir: 'public',
        //config.dependencies.js.minify
        out:            `app.js`,
      },
      DEST_PATH: './public/dependencies/js'
    },
    concat: {
      entryPoints: {
        'require.js0': [
          'public/dependencies/js/require.js',
          //'public/dependencies/js/riot.js',
          //'public/dependencies/js/config/require.config.js',
          //'public/dependencies/js/config/boost.js'
        ]
      },
      options: {
        newLine: ';\n'
      },
      DEST_PATH: './public/dependencies/js',
    },
  },
  browsersync: {
    watch: [
      'markup/twig/*.twig',
      'public/dependencies/**/*',
      'markup/fixtures/*.json',
    ],
    options: {
      https: {
        key: path.join(__dirname, 'config', 'keys', 'server', 'privkey.pem'),
        cert: path.join(__dirname, 'config', 'keys', 'server', 'fullchain.pem')
      }
    },
    WAIT: 500,
  },
  generate: {
    assets: {
      to: './public/dependencies/assets.json'
    },
  },
  DEST_PATH: './public/dependencies'
};

branderGulp(gulp, config);

const spawn = require('child_process').spawn;
const exec = require('child_process').exec;

gulp.task('riot:frontend', function(cb) {
  exec('riot -m app/riot frontend/js/riot/frontend-tag.js', function(err, stdout, stderr) {
  });
});

gulp.task('riot:frontend:watch', function(cb) {
    spawn('riot', ['-w', '-m', 'app/riot', 'frontend/js/riot/frontend-tag.js']);
});
gulp.task('ts', function(cb) {
  exec('ts', function(err, stdout, stderr) {
  });
});
gulp.task('ts:watch', function(cb) {
    exec('tsc --watch', function(err, stdout, stderr) {
      console.log('Changes DETECTED')
    });
});

gulp.task('sock',['default', 'riot:frontend', 'ts']);
gulp.task('sock:watch',['default', 'riot:frontend:watch', 'watch', 'ts:watch']);
gulp.task('sock:sync',['sync', 'sock:watch']);





/*
gulp.task('sync', [
  'browserSync',
  'watch',
], _.noop);
gulp.task('watch', [
  'dependencies:js:watch',
  'dependencies:views:watch',
  'dependencies:stylesheets:watch',
  'dependencies:fonts:watch',
  'dependencies:images:watch',
], _.noop);
gulp.task('default', [
  'bower:dependencies',
  'dependencies:js:build',
  'dependencies:stylesheets:build',
  'dependencies:views:build',
  'dependencies:cp:build',
  'generate:assets',
  'dependencies:fonts:build',
  'dependencies:images:build',
], _.noop);
*/
