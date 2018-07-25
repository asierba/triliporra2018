const repository = require('../repository');

function toScore(scoreUpdate) {
  const score = {
    home: Number(scoreUpdate.home),
    away: Number(scoreUpdate.away),
  };

  if (!scoreUpdate.penalties) {
    return score;
  }

  const penalties = toScore(scoreUpdate.penalties);

  return Object.assign({}, score, {penalties: penalties});
}

function updateMatchScore(id, scoreUpdate) {
  const score = toScore(scoreUpdate);

  return repository.update('match', {id}, {score});
}

module.exports = updateMatchScore;
