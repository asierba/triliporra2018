const {MongoClient} = require('mongodb');

function getMatchesMiddleware(req, res) {
  const connectionString = process.env.CONNECTION_STRING;

  MongoClient.connect(connectionString, function (err, client) {
    if (err) throw err;
    const db = client.db();
    db.collection('match').find({})
      .toArray(function (err, result) {
        const response = {entities: result};
        client.close();
        res.send(response);
      });
  });
}

module.exports = getMatchesMiddleware;
