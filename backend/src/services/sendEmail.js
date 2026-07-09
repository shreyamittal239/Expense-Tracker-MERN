const nodemailer = require("nodemailer");

const sendEmail = async(options) => {
const transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
     port: 465,
      secure: true,
   
    auth: {
        user: process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    },
});

console.log("Verifying SMTP...");
    await transporter.verify();
    console.log("SMTP Verified");

  const mailOptions = {

        from: process.env.EMAIL_USER,

        to: options.to,

        subject: options.subject,

        text: options.text,

    };

    console.log("Sending Email...");
    await transporter.sendMail(mailOptions);
    console.log("Email Sent Successfully");

   

}

module.exports = sendEmail;