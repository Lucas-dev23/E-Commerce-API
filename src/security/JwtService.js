import jwt from "jsonwebtoken";
import "dotenv/config";
import AppError from "../utils/errors/AppError.js";
import UnauthorizedError from "../utils/errors/UnauthorizedError.js";

export function generateToken({ id, email, perfil, nivel_acesso }) {

    const secret = process.env.JWT_SECRET;
    const expiration = process.env.JWT_EXPIRES_IN || "1h";

    if (!secret) {
        throw new AppError("JWT_SECRET não definido", 500);
    }

    const token = jwt.sign(
        { 
            id, 
            email,
            perfil, 
            nivel_acesso
        },
        secret,
        { expiresIn: expiration }
    )

    return token;
}

export function verifyToken(token) {
    try {

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new AppError("JWT_SECRET não definido", 500);
        }

        return jwt.verify(token, secret);

    } catch (error) {
        throw new UnauthorizedError("Token inválido ou expirado");
    }
}
