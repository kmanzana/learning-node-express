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
  beforeEach(function() {
    this.req = {
      body: {
        name: 'first retro',
        teamName: 'awesomeness'
      }
    };

    var sendStub = this.sendStub = sinon.stub();

    this.res = {
      send: sendStub,
      status: sinon.stub().returns({send: sendStub})
    };
  });

  describe('.list', function() {
    afterEach(function() {
      Retro.find.restore();
    });

    it('should query mongodb', function() {
      sinon.stub(Retro, 'find').callsArgWith(0, undefined, []);
      // Retro.find = sinon.stub().callsArgWith(0, undefined, []);
      var retroRoutes = require('../../routes/retro');

      retroRoutes.list(this.req, this.res);

      Retro.find.callCount.should.equal(1);
      this.sendStub.callCount.should.equal(1);
      this.sendStub.firstCall.args[0].should.eql([]);
    });

    it('should send an error if there is a problem accessing the db', function() {
      sinon.stub(Retro, 'find').callsArgWith(0, 'error', undefined);
      var retroRoutes = require('../../routes/retro');

      retroRoutes.list(this.req, this.res);

      Retro.find.callCount.should.equal(1);
      this.res.status.firstCall.args[0].should.equal(500);
      this.sendStub.callCount.should.equal(1);
      this.sendStub.firstCall.args[0].error.should.include('error');
    });
  });

  describe('.create', function() {
    afterEach(function() {
      Retro.create.restore();
    });

    // tests to ensure validation?
    it('should call save to the db', function() {
      sinon.stub(Retro, 'create').callsArgWith(1, undefined, {});
      var retroRoutes = require('../../routes/retro');

      retroRoutes.create(this.req, this.res);

      Retro.create.callCount.should.equal(1);
      Retro.create.firstCall.args[0].should.eql({
        name: 'first retro',
        teamName: 'awesomeness'
      })
      this.sendStub.callCount.should.equal(1);
    });

    it('should send an error if there is a problem accessing the db', function() {
      sinon.stub(Retro, 'create').callsArgWith(1, 'error', undefined);
      var retroRoutes = require('../../routes/retro');

      retroRoutes.create(this.req, this.res);

      Retro.create.callCount.should.equal(1);
      this.res.status.firstCall.args[0].should.equal(500);
      this.sendStub.callCount.should.equal(1);
      this.sendStub.firstCall.args[0].error.should.include('error');
    });

    it('should send error if req.body is undefined', function() {
      sinon.stub(Retro, 'create').callsArgWith(1, undefined, {});
      var retroRoutes = require('../../routes/retro');
      this.req.body = undefined;

      retroRoutes.create(this.req, this.res);

      this.res.status.firstCall.args[0].should.equal(500);
      this.sendStub.callCount.should.equal(1);
    });

    it('should send error if req.body.name is undefined', function() {
      sinon.stub(Retro, 'create').callsArgWith(1, undefined, {});
      var retroRoutes = require('../../routes/retro');
      this.req.body.name = undefined;

      retroRoutes.create(this.req, this.res);

      this.res.status.firstCall.args[0].should.equal(500);
      this.sendStub.callCount.should.equal(1);
    });

    it('should send error if req.body.teamName is undefined', function() {
      sinon.stub(Retro, 'create').callsArgWith(1, undefined, {});
      var retroRoutes = require('../../routes/retro');
      this.req.body.teamName = undefined;

      retroRoutes.create(this.req, this.res);

      this.res.status.firstCall.args[0].should.equal(500);
      this.sendStub.callCount.should.equal(1);
    });
  })
});
