const express = require('express');
const cors = require('cors');
const router = require('./router.js');
const handlerError = require('./handlerError/handler');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});
app.get('/user', (req, res) => {
  res.status(200).send({ name: 'Test' });
});
app.use(router);
app.use(handlerError);

module.exports = app;
