const dotenv = require("dotenv");
dotenv.config();

const sendEmail = require("./src/services/sendEmail");

const test = async () => {
    try {
        await sendEmail({
            to: "parmodmittal1@gmail.com",
            subject: "SpendWise AI Test",
            html: `
                <h2>Hello 👋</h2>
                <p>This email was sent using <b>Nodemailer</b>.</p>
            `,
        });

        console.log("Test email sent!");

    } catch (err) {
        console.log(err);
    }
};

test();