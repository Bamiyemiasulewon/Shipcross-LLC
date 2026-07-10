const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'node-unsplash-search/1.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject).setTimeout(15000, () => reject(new Error('timeout')));
  });
}

function headUrl(url) {
  return new Promise((resolve) => {
    try {
      const u = new URL(url);
      const opts = { method: 'HEAD', hostname: u.hostname, path: u.pathname + u.search, headers: { 'User-Agent': 'node-unsplash-head/1.0' } };
      const req = https.request(opts, (res) => {
        resolve(res.statusCode);
      });
      req.on('error', () => resolve(0));
      req.setTimeout(10000, () => { req.destroy(); resolve(0); });
      req.end();
    } catch (e) { resolve(0); }
  });
}

function extractImageIdsFromHtml(html) {
  const ids = new Set();
  // look for images.unsplash.com/photo-... patterns
  const re = /https:\/\/images\.unsplash\.com\/photo-[0-9a-fA-F\-]+/g;
  let m;
  while ((m = re.exec(html)) !== null) ids.add(m[0]);
  return Array.from(ids);
}

async function search(term, need=2, blacklist=[]) {
  const q = encodeURIComponent(term);
  const url = `https://unsplash.com/s/photos/${q}`;
  try {
    const page = await fetchPage(url);
    if (page.status !== 200) return { error: 'search-page-failed', status: page.status };
    const ids = extractImageIdsFromHtml(page.body);
    const choices = [];
    for (const base of ids) {
      const candidate = base + '?w=800&h=1000&fit=crop';
      if (blacklist.includes(candidate)) continue;
      const status = await headUrl(candidate);
      if (status === 200) {
        choices.push(candidate);
        if (choices.length >= need) break;
      }
    }
    return { url, found: choices };
  } catch (e) {
    return { error: e.message };
  }
}

(async () => {
  const cwd = path.resolve(__dirname, '..');
  const dataFile = path.join(cwd, 'lib', 'mock-data.ts');
  let existing = '';
  if (fs.existsSync(dataFile)) existing = fs.readFileSync(dataFile, 'utf8');
  const blacklist = [];
  // collect existing images to avoid duplicates
  const idRe = /https:\/\/images\.unsplash\.com\/photo-[0-9a-fA-F\-]+\?w=800&h=1000&fit=crop/g;
  const found = existing.match(idRe) || [];
  found.forEach(s => blacklist.push(s));

  const tasks = [
    { name: 'Wool Blend Cardigan', q: 'wool cardigan black gray cardigan knit outerwear', need:2 },
    { name: 'Satin Top', q: 'satin top blouse gold silver evening wear', need:2 },
    { name: 'Silk Skirt', q: 'silk skirt hot pink black midi skirt drape', need:2 },
    { name: 'Cotton Chinos', q: 'tan chinos navy chinos cotton pants', need:2 },
    { name: 'Canvas Sneakers', q: 'canvas sneakers white black low top', need:2 },
    { name: 'Hero Section', q: 'fashion editorial minimal background luxury banner', need:1 }
  ];

  const results = {};
  for (const t of tasks) {
    console.log('Searching', t.name);
    const r = await search(t.q, t.need, blacklist);
    results[t.name] = r;
    if (Array.isArray(r.found)) r.found.forEach(u => blacklist.push(u));
  }
  const out = path.join(cwd, 'tmp-unsplash-search-results.json');
  fs.writeFileSync(out, JSON.stringify(results, null, 2));
  console.log('Wrote results to', out);
})();
