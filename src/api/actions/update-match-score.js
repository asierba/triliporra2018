const repository = require('../repository');

function updateMatchScore(id, scoreUpdate) {
  const score = {
    home : Number(scoreUpdate.home),
    away : Number(scoreUpdate.away),
  };

  return repository.update('match', {id}, {score});
}

module.exports = updateMatchScore;
