import db from '../database/connection.js';

class ProdutoModel {

    constructor() {
        this.tableName = "produtos"
    }

    async existsByCategoriaId(categoriaId) {

        const query = `
            SELECT EXISTS (
                SELECT 1 
                FROM ${this.tbProduto} 
                WHERE categoria_id = $1
            ) AS exists
        `;

        const result = await db.query(query, [categoriaId]);

        return result.rows[0].exists;
    }
}

export default new ProdutoModel();