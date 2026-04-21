import service from '../services/PerfilService.js';

class PerfilController {

    async listar(req, res, next) {

        try {

            const perfis = await service.listar()

            return res.status(200).json(perfis);
        
        } catch (error) {
            next(error);
        }
    }
}

export default new PerfilController();