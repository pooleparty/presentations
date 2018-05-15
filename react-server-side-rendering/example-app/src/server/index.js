const path = require('path');
const express = require('express');
const template = require('./template');

const app = express();

// Serving static files
app.use('/public', express.static(path.resolve(__dirname, '../../public')));

// our apps data model
const apps = require('../../public/data/data.json');

const initialState = {
  apps,
};

// SSR function import
const renderer = require('./renderer');

// server rendered home page
app.get('/', (req, res) => {
  const content = renderer(initialState);
  const response = template('Server Rendered Page', initialState, content);
  res.send(response);
});

// Pure client side rendered page
app.get('/client', (req, res) => {
  const response = template('Client Side Rendered page');
  res.send(response);
});

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
