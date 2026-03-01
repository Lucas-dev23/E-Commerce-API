import app from "./src/app.js"

const PORT = 3000;

// Subir servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})