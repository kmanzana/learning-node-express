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

      var sendStub = this.sendStub = sinon.stub();

      this.res = {
        send: sendStub,
        status: sinon.stub().returns({send: sendStub})
      };
    });

    it('should query mongodb', function() {
      Retro.find = sinon.stub().callsArgWith(0, undefined, []);
      var retroRoutes = require('../../routes/retro');

      retroRoutes.list(this.req, this.res);

      Retro.find.callCount.should.equal(1);
      this.sendStub.callCount.should.equal(1);
      this.sendStub.firstCall.args[0].should.eql([]);
    });

    it('should send an error if there is a problem accessing the db', function() {
      Retro.find = sinon.stub().callsArgWith(0, 'error', undefined);
      var retroRoutes = require('../../routes/retro');

      retroRoutes.list(this.req, this.res);

      Retro.find.callCount.should.equal(1);
      this.res.status.firstCall.args[0].should.equal(500);
      this.sendStub.callCount.should.equal(1);
      this.sendStub.firstCall.args[0].error.should.include('error');
    });
  });

  describe('.create', function() {
    it('should call ')
  })

  // it('should save the name')
  // it('should save the name of the team')
  // it('should save anything else important')
});
