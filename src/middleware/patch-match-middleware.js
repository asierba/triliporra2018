const {MongoClient} = require('mongodb');

function patchMatchMiddleware(req, res) {
  const connectionString = process.env.CONNECTION_STRING;

  const id = Number(req.params.id);
  const body = req.body;

  MongoClient.connect(connectionString, function (err, client) {
    if (err) return;

    const db = client.db();

    db.collection('match').updateOne(
      {id: id},
      {$set: {score: body.score}})
      .then(function (result) {
        client.close();
        const numberOfMatches = result.matchedCount;
        if (numberOfMatches === 0) {
          res.status(404);
          res.send({message: `match with id '${id}' not found`});
          return;
        }
        res.status(204);
        res.end();
      });
  });
}

module.exports = patchMatchMiddleware;
