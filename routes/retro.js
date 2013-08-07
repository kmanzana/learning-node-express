var retro = {
  list: function(req, res){
    res.send("return all retros");
  },

  create: function(req, res) {
    res.send("create a new retro");
  }
}

module.exports = retro;
