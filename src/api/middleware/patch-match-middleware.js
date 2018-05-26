const updateMatchScore = require('../actions/update-match-score');

function patchMatchMiddleware(req, res) {
  const id = Number(req.params.id);
  const score = req.body.score;

  updateMatchScore(id, score)
    .then(() => res.status(204).end())
    .catch(() => res.status(404).send({message: `match with id '${id}' not found`}));
}

module.exports = patchMatchMiddleware;
