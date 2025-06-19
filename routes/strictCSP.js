const router = require('express').Router();
const fs = require('node:fs/promises');
const crypto = require('node:crypto');

const utils = require('../utils');

router.get('/strict-csp', async (_, res) => {
  const nonce = crypto.randomUUID();
  const hashAlgorithm = 'sha256';

  const script = await fs.readFile('./public/script.js', { flag: 'r' });
  const integrity = `${hashAlgorithm}-` + crypto
    .createHash(hashAlgorithm)
    .update(script.toString())
    .digest()
    .toString('base64');

  res
    .setHeader('Content-Type', 'text/html')
    .setHeader('Content-Security-Policy', `script-src 'nonce-${nonce}' '${integrity}'; object-src 'none'; base-uri 'none';`)
    .send(`
      <h1>Hello World</h1>
      
      <script nonce="${nonce}">alert("it's trusted script")</script>
      <script nonce="wkwkwk">alert("this script never executed")</script>
      <script integrity="${integrity}" src="http://localhost:${utils.port}/static/script.js"></script>
        
    `)
});

module.exports = { router };
