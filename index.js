const express = require('express');
const cors = require('cors');

const root = require('./routes');

const nonce = require('./routes/nonce');
const hash = require('./routes/hash');
const scheme = require('./routes/scheme');
const location = require('./routes/location');
const unsafeInline = require('./routes/unsafe-inline');
const unsafeEval = require('./routes/unsafe-eval');

const strictCSP = require('./routes/strict-csp');
const strictDynamic = require('./routes/strict-dynamic');

const policyTesting = require('./routes/policy-testing');
const CSPReport = require('./routes/csp-report');

const utils = require('./utils');

const app = express();

app.use(cors({
  origin: 'same-origin',
  methods: ['GET', 'POST'],
}));

app.use('/static', express.static('public'))

app.use(
  // root
  root.router,
  
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

  // policy testing
  policyTesting.router,
  CSPReport.router,
);

app.listen(utils.port, () => {
  console.log(`server running on: http://localhost:${utils.port}`);
});