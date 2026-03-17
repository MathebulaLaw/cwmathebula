const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

const iconFiles = [
  'team-icon.png',
  'shield-icon.png',
  'handshake-icon.png',
  'scales-icon.png'
];

async function optimizeIcons() {
  console.log('Optimizing icons...');
  for (const file of iconFiles) {
    const inputPath = path.join(publicDir, file);
    const outputPath = path.join(publicDir, file.replace('.png', '-optimized.png'));
    
    try {
      const info = await sharp(inputPath)
        .png({ quality: 80, compressionLevel: 9 })
        .toFile(outputPath);
      
      const originalSize = fs.statSync(inputPath).size;
      const optimizedSize = fs.statSync(outputPath).size;
      
      console.log(`${file}: ${(originalSize / 1024 / 1024).toFixed(2)} MB -> ${(optimizedSize / 1024).toFixed(2)} KB`);
      
      fs.unlinkSync(inputPath);
      fs.renameSync(outputPath, inputPath);
    } catch (err) {
      console.error(`Error optimizing ${file}:`, err.message);
    }
  }
}

async function convertUploadsToWebP() {
  console.log('\nConverting uploads to WebP...');
  const uploadsDir = path.join(publicDir, 'uploads');
  const files = fs.readdirSync(uploadsDir).filter(f => f.endsWith('.png'));
  
  for (const file of files) {
    const inputPath = path.join(uploadsDir, file);
    const outputPath = path.join(uploadsDir, file.replace('.png', '.webp'));
    
    try {
      const info = await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      const originalSize = fs.statSync(inputPath).size;
      const webpSize = fs.statSync(outputPath).size;
      
      console.log(`${file}: ${(originalSize / 1024).toFixed(2)} KB -> ${(webpSize / 1024).toFixed(2)} KB`);
    } catch (err) {
      console.error(`Error converting ${file}:`, err.message);
    }
  }
}

async function main() {
  await optimizeIcons();
  await convertUploadsToWebP();
  console.log('\nDone!');
}

main().catch(console.error);
