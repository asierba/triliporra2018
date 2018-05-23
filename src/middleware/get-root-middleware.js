const getVersionNumber = require('../actions/get-version-number');

function getRootMiddleware(req, res) {
  const response = {
    version: getVersionNumber(),
    links: [{rel: ['matches'], href: '/api/match'}]
  };
  res.send(response)
}

module.exports = getRootMiddleware;
