import fs from 'fs';
import path from 'path';

const svgPath = 'client/src/assets/Manzar_cropped.svg';
const svgContent = fs.readFileSync(svgPath, 'utf8');

// Also check attached_assets logos
console.log("Attached assets files:");
console.log(fs.readdirSync('attached_assets'));
