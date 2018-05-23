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
    const randomNumberBetween0and19 = () => Math.floor(Math.random() * 20);

    it('should update the score of a match', () => {
      const score = { home: randomNumberBetween0and19(), away: randomNumberBetween0and19()};
      return request(server)
          .patch('/api/match/1')
          .send({ score: score})
          .expect(204)
          .then(_ =>
            request(server)
              .get('/api/match')
              .then(response => {
                const body = response.body;
                expect(body.entities[0].id).to.be(1);
                expect(body.entities[0].score).to.eql(score);
              })
          );
      }
    );

    it('should error when match not found', () =>
      request(server)
        .patch('/api/match/-1')
        .expect(404)
        .then(response => expect(response.body).to.eql({message: "match with id '-1' not found"}))
    );
  });
});

