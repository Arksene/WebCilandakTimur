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

      connectionTimeout: 10000,
      greetingTimeout: 10000,
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_SENDER,
      to,
      subject,
      text,
    });

    console.log("Email terkirim:", info.response);
    return info;
  } catch (err) {
    console.error("Gagal mengirim email:", err);
    throw err;
  }
}
