import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to, subject, text) {
  try {
    const result = await resend.emails.send({
      from: "Kelurahan Cilandak Timur <onboarding@resend.dev>",
      to: [to],
      subject,
      text,
    });

    console.log("Email terkirim via Resend:", result.id);
    return result;
  } catch (error) {
    console.error("Gagal mengirim email (Resend):", error);
    throw error;
  }
}
