var express = require('express');
var router = express.Router();
var riot = require('riot')
require('../riot/document.tag');
require('../riot/layout.tag');
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import * as glob from 'glob-all';
import {Index} from 'react/markup/Index';
import {prepareQueryParameters} from 'utils/util'

/* GET home page. */
router.get('/', function(req, res, next) {
  const paths = glob.sync(['app/react/**/*.jsx']);
  const components = [];
  for (let i: number = 0; i < paths.length; i++) {
    let path = paths[i].substring(4)
    let component = require(path);
    if (typeof component.default === 'function') {
      component = component.default;
    }
    components.push({
      path,
      description: component.description,
    });
    if (typeof component.queryString === 'object') {
      for (let description in component.queryString) {
        components.push({
          path: path + prepareQueryParameters(component.queryString[description]),
          description,
        });
      }
    }
  }
  var Element = React.createElement(Index, {
    name: 'Component',
    components
  }, null);
  var output = ReactDOMServer.renderToString(Element, {components:components});
  res.send('<!DOCTYPE html>\n' + output);
});

router.get('/riot(/*)?', function(req, res, next) {
  var html = riot.render('document-tag', {message: 'message'})
  res.send(html);
});

router.all('/react/(*)', function(req, res, next) {
  var Component = require('react/' + req.params[0]);
  if (typeof Component.default === 'function') {
    Component = Component.default;
  }

  var Element = React.createElement(Component, {
    name: 'Component'
  }, null);
  var output = ReactDOMServer.renderToString(Element, {});
  res.send('<!DOCTYPE html>\n' + output);
});


router.all('/random', function(req, res, next) {
    res.json({random: Math.random()});
});


module.exports = router;
