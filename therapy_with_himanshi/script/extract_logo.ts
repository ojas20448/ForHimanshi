
import fs from 'fs';
import path from 'path';

// Use forward slashes for cross-platform compatibility or handle accordingly
const svgPath = 'c:/Users/walec/OneDrive/Desktop/ForWhatYouBuildNext/ForHimanshi/therapy_with_himanshi/attached_assets/logo.svg';
const outPath = 'c:/Users/walec/OneDrive/Desktop/ForWhatYouBuildNext/ForHimanshi/therapy_with_himanshi/attached_assets/extracted_logo.png';

try {
    const svgContent = fs.readFileSync(svgPath, 'utf8');
    // Regex to capture the base64 string. 
    // Looking for xlink:href="data:image/png;base64,..."
    const match = svgContent.match(/xlink:href="data:image\/png;base64,([^"]+)"/);

    if (match && match[1]) {
        // Remove any whitespace that might be in the base64 string (though usually in SVG attributes it's continuous, but good to be safe)
        const base64Data = match[1].replace(/\s/g, '');
        const buffer = Buffer.from(base64Data, 'base64');
        fs.writeFileSync(outPath, buffer);
        console.log('Successfully extracted logo to:', outPath);
    } else {
        console.error('Could not find base64 image data in SVG.');
        // Debugging: print a snippet
        console.log('SVG Content Start:', svgContent.substring(0, 500));
    }
} catch (error) {
    console.error('Error extracting logo:', error);
    process.exit(1);
}
