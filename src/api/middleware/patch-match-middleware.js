const updateMatchScore = require('../actions/update-match-score');

async function patchMatchMiddleware(req, res) {
  const id = Number(req.params.id);
  const score = req.body.score;

  try {
    await updateMatchScore(id, score);
    res.status(204).end();
  }
  catch (e) {
    res.status(404).send({message: `match with id '${id}' not found`});
  }
}

module.exports = patchMatchMiddleware;
