const {MongoClient} = require('mongodb');

function getMatches() {
  return new Promise((resolve => {
    const connectionString = process.env.CONNECTION_STRING;

    MongoClient.connect(connectionString, function (err, client) {
      client.db().collection('match').find({})
        .toArray(function (err, result) {
          client.close();
          resolve(result);
        });
    });
  }));
}

module.exports = getMatches;
