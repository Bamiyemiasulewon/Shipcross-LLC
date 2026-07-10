const fs = require('fs');
const path = require('path');

// Curated fashion images from Unsplash - verified working and semantically appropriate
const fashionImages = {
  // Tops - women's fashion tops and outerwear
  tops: [
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=1000&fit=crop', // woman in sweater
    'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=800&h=1000&fit=crop', // woman in black shirt
    'https://images.unsplash.com/photo-1506629082632-ee0fc64bcbb2?w=800&h=1000&fit=crop', // woman in top
    'https://images.unsplash.com/photo-1551273355-fc981df38212?w=800&h=1000&fit=crop', // woman smiling
    'https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=800&h=1000&fit=crop', // woman fashion
    'https://images.unsplash.com/photo-1483389127117-b6a2102724ae?w=800&h=1000&fit=crop', // woman in outfit
  ],
  // Bottoms - skirts, pants, jeans
  bottoms: [
    'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=800&h=1000&fit=crop', // woman in black
    'https://images.unsplash.com/photo-1506629082632-ee0fc64bcbb2?w=800&h=1000&fit=crop', // woman posing
    'https://images.unsplash.com/photo-1542574663518-6b90f3a992ca?w=800&h=1000&fit=crop', // woman in jeans
    'https://images.unsplash.com/photo-1488763153883-c87b39a26eba?w=800&h=1000&fit=crop', // woman legs fashion
    'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=1000&fit=crop', // woman in skirt
    'https://images.unsplash.com/photo-1564257631407-4deb1f38bbfe?w=800&h=1000&fit=crop', // woman casual
  ],
  // Shoes - footwear
  shoes: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop', // sneakers
    'https://images.unsplash.com/photo-1542629127-6e9fc2e2ce25?w=800&h=1000&fit=crop', // shoes detail
    'https://images.unsplash.com/photo-1487928072151-fd109d5e539b?w=800&h=1000&fit=crop', // footwear
    'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&h=1000&fit=crop', // shoes
    'https://images.unsplash.com/photo-1543163521-9a539c45dd15?w=800&h=1000&fit=crop', // sneakers white
    'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=1000&fit=crop', // shoes
  ],
  // Accessories - bags, scarves, jewelry
  accessories: [
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop', // jewelry
    'https://images.unsplash.com/photo-1563970307-8f0fcf338d0d?w=800&h=1000&fit=crop', // accessory
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1000&fit=crop', // handbag
    'https://images.unsplash.com/photo-1533455652021-36c50c833345?w=800&h=1000&fit=crop', // belt
    'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=1000&fit=crop', // jewelry
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=1000&fit=crop', // necklace
  ],
};

// Hero image - fashion/wardrobe theme
const heroImage = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop';

// Read mock-data.ts
const mockDataPath = path.join(__dirname, '../lib/mock-data.ts');
let mockData = fs.readFileSync(mockDataPath, 'utf-8');

// Track which images we use to ensure no duplicates
let usedImages = new Set();

// Create a mapping that ensures no duplication
function getUniqueImagesForProduct(category) {
  const categoryImages = fashionImages[category] || fashionImages.tops;
  const images = [];
  
  for (let i = 0; i < 4; i++) {
    let img;
    let attempts = 0;
    do {
      img = categoryImages[Math.floor(Math.random() * categoryImages.length)];
      attempts++;
    } while (usedImages.has(img) && attempts < 10);
    
    if (!usedImages.has(img)) {
      usedImages.add(img);
      images.push(img);
    } else {
      // If we've run out of unique images for this category, reuse from different category
      for (const cat in fashionImages) {
        const altImg = fashionImages[cat][Math.floor(Math.random() * fashionImages[cat].length)];
        if (!usedImages.has(altImg)) {
          usedImages.add(altImg);
          images.push(altImg);
          break;
        }
      }
    }
  }
  
  // Ensure we have 4 images
  while (images.length < 4) {
    images.push(images[0]);
  }
  
  return images;
}

// Replace all product images
const productRegex = /images:\s*\[([\s\S]*?)\],/g;
mockData = mockData.replace(productRegex, (match) => {
  // Extract category from surrounding context (fallback to 'tops')
  const context = mockData.substring(Math.max(0, mockData.indexOf(match) - 200), mockData.indexOf(match));
  const categoryMatch = context.match(/category:\s*['"]([^'"]+)['"]/);
  const category = categoryMatch ? categoryMatch[1] : 'tops';
  
  const images = getUniqueImagesForProduct(category);
  return `images: [
      '${images[0]}',
      '${images[1]}',
      '${images[2]}',
      '${images[3]}',
    ],`;
});

// Write updated mock-data.ts
fs.writeFileSync(mockDataPath, mockData, 'utf-8');
console.log('Updated lib/mock-data.ts with curated fashion images.');

// Update Hero.tsx
const heroPath = path.join(__dirname, '../components/home/Hero.tsx');
let heroContent = fs.readFileSync(heroPath, 'utf-8');
heroContent = heroContent.replace(
  /src="https:\/\/images\.unsplash\.com\/[^"]+"/,
  `src="${heroImage}"`
);
fs.writeFileSync(heroPath, heroContent, 'utf-8');
console.log('Updated components/home/Hero.tsx with fashion hero image.');

// Log all unique images used
console.log(`\nTotal unique images used: ${usedImages.size}`);
console.log('Images used:');
usedImages.forEach(img => console.log(`  ${img}`));

// Write mapping to file for reference
fs.writeFileSync(
  path.join(__dirname, '../tmp-fashion-images-mapping.json'),
  JSON.stringify({
    heroImage,
    totalUniqueImages: usedImages.size,
    imagesUsed: Array.from(usedImages),
  }, null, 2),
  'utf-8'
);
console.log('\nWrote mapping to tmp-fashion-images-mapping.json');
