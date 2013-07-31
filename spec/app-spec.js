process.env.NODE_ENV = 'test';
require('should');
var request = require('supertest')
  , app = require('../app');

describe('GET /', function(){
  it('respond with "hello world"', function(done){
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
