import pool from "../config/database.js"
import bcrypt from "bcrypt"


const userModel = {
    getAll: async () => {
        const result = await pool.query(
            `SELECT * FROM users ORDER BY id`
        );
        return result.rows
    },
    getById: async (id) => {
        const result = await pool.query(
            `SELECT * FROM users WHERE id = $1`,
            [id]
        );
        return result.rows[0];
    },
    create: async (name, email, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
            [name, email, hashedPassword]
        );
        return result.rows[0];
    },

    getByEmail: async (email) => {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        return result.rows[0];
    },

    update: async (id, updates) => {
        const fields = [];
        const values = [];
        let counter = 1;

        if (updates.name) {
            fields.push(`name = $${counter}`);
            values.push(updates.name);
            counter++;
        }
        if (updates.email) {
            fields.push(`email = $${counter}`);
            values.push(updates.email);
            counter++;
        }
        if (updates.password) {
            const hashedPassword = await bcrypt.hash(updates.password, 10);
            fields.push(`password = $${counter}`);
            values.push(hashedPassword);
            counter++;
        }

        values.push(id);

        const result = await pool.query(
            `UPDATE users SET ${fields.join(', ')} WHERE id = $${counter} RETURNING id, name, email, created_at`,
            values
        );
        return result.rows[0];
    },
    delete: async (id) => {
        const result = await pool.query(
            `DELETE FROM users WHERE id = $1 RETURNING id`,
            [id]
        );
        return result.rows[0];
    }
}

export default userModel;