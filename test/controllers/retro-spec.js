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
      var retroCtrl = require('../../controllers/retro');

      retroCtrl.list(this.req, this.res);

      Retro.find.callCount.should.equal(1);
      this.sendStub.callCount.should.equal(1);
      this.sendStub.firstCall.args[0].should.eql([]);
    });

    it('should send an error if there is a problem accessing the db', function() {
      sinon.stub(Retro, 'find').callsArgWith(0, 'error', undefined);
      var retroCtrl = require('../../controllers/retro');

      retroCtrl.list(this.req, this.res);

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

    it('should call save to the db', function() {
      sinon.stub(Retro, 'create').callsArgWith(1, undefined, {});
      var retroCtrl = require('../../controllers/retro');

      retroCtrl.create(this.req, this.res);

      Retro.create.callCount.should.equal(1);
      Retro.create.firstCall.args[0].should.eql({
        name: 'first retro',
        teamName: 'awesomeness'
      })
      this.sendStub.callCount.should.equal(1);
    });

    it('should send an error if there is a problem accessing the db', function() {
      sinon.stub(Retro, 'create').callsArgWith(1, 'error', undefined);
      var retroCtrl = require('../../controllers/retro');

      retroCtrl.create(this.req, this.res);

      Retro.create.callCount.should.equal(1);
      this.res.status.firstCall.args[0].should.equal(500);
      this.sendStub.callCount.should.equal(1);
      this.sendStub.firstCall.args[0].error.should.include('error');
    });

    it('should send error if req.body is undefined', function() {
      sinon.stub(Retro, 'create').callsArgWith(1, undefined, {});
      var retroCtrl = require('../../controllers/retro');
      this.req.body = undefined;

      retroCtrl.create(this.req, this.res);

      this.res.status.firstCall.args[0].should.equal(500);
      this.sendStub.callCount.should.equal(1);
    });

    it('should send error if req.body.name is undefined', function() {
      sinon.stub(Retro, 'create').callsArgWith(1, undefined, {});
      var retroCtrl = require('../../controllers/retro');
      this.req.body.name = undefined;

      retroCtrl.create(this.req, this.res);

      this.res.status.firstCall.args[0].should.equal(500);
      this.sendStub.callCount.should.equal(1);
    });

    it('should send error if req.body.teamName is undefined', function() {
      sinon.stub(Retro, 'create').callsArgWith(1, undefined, {});
      var retroCtrl = require('../../controllers/retro');
      this.req.body.teamName = undefined;

      retroCtrl.create(this.req, this.res);

      this.res.status.firstCall.args[0].should.equal(500);
      this.sendStub.callCount.should.equal(1);
    });
  })
});
