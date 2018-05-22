const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
app.use(bodyParser.json());

app.use(express.static('dist'));

app.get('/api', (req, res) => {
  const revision = require('child_process')
    .execSync('git rev-parse HEAD')
    .toString()
    .trim();

  res.send({
    version : revision,
    links : [ { rel: [ 'matches' ], href: '/api/match' } ]
  })
});

const connectionString = process.env.CONNECTION_STRING;

app.get('/api/match', (req, res) => {
  const {MongoClient} = require('mongodb');
  MongoClient.connect(connectionString, function (err, client) {
    if (err) throw err;
    const db = client.db();
    db.collection('match').find({})
      .toArray(function (err, result) {
        const response = { entities: result };
        client.close();
        res.send(response);
      });
  });
});

app.patch('/api/match/:id', (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;

  const {MongoClient} = require('mongodb');
  MongoClient.connect(connectionString, function (err, client) {
    if (err) return;

    const db = client.db();

    db.collection('match').updateOne(
      {id: id},
      {$set: {score: body.score}})
      .then(function (result) {
        client.close();
        let numberOfMatches = result.n;
        if (!numberOfMatches) {
          res.status(404);
          res.send({message:`match with id '${id}' not found`})
          return;
        }
        res.send(result);
      });
  });

});

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));

const sever = app.listen(3000);

module.exports = sever;
