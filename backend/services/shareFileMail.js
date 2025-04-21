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
  };

  await transporter.sendMail(mailOptions);
};

module.exports = shareFileMail;
