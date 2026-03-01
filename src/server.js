import app from "./app.js"
import dotenv from 'dotenv'

const PORT = process.env.PORT;

// Subir servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})