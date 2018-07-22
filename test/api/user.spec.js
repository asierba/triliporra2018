import expect from 'expect.js';
import * as stubRepository from "./helpers/stubRepository";
import mockery from "mockery";
import request from "supertest";
import createTestServer from './helpers/createTestServer';
import {Hypermedia} from "./helpers/hypermedia";
import {expectToEndWith} from "./helpers/expectExtensions";

describe('user', () => {
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

  describe('single', () => {
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

    it('should have user id', () =>
      request(server)
        .get('/api/user/5')
        .then(response => response.body)
        .then(body => {
          expect(body.properties.id).to.eql(5);
        }));

    it('should have matches', () =>
      request(server)
        .get('/api/user/5')
        .then(response => response.body)
        .then(body => {
          expect(body.properties.matches).to.eql(allMatches);
        }));

    it('should have 0 points when no predictions', () =>
      request(server)
        .get('/api/user/5')
        .then(response => response.body)
        .then(body => {
          expect(body.properties.points).to.eql(0);
        }));

    it('should have action to update match prediction', () =>
      request(server)
        .get('/api/user/5')
        .then(response => response.body)
        .then(body => {
          expect(body.actions).to.eql([
            {
              "name": "predict match",
              "method": "PATCH",
              "href": "/api/user/5/match" // TODO URL
            }
          ]);
        }));

    it('should be able to introduce a match prediction', () =>
      request(server)
        .patch('/api/user/5/match/1')
        .send({ prediction: "away"})
        .expect(204)
        .then(() =>
          stubRepository.getAll('match-prediction').then(matchPredictions =>
            expect(matchPredictions.find(x => x.userId === 5).prediction).to.eql("away"))));


    describe('with match predictions', () => {
      beforeEach(() => {
        const matchPredictions = [
          { matchId: 1, prediction: 'away', userId: 1},
          { matchId: 2, prediction: 'away', userId: 2},
          { matchId: 1, prediction: 'home', userId: 5},
          { matchId: 2, prediction: 'draw', userId: 5},
          { matchId: 3, prediction: 'draw', userId: 5},
        ];
        stubRepository.setPredictions(matchPredictions);
      });

      it('should have match predictions for that user', () =>
        request(server)
          .get('/api/user/5')
          .then(response => response.body.properties.matches)
          .then(matches => {
            expect(matches).to.eql([{
              id: 1,
              date: "2018-06-14T15:00:00Z",
              home: "Catalunya",
              away: "Euskal Herria",
              stage: "fictional match",
              prediction: 'home'
            },
              {
                id: 2,
                date: "2018-06-15T15:00:00Z",
                home: "Wales",
                away: "Italy",
                stage: "a match",
                prediction: 'draw'
              }]);
          }));

      it('should have prediction results (guessed, missed) for matches with scores', () => {
        stubRepository.setMatches([{
          id: 1,
          score: {
            home: 5,
            away: 3
          }
        },
          {
            id: 2,
            score: {
              home: 0,
              away: 1
            }

          },
          {
            id: 3,
          }]);

        return request(server)
          .get('/api/user/5')
          .then(response => response.body.properties.matches)
          .then(matches => matches.map(x => x.result))
          .then(results =>
            expect(results).to.eql(['guessed', 'missed', undefined])
          );
      });

      [
        { score: { home: 5, away: 3}, points: 1}, // 1 guessed
        { score: { home: 0, away: 3}, points: 0}, // 1 missed
      ].forEach(data =>
      it('should have points based in number of guessed and missed predictions', () => {
        stubRepository.setMatches([{
          id: 1,
          score: data.score
        }]);

        return request(server)
          .get('/api/user/5')
          .then(response => response.body)
          .then(body => {
            expect(body.properties.points).to.eql(data.points);
          });
      }));

      it('should have general results', () => {
        stubRepository.setMatches([{
          id: 1,
          score: {
            home: 5,
            away: 3
          }
        },
          {
            id: 2,
            score: {
              home: 1,
              away: 1
            }

          }]);

        return request(server)
          .get('/api/user/5')
          .then(response => response.body)
          .then(body => {
            expect(body.properties['prediction-results']).to.eql({
              guessed: 2,
              missed: 0
            });
          });
      });


      it('should be able to update a match prediction', () =>
        request(server)
          .patch('/api/user/5/match/1')
          .send({ prediction: "away"})
          .expect(204)
          .then(() =>
            stubRepository.getAll('match-prediction').then(matchPredictions =>
              expect(matchPredictions.find(x => x.userId === 5).prediction).to.eql("away"))));



    });
  });


  describe('all', () => {
    beforeEach(() => {
      const matchPredictions = [
        { matchId: 1, prediction: 'away', userId: 1},
        { matchId: 2, prediction: 'away', userId: 2},
        { matchId: 1, prediction: 'home', userId: 3},
        { matchId: 2, prediction: 'draw', userId: 3},
      ];
      stubRepository.setPredictions(matchPredictions);
    });

    it('should return all user ids from users with match prediction', () =>
      request(server)
        .get('/api/user/')
        .expect(200)
        .then(response => response.body.entities)
        .then(users => users.map(u => u.id))
        .then(ids =>
          expect(ids).to.eql([1,2,3])
        ));

    it('should have points per user', () =>
      request(server)
        .get('/api/user/')
        .expect(200)
        .then(response => response.body.entities)
        .then(users => users.map(u => u.points))
        .then(points =>
          expect(points).to.eql([0,0,0])
        ));

    it('should return links to user resource', () =>
      request(server)
        .get('/api/user/')
        .expect(200)
        .then(response => response.body.entities)
        .then(users =>
          users.forEach(user => {
            const userEntity = new Hypermedia(user)
            const href = userEntity.getHref('self');
            expectToEndWith(href, `/api/user/${user.id}`);
          })
        ));

  });

});

