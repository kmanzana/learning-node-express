var express = require('express')
  , config = require('./config')
  , routes = require('./routes')
  , user = require('./routes/user');

var app = express();
config(app);

app.get('/', routes.index);
app.get('/users', user.list);

module.exports = app;
