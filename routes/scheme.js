const router = require('express').Router();

const utils = require('../utils');

router.get('/scheme', (_, res) => {
  res
    .setHeader('Content-Type', 'text/html')
    .setHeader('Content-Security-Policy', `default-src http:`)
    .send(`
      <h1><code>scheme</code> source expression</h1>
      
      <script>alert("this first script never executed")</script>
      <script>alert("this seconds script never executed")</script>
      <script src="http://localhost:${utils.port}/static/script.js"></script>
    `);
});

module.exports = { router };