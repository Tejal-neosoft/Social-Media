import nodemailer from 'nodemailer'

export const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
        service: process.env.SMTP_SERVICE
    })

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error, "error");
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}