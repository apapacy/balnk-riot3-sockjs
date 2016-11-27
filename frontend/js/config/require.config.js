(function() {
  'use strict';
  requirejs.config({
    "urlArgs":     `bust=${Math.random()}`,
    "baseUrl": '/dependencies/js',
    "waitSeconds": 300,
    "paths": {},
    "map": {
    },
    'shim': {
      'riot/frontend-tag': {
        deps: ['jquery', 'jquery.mask', 'lodash',]
      },
      'jquery.mask': {
        deps: ['jquery',]
      },
    },
    config: {
      template: {
        prefix: 'templates/'
      },
    },
  });

  requirejs([
    'main', 'domReady!'
  ], function() {})
}());
