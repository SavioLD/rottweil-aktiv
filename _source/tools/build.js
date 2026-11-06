#!/usr/bin/env node
/*
 * Build für rottweil-aktiv.de
 * ---------------------------------------------------------------
 * Erzeugt aus den Quelldateien in _source/ die ausgelieferten,
 * "flachen" HTML-Seiten im Repo-Root:
 *   - css/style.css wird in jede Seite als <style> eingebettet
 *   - js/*.js werden als <script> eingebettet
 *   - Bildpfade assets/img/... werden auf den Root abgebildet
 *     (alle Bilder/PDFs liegen direkt im Repo-Root)
 *
 * Aufruf (aus dem Repo-Root):   node _source/tools/build.js
 * Alternativ in anderen Ordner: node _source/tools/build.js ./dist
 *
 * Benötigt nur Node.js (>= 14), keine Abhängigkeiten.
 */
const fs = require('fs');
const path = require('path');

const SRC = path.resolve(__dirname, '..');                     // _source/
const OUT = process.argv[2] ? path.resolve(process.argv[2])    // Ziel
                            : path.resolve(SRC, '..');         // Repo-Root
fs.mkdirSync(OUT, { recursive: true });

const css = fs.readFileSync(path.join(SRC, 'css/style.css'), 'utf8');

function flatten(h) {
  h = h.split('assets/logo.svg').join('cropped-ghv_header-7-2-1.png');
  h = h.split('assets/img/rottweilcard.jpg').join('rottweilcard.png');
  h = h.split('assets/img/team/').join('');
  h = h.split('assets/img/').join('');
  return h;
}

const pages = fs.readdirSync(SRC).filter(f => f.endsWith('.html'));
for (const f of pages) {
  let h = fs.readFileSync(path.join(SRC, f), 'utf8');
  h = h.replace('<link rel="stylesheet" href="css/style.css?v=1" />',
                () => '<style>\n' + css + '\n</style>');
  h = flatten(h);
  h = h.replace(/<script src="js\/([\w-]+)\.js"><\/script>/g, (m, name) => {
    let js = fs.readFileSync(path.join(SRC, 'js', name + '.js'), 'utf8');
    if (name === 'team') js = js.split('assets/img/team/').join('');
    return '<script>\n' + js + '\n</script>';
  });
  fs.writeFileSync(path.join(OUT, f), h);
}
for (const f of ['robots.txt', 'sitemap.xml']) {
  if (fs.existsSync(path.join(SRC, f))) fs.copyFileSync(path.join(SRC, f), path.join(OUT, f));
}
console.log(`Fertig: ${pages.length} Seiten nach ${OUT} geschrieben.`);
