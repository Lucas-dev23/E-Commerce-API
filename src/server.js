import app from "./app.js";
import "dotenv/config";

// Se tiver porta definida use caso contrário use a porta 3000
const PORT = process.env.PORT || 3000

// Escute requisições nessa porta
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})