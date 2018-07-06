const getUsers = require('../actions/get-users');

async function getUsersMiddleware(req, res) {
  res.send({entities: await getUsers()});
}

module.exports = getUsersMiddleware;
