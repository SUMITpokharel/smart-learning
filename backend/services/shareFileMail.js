const nodemailer = require("nodemailer");
const shareFileMail = async (options) => {
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
    text:
      options.sender + " Add you in share File Please Check for more Details",
  };
  await transporter.sendMail(mailOptions);
};
module.exports = shareFileMail;
