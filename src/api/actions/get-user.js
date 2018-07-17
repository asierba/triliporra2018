const repository = require('../repository');

function addPrediction(match, matchPredictions, userId) {
  const matchPrediction = matchPredictions.find(x => x.matchId === match.id && x.userId == userId);

  if (matchPrediction) {
    return Object.assign({}, match, {
      prediction: matchPrediction.prediction
    });
  }

  return match;
}

function getScoreResult(score) {
  if (score.home > score.away) {
    return "home";
  }
  if (score.home < score.away) {
    return "away";
  }
  return "draw";
}

function addResult(match) {
  if (!match.score) return match;

  const result = getScoreResult(match.score) === match.prediction ? 'guessed' : 'missed';
  return Object.assign({}, match, { result });
}

async function getUser(id) {
  const matchPredictions = await repository.getAll('match-prediction');
  const allMatches = await repository.getAll('match');
  const matches = allMatches
    .map(match => addPrediction(match, matchPredictions, id))
    .map(match => addResult(match));
  const user = {
    id,
    matches
  };
  return user;
}

module.exports = getUser;
