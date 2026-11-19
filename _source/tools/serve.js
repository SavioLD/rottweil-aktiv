#!/usr/bin/env node
/*
 * Lokaler Testserver für rottweil-aktiv.de
 * ---------------------------------------------------------------
 * Liefert den Repo-Root so aus, wie GitHub Pages es tut.
 *
 * Aufruf (aus dem Repo-Root):   node _source/tools/serve.js
 * Dann im Browser:              http://localhost:8000
 * Anderer Port:                 node _source/tools/serve.js 8080
 * Beenden:                      Strg + C
 *
 * Benötigt nur Node.js, keine Abhängigkeiten.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const PORT = Number(process.argv[2]) || 8000;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.avif': 'image/avif', '.webp': 'image/webp',
  '.pdf': 'application/pdf', '.ico': 'image/x-icon'
};

http.createServer(function (req, res) {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const file = path.join(ROOT, p);
  // wie GitHub Pages: nichts außerhalb des Roots, keine _-/.-Ordner
  const rel = path.relative(ROOT, file);
  const hidden = rel.startsWith('..') || rel.split(path.sep).some(function (s) { return s[0] === '_' || s[0] === '.'; });
  fs.readFile(file, function (err, data) {
    if (err || hidden) {
      res.writeHead(404, { 'Content-Type': TYPES['.html'] });
      return res.end(fs.readFileSync(path.join(ROOT, '404.html')));
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, function () {
  console.log('Testserver läuft: http://localhost:' + PORT + '  (beenden mit Strg + C)');
});
