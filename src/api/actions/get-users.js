const R = require('ramda');
const repository = require('../repository');

async function getUsers() {
  const predictions = await repository.getAll('match-prediction');
  const userIds = R.uniq(predictions.map(x => x.userId));
  const result = userIds.map(x => ({ id: x }));

  return Promise.resolve(result);
}

module.exports = getUsers;
