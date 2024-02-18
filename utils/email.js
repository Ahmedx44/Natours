const nodemailer = require('nodemailer');

const sendEmail = async (option) => {
  const transporter = nodemailer.createTransport({
    //1)Create transporter
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //2)Define the email address
  const mailOptions = {
    from: 'Ahmed gemechu <ahmedgemechu14@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //3)Actually send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
