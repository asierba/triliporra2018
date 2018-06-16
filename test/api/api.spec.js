import expect from 'expect.js';
import request from 'supertest';
import mockery from 'mockery';
import * as stubRepository from './helpers/stubRepository';
import createTestServer from './helpers/createTestServer';

describe('api', () => {
  let server;

  beforeEach(() => {
    mockery.enable();
    mockery.warnOnUnregistered(false);
    mockery.registerMock('../repository', stubRepository);

    server = createTestServer();
  });

  afterEach(() => {
    server.close();
    mockery.deregisterMock('../repository');
    mockery.disable();
  });

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

    it('should have link to matches and users', () =>
      request(server)
        .get('/api')
        .then(response => {
          const body = response.body;
          expect(body.links).to.eql([
            {'rel': ["matches"], "href": "/api/match"},
            {'rel': ["users"], "href": "/api/user"}
          ]);
        }));
  });

  describe('match get', () => {
    const allMatches = [{
      id: 1,
      date: "2018-06-14T15:00:00Z",
      home: "Catalunya",
      away: "Euskal Herria",
      stage: "fictional match"
    },
      {
        id: 2,
        date: "2018-06-15T15:00:00Z",
        home: "Wales",
        away: "Italy",
        stage: "a match"
      }];

    beforeEach(() => {
      stubRepository.setMatches(allMatches);
    });

    it('should return all matches in the repository', () =>
      request(server)
        .get('/api/match')
        .then(response => response.body)
        .then(body => {
          expect(body.entities).to.eql(allMatches);
        }));
  });


  describe('match patch', () => {
    it('should add the score to a match', () => {
      const matches = [{
        id: 1,
        home: "Catalunya",
        away: "Euskal Herria",
      }];
      stubRepository.setMatches(matches);

      const score = { home: 5, away: 4};

      return request(server)
        .patch('/api/match/1')
        .send({ score: score})
        .expect(204)
        .then(_ =>
          stubRepository.getAll('match').then(matches =>
            expect(matches).to.eql([
              {
                id: 1,
                home: "Catalunya",
                away: "Euskal Herria",
                score: {
                  home: 5,
                  away: 4
                }
              }
            ])));
    });

    it('should error when match not found', () =>
      request(server)
        .patch('/api/match/-1')
        .expect(404)
        .then(response => expect(response.body).to.eql({message: "match with id '-1' not found"}))
    );
  });
});

