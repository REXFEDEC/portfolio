const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../public/favicon.png');
const outputDir = path.join(__dirname, '../public');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const sizes = [
  { name: 'favicon-16x16.png', width: 16, height: 16 },
  { name: 'favicon-32x32.png', width: 32, height: 32 },
  { name: 'apple-touch-icon.png', width: 180, height: 180 },
  { name: 'android-chrome-192x192.png', width: 192, height: 192 },
  { name: 'android-chrome-512x512.png', width: 512, height: 512 },
  { name: 'mstile-150x150.png', width: 150, height: 150 },
];

async function generateFavicons() {
  console.log('Generating favicons from', inputFile);
  
  for (const size of sizes) {
    const outputPath = path.join(outputDir, size.name);
    
    await sharp(inputFile)
      .resize(size.width, size.height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(outputPath);
    
    console.log(`✓ Generated ${size.name} (${size.width}x${size.height})`);
  }
  
  // Also copy original as favicon.png if it's not already there
  const faviconPath = path.join(outputDir, 'favicon.png');
  if (!fs.existsSync(faviconPath)) {
    fs.copyFileSync(inputFile, faviconPath);
    console.log('✓ Copied favicon.png');
  }
  
  console.log('\nAll favicons generated successfully!');
}

generateFavicons().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
