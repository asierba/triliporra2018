const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('dist'));

app.get('/api/match', (req, res) => {
  const matches = require('./matches.json');
  const response = { entities: matches };
  res.send(response);
});

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));

app.listen(3000);
