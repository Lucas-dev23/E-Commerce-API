import db from "../database/connection.js";

class PerfilModel {
    constructor() {
        this.table = "perfis";
    }

    async findById(id) {

        const query = `SELECT * FROM ${this.table} WHERE id = $1`;

        const result = await db.query(query, [id]);

        return result.rows[0];
    }

    async findAll() {
        
        const query = `SELECT * FROM ${this.table}`

        const result = await db.query(query);

        return result.rows;
    }
}

export default new PerfilModel();