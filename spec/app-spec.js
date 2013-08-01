// require('./spec-helper');
var request = require('supertest')
  , retro = require('../routes/retro')
  , app = require('../app')
  , sinon = require('sinon');
require('should');  

describe('GET /', function(){
  it('should respond with "hello world"', function(done){
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end(function(err, res){
        res.text.should.equal('hello world');

        if (err) return done(err);
        done();
      });
  })
})

describe('GET /retro', function() {
  // less involved, but maybe stupid to test
  beforeEach(function(){
    this.stub = sinon.stub(retro, 'list');
  })

  it('should call retro.list', function(done) {
    var stub = this.stub
    console.log('calling stub');

    request(app)
      .get('/retro')
      .end(function(err, res){
        stub.callCount.should.equal(1);

        if (err) return done(err);
        done();
      })
  })

  it('should respond with a JSON list of retros') // <- more of an integration test, will it work? stub db?

  it('should make a query to mongodb')
})

describe('POST /retro', function() {
  it
  it('should save the name')

  it('should save the name of the team')

  it('should save anything else important')

})
