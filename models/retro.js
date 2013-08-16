var mongoose = require('mongoose');

var retroSchema = mongoose.Schema({
    name: String,
    teamName: String
});

var Retro = mongoose.model('Retro', retroSchema);
