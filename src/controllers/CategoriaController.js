import service from '../services/CategoriaService.js';

class CategoriaController {

    async criar(req, res, next) {

        try {
            const { nome } = req.body;

            const categoria = await service.criar(nome);

            return res.status(201).json(categoria);

        } catch (error) {
            next(error);
        }
    }

    async listar(req, res, next) {

        try {

            const { page, limit, nome } = req.validatedQuery;

            const categorias = await service.listar({ page, limit, nome });

            return res.status(200).json(categorias);

        } catch (error) {
            next(error);
        }
    }

    async buscarPorId(req, res, next) {

        try {

            const { id } = req.params

            const categoria = await service.buscarPorId(id);

            return res.status(200).json(categoria)

        } catch (error) {
            next(error)
        }
    }

    async atualizar(req, res, next) {

        try {

            const { id } = req.params;
            const { nome } = req.body

            const categoria = await service.atualizar(id, nome);

            return res.status(200).json(categoria);

        } catch (error) {
            next(error)
        }
    }

    async deletar(req, res, next) {

        try {

            const { id } = req.params

            const response = await service.deletar(id);

            return res.status(200).json(response);

        } catch (error) {
            next(error)
        }
    }
}

export default new CategoriaController();
