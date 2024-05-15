const express = require('express');
const bodyParser = require('body-parser');
const { router } = require('./router');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  next();
});

app.get('/ping', (req, res) => {// Route for a simple ping-pong response
  res.send({ pong: 'ok' });
});

router.forEach((route) => {
  app.use(route);
});

app.listen(3001, () => {
  console.log('Server started on http://localhost:3001');
});