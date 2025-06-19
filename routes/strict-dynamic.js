const router = require('express').Router();
const fs = require('node:fs/promises');
const crypto = require('node:crypto');

const utils = require('../utils');

router.get('/strict-dynamic', async (_, res) => {
  const hashAlgorithm = 'sha256';

  const script = await fs.readFile('./public/strict-dynamic/main.js', { flag: 'r' });
  const integrity = `${hashAlgorithm}-` + crypto
    .createHash(hashAlgorithm)
    .update(script.toString())
    .digest()
    .toString('base64');

  res
    .setHeader('Content-Type', 'text/html')
    .setHeader('Content-Security-Policy', `script-src '${integrity}' 'strict-dynamic'`)
    .send(`
      <html>
        <head>
          <script
            src="http://localhost:${utils.port}/static/strict-dynamic/main.js"
            integrity="${integrity}"
          ></script>
        </head>

        <body>
          <h1><code>strict-dynamic</code> source expression</h1>
        </body>
      </html>
    `)
});

module.exports = { router };
