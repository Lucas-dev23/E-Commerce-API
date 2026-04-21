import db from '../database/connection.js';

class CategoriaModel {

    constructor() {
        this.tbCategoria = "categorias";
    }

    async create(nome) {

        // $1 evita SQL injection, RETURNING * retorna o registro criado
        const query = `INSERT INTO ${this.tbCategoria} (nome) VALUES ($1) RETURNING *`

        const result = await db.query(query, [nome]);

        // rows é sempre um array mesmo inserindo um único registro
        return result.rows[0];
    }

    async findAll({ page, limit, nome }) {

        const offset = (page - 1) * limit;

        let baseQuery = `FROM ${this.tbCategoria}`

        // Armazena parametros da query
        let values = [];

        // ILIKE: LIKE case insensitive
        if (nome) {
            baseQuery += ` WHERE nome ILIKE $1`
            values.push(`%${nome}%`);
        }

        // ${values.length + 1} = calculando o próximo valor do placeholder ex: $1, $2, $3
        const dataQuery = `
            SELECT *
            ${baseQuery}
            ORDER BY id 
            LIMIT $${values.length + 1} 
            OFFSET $${values.length + 2}
        `

        // total
        const countQuery = `SELECT COUNT(*) ${baseQuery}`

        const dataResult = await db.query(dataQuery, [...values, limit, offset]);
        const countResult = await db.query(countQuery, values);

        return {
            data: dataResult.rows,
            total: Number(countResult.rows[0].count)
        };
    }

    async findById(id) {

        const query = `SELECT * FROM ${this.tbCategoria} WHERE id = $1`

        const result = await db.query(query, [id]);

        return result.rows[0];
    }

    async update(id, nome) {

        const query = `
            UPDATE ${this.tbCategoria} SET nome = $1
            WHERE id = $2 RETURNING *
        `

        const result = await db.query(query, [nome, id]);

        return result.rows[0];
    }

    async delete(id) {

        const query = `DELETE FROM ${this.tbCategoria} WHERE id = $1`

        await db.query(query, [id]);
    }

    async findByNome(nome, id) {

        let query = `
            SELECT nome FROM ${this.tbCategoria}
            WHERE nome ILIKE $1
        `;

        const params = [nome];

        if (id) {
            query += ` AND id != $2`;
            params.push(id);
        }

        // LIMIT 1: retorna no máximo um registro
        query += ` LIMIT 1`;

        const result = await db.query(query, params);

        return result.rows[0];
    }
}

// Instanciando a model para utilizar direto do import
export default new CategoriaModel();
