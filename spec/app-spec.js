process.env.NODE_ENV = 'test';
var request = require('supertest')
  , app = require('../app')
  , retro = require('../controllers/retro')
  , sinon = require('sinon');
require('should');  

describe('GET /', function(){
  // really slow test
  it.skip('should respond with "hello world"', function(done){
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end(function(err, res){
        res.text.should.equal('hello world');

        if (err) return done(err);
        done();
      });
  });
});

describe('GET /retro', function() {
  before(function() {
    delete require.cache[require.resolve('../app')];

    sinon.stub(retro, 'list', function(req, res){ 
      res.send('blah');
    });

    app = require('../app');
  });

  after(function() {
    retro.list.restore();
  })

  it('should call retro.list', function(done) {
    request(app)
      .get('/retro')
      .end(function(err, res){
        retro.list.callCount.should.equal(1);

        if (err) return done(err);
        done();
      });
  });
});

describe('POST /retro', function() {
  before(function() {
    delete require.cache[require.resolve('../app')];

    sinon.stub(retro, 'create', function(req, res){ 
      res.send('blah');
    });

    app = require('../app');
  });

  after(function() {
    retro.create.restore();
  });

  it('should call retro.create', function(done) {
    request(app)
      .post('/retro')
      .end(function(err, res){
        retro.create.callCount.should.equal(1);

        if (err) return done(err);
        done();
      });
  });
});
