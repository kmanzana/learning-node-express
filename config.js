var express = require('express')
  , path = require('path');

module.exports = function(app) {
  app.configure('dev', function() {
    app.use(express.logger('dev'));
  });

  app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    // app.use(require('connect').bodyParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.errorHandler());

    app.use(app.router);
  });
};
