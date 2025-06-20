const router = require('express').Router();
const bodyParser = require('body-parser');



router.route('/csp-report')
  .get((_, res) => {
    res.send('We will back soon!')
  })
  .post(bodyParser.json({ type: 'application/reports+json' }), (req, res) => {
    console.log(req.body);

    res.send('ok!');
  });

module.exports = { router };
