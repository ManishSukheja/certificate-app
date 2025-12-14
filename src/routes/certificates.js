const logger = require('../config/logger');
const express = require('express');
const router = express.Router();

const { generateCertificate } = require('../services/certificateService');
const { sendCertificateEmail } = require('../services/emailService');

function validateBody(body) {
  const required = [
    'name',
    'email',
    'gstNumber',
    'businessName',
    'businessAddress',
  ];

  const missing = required.filter((f) => !body[f]);
  if (missing.length) {
    return `Missing required fields: ${missing.join(', ')}`;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    return 'Invalid email format';
  }

  return null;
}

router.post('/', async (req, res) => {
  const error = validateBody(req.body);
  if (error) {
    return res.status(400).json({ status: 'error', message: error });
  }

  try {
    const result = await generateCertificate(req.body);

    await sendCertificateEmail({
      name: req.body.name,
      email: req.body.email,
      pdfBuffer: result.pdfBuffer,
      jpgBuffer: result.jpgBuffer,
    });

    logger.info(`Certificate generated successfully for ${req.body.email}`);
    return res.json({
      status: 'success',
      message: 'Certificate generated and emailed successfully',
      certificateId: result.id,
    });
  } catch (err) {
    logger.error(`Certificate generation failed: ${err.message}`);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
});

const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
  const certDir = path.join(__dirname, '../../certificates');

  const files = fs.readdirSync(certDir);

  const certificates = files.map((file) => ({
    file,
    url: `/api/certificates/${file}`,
  }));

  res.json({ certificates });
});

router.get('/:filename', (req, res) => {
  const filePath = path.join(
    __dirname,
    '../../certificates',
    req.params.filename
  );

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Certificate not found' });
  }

  res.sendFile(filePath);
});


module.exports = router;
