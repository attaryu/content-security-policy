const router = require('express').Router();
const crypto = require('node:crypto');

const utils = require('../utils');

router.get('/nonce', (_, res) => {
  const nonces = crypto.randomUUID();

  res
    .setHeader('Content-Type', 'text/html')
    .setHeader('Content-Security-Policy', `script-src 'nonce-${nonces}'`)
    .send(`
      <h1>Hello World</h1>
      
      <script nonce="${nonces}">alert("it's trusted script")</script>
      <script nonce="wkwkwk">alert("this script never executed")</script>
      <script nonce="${nonces}" src="http://localhost:${utils.port}/static/script.js"></script>
    `);
});

module.exports = {
  router
};
