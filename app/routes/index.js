var express = require('express');
var router = express.Router();
var riot = require('riot')
require('../riot/document.tag');
require('../riot/layout.tag');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/riot(/*)?', function(req, res, next) {
  var html = riot.render('document-tag', {message: 'message'})
  res.send(html);
});

router.all('/random', function(req, res, next) {
    res.json({random: Math.random()});
});


module.exports = router;
