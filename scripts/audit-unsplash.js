const fs = require('fs');
const path = require('path');
const https = require('https');

const filePath = path.resolve(__dirname, '..', 'lib', 'mock-data.ts');
const outBroken = path.resolve(__dirname, '..', 'tmp-broken-unsplash.json');

const file = fs.readFileSync(filePath, 'utf8');
const regex = /https:\/\/images\.unsplash\.com\/photo-[^"'\s)]+/g;
const matches = file.match(regex) || [];
const urls = Array.from(new Set(matches));
console.log(`Found ${matches.length} total matches, ${urls.length} unique URLs.`);

function checkUrl(url, timeout = 8000) {
  return new Promise((resolve) => {
    try {
      const u = new URL(url);
      const options = {
        method: 'HEAD',
        hostname: u.hostname,
        path: u.pathname + (u.search || ''),
        timeout,
        headers: { 'User-Agent': 'node-audit-script/1.0' }
      };

      const req = https.request(options, (res) => {
        const code = res.statusCode || 0;
        if (code >= 400) {
          // try GET as a fallback
          const getReq = https.get(url, { headers: { 'User-Agent': 'node-audit-script/1.0' }, timeout }, (gRes) => {
            resolve({ url, status: gRes.statusCode || 0 });
          }).on('error', (err) => {
            resolve({ url, status: 0, error: err.message });
          });
          getReq.on('timeout', () => { getReq.destroy(); resolve({ url, status: 0, error: 'timeout' }); });
        } else {
          resolve({ url, status: code });
        }
      });

      req.on('error', (err) => resolve({ url, status: 0, error: err.message }));
      req.on('timeout', () => { req.destroy(); resolve({ url, status: 0, error: 'timeout' }); });
      req.end();
    } catch (err) {
      resolve({ url, status: 0, error: err.message });
    }
  });
}

(async () => {
  const concurrency = 10;
  const results = [];
  for (let i = 0; i < urls.length; i += concurrency) {
    const chunk = urls.slice(i, i + concurrency);
    const checks = await Promise.all(chunk.map(u => checkUrl(u)));
    results.push(...checks);
    process.stdout.write(`Checked ${Math.min(i + concurrency, urls.length)}/${urls.length}\r`);
  }
  console.log('\nAudit complete.');

  const broken = results.filter(r => !r.status || r.status >= 400);
  console.log(`OK: ${results.length - broken.length}, Broken: ${broken.length}`);
  if (broken.length) {
    console.log('Broken URLs:');
    broken.forEach(b => console.log(`${b.status || 'ERR'} - ${b.url}${b.error ? ' - ' + b.error : ''}`));
  }

  fs.writeFileSync(outBroken, JSON.stringify({ total: urls.length, results, broken }, null, 2));
  console.log(`Wrote detailed results to ${outBroken}`);
})();
