import categoriaModel from '../models/CategoriaModel.js';
import produtoModel from '../models/ProdutoModel.js';
import BadRequestError from '../utils/errors/BadRequestError.js';
import ConflictError from '../utils/errors/ConflictError.js';
import NotFoundError from '../utils/errors/NotFoundError.js';

class CategoriaService {

    async criar(nome) {

        if (await categoriaModel.findByNome(nome)) {
            throw new ConflictError("Categoria já existe");
        }

        return await categoriaModel.create(nome);
    }

    async listar({ page, limit, nome }) {

        const { data, total } = await categoriaModel.findAll({
            page,
            limit,
            nome
        });

        const totalPages = Math.ceil(total / limit);

        return {
            data,
            page,
            limit,
            total,
            totalPages
        };
    }

    async buscarPorId(id) {

        const categoria = await categoriaModel.findById(id);

        if (!categoria) {
            throw new NotFoundError("Categoria não encontrada")
        }

        return categoria;
    }

    async atualizar(id, nome) {

        if (!await categoriaModel.findById(id)) {
            throw new NotFoundError("Categoria não encontrada");
        }

        if (await categoriaModel.findByNome(nome, id)) {
            throw new ConflictError("Categoria já existe");
        }

        return await categoriaModel.update(id, nome);
    }

    async deletar(id) {
 
        const categoria = await categoriaModel.findById(id);

        if (!categoria) {
            throw new NotFoundError("Categoria não encontrada");
        }

        const temProdutos = await produtoModel.existsByCategoriaId(id);

        if (temProdutos) {
            throw new BadRequestError("Não é possível excluir categoria com produtos vinculados");
        }

        await categoriaModel.delete(id);

        return {
            message: "Categoria deletada com sucesso"
        }
    }
}

export default new CategoriaService();