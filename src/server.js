const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
app.use(bodyParser.json());

app.use(express.static('dist'));

const connectionString = process.env.CONNECTION_STRING;

app.get('/api/match', (req, res) => {
  const {MongoClient} = require('mongodb');
  MongoClient.connect(connectionString, function (err, client) {
    if (err) throw err;
    const db = client.db('triliporra');
    db.collection('match').find({})
      .toArray(function (err, result) {
        const response = { entities: result };
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

    const db = client.db('triliporra');

    db.collection('match').updateOne(
      {id: id},
      {$set: {score: body.score}})
      .then(function () {
        res.send('OK');
      });
  });

});

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));

app.listen(3000);
