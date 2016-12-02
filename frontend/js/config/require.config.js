(function() {
  'use strict';
  requirejs.config({
    "urlArgs":     `bust=${Math.random()}`,
    "baseUrl": '/dependencies/js',
    "waitSeconds": 30000,
  });

  //requirejs([
  //  'markup/index'
  //], function() {})
}());
