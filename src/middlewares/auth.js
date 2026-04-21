import "dotenv/config";
import { verifyToken } from '../security/JwtService.js';
import UnauthorizedError from "../utils/errors/UnauthorizedError.js";

export function authMiddleware(req, res, next) {
    try {

        // Pegando o header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedError("Token não fornecido");
        }

        // parts[0] -> Bearer
        // parts[1] -> token
        const [bearer, token] = authHeader.split(" ");

        if (bearer !== "Bearer" || !token) {
            throw new UnauthorizedError("Token mal formatado");
        }

        const decoded = verifyToken(token);

        req.user = {
            id: decoded.id,
            email: decoded.email,
            perfil: decoded.perfil,
            nivel_acesso: decoded.nivel_acesso
        };

        next()

    } catch (error) {
        next(error);
    }
}