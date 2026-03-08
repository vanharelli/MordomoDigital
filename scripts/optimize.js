import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '../public');

/**
 * ASSET ENGINE (WEBP AUTOMATION)
 * Converte recursivamente PNG/JPG para WebP (80% qualidade) e deleta originais.
 */
async function optimizeImages(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      await optimizeImages(fullPath);
    } else if (/\.(png|jpe?g)$/i.test(file)) {
      const webpPath = fullPath.replace(/\.(png|jpe?g)$/i, '.webp');
      
      try {
        await sharp(fullPath)
          .webp({ quality: 80 })
          .toFile(webpPath);
        
        console.log(`Optimized: ${file} -> WebP`);
        
        // Deleta o arquivo original
        fs.unlinkSync(fullPath);
      } catch (err) {
        console.error(`Error optimizing ${file}:`, err);
      }
    }
  }
}

console.log('--- ASSET ENGINE STARTING ---');
optimizeImages(rootDir)
  .then(() => console.log('--- ASSET ENGINE FINISHED ---'))
  .catch(err => console.error('Asset Engine failed:', err));
