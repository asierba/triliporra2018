const expect = require('expect.js');
const request = require('supertest');

describe('api', () => {
  let server;

  beforeEach(() => {
    server = require('../src/server');
  });

  afterEach(() => {
    server.close();
  })

  describe('root', () => {
    it('should return 200', () =>
      request(server)
        .get('/api')
        .expect(200));

    it('should show the app version', () =>
      request(server)
        .get('/api')
        .then(response => {
          const body = response.body;
          expect(body).to.have.key('version');
        }));

    it('should have link to matches', () =>
      request(server)
        .get('/api')
        .then(response => {
          const body = response.body;
          expect(body.links).to.eql([
            {'rel': ["matches"], "href": "/api/match"}
          ]);
        }));
  });

  describe('match get', () => {
    it('should return an array of matches', () =>
      request(server)
        .get('/api/match')
        .then(response => {
          const body = response.body;
          expect(body.entities).to.be.an(Array);
          expect(body.entities[0]).to.have.keys(['date', 'home', 'away', 'stage']);
        }));
  });


  describe('match patch', () => {
    it.skip('should update the score of a match', () =>
      request(server)
        .patch('/api/match/1')
        .send({ score: { home: 1, away: 6}})
        .then(response => {
          expect(response.status).to.be(200);
          expect(response.body.score).to.be({ home: 1, away: 6});
        }));

    it('should error when match not found', () =>
      request(server)
        .patch('/api/match/-1')
        .expect(404)
        .then(response => expect(response.body).to.eql({message: "match with id '-1' not found"}))
    );
  });
});

