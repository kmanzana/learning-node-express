var mongoose = require('mongoose');

var retroSchema = mongoose.Schema({
    name: String,
    teamName: String
});

module.exports = mongoose.model('Retro', retroSchema);
