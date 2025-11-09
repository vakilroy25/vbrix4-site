import QRCode from 'qrcode';
import { Jimp } from 'jimp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const QR_URL = 'https://vbrix4.com/qr';
const QR_SIZE = 1000; // High resolution for printing
const LOGO_SIZE_RATIO = 0.3; // 30% of QR code size

async function generateQRCode() {
  try {
    console.log('Generating QR code for:', QR_URL);
    
    // Generate base QR code as buffer
    const qrBuffer = await QRCode.toBuffer(QR_URL, {
      errorCorrectionLevel: 'H', // High error correction for logo overlay
      margin: 1,
      width: QR_SIZE,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    // Load the base QR code
    const qrImage = await Jimp.read(qrBuffer);

    // Generate QR with logo
    await generateWithOverlay(
      qrImage.clone(),
      join(__dirname, '../public/logo.png'),
      join(__dirname, '../public/qr-code-logo.png'),
      'logo'
    );

    // Generate QR with scan-me
    await generateWithOverlay(
      qrImage.clone(),
      join(__dirname, '../public/scan-me.png'),
      join(__dirname, '../public/qr-code-scanme.png'),
      'scan-me'
    );

    console.log('✅ QR codes generated successfully!');
    console.log('   - public/qr-code-logo.png');
    console.log('   - public/qr-code-scanme.png');
    
  } catch (error) {
    console.error('Error generating QR codes:', error);
    process.exit(1);
  }
}

async function generateWithOverlay(qrImage, overlayPath, outputPath, name) {
  try {
    // Load overlay image
    const overlay = await Jimp.read(overlayPath);
    
    // Calculate overlay size (30% of QR code)
    const overlaySize = Math.floor(QR_SIZE * LOGO_SIZE_RATIO);
    
    // Resize overlay (Jimp v1 API)
    overlay.resize({ w: overlaySize, h: overlaySize });
    
    // Create white background circle/square for overlay (Jimp v1 API)
    const background = new Jimp({ width: overlaySize, height: overlaySize, color: 0xFFFFFFFF });
    
    // Calculate position to center the overlay
    const x = Math.floor((QR_SIZE - overlaySize) / 2);
    const y = Math.floor((QR_SIZE - overlaySize) / 2);
    
    // Composite: QR + white background + overlay
    qrImage
      .composite(background, x, y)
      .composite(overlay, x, y);
    
    // Save the final image (Jimp v1 API)
    await qrImage.write(outputPath);
    
    console.log(`✓ Generated QR code with ${name}`);
    
  } catch (error) {
    console.error(`Error generating QR with ${name}:`, error);
    throw error;
  }
}

// Run the generator
generateQRCode();

