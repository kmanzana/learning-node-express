var retro = {
  list: function(req, res){
    console.log('actual called');
    res.send("respond with a resource");
  }
}

module.exports = retro;
