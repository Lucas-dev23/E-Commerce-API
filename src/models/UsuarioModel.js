import db from '../database/connection.js';

class UsuarioModel {

    constructor() {
        this.table = "usuarios";
    }

    async create({ nome, email, senha, perfil_id }) {

        const query = `
            INSERT INTO ${this.table} (nome, email, senha, perfil_id)
            VALUES ($1, $2, $3, $4) 
            RETURNING nome, email, perfil_id, created_at
        `;

        const result = await db.query(query, [nome, email, senha, perfil_id]);

        return result.rows[0];
    }

    async findAll({ page, limit, nome }) {

        /* 
            Quantos registros pular para mostrar a página escolhida
            Ex: page = 1 -> offset = 0 (começa do início)
                page = 2 -> offset = 5 (pula os 5 primeiros)
                page = 3 -> offset = 10 (pula os 10 primeiros)
        */
        const offset = (page - 1) * limit;

        let baseQuery = `
            FROM ${this.table} u
            JOIN perfis p ON p.id = u.perfil_id
        `;

        let values = [];

        if (nome) {
            baseQuery += ` WHERE u.nome ILIKE $1`;
            values.push(`%${nome}%`);
        }

        const dataQuery = `
            SELECT u.id, u.nome, u.email, u.created_at, p.nome AS perfil
            ${baseQuery}
            ORDER BY u.id
            LIMIT $${values.length + 1}
            OFFSET $${values.length + 2}
        `;

        const countQuery = `SELECT COUNT(*) ${baseQuery}`;

        const dataResult = await db.query(dataQuery, [...values, limit, offset]);
        const countResult = await db.query(countQuery, values);

        return {
            data: dataResult.rows,
            total: Number(countResult.rows[0].count)
        };
    }

    async findById(id) {

        const query = `
            SELECT u.*, 
            p.nome AS perfil, p.nivel_acesso
            FROM ${this.table} u
            JOIN perfis p ON p.id = u.perfil_id
            WHERE u.id = $1
        `;

        const result = await db.query(query, [id]);

        return result.rows[0];
    }

    async update({ id, nome, email }) {

        const query = `
            UPDATE ${this.table}
            SET nome = $1, email = $2
            WHERE id = $3
            RETURNING id, nome, email 
        `;

        const result = await db.query(query, [nome, email, id]);

        return result.rows[0];
    }

    async delete(id) {

        const query = `DELETE FROM ${this.table} WHERE id = $1`

        await db.query(query, [id]);
    }

    async findByEmail(email, id) {

        let query = `
            SELECT u.*, p.nome AS perfil, p.nivel_acesso
            FROM ${this.table} u
            JOIN perfis p ON p.id = u.perfil_id
            WHERE u.email ILIKE $1
        `;

        const params = [email];

        if (id) {
            query += ` AND u.id != $2`;
            params.push(id);
        }

        query += ` LIMIT 1`;

        const result = await db.query(query, params);

        return result.rows[0];
    }

    async updateSenha({ id, novaSenha }) {

        const query = `
            UPDATE ${this.table}
            SET senha = $1
            WHERE id = $2
        `;

        const result = await db.query(query, [novaSenha, id]);

        return result.rowCount;
    }
}

export default new UsuarioModel();