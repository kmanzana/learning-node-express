var express = require('express')
  , config = require('./config')
  , controllers = require('./controllers')
  , retro = require('./controllers/retro');

var app = express();

config(app);

app.get('/', controllers.index);

app.get('/retro', retro.list);
app.post('/retro', retro.create);

module.exports = app;
