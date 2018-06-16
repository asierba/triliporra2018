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

function getUser(id) {
  return new Promise(resolve => {
    Promise.all([
      repository.getAll('match-predictions'),
      repository.getAll('match')
    ]).then(results => {
      const [matchPredictions, matches] = results;
      const matchesWithPredictions = matches.map(match => addPrediction(match, matchPredictions, id));

      resolve({
        id: id,
        matches: matchesWithPredictions
      });
    });
  });
}

module.exports = getUser;
