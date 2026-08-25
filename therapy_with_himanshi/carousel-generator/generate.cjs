const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('Starting carousel generator...');
  const contentPath = path.resolve(__dirname, 'content.json');
  const templatePath = path.resolve(__dirname, 'template.html');
  
  if (!fs.existsSync(contentPath)) {
    console.error('content.json not found!');
    process.exit(1);
  }

  const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
  const htmlTemplate = fs.readFileSync(templatePath, 'utf8');

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 });

  const outDir = path.resolve(__dirname, 'output');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  for (let i = 0; i < content.slides.length; i++) {
    const slide = content.slides[i];
    let cardHtml = '';

    if (slide.type === 'title' || slide.type === 'standard' || slide.type === 'quote') {
        const italicStyle = slide.type === 'title' ? "font-style: italic;" : "";
        let fontSizeMain = slide.type === 'quote' ? "58px" : "68px";
        let fontSizeSub = slide.type === 'quote' ? "36px" : "32px";
        
        cardHtml = `
            <div class="card">
                <div class="tape"></div>
                <div class="main-text" style="font-size: ${fontSizeMain};">${slide.mainText}</div>
                <div class="sub-text" style="font-size: ${fontSizeSub}; ${italicStyle}">${slide.subText}</div>
            </div>
        `;
    } else if (slide.type === 'list') {
        let itemsHtml = slide.items.map(item => `<li>${item}</li>`).join('');
        cardHtml = `
            <div class="card list-container">
                <div class="tape" style="left: 30%; transform: translateX(-50%) rotate(3deg);"></div>
                <div class="list-title">${slide.title}</div>
                <ul class="list-items">
                    ${itemsHtml}
                </ul>
            </div>
        `;
    } else if (slide.type === 'cta') {
        cardHtml = `
            <div class="card">
                <div class="tape"></div>
                <div class="main-text" style="font-size: 58px;">${slide.mainText}</div>
                <div class="main-text" style="font-size: 44px; margin-top: 40px; font-style: italic;">${slide.subText}</div>
                <div class="cta-box">
                    ${slide.ctaText}<br>
                    <strong style="font-size: 34px; display: inline-block; margin-top: 15px;">${slide.ctaWebsite}</strong>
                </div>
            </div>
        `;
    }

    // Inject the card HTML into the template
    const finalHtml = htmlTemplate.replace('<!-- Content gets injected here -->', cardHtml);
    
    await page.setContent(finalHtml, { waitUntil: 'domcontentloaded' });
    // Wait slightly for fonts to load
    await new Promise(r => setTimeout(r, 1000));
    
    // Screenshot the .slide element
    const slideElement = await page.$('.slide');
    const imagePath = path.resolve(outDir, `slide_${i + 1}.png`);
    await slideElement.screenshot({ path: imagePath });
    console.log(`Generated: output/slide_${i + 1}.png`);
  }

  await browser.close();
  console.log('✅ Carousel generation complete! Check the "output" folder.');
})();
