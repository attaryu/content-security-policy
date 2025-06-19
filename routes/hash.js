const file = require('node:fs/promises');
const crypto = require('crypto');
const router = require('express').Router();

const utils = require('../utils');

router.get('/hash', async (_, res) => {
  const algorithm = 'sha512';

  const script1 = `alert("it's trusted script")`;

  const hashedScript1 = `${algorithm}-` + crypto
    .createHash(algorithm)
    .update(script1)
    .digest()
    .toString('base64');

  const script2 = await file.readFile('./public/script.js', { flag: 'r' });

  const hashedScript2 = `${algorithm}-` + crypto
    .createHash(algorithm)
    .update(script2.toString())
    .digest()
    .toString('base64');

  res
    .setHeader('Content-Type', 'text/html')
    .setHeader(
      'Content-Security-Policy',
      `script-src '${hashedScript1}' '${hashedScript2}'`,
    )
    .send(`
      <h1><code>hash</code> source expression</h1>
      
      <script>${script1}</script>
      <script>alert("this script never executed")</script>
      <script src="http://localhost:${utils.port}/static/script.js" integrity="${hashedScript2}"></script>
    `);
});

module.exports = { router }
