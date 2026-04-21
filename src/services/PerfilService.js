import perfilModel from '../models/PerfilModel.js';

class PerfilService {

    async listar() {
        return await perfilModel.findAll();
    }
}

export default new PerfilService();