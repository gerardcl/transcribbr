/**
 * Module dependencies.
 */
var express = require('express')
  , stylus = require('stylus')
  , http = require('http')
  , nib = require('nib');

/**
 * App.
 */
var app = express();// connect();// express();
var server = http.createServer(app);

/**
 * App configuration.
 */
app.configure('development',function () {
  app.use(stylus.middleware({ src: __dirname + '/public_html', compile: compile }));
  app.use(express.static(__dirname + '/public_html'));
  app.set('views', __dirname);

  function compile (str, path) {
    return stylus(str)
      .set('filename', path)
      .use(nib());
  };
});

/**
 * App routes.
 */
app.get('/', function (req, res) {
	res.send('public_html/index.html', { 'Content-Type': 'text/html' }, 201);
});

/**
 * App listen.
 */
server.listen(8080, function () {
  var addr = server.address();
  console.log('   app listening on http://' + addr.address + ':' + addr.port);
});
