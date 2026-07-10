const fs = require('fs');
const path = require('path');

const cwd = path.resolve(__dirname, '..');
const logFile = path.join(cwd, 'tmp-replacements-unsplash-deterministic.json');
const dataFile = path.join(cwd, 'lib', 'mock-data.ts');

if (!fs.existsSync(logFile)) {
  console.error('Log file not found:', logFile);
  process.exit(1);
}

const log = JSON.parse(fs.readFileSync(logFile, 'utf8'));
let file = fs.readFileSync(dataFile, 'utf8');
let changed = false;
for (const r of (log.replaced || [])) {
  if (r.new && r.old) {
    if (file.includes(r.old)) {
      file = file.split(r.old).join(r.new);
      changed = true;
    }
  }
}
if (changed) {
  fs.writeFileSync(dataFile, file, 'utf8');
  console.log('Applied replacements from log to', dataFile);
} else {
  console.log('No replacements applied (no matches found)');
}
