import nodemailer from "nodemailer";
import "dotenv/config";

export async function sendEmail(to, subject, text) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_SENDER,
      to,
      subject,
      text,
    });
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
    });

    console.log("Email terkirim:", info.response);
    return info;
  } catch (err) {
    console.error("Gagal mengirim email:", err);
    throw err;
  }
}
