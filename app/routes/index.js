var express = require('express');
var router = express.Router();
var riot = require('riot')
require('../riot/document.tag');
require('../riot/layout.tag');
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/riot(/*)?', function(req, res, next) {
  var html = riot.render('document-tag', {message: 'message'})
  res.send(html);
});

router.all('/react(/(*))?', function(req, res, next) {
  var Component = require(req.params[1]).default ;

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
