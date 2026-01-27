import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to, subject, text) {
  console.log("Mengirim email ke:", to);
  try {
    const response = await resend.emails.send({
      from: "Kelurahan Cilandak Timur <onboarding@resend.dev>",
      to: [to],
      subject,
      text,
    });

    // Cek apakah ada error dari Resend API
    if (response.error) {
      console.error("Resend API Error:", response.error);
      return null;
    }

    // ID pengiriman ada di dalam response.data
    console.log("Email terkirim via Resend. ID:", response.data?.id);
    return response.data;
  } catch (error) {
    console.error("Gagal mengirim email (Resend):", error.message);
    throw error;
  }
}
