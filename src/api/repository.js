const {MongoClient} = require('mongodb');

function getAll(entityName) {
  return new Promise((resolve => {
    const connectionString = process.env.CONNECTION_STRING;

    MongoClient.connect(connectionString, function (err, client) {
      client.db().collection(entityName).find({})
        .toArray(function (err, result) {
          client.close();
          resolve(result);
        });
    });
  }));
}

function update(entityName, query, dataToUpdate, upsert=false) {
  return new Promise((resolve, reject) => {
    const connectionString = process.env.CONNECTION_STRING;

    MongoClient.connect(connectionString, function (err, client) {
      client.db().collection(entityName).updateOne(
        query,
        {$set: dataToUpdate},
        {upsert:upsert})
        .then(function (result) {
          client.close();
          const numberOfMatchedItems = result.matchedCount;
          if (numberOfMatchedItems === 0) {
            reject('numberOfMatchedItems 0');
          }
          resolve();
        });
    });
  });
}

module.exports = {
  getAll,
  update
};
