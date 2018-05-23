const {MongoClient} = require('mongodb');

function updateMatchScore(id, score) {
  return new Promise((resolve, reject) => {
    const connectionString = process.env.CONNECTION_STRING;

    MongoClient.connect(connectionString, function (err, client) {
      client.db().collection('match').updateOne(
        {id: id},
        {$set: {score: score}})
        .then(function (result) {
          client.close();
          const numberOfMatchedItems = result.matchedCount;
          if (numberOfMatchedItems === 0) {
            reject();
          }
          resolve();
        });
    });
  });
}

module.exports = updateMatchScore;
