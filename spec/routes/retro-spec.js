// When I send an HTTP POST to /retro I want it to create a new retro with:
// - a name for the retro
// - team name
// - anything else you think is important

// When I send a GET to /retro, I want to see a JSON list of retros.

// Save them in mongo, use mongoosejs. Don't worry about a UI, use "Simple Rest Client", a chrome plugin, to make PUT requests.

process.env.NODE_ENV = 'test';
var Retro = require('../../models/retro')
  , sinon = require('sinon');
require('should');  

describe('retro', function() {
  describe('.list', function() {
    beforeEach(function() {
      this.req = {};

      this.res = {
        send: sinon.stub(),
        status: sinon.stub().returns(this.res)
      };

      console.log(this.res.status);
    });

    it('should query mongodb', function() {
      Retro.find = sinon.stub().callsArgWith(0, undefined, []);
      var retro = require('../../routes/retro');

      retro.list(this.req, this.res);

      Retro.find.callCount.should.equal(1);
      this.res.send.callCount.should.equal(1);
      this.res.send.firstCall.args[0].should.eql([]);
    });

    it ('should send an error if there is a problem accessing the db', function() {

      Retro.find = sinon.stub().callsArgWith(0, 'error', undefined);
      var retro = require('../../routes/retro');

      retro.list(this.req, this.res);

      Retro.find.callCount.should.equal(1);
      // this.res.status.firstCall.args[0].should.equal(500);
      this.res.status().send.callCount.should.equal(1);
      this.res.send.firstCall.args[0].error.should.include('error');
    });
  });

  describe('.create', function() {
    it('should call ')
  })


  // it('should save the name')
  // it('should save the name of the team')
  // it('should save anything else important')

});
