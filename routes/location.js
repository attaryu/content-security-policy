const router = require('express').Router();

const utils = require('../utils');

router.get('/location', (_, res) => {
  res
    .setHeader('Content-Type', 'text/html')
    .setHeader('Content-Security-Policy', `img-src 'self' *.unsplash.com`)
    .send(`
      <h1>Hello World</h1>

      <img src="http://localhost:${utils.port}/static/yayaya_saya_suka.jpeg" alt="Hokazono Iroha" style="width: 50vw" />
      
      <img src="https://images.unsplash.com/photo-1606406054222-9bdfbc43d033?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      
      <img src="https://images.pexels.com/photos/4859722/pexels-photo-4859722.jpeg?_gl=1*7s6mhl*_ga*MTU1MTcyODE1NS4xNzUwMjEyMDQ2*_ga_8JE65Q40S6*czE3NTAyMTIwNDUkbzEkZzEkdDE3NTAyMTI1MjAkajU5JGwwJGgw" alt="" />
    `);
});

module.exports = { router };
