const getGroups = require('../actions/get-groups');

function getGroupsMiddleware(req, res) {
  getGroups().then(groups => res.send({entities: groups}));
}

module.exports = getGroupsMiddleware;
