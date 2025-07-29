const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs').promises;

const generateQRCode = async (data, fileName) => {
  const qrCodePath = path.join(__dirname, '../../qr_codes', fileName);
  await fs.mkdir(path.dirname(qrCodePath), { recursive: true });
  await QRCode.toFile(qrCodePath, data, {
    errorCorrectionLevel: 'H',
    type: 'png'
  });
  return qrCodePath;
};

module.exports = { generateQRCode };