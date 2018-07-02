import expect from 'expect.js';
import request from 'supertest';
import mockery from 'mockery';
import * as stubRepository from './helpers/stubRepository';
import createTestServer from './helpers/createTestServer';

describe('match', () => {
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

  describe('get', () => {
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


  describe('patch', () => {
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
        .then(() =>
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

    it('should convert to int score when adding it to a match', () => {
      const matches = [{
        id: 1,
        home: "Catalunya",
        away: "Euskal Herria",
      }];
      stubRepository.setMatches(matches);

      const score = { home: "3", away: "6"};

      return request(server)
        .patch('/api/match/1')
        .send({ score: score})
        .expect(204)
        .then(() =>
          stubRepository.getAll('match').then(matches => {
            expect(matches[0].score.home).to.be(3);
            expect(matches[0].score.away).to.be(6);
          }));
    });

    it('should error when match not found', () =>
      request(server)
        .patch('/api/match/-1')
        .send({ score: { home: "3", away: "6"}})
        .expect(404)
        .then(response => expect(response.body).to.eql({message: "match with id '-1' not found"}))
    );

    it('should error when score not defined');
  });
});

