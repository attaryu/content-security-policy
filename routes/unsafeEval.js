const router = require('express').Router()

const utils = require('../utils');

router.get('/unsafe-eval', (_, res) => {
  res
    .setHeader('Content-Type', 'text/html')
    .setHeader('Content-Security-Policy', `script-src 'self' 'unsafe-inline' 'unsafe-eval'`)
    .send(`
      <h1>Hello World</h1>
      
      <script>alert("oh no!")</script>
      <script>eval(\`alert("'unsafe-eval' activated")\`)</script>
      <script src="http://localhost:${utils.port}/static/script.js"></script>
    `);
});

module.exports = { router };
