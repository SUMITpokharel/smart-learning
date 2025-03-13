const nodemailer = require("nodemailer");
const sendEmail = async (options) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sumitpokhrel908@gmail.com",
      pass: "kctzdibcoerjnpmi",
    },
  });
  const mailOptions = {
    from: "Smart Learning <sumitpokhrel908@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: "Your otp is  " + options.otp,
  };
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
