import usuarioModel from '../models/UsuarioModel.js';
import perfilModel from '../models/PerfilModel.js';
import BadRequestError from '../utils/errors/BadRequestError.js';
import ConflictError from '../utils/errors/ConflictError.js';
import NotFoundError from '../utils/errors/NotFoundError.js';
import UnauthorizedError from '../utils/errors/UnauthorizedError.js';
import ForbiddenError from "../utils/errors/ForbiddenError.js";
import bcrypt from 'bcrypt';
import { generateToken } from '../security/JwtService.js';

class UsuarioService {

    async criar({ nome, email, senha, perfil_id }) {

        const perfil = await perfilModel.findById(perfil_id);

        if (!perfil) {
            throw new BadRequestError("Perfil não encontrado");
        }

        const emailDuplicado = await usuarioModel.findByEmail(email);

        if (emailDuplicado) {
            throw new ConflictError("Email já cadastrado");
        }

        // 10 -> O número de vezes que o algoritmo de hash é aplicado
        const senhaHash = await bcrypt.hash(senha, 10);

        return await usuarioModel.create({ nome, email, senha: senhaHash, perfil_id: perfil.id });
    }

    async login({ email, senha }) {

        const usuario = await usuarioModel.findByEmail(email);

        if (!usuario) {
            throw new UnauthorizedError("Email e/ou senha inválidos");
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            throw new UnauthorizedError("Email e/ou senha inválidos");
        }

        const generatedToken = generateToken({
            id: usuario.id,
            email: usuario.email,
            perfil: usuario.perfil,
            nivel_acesso: usuario.nivel_acesso
        });

        return { token: generatedToken };
    }

    async listar({ page, limit, nome }) {

        const { data, total } = await usuarioModel.findAll({ page, limit, nome });

        const totalPages = Math.ceil(total / limit);

        return {
            data,
            page,
            limit,
            total,
            totalPages
        };
    }

    async buscarPorId(id, user) {

        if (user.nivel_acesso < 2 && user.id !== id) {
            throw new ForbiddenError("Você não tem permissão para visualizar os dados de outro usuário");
        }

        const usuario = await usuarioModel.findById(id);

        if (!usuario) {
            throw new NotFoundError("Usuário não encontrado");
        }

        const { id: usuarioId, nome, email, perfil } = usuario;

        return {
            id: usuarioId,
            nome,
            email,
            perfil
        };
    }

    async atualizar({ id, nome, email, user }) {

        if (user.nivel_acesso < 2 && user.id !== id) {
            throw new ForbiddenError("Você não tem permissão para alterar outro usuário");
        }

        const usuario = await usuarioModel.findById(id);

        if (!usuario) {
            throw new NotFoundError("Usuário não encontrado");
        }

        const emailDuplicado = await usuarioModel.findByEmail(email, id);

        if (emailDuplicado) {
            throw new ConflictError("Email já cadastrado");
        }

        return await usuarioModel.update({ id, nome, email });
    }

    async deletar(id) {

        const usuario = await usuarioModel.findById(id);

        if (!usuario) {
            throw new NotFoundError("Usuário não encontrado");
        }

        await usuarioModel.delete(id);

        return {
            message: "Usuário deletado com sucesso"
        };
    }

    async atualizarSenha({ id, senhaAtual, novaSenha, user }) {

        if (user.nivel_acesso < 2 && user.id !== id) {
            throw new ForbiddenError("Você não pode trocar a senha de um outro usuário");
        }

        const usuario = await usuarioModel.findById(id);

        if (!usuario) {
            throw new NotFoundError("Usuário não encontrado");
        }

        const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha);

        if (!senhaValida) {
            throw new UnauthorizedError("Senha atual incorreta");
        }

        const mesmaSenha = await bcrypt.compare(novaSenha, usuario.senha);

        if (mesmaSenha) {
            throw new BadRequestError("A nova senha não pode ser igual à anterior");
        }

        const senhaHash = await bcrypt.hash(novaSenha, 10);

        await usuarioModel.updateSenha({ id, novaSenha: senhaHash });

        return {
            message: "Senha atualizada com sucesso"
        };
    }
}

export default new UsuarioService();