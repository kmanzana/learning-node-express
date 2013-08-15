var Retro = require('../models/retro');

var retro = {
  list: function(req, res){

    Retro.find(function (err, retros) {
      if (err) {
        res.status(500).send({error: 'Mongo error loading retros'});
      } else {
        res.send(retros);
      }
    })
  },

  create: function(req, res) {
    var newRetro = new Retro({
      name: req.body.name,
      teamName: req.body.teamName
    });

    newRetro.save(function(err, savedRetro) {
      if (err) {
        res.status(500).send({error: 'Mongo error saving retros'});
      } else {
        res.send(savedRetro);
      }
    });
  }
}

module.exports = retro;
