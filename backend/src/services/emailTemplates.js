const emailTemplate = (name, resetUrl) => {
    return `
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <title>Password Reset</title>
    </head>

    <body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0">

            <tr>
                <td align="center">

                    <table width="600" cellpadding="40" cellspacing="0"
                        style="background:#ffffff;border-radius:12px;margin-top:40px;">

                        <tr>
                            <td>

                                <h1 style="color:#2563eb;">
                                    SpendWise AI
                                </h1>

                                <h2>Hello ${name},</h2>

                                <p>
                                    We received a request to reset your password.
                                </p>

                                <p>
                                    Click the button below to create a new password.
                                </p>

                                <a href="${resetUrl}"
                                    style="
                                    display:inline-block;
                                    background:#2563eb;
                                    color:white;
                                    padding:14px 28px;
                                    text-decoration:none;
                                    border-radius:8px;
                                    font-weight:bold;
                                    margin-top:20px;
                                    ">
                                    Reset Password
                                </a>

                                <p style="margin-top:30px;color:#666;">
                                    This link expires in 15 minutes.
                                </p>

                                <p style="color:#999;font-size:13px;">
                                    If you didn't request this, you can safely ignore this email.
                                </p>

                            </td>

                        </tr>

                    </table>

                </td>

            </tr>

        </table>

    </body>

    </html>
    `;
};

module.exports = emailTemplate;