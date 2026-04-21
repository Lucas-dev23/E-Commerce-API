import express from 'express';
import db from '../database/connection.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'API E-commerce funcionando 🚀' })
})

// Teste de conexão com banco de dados
router.get('/teste-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()')
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router;
