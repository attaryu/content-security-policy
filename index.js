const express = require('express');
const cors = require('cors');

const nonce = require('./routes/nonce');
const hash = require('./routes/hash');
const scheme = require('./routes/scheme');
const location = require('./routes/location');
const unsafeInline = require('./routes/unsafeInline');
const unsafeEval = require('./routes/unsafeEval');

const strictCSP = require('./routes/strictCSP');
const strictDynamic = require('./routes/strictDynamic');

const utils = require('./utils');

const app = express();

app.use(cors({
  origin: 'same-origin',
  methods: 'GET',
}));

app.use('/static', express.static('public'))

app.get('/', (_, res) => {
  res
    .setHeader('Content-Type', 'text/html')
    .send(`
      <h1>Hello World!</h1>
      <p>This is an example of CSP (or <em>Content-Security-Policy</em>) implementations.</p>
    `);
});

app.use(
  // source expression
  nonce.router,
  hash.router,
  scheme.router,
  location.router,
  unsafeInline.router,
  unsafeEval.router,

  // strict csp
  strictCSP.router,
  strictDynamic.router,
);

app.listen(utils.port, () => {
  console.log(`server running on: http://localhost:${utils.port}`);
});