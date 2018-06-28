import expect from 'expect.js';
import * as stubRepository from "./helpers/stubRepository";
import mockery from "mockery";
import request from "supertest";
import createTestServer from './helpers/createTestServer';

describe('group', () => {
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

  it('should return groups from A to H', () =>
    request(server)
      .get('/api/group')
      .expect(200)
      .then(response => response.body)
      .then(body => body.entities.map(entity => entity.name))
      .then(groupNames =>
        expect(groupNames).to.eql(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'])));

  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].forEach(groupName => {
  it('should return teams inside group', () => {
    stubRepository.setMatches([{
      home: "Team 1",
      away: "Team 2",
      stage: `Group ${groupName}`
    },
      {
        home: "Team 3",
        away: "Team 4",
        stage: `Group ${groupName}`
      }
    ]);

    return request(server)
      .get('/api/group')
      .then(response => response.body)
      .then(body => body.entities.find(x => x.name === groupName))
      .then(group => group.teams.map(x => x.name))
      .then(teamNames =>
        expect(teamNames).to.eql(['Team 1', 'Team 3', 'Team 2', 'Team 4']));
  })
  })
  ;

  it('should return unique teams', () => {
    stubRepository.setMatches([{
      home: "Team 1",
      away: "Team 2",
      stage: "Group A"
    },
      {
        home: "Team 2",
        away: "Team 1",
        stage: "Group A"
      }
    ]);

    return request(server)
      .get('/api/group')
      .then(response => response.body)
      .then(body => body.entities.find(x => x.name === 'A'))
      .then(group => group.teams.map(x => x.name))
      .then(teamNames =>
        expect(teamNames).to.eql(['Team 1', 'Team 2']));
  });

  it('should return number of match played for each team with a score', () => {
    stubRepository.setMatches([{
      home: "Team 1",
      away: "Team 2",
      stage: "Group A"
    },
      {
        home: "Team 1",
        away: "Team 3",
        stage: "Group A",
        score: { home: 1, away: 2 }
      }
    ]);

    return request(server)
      .get('/api/group')
      .then(response => response.body)
      .then(body => body.entities.find(x => x.name === 'A').teams)
      .then(teams => {
        const teamNames = teams.map(team => team.name);
        expect(teamNames).to.eql(['Team 1', 'Team 2', 'Team 3']);
        const matchesPlayed = teams.map(team => team.matchesPlayed);
        expect(matchesPlayed).to.eql([1, 0, 1]);
      });
  });

  it('should return number of wins and loses for each team', () => {
    stubRepository.setMatches([{
      home: "Team 1",
      away: "Team 2",
      stage: "Group A",
      score : { home: 2, away: 0 }
    },
      {
        home: "Team 2",
        away: "Team 1",
        stage: "Group A",
        score : { home: 1, away: 2 }
      }
    ]);

    return request(server)
      .get('/api/group')
      .then(response => response.body)
      .then(body => body.entities.find(x => x.name === 'A').teams)
      .then(teams => {
        const teamNames = teams.map(team => team.name);
        expect(teamNames).to.eql(['Team 1', 'Team 2']);
        const teamWins = teams.map(team => team.wins);
        expect(teamWins).to.eql([2, 0]);
        const teamLoses = teams.map(team => team.loses);
        expect(teamLoses).to.eql([0, 2]);
      });
  });

  it('should return number of draws for each team', () => {
    stubRepository.setMatches([{
        home: "Team 1",
        away: "Team 2",
        stage: "Group A",
        score : { home: 0, away: 0 }
      },
      {
        home: "Team 2",
        away: "Team 1",
        stage: "Group A",
        score : { home: 2, away: 2 }
      }
    ]);

    return request(server)
      .get('/api/group')
      .then(response => response.body)
      .then(body => body.entities.find(x => x.name === 'A').teams)
      .then(teams => {
        const teamNames = teams.map(team => team.name);
        expect(teamNames).to.eql(['Team 1', 'Team 2']);
        const teamDraws = teams.map(team => team.draws);
        expect(teamDraws).to.eql([2, 2]);
      });
  });

  it('should return points for each team', () => {
    stubRepository.setMatches([{
      home: "Team 1",
      away: "Team 2",
      stage: "Group A",
      score : { home: 1, away: 0 }
    },
      {
        home: "Team 2",
        away: "Team 1",
        stage: "Group A",
        score : { home: 2, away: 2 }
      }
    ]);

    return request(server)
      .get('/api/group')
      .then(response => response.body)
      .then(body => body.entities.find(x => x.name === 'A').teams)
      .then(teams => {
        const teamNames = teams.map(team => team.name);
        expect(teamNames).to.eql(['Team 1', 'Team 2']);
        const teamPoints = teams.map(team => team.points);
        expect(teamPoints).to.eql([3+1, 1]);
      });
  });

  it('should return GF and GA');
  it('should return teams in right order');
});
