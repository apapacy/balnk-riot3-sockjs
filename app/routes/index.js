'use strict';
var express = require('express');
var router = express.Router();
var riot = require('riot')
require('../riot/document.tag');
require('../riot/layout.tag');
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import * as glob from 'glob-all';
import Index from '../react/markup/Index';
import {
  prepareQueryParameters
} from '../utils/util'
import Html from '../react/Html';
import	{	createStore	}	from	'redux';
import	{	Provider	}	from	'react-redux';
import reducers from '../react/reducers';

// get list of React components
router.get('/', function(req, res, next) {
  const paths = glob.sync(['app/react/**/*.jsx']);
  const components = [];
  for (let i = 0; i < paths.length; i++) {
    let path = paths[i].substring(4).replace(/\..+$/g, '')
    let component = require('../' + path);
    if (typeof component.default === 'function') {
      component = component.default;
    }
    components.push({
      path,
      description: component.markup && component.markup.description,
    });
    if (component.markup && typeof component.markup.queryString === 'object') {
      for (let description in component.markup && component.markup.queryString) {
        components.push({
          path: path + prepareQueryParameters(component.markup.queryString[description]),
          description,
        });
      }
    }
  }
  const index = React.createElement(Index, {
    name: 'Index',
    components
  }, null);
  const props = Object.assign({}, {
    components: components
  }, req.query);
  const output = ReactDOMServer.renderToString(index);
  res.send('<!DOCTYPE html>\n' + output);
});

router.all('/react/(*)', function(req, res, next) {
  const componentPath = 'react/' + req.params[0].replace(/^\/|\?.*$/g, '')
  let Component = require('../' + componentPath);
  if (typeof Component.default === 'function') {
    Component = Component.default;
  }
  console.log(Component.defaultProps);
  const props = Object.assign({}, Component.defaultProps, req.query);
  const component = React.createElement(Component, props, null);
  const store = createStore(reducers);
  const provider = React.createElement(Provider, {store}, component);
  props.componentPath = componentPath;
  props.componentProperties = JSON.stringify(props);
  props.componentHtml = ReactDOMServer.renderToStaticMarkup(provider);
  const html = React.createElement(Html, props);
  const output = ReactDOMServer.renderToStaticMarkup(html);
  res.send('<!DOCTYPE html>\n' + output);
});

router.get('/riot(/*)?', function(req, res, next) {
  var html = riot.render('document-tag', {
    message: 'message'
  })
  res.send(html);
});

router.all('/random', function(req, res, next) {
  res.json({
    random: Math.random()
  });
});


module.exports = router;
