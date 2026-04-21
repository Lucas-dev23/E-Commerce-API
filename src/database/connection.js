import { Pool } from 'pg';
import 'dotenv/config';

/*
  Pool de conexões:
  - Mantém múltiplas conexões abertas com o banco
  - Reutiliza conexões para melhorar performance
  - Evita overhead de abrir/fechar conexão a cada query
*/
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

export default pool