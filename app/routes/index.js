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
import Html from 'react/Html';

router.get('/', function(req, res, next) {
  const paths = glob.sync(['app/react/**/*.jsx']);
  const components = [];
  for (let i: number = 0; i < paths.length; i++) {
    let path = paths[i].substring(4).replace(/\..+$/, '')
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
  const Element = React.createElement(Index, {
    name: 'Component',
    components
  }, null);
  const props = Object.assign({}, {components:components}, req.query);
  const output = ReactDOMServer.renderToString(Element, props);
  res.send('<!DOCTYPE html>\n' + output);
});

router.get('/riot(/*)?', function(req, res, next) {
  var html = riot.render('document-tag', {message: 'message'})
  res.send(html);
});

router.all('/react/(*)', function(req, res, next) {
  let Component = require('react/' + req.params[0]);
  if (typeof Component.default === 'function') {
    Component = Component.default;
  }
  const props = Object.assign(Component.defaultProps, req.query);
  props.componentUrl = req.originalUrl.replace(/^\/|\?.*$/g,'');
  props.currentTime = (new Date).toString();
  props.properties = JSON.stringify(props);
  const component = React.createElement(Component, props, null);
  props.componentHtml = ReactDOMServer.renderToString(component);
  const html = React.createElement(Html, props);
  const output = ReactDOMServer.renderToStaticMarkup(html);
  res.send('<!DOCTYPE html>\n' + output);
});


router.all('/random', function(req, res, next) {
    res.json({random: Math.random()});
});


module.exports = router;
