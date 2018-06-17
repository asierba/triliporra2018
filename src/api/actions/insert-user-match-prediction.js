const repository = require('../repository');

function insertUserMatchPrediction(userId, matchId, prediction) {
  const upsert = true;
  return repository.update('match-prediction',  {userId, matchId}, {prediction: prediction}, upsert);
}

module.exports = insertUserMatchPrediction;
