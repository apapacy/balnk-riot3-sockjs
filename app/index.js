//require('app-module-path').addPath(__dirname + '/../app');
require('babel-register');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sockjs = require('sockjs');
var http = require('http');

var app = express();


//var socket = http.createServer(app);
//var sockjs_opts = {sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"};
//var sockjs_echo = sockjs.createServer(sockjs_opts);
//var connections = [];
//sockjs_echo.on('connection', function(conn) {
//    connections.push(conn);
//    conn.on('data', function(message) {
//        for (let conn of connections)
//            conn.write(message);
//        console.log(message);
//    });
//});
//sockjs_echo.installHandlers(socket, {prefix:'/echo'});
//socket.listen(8081, '0.0.0.0');


var index = require('./routes/index');
var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, '../public'),
  dest: path.join(__dirname, '../public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
