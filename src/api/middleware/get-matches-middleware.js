const getMatches = require('../actions/get-matches');

function getMatchesMiddleware(req, res) {
  getMatches().then(matches => res.send({entities: matches}));
}

module.exports = getMatchesMiddleware;
