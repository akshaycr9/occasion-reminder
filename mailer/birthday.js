import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "416c7618416355",
        pass: "dec95db9176b4c"
    }
})

export async function sendBirthdayEmail(to, name) {
    const mailOptions = {
        from: '466e29f6b3-08f6eb@demomailtrap.com',
        to,
        subject: "Happy Birthday",
        text: `Happy Birthday, ${name}! 🎉\n\nWe hope you have a wonderful day filled with joy and happiness!`,
        html: `<p>Happy Birthday, <strong>${name}</strong>! 🎉</p><p>We hope you have a wonderful day filled with joy and happiness!</p>`,
    }

    await transporter.sendMail(mailOptions);
}