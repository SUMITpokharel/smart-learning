const nodemailer = require("nodemailer");

const sendTextEmail = async (options) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.MAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "Smart Learning <sumitpokhrel908@gmail.com",
    to: options.email,
    subject: "Message from Smart Learning",
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendTextEmail;
