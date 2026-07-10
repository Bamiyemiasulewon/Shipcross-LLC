const https = require('https');
const urls = [
  'https://images.unsplash.com/photo-1512436970700-3f6bac1f0c48?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1483181957632-6b3c2b8b5490?w=800&h=600&fit=crop',
];
urls.forEach(url => {
  https.get(url, { method: 'HEAD' }, res => {
    console.log(url, res.statusCode);
  }).on('error', err => {
    console.log(url, 'ERR', err.message);
  });
});
