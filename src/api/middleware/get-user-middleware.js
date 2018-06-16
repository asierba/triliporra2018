const getUser = require('../actions/get-user');

function getUserMiddleware(req, res) {
  getUser(req.params.id)
    .then(userDetails => res.send(userDetails));
}

module.exports = getUserMiddleware;
