const childProcess = require('child_process');

function getRootMiddleware(req, res) {
  const revision = childProcess
    .execSync('git rev-parse HEAD')
    .toString()
    .trim();

  const response = {
    version: revision,
    links: [{rel: ['matches'], href: '/api/match'}]
  };
  res.send(response)
}

module.exports = getRootMiddleware;
