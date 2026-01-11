import { Client } from "@gradio/client";

export const handleChat = async (req, res) => {
  try {
    const { message } = req.body;
    const spaceId = process.env.HF_SPACE_ID;

    if (!spaceId) throw new Error("HF_SPACE_ID belum disetting!");

    const client = await Client.connect(spaceId);

    const result = await client.predict("/predict", {
      pesan: message,
    });

    const botReply = result.data[0];

    return res.status(200).json({
      success: true,
      reply: botReply,
    });
  } catch (error) {
    console.error("Error HF:", error);
    return res.status(500).json({ error: error.message });
  }
};
