import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import sharp from 'sharp';

/**
 * 3. ASSET ENGINE (WEBP AUTOMATION)
 * Recursively converts all .png/.jpg to .webp (80% quality) and deletes original files.
 */

const ROOT_DIR = path.resolve(__dirname, '../public'); // Adjust if images are in src/assets
const QUALITY = 80;

const processDirectory = async (directory) => {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const outputPath = fullPath.replace(ext, '.webp');
        
        console.log(`Optimizing: ${file} -> .webp`);

        try {
          await sharp(fullPath)
            .webp({ quality: QUALITY })
            .toFile(outputPath);
            
          // Delete original
          fs.unlinkSync(fullPath);
          console.log(`Deleted: ${file}`);
        } catch (err) {
          console.error(`Error processing ${file}:`, err);
        }
      }
    }
  }
};

const main = async () => {
  console.log('Starting Asset Engine Optimization...');
  try {
    // Check for sharp
    require.resolve('sharp');
  } catch (e) {
    console.error('Sharp not found. Please run: npm install sharp');
    process.exit(1);
  }

  await processDirectory(ROOT_DIR);
  console.log('Optimization Complete.');
};

main();
