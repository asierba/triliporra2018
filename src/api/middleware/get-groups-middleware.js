const getGroups = require('../actions/get-groups');

async function getGroupsMiddleware(req, res) {
  res.send({entities: await getGroups()});
}

module.exports = getGroupsMiddleware;
