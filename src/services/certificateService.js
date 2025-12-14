const Jimp = require('jimp');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');


async function generateCertificate(data) {
  const theme = data.theme || 'classic';

  const themes = {
    classic: {
      bg: '#ffffff',
      text: '#000000',
      border: false,
    },
    modern: {
      bg: '#f2f2f2',
      text: '#000000',
      border: true,
    },
  };

  const config = themes[theme] || themes.classic;

  const image = new Jimp(1000, 700, config.bg);
  const titleFont = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
  const bodyFont = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
  const smallFont = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);

 
  if (config.border) {
    const borderColor = Jimp.rgbaToInt(0, 0, 0, 255);
    for (let x = 20; x < 980; x++) {
      image.setPixelColor(borderColor, x, 20);
      image.setPixelColor(borderColor, x, 680);
    }
    for (let y = 20; y < 680; y++) {
      image.setPixelColor(borderColor, 20, y);
      image.setPixelColor(borderColor, 980, y);
    }
  }

 
  image.print(
    titleFont,
    0,
    40,
    {
      text: 'CERTIFICATE OF REGISTRATION',
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
    },
    1000
  );

 
  let y = 200;


image.print(
  bodyFont,
  90,
  y,
  'This is to certify that the following business details'
);
y += 45;
image.print(
  bodyFont,
  90,
  y,
  'have been successfully received and registered in our system.'
);



  let startY = 300;
  const gap = 45;

  image.print(bodyFont, 100, startY, `Name: ${data.name}`);
  image.print(bodyFont, 100, startY + gap, `Email: ${data.email}`);
  image.print(bodyFont, 100, startY + gap * 2, `GST Number: ${data.gstNumber}`);
  image.print(bodyFont, 100, startY + gap * 3, `Business Name: ${data.businessName}`);
  image.print(bodyFont, 100, startY + gap * 4, `Business Address: ${data.businessAddress}`);

  image.print(smallFont, 650, 620, 'Digitally Signed by'); 
  image.print(bodyFont, 650, 560, 'Manish Sukheja');
  image.print(smallFont, 650, 600, 'Authorized Signatory');

  
  const jpgBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);

  const pdfBuffer = await new Promise((resolve) => {
    const doc = new PDFDocument({ size: 'A4', margin: 40 });
    const chunks = [];

    doc.on('data', (c) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));

    doc.image(jpgBuffer, {
      fit: [500, 700],
      align: 'center',
      valign: 'center',
    });

    doc.end();
  });


const id = Date.now().toString();
const basePath = path.join(__dirname, '../../certificates');

fs.writeFileSync(path.join(basePath, `${id}.jpg`), jpgBuffer);
fs.writeFileSync(path.join(basePath, `${id}.pdf`), pdfBuffer);

return {
  id,
  pdfBuffer,
  jpgBuffer,
};

}

module.exports = { generateCertificate };
