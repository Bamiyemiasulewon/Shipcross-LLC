const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'lib', 'mock-data.ts');
const file = fs.readFileSync(filePath, 'utf8');
const urls = (file.match(/https:\/\/images\.unsplash\.com\/[^'"\n\r]+/g) || []);
const seen = new Map();
urls.forEach((url) => seen.set(url, (seen.get(url) || 0) + 1));
console.log('total urls:', urls.length);
console.log('unique urls:', seen.size);
const duplicates = [...seen.entries()].filter(([, count]) => count > 1);
console.log('duplicates:', duplicates.length);
if (duplicates.length) {
  duplicates.forEach(([url, count]) => {
    console.log(`${count}x ${url}`);
  });
}
const invalid = urls.filter((url) => !/^https:\/\/images\.unsplash\.com\/photo-[A-Za-z0-9_-]+\?w=800&h=1000&fit=crop$/.test(url));
console.log('invalid urls:', invalid.length);
if (invalid.length) invalid.forEach((url) => console.log(url));
