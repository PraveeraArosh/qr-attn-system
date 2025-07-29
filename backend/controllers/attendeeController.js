const db = require('../config/database');
const { generateQRCode } = require('../utils/qrCodeGenerator');
const path = require('path');

exports.createAttendee = async (req, res) => {
  const { name, contact_no, email } = req.body;
  const qrCodeData = `${name}-${contact_no}-${email}-${Date.now()}`;
  
  try {
    const qrCodePath = await generateQRCode(qrCodeData, `${name.replace(/\s/g, '_')}.png`);
    db.run(
      `INSERT INTO attendees (name, contact_no, email, qr_code) VALUES (?, ?, ?, ?)`,
      [name, contact_no, email, qrCodeData],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({
          id: this.lastID,
          name,
          contact_no,
          email,
          qr_code: qrCodeData,
          qr_code_path: path.basename(qrCodePath)
        });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAttendees = (req, res) => {
  db.all(`SELECT * FROM attendees`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

exports.downloadQRCode = (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, '../../qr_codes', fileName);
  res.download(filePath);
};