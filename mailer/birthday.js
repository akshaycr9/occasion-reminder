import nodemailer from "nodemailer";
import fs from "fs";
import ejs from "ejs";
import path from "path";

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "416c7618416355",
        pass: "dec95db9176b4c"
    }
})

export async function sendBirthdayEmail(to, name) {
    const templatePath = path.join(process.cwd(), "mailer", "templates", "birthday.html");
    const templateContent = fs.readFileSync(templatePath, "utf-8");
    const birthdayImage = fs.readFileSync(path.join(process.cwd(), "app", "assets", "images", "birthday.jpg"), "base64");
    const html = ejs.render(templateContent, { name, image: `data:image/jpg;base64,${birthdayImage}` });
    const mailOptions = {
        from: '466e29f6b3-08f6eb@demomailtrap.com',
        to,
        subject: "Happy Birthday",
        // text: `Happy Birthday, ${name}! 🎉\n\nWe hope you have a wonderful day filled with joy and happiness!`,
        html
    }

    await transporter.sendMail(mailOptions);
}