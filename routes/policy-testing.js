const router = require('express').Router();

router.get('/policy-testing', (_, res) => {
  res
    .setHeader('Content-Type', 'text/html')
    // serving over https on localhost, i use apache in laragon
    .setHeader('Reporting-Endpoints', `csp-endpoint="https://content-security-policy.test/csp-report"`)
    .setHeader('Content-Security-Policy-Report-Only', `script-src 'self'; report-to csp-endpoint`)
    .send(`
      <h1>Policy Testing</h1>
      <p>Look at the browser console</p>

      <script>alert('never executed!')</script>
    `);
})

module.exports = { router };
