const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'waweruisaac25@gmail.com',
      pass: 'mayday2029!'
    }
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Stanbic Innovations <waweruisaac25@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;