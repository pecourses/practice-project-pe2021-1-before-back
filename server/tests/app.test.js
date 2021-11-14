const request = require('supertest');
const app = require('./../app');

describe('Testing app', () => {
  describe('testing /', () => {
    it('should return 200 Hello World', done => {
      request(app)
        .get('/')
        .expect(200)
        .expect('Hello World')
        .end(done);
    });
  });

  describe('testing /user', () => {
    it('should return 200 Hello World', done => {
      request(app)
        .get('/user')
        .expect(200)
        .expect({ name: 'Test' })
        .end(done);
    });
  });
});
