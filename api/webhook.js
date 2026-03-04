const axios = require("axios");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const message = req.body.message?.toLowerCase() || "";
  const sender = req.body.sender;

  let reply = "Maaf, pesan tidak dikenali.";

  if (message.includes("harga")) {
    reply = "Harga mulai dari Rp 250.000. Silakan pilih paket yang tersedia.";
  }

  if (message.includes("lokasi")) {
    reply = "Kami berlokasi di Denpasar. Berikut Google Maps: https://maps.google.com";
  }

  if (message.includes("booking")) {
    reply = "Untuk booking, kirim format:\nNama:\nTanggal:\nJumlah Orang:";
  }

  try {
    await axios.post(
      "https://api.fonnte.com/send",
      {
        target: sender,
        message: reply
      },
      {
        headers: {
          Authorization: "XPs1fCAMwVF4PELjEaVZ"
        }
      }
    );

    return res.status(200).json({ status: "ok" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
