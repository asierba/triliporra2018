const repository = require('../repository');

function updateMatchScore(id, score) {
  return repository.update('match', id, {score: score});
}

module.exports = updateMatchScore;
