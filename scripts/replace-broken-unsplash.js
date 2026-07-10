const fs = require('fs');
const path = require('path');

const cwd = path.resolve(__dirname, '..');
const brokenFile = path.join(cwd, 'tmp-broken-unsplash.json');
const dataFile = path.join(cwd, 'lib', 'mock-data.ts');
const outLog = path.join(cwd, 'tmp-replacements-unsplash.json');

if (!fs.existsSync(brokenFile)) {
  console.error('Broken list not found:', brokenFile);
  process.exit(1);
}

const brokenData = JSON.parse(fs.readFileSync(brokenFile, 'utf8'));
const brokenUrls = (brokenData.broken || []).map(b => b.url);
if (brokenUrls.length === 0) {
  console.log('No broken URLs to replace.');
  process.exit(0);
}

let file = fs.readFileSync(dataFile, 'utf8');

async function fetchRandomUnsplashSig(sig, timeout = 10000) {
  try {
    const src = `https://source.unsplash.com/random/800x1000?sig=${sig}`;
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), timeout);
    const res = await fetch(src, { redirect: 'follow', signal: controller.signal });
    clearTimeout(t);
    // response.url is the final URL after redirects
    return { ok: (res.status >= 200 && res.status < 400), url: res.url, status: res.status };
  } catch (err) {
    return { ok: false, error: err && err.message ? err.message : String(err) };
  }
}

(async () => {
  const replacements = [];
  // If an existing log exists, load it so we can resume
  if (fs.existsSync(outLog)) {
    try {
      const prev = JSON.parse(fs.readFileSync(outLog, 'utf8'));
      if (Array.isArray(prev.replaced)) replacements.push(...prev.replaced);
    } catch (e) {
      // ignore parse errors, start fresh
    }
  }

  for (let i = 0; i < brokenUrls.length; i++) {
    const oldUrl = brokenUrls[i];
    // skip if already replaced in previous run
    if (replacements.some(r => r.old === oldUrl && r.new)) continue;

    let attempt = 0;
    let newUrl = null;
    while (attempt < 8 && !newUrl) {
      const sig = `${Date.now()}-${i}-${attempt}`;
      process.stdout.write(`Fetching replacement ${i + 1}/${brokenUrls.length} (attempt ${attempt + 1})\r`);
      const r = await fetchRandomUnsplashSig(sig, 12000);
      if (r.ok && r.url) {
        // ensure uniqueness in file
        if (!file.includes(r.url)) {
          newUrl = r.url;
        } else {
          attempt++;
        }
      } else {
        attempt++;
      }
    }

    if (!newUrl) {
      console.error(`Failed to fetch replacement for ${oldUrl}`);
      replacements.push({ old: oldUrl, new: null, error: 'no-replacement-found' });
      // persist progress immediately
      fs.writeFileSync(outLog, JSON.stringify({ replaced: replacements }, null, 2));
      continue;
    }

    const escapedOld = oldUrl.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
    const re = new RegExp(escapedOld, 'g');
    file = file.replace(re, newUrl);
    replacements.push({ old: oldUrl, new: newUrl });

    // persist immediately so partial progress isn't lost
    fs.writeFileSync(dataFile, file, 'utf8');
    fs.writeFileSync(outLog, JSON.stringify({ replaced: replacements }, null, 2));
  }

  console.log('\nReplacements complete. Wrote log to', outLog);
})();
