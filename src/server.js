const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('dist'));

app.get('/api/ping', (req, res) => res.send('pong'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));

app.listen(3000);
