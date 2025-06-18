const express = require('express');
const cors = require('cors');
const crypto = require('node:crypto');
const file = require('node:fs/promises')

const app = express();
const port = 3000;

app.use(cors({
  origin: '*',
  credentials: true,
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

app.get('/nonce', (_, res) => {
  const nonces = crypto.randomUUID();

  res
    .setHeader('Content-Type', 'text/html')
    .setHeader('Content-Security-Policy', `script-src 'nonce-${nonces}'`)
    .send(`
      <h1>Hello World</h1>
      
      <script nonce="${nonces}">alert("it's trusted script")</script>
      <script nonce="wkwkwk">alert("this script never executed")</script>
      <script nonce="${nonces}" src="http://localhost:${port}/static/script.js"></script>
    `);
});

app.get('/hash', async (_, res) => {
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
      <h1>Hello World</h1>
      
      <script>${script1}</script>
      <script>alert("this script never executed")</script>
      <script src="http://localhost:${port}/static/script.js" integrity="${hashedScript2}"></script>
    `);
});

app.get('/scheme', (_, res) => {
  res
    .setHeader('Content-Type', 'text/html')
    .setHeader('Content-Security-Policy', `default-src http:`)
    .send(`
      <h1>Hello World</h1>
      
      <script>alert("this first script never executed")</script>
      <script>alert("this seconds script never executed")</script>
      <script src="http://localhost:${port}/static/script.js"></script>
    `);
});

app.get('/location', (_, res) => {
  res
    .setHeader('Content-Type', 'text/html')
    .setHeader('Content-Security-Policy', `img-src 'self' *.unsplash.com`)
    .send(`
      <h1>Hello World</h1>

      <img src="http://localhost:${port}/static/yayaya_saya_suka.jpeg" alt="Hokazono Iroha" style="width: 50vw" />
      
      <img src="https://images.unsplash.com/photo-1606406054222-9bdfbc43d033?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      
      <img src="https://images.pexels.com/photos/4859722/pexels-photo-4859722.jpeg?_gl=1*7s6mhl*_ga*MTU1MTcyODE1NS4xNzUwMjEyMDQ2*_ga_8JE65Q40S6*czE3NTAyMTIwNDUkbzEkZzEkdDE3NTAyMTI1MjAkajU5JGwwJGgw" alt="" />
    `);
});

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
