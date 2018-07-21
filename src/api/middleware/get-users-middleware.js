const getUsers = require('../actions/get-users');

async function getUsersMiddleware(req, res) {
  const baseUrl = req.protocol + '://' + req.get('host');

  const users = await getUsers();
  const entities = users.map(user => {
    return Object.assign({}, user, {
      "links": [
        {
          "rel": [
            "self"
          ],
          "href": `${baseUrl}/api/user/${user.id}`
        }]
    });
  });
  res.send({entities: entities});
}

module.exports = getUsersMiddleware;
