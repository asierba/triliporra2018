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

function update(entityName, id, dataToUpdate) {
  return new Promise((resolve, reject) => {
    const connectionString = process.env.CONNECTION_STRING;

    MongoClient.connect(connectionString, function (err, client) {
      client.db().collection(entityName).updateOne(
        {id: id},
        {$set: dataToUpdate})
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

module.exports = {
  getAll,
  update
};
