import express from 'express';
import errorHandler from './middlewares/errorHandler.js';
import healthRoutes from './routes/health.routes.js';
import categoriaRoutes from './routes/categoria.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';
import perfilRoutes from './routes/perfil.routes.js';

// Cria o servidor
const app = express();

// Middleware de JSON (Traduz JSON para objeto js)
app.use(express.json());

// Rotas
app.use("/health", healthRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/perfis", perfilRoutes);

// Captura erros da aplicação
app.use(errorHandler);

// Exportando para que o server.js possa importar
export default app