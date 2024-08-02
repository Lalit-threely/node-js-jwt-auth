const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD, // Use the App Password here
      },
    });

    const mailOptions = {
      from: `Node Auth <${process.env.EMAIL}>`, // Sender address
      to: options.email, // List of recipients
      subject: options.subject, // Subject line
      text: options.message, // Plain text body
      // html: options.html, // HTML body (optional)
    };
  
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};

module.exports = sendEmail;
