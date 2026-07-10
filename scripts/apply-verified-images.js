const fs = require('fs');
const path = require('path');

// These 11 images passed the previous audit with 200 status
const verifiedWorkingImages = [
  'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=1000&fit=crop',
];

// Plus these 6 newly verified
const newVerifiedImages = [
  'https://images.unsplash.com/photo-1483389127117-b6a2102724ae?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=1000&fit=crop',
];

const allVerifiedImages = [...verifiedWorkingImages, ...newVerifiedImages];

// Hero image - using a proven working one
const heroImage = verifiedWorkingImages[0];

// Read mock-data.ts
const mockDataPath = path.join(__dirname, '../lib/mock-data.ts');
let mockData = fs.readFileSync(mockDataPath, 'utf-8');

// Replace all product images with a rotation of verified images
let imageIndex = 0;
const imageRegex = /images:\s*\[([\s\S]*?)\],/g;

mockData = mockData.replace(imageRegex, (match) => {
  const images = [];
  for (let i = 0; i < 4; i++) {
    images.push(allVerifiedImages[imageIndex % allVerifiedImages.length]);
    imageIndex++;
  }
  
  return `images: [
      '${images[0]}',
      '${images[1]}',
      '${images[2]}',
      '${images[3]}',
    ],`;
});

// Write updated mock-data.ts
fs.writeFileSync(mockDataPath, mockData, 'utf-8');
console.log('Updated lib/mock-data.ts with verified working images.');

// Update Hero.tsx with a verified hero image
const heroPath = path.join(__dirname, '../components/home/Hero.tsx');
let heroContent = fs.readFileSync(heroPath, 'utf-8');
heroContent = heroContent.replace(
  /src="https:\/\/images\.unsplash\.com\/[^"]+"/,
  `src="${heroImage}"`
);
fs.writeFileSync(heroPath, heroContent, 'utf-8');
console.log(`Updated components/home/Hero.tsx with hero image: ${heroImage}`);

console.log(`\nUsing ${allVerifiedImages.length} verified images (${verifiedWorkingImages.length} proven + ${newVerifiedImages.length} newly verified)`);
console.log('Verified images:');
allVerifiedImages.forEach((img, i) => console.log(`  ${i + 1}. ${img}`));
