const insertUserMatchPrediction = require('../actions/insert-user-match-prediction');

async function patchUserMatchMiddleware(req, res) {
  const userId = Number(req.params.id);
  const matchId = Number(req.params.matchId);
  const prediction = req.body.prediction;

  await insertUserMatchPrediction(userId, matchId, prediction)
  res.status(204).end();
}

module.exports = patchUserMatchMiddleware;
