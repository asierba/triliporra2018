const getVersionNumber = require('../actions/get-version-number');

function getRootMiddleware(req, res) {
  const response = {
    version: getVersionNumber(),
    links: [
      {rel: ['matches'], href: '/api/match'},
      {rel: ['users'], href: '/api/user'},
      {rel: ['groups'], href: '/api/group'},
    ]
  };
  res.send(response)
}

module.exports = getRootMiddleware;
