const getVersionNumber = require('../actions/get-version-number');

function getRootMiddleware(req, res) {
  const baseUrl = req.protocol + '://' + req.get('host');
  const response = {
    version: getVersionNumber(),
    links: [
      {rel: ['matches'], href: `${baseUrl}/api/match`},
      {rel: ['users'], href: `${baseUrl}/api/user`},
      {rel: ['groups'], href: `${baseUrl}/api/group`},
    ]
  };
  res.send(response)
}

module.exports = getRootMiddleware;
