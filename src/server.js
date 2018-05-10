const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.use(express.static('dist'));

const matches = require('./matches.json');
const matchesWithResults = matches.map(x => Object.assign(x, { score: { home: 0, away: 0}}));

app.get('/api/match', (req, res) => {
  const response = { entities: matches };
  res.send(response);
});

app.patch('/api/match/:id', (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;

  const match = matchesWithResults.find(x => x.id === id);

  if (!match) {
    res.status(404);
    res.send("match not found");
    return;
  }

  match.score = body.score;

  res.send(match)
});

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));

app.listen(3000);
