const express = require('express');
const app = express();

app.use(express.static('dist'));

app.get('/api/ping', (req, res) => res.send('pong'));
app.listen(3000);
