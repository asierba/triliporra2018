const repository = require('../repository');

const isAHomeWin = match => teamName => match.home === teamName && match.score.home > match.score.away;
const isAAwayWin = match => teamName => match.away === teamName && match.score.home < match.score.away;
const isAAwayLose = match => teamName => match.away === teamName && match.score.home > match.score.away;
const isAHomeLose = match => teamName => match.home === teamName && match.score.home < match.score.away;

const isAWinForTeam = teamName => match => isAHomeWin(match)(teamName) || isAAwayWin(match)(teamName);
const isALoseForTeam = teamName => match => isAHomeLose(match)(teamName) || isAAwayLose(match)(teamName);
const isADrawFroTeam = teamName => match =>
  match.home === teamName && match.score.home === match.score.away
  || match.away === teamName && match.score.home === match.score.away;

const convertToTeamDetails = matches => teamName => {
  const isAWin = isAWinForTeam(teamName);
  const isALose = isALoseForTeam(teamName);
  const isADraw = isADrawFroTeam(teamName);

  const teamMatches = matches.filter(match => match.home === teamName || match.away === teamName);
  const matchesWithScore = teamMatches.filter(match => match.score);

  const wins = matchesWithScore.filter(isAWin).length;
  const loses = matchesWithScore.filter(isALose).length;
  const draws = matchesWithScore.filter(isADraw).length;
  const matchesPlayed = teamMatches.length;
  const points = wins * 3 + draws;
  return {name: teamName, matchesPlayed: matchesPlayed, wins, loses, draws, points};
}

const getTeamsInGroupFromMatches = matches => groupName => {
  const groupMatches = matches.filter(match => match.stage === groupName);
  const toTeamDetails = convertToTeamDetails(groupMatches);

  const teamNames = groupMatches.map(x => x.home).concat(groupMatches.map(x => x.away));
  const uniqueTeamNames = [...new Set(teamNames)];
  return uniqueTeamNames.map(toTeamDetails);
}

function getGroups() {
  return new Promise(resolve => {
    repository.getAll('match').then(matches => {
      const getTeamsInGroup = getTeamsInGroupFromMatches(matches);
      resolve([
        {name: 'A', teams: getTeamsInGroup('Group A')},
        {name: 'B', teams: getTeamsInGroup('Group B')},
        {name: 'C', teams: getTeamsInGroup('Group C')},
        {name: 'D', teams: getTeamsInGroup('Group D')},
        {name: 'E', teams: getTeamsInGroup('Group E')},
        {name: 'F', teams: getTeamsInGroup('Group F')},
        {name: 'G', teams: getTeamsInGroup('Group G')},
        {name: 'H', teams: getTeamsInGroup('Group H')}]);
    });
  });
}

module.exports = getGroups;
