const R = require('ramda');
const repository = require('../repository');
const getUser = require('./get-user');

async function getUsers() {
  const predictions = await repository.getAll('match-prediction');
  const userIds = R.uniq(predictions.map(x => x.userId));
  const users = userIds.map(async id => await getUser(id));
  return await Promise.all(users);
}

module.exports = getUsers;
