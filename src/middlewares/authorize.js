import ForbiddenError from "../utils/errors/ForbiddenError.js";
import UnauthorizedError from "../utils/errors/UnauthorizedError.js";

export function authorizeMiddleware(perfilPermitido) {
    return (req, res, next) => {

        // Proteção extra caso não coloque o authMiddleware antes
        if (!req.user) {
            throw new UnauthorizedError("Usuário não autenticado");
        }

        const { perfil } = req.user;

        if (!perfilPermitido.includes(perfil)) {
            throw new ForbiddenError("Usuário não autorizado");
        }

        // Se chegou aqui tem autorização para acessar a controller
        next();
    }
}