const { Configuration, OpenAIApi } = require("openai");

export default async function handler(req, res) {
  // Jika method bukan POST, kirim pesan ini
  if (req.method !== "POST") {
    res.status(405).send({ message: "Hanya permintaan POST yang diizinkan!!" });
    return;
  }
  // Jika method POST, lakukan ini
  if (req.method === "POST") {
    // Tubuh permintaan dengan nama "chat"
    const chat = req.body.chat;
    // Jika ada chat
    if (chat) {
      // Konfigurasi API OpenAI
      const configuration = new Configuration({
        apiKey: process.env.API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: chat,
        temperature: 0,
        max_tokens: 500,
      });
      // Jika dapat mengambil data dari OpenAI, kirim json
      if (response.data?.choices) {
        res.json(response.data.choices[0].text);
      // Jika tidak dapat mengambil data dari OpenAI, kirim pesan error
      } else {
        res.status(500).send("Oops, Something went wrong!!");
      }
      // Jika tidak ada chat, kirim pesan error "Not Found"
    } else {
      res.status(404).send("Mohon, tuliskan chat Anda!!");
    }
  }
}
