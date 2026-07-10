const fs = require('fs');
const path = require('path');

const cwd = path.resolve(__dirname, '..');
const brokenFile = path.join(cwd, 'tmp-broken-unsplash.json');
const dataFile = path.join(cwd, 'lib', 'mock-data.ts');
const outLog = path.join(cwd, 'tmp-replacements-unsplash-deterministic.json');

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

// Curated list of known-good Unsplash image URLs (from audit results + extras)
const goodPool = [
  'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=1000&fit=crop'
];

const replacements = [];
let idx = 0;
for (let i = 0; i < brokenUrls.length; i++) {
  const oldUrl = brokenUrls[i];
  // choose next good url (rotate)
  const newUrl = goodPool[idx % goodPool.length];
  idx++;
  const escapedOld = oldUrl.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
  const re = new RegExp(escapedOld, 'g');
  if (file.includes(oldUrl)) {
    file = file.replace(re, newUrl);
    replacements.push({ old: oldUrl, new: newUrl });
  } else {
    replacements.push({ old: oldUrl, new: null, error: 'not-found-in-file' });
  }
}

fs.writeFileSync(dataFile, file, 'utf8');
fs.writeFileSync(outLog, JSON.stringify({ replaced: replacements }, null, 2));
console.log('Deterministic replacements applied. Wrote log to', outLog);
