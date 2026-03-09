
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const filesToConvert = [
  'SNACKS.jpeg',
  'RESTAURANTE.jpeg',
  'TOALHA.jpeg',
  'SERVIÇO DE QUARTO.jpeg',
  'FERRO DE PASSAR.jpeg',
  'SECADOR DE CABELO.jpeg',
  'GARAGEM.jpeg',
  'alfa maps.jpeg'
];

async function convert() {
  for (const file of filesToConvert) {
    const inputPath = path.join('public', file);
    const outputPath = path.join('public', file.replace('.jpeg', '.webp').replace('.jpg', '.webp'));

    if (fs.existsSync(inputPath)) {
      try {
        await sharp(inputPath).toFile(outputPath);
        console.log(`Converted: ${file} -> ${path.basename(outputPath)}`);
        fs.unlinkSync(inputPath); // Remove original
        console.log(`Deleted original: ${file}`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    } else {
      console.warn(`File not found: ${file}`);
    }
  }
}

convert();
