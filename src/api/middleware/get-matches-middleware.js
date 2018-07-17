const getMatches = require('../actions/get-matches');

async function getMatchesMiddleware(req, res) {
  res.send({entities: await getMatches()});
}

module.exports = getMatchesMiddleware;
