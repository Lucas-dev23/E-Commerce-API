import service from '../services/UsuarioService.js';

class UsuarioController {

    async criar(req, res, next) {

        try {

            const { nome, email, senha, perfil_id } = req.body;

            const usuario = await service.criar({
                nome,
                email,
                senha,
                perfil_id
            });

            return res.status(201).json(usuario);

        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {

        try {

            const { email, senha } = req.body;

            const usuario = await service.login({ email, senha });

            return res.status(200).json(usuario);

        } catch (error) {
            next(error);
        }
    }

    async listar(req, res, next) {

        try {

            const { page, limit, nome } = req.validatedQuery;

            const usuarios = await service.listar({ page, limit, nome });

            return res.status(200).json(usuarios);

        } catch (error) {
            next(error);
        }
    }

    async buscarPorId(req, res, next) {

        try {

            const { id } = req.params;

            const usuario = await service.buscarPorId(id, req.user);

            return res.status(200).json(usuario);

        } catch (error) {
            next(error)
        }
    }

    async atualizar(req, res, next) {

        try {

            const { id } = req.params;
            const { nome, email } = req.body;

            const usuario = await service.atualizar({
                id,
                nome,
                email,
                user: req.user
            });

            return res.status(200).json(usuario);

        } catch (error) {
            next(error);
        }
    }

    async deletar(req, res, next) {

        try {

            const { id } = req.params;

            const response = await service.deletar(id);

            return res.status(200).json(response);

        } catch (error) {
            next(error);
        }
    }

    async atualizarSenha(req, res, next) {

        try {

            const { id } = req.params;
            const { senhaAtual, novaSenha } = req.body;

            const response = await service.atualizarSenha({ 
                id, 
                senhaAtual, 
                novaSenha,
                user: req.user
            });

            return res.status(200).json(response);

        } catch (error) {
            next(error);
        }
    }
}

export default new UsuarioController();