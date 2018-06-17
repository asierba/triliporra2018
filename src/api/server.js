const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use(express.static('dist'));

const getRootMiddleware = require('./middleware/get-root-middleware');
const getMatchesMiddleware = require('./middleware/get-matches-middleware');
const patchMatchMiddleware = require('./middleware/patch-match-middleware');
const userMiddleware = require('./middleware/get-user-middleware');
const patchUserMatchMiddleware = require('./middleware/patch-user-match-middleware');


app.get('/api', getRootMiddleware);

app.get('/api/match', getMatchesMiddleware);
app.patch('/api/match/:id', patchMatchMiddleware);

app.get('/api/user/:id', userMiddleware);
app.patch('/api/user/:id/match/:matchId', patchUserMatchMiddleware);

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../../dist/index.html')));

const sever = app.listen(process.env.PORT || 3000);

module.exports = sever;
