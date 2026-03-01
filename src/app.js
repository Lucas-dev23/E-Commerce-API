import express from 'express'
import pool from './database/connection.js'

// Cria uma instância do servidor HTTP
const app = express() 

// Lê corpo da requisição (Converte JSON para objeto js)
app.use(express.json())

// Execute essa função quando acessar "/" 
app.get('/', (req, res) => {
    res.json({ message: 'API E-commerce funcionando 🚀'})
})

// Teste de conexão banco de dados
app.get('/teste-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Exportando para que o server.js possa importar
export default app