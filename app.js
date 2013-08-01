var express = require('express')
  , config = require('./config')
  , routes = require('./routes')
  , retro = require('./routes/retro');

var app = express();
config(app);

app.get('/', routes.index);
app.get('/retro', retro.list);

module.exports = app;
