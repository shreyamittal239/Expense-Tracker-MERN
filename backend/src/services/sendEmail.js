const nodemailer = require("nodemailer");

const sendEmail = async(options) => {
const transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
    port: 587,
    secure: false,
     family:4,
    auth: {
        user: process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    },
});
  const mailOptions = {

        from: process.env.EMAIL_USER,

        to: options.to,

        subject: options.subject,

        text: options.text,

    };

    await transporter.sendMail(mailOptions);

}

module.exports = sendEmail;