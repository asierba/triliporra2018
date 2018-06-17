const insertUserMatchPrediction = require('../actions/insert-user-match-prediction');

function patchUserMatchMiddleware(req, res) {
  const userId = Number(req.params.id);
  const matchId = Number(req.params.matchId);
  const prediction = req.body.prediction;

  insertUserMatchPrediction(userId, matchId, prediction)
    .then(() => res.status(204).end());
}

module.exports = patchUserMatchMiddleware;
