 { /*const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: options.to,
        subject: options.subject,
        text: options.text,
    });
};

module.exports = sendEmail; */}

const transporter = require("./transporter");

const sendEmail = async ({ to, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `"SpendWise AI" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log("Email sent:", info.messageId);
        return info;

    } catch (error) {
        console.error("Email Error:", error);
        throw error;
    }
};

module.exports = sendEmail;