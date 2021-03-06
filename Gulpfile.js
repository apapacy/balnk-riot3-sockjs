'use strict';

const gulp = require('gulp');
const path = require('path');
const branderGulp = require('brander-gulp-tasks');
const webpack = require('gulp-webpack');


var env = process.env.NODE_ENV || process.env.SYMFONY_ENV || 'dev';
var config = {
  ENV: env,
  dependencies: {
    js: {
      minify: env !== 'dev',
      paths: {
        '': ['frontend'], // "./" вначале - текущая папка
        'js/react': ['app/react'],
      },
      extensions: ['js', 'es6', 'jsx'],
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
        'css': './frontend/stylesheets'
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
        'node_modules/react/dist/react.js': 'react',
        'node_modules/react-dom/dist/react-dom.js': 'react-dom',
        'node_modules/redux/dist/redux.js': 'redux',
        'node_modules/react-redux/dist/react-redux.js': 'react-redux',
        'node_modules/redux-logger/dist/index.js': 'redux-logger',
        'node_modules/redux-thunk/dist/redux-thunk.js': 'redux-thunk',
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
        'config/require.config.js': {},
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
    //  https: {
    //    key: path.join(__dirname, 'config', 'keys', 'server', 'privkey.pem'),
    //    cert: path.join(__dirname, 'config', 'keys', 'server', 'fullchain.pem')
    //  }
    },
    WAIT: 1000,
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
  exec('coffee -o app/ -cw coffee/', function(err, stdout, stderr) {
  });
});

gulp.task('riot:frontend:watch', function(cb) {
    spawn('riot', ['-w', '-m', 'app/riot', 'frontend/js/riot/frontend-tag.js']);
    spawn('coffee', ['-o', 'app/', '-cw', 'coffee/']);
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
gulp.task('sock:sync',['browserSync', 'sock:watch']);


gulp.task('react-watch', function() {
  return gulp.src('*')
    .pipe(webpack(require('./webpack.config.js')(true)))
    .pipe(gulp.dest('public/assets')/*, {
      output: "[name].bundle.js"
    }*/);
});

gulp.task('react-build', function() {
  return gulp.src('*')
    .pipe(webpack(require('./webpack.config.js')(false)))
    .pipe(gulp.dest('public/assets')/*, {
      output: "[name].bundle.js"
    }*/);
});




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
