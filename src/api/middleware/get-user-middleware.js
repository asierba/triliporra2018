const getUser = require('../actions/get-user');

async function getUserMiddleware(req, res) {
  const userDetails = await getUser(req.params.id);
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
}

module.exports = getUserMiddleware;
