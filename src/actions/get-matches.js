const repository = require('../repository');

function getMatches() {
  return repository.getAll('match');
}

module.exports = getMatches;
