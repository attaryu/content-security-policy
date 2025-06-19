const router = require('express').Router();

const utils = require('../utils');

router.get('/unsafe-inline', (_, res) => {
  res
    .setHeader('Content-Type', 'text/html')
    .setHeader('Content-Security-Policy', `script-src 'self' 'unsafe-inline'`)
    .send(`
      <h1><code>unsafe-inline</code> source expression</h1>
      
      <script>alert("oh no!")</script>
      <script>alert("'unsafe-inline' activated")</script>
      <script src="http://localhost:${utils.port}/static/script.js"></script>
    `);
})

module.exports = { router };
