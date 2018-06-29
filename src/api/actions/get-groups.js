const repository = require('../repository');
const R = require('ramda');

function isHomeWin(match) {
  return match.score.home > match.score.away;
}
function isAwayWin(match) {
  return match.score.home < match.score.away;
}
function isDraw(match) {
  return match.score.home === match.score.away;
}

function teamPlaysHome(match, teamName) {
  return match.home === teamName;
}

function teamPlaysAway(match, teamName) {
  return match.away === teamName;
}

function isWinForTeam(teamName, match) {
  return teamPlaysHome(match, teamName) && isHomeWin(match)
    || teamPlaysAway(match, teamName) && isAwayWin(match);
}

function isLoseForTeam(teamName, match) {
  return teamPlaysHome(match, teamName) && isAwayWin(match)
    || teamPlaysAway(match, teamName) && isHomeWin(match);
}

function sumGoalsScoredForTeam(teamName, result, match) {
  if (match.home === teamName)
    return result + match.score.home;
  if (match.away === teamName)
    return result + match.score.away;
}

function sumGoalsAgainstForTeam(teamName, result, match) {
  if(match.home === teamName)
    return result + match.score.away;
  if(match.away === teamName)
    return result + match.score.home;
}

function convertToTeamDetails(matches, teamName) {
  const isAWin = R.curry(isWinForTeam)(teamName);
  const isALose = R.curry(isLoseForTeam)(teamName);
  const sumGoalsScored = R.curry(sumGoalsScoredForTeam)(teamName);
  const sumGoalsAgainst = R.curry(sumGoalsAgainstForTeam)(teamName);

  const matchesWithScore = matches
    .filter(match => teamPlaysHome(match, teamName) || teamPlaysAway(match, teamName))
    .filter(match => match.score);

  const matchesPlayed = matchesWithScore.length;
  const wins = matchesWithScore.filter(isAWin).length;
  const loses = matchesWithScore.filter(isALose).length;
  const draws = matchesWithScore.filter(isDraw).length;
  const points = wins * 3 + draws;
  const goalsScored = matchesWithScore.reduce(sumGoalsScored, 0);
  const goalsAgainst = matchesWithScore.reduce(sumGoalsAgainst,0);
  const goalDifference = goalsScored - goalsAgainst;
  return {name: teamName, matchesPlayed, wins, loses, draws, points, goalsScored, goalsAgainst, goalDifference};
}

const byPointsDesc = (match, otherMatch) => otherMatch.points - match.points;
const byGoalDifference = (match, otherMatch) => otherMatch.goalDifference - match.goalDifference;
const byGoalsScored = (match, otherMatch) => otherMatch.goalsScored - match.goalsScored;

const getTeamsInGroupFromMatches = matches => groupName => {
  const groupMatches = matches.filter(match => match.stage === groupName);
  const toTeamDetails = R.curry(convertToTeamDetails)(groupMatches);

  const teamNames = groupMatches.map(x => x.home).concat(groupMatches.map(x => x.away));
  const uniqueTeamNames = [...new Set(teamNames)];

  return uniqueTeamNames
    .map(toTeamDetails)
    .sort(byPointsDesc)
    .sort(byGoalDifference)
    .sort(byGoalsScored);
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
