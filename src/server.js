const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.use(express.static('dist'));

let matches = require('./matches.json');

function getAllMatches() {
  const {MongoClient} = require('mongodb');
  const url = 'mongodb://localhost:27017/';
  MongoClient.connect(url, function (err, client) {
    if (err) return;

    const db = client.db('triliporra');
    db.collection('match').find({})
      .toArray(function (err, result) {
        matches = result;
      });
  });
}

getAllMatches();

app.get('/api/match', (req, res) => {
  const response = { entities: matches };
  res.send(response);
});

function updateMatch(id, score) {
  const {MongoClient} = require('mongodb');
  const url = 'mongodb://localhost:27017/';
  MongoClient.connect(url, function (err, client) {
    if (err) return;

    const db = client.db('triliporra');

    db.collection('match').updateOne(
      { id: id },
      { $set: { score: score }})
      .then(function(result) {
        console.log('result',result);
      });
  });
}

app.patch('/api/match/:id', (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;

  const match = matches.find(x => x.id === id);

  if (!match) {
    res.status(404);
    res.send("match not found");
    return;
  }

  match.score = body.score;

  updateMatch(id, body.score);

  getAllMatches();

  res.send(match)
});

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));

app.listen(3000);
