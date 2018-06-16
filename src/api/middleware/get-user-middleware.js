const getUser = require('../actions/get-user');

function getUserMiddleware(req, res) {
  getUser(req.params.id)
    .then(userDetails => {
      const body = {
        properties: userDetails,
        actions : [
          {
            "name": "predict match",
            "method": "PATCH",
            "href": "/api/user/5/match"
          }
          ]
      };
      return res.send(body);
    });
}

module.exports = getUserMiddleware;
