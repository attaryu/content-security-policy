const router = require('express').Router();
const fs = require('node:fs/promises');

router.get('/', async (_, res) => {
  const fileList = await fs.readdir('./routes', { recursive: false });
  const processedFilelist = fileList
    .filter((filename) => filename !== 'index.js')
    .map((filename) => filename.slice(0, filename.length - 3)) // example: filename.js -> filename
    .sort()
    .map((name) => `<li><a href="/${name}">${name}</a></li>`)
    .join('\n');

  res
    .setHeader('Content-Type', 'text/html')
    .send(`
      <h1>Hello World!</h1>
      <p>This is an example of CSP (or <em>Content-Security-Policy</em>) implementations.</p>
      <p>Don't just see the site, go deep down the code!</p>

      <ul>${processedFilelist}</ul>
    `);
});

module.exports = { router };