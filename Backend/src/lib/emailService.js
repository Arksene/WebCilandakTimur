import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to, subject, text) {
  try {
    const result = await resend.emails.send({
      from: "Pengaduan <onboarding@resend.dev>", // bisa diganti domain sendiri
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
