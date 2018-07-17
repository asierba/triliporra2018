const R = require('ramda');
const repository = require('../repository');

async function getUsers() {
  const predictions = await repository.getAll('match-prediction');
  const userIds = R.uniq(predictions.map(x => x.userId));
  return userIds.map(x => ({ id: x }));
}

module.exports = getUsers;
