const { createTransport } = require('../config/emailConfig');

const transporter = createTransport();

async function sendCertificateEmail({
  name,
  email,
  pdfBuffer,
  jpgBuffer,
}) {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject: 'Your Registration Certificate',
    text: `Hi ${name},

Please find attached your registration certificate.

Regards,
Certificate Team`,
    attachments: [
      {
        filename: 'certificate.pdf',
        content: pdfBuffer,
      },
      {
        filename: 'certificate.jpg',
        content: jpgBuffer,
      },
    ],
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendCertificateEmail };
