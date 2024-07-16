const nodemailer = require("nodemailer");

module.exports = async (param) => {
  console.log(param.email);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    // service:"gmail",
    auth: {
      user: "abdullah68782325@gmail.com",
      pass: "vlym gxgh vqut hbme",
    },
  });

  // async..await is not allowed in global scope, must use a wrapper

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'mohamed12345abdullah@gmail.com', // sender address
    to: param.email, // list of receivers
    subject: param.subject, // Subject line
    text: param.text, // plain text body
    html: param.html, // html body
  });

  console.log("Message sent: %s", info.messageId);
}