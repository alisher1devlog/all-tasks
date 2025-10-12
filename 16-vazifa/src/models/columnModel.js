import pool from "../config/database.js";
import boardModel from "./boardModel.js";

const columnModel = {
    getAll: async (boardId) => {
        const result = await pool.query(
            `SELECT * FROM columnss WHERE board_id = $1`
            , [boardId]
        );
        return result.rows;
    },

    getById: async (board_id, id) => {
        const result = await pool.query(
            `SELECT * FROM columnss WHERE id = $1 AND board_id = $2`,
            [id, board_id]
        );
        return result.rows[0];
    },

    create: async (title, orders, boardId) => {
        const result = await pool.query(
            `INSERT INTO columnss(title,orders,board_id) VALUES ($1,$2,$3)`,
            [title, orders, boardId]
        );
        
        return result.rows[0]
    },
    update: async (boardId, columnId, updates) => {
        const { title, order } = updates;

        const setClauses = [];
        const values = [];
        let index = 1;

        if (title !== undefined) {
            setClauses.push(`title = $${index++}`);
            values.push(title);
        }

        if (order !== undefined) {
            setClauses.push(`"order" = $${index++}`);
            values.push(order);
        }

        // Agar hech narsa yangilanmasa
        if (setClauses.length === 0) {
            return null;
        }

        values.push(columnId, boardId);

        const result = await pool.query(
            `UPDATE columnss SET ${setClauses.join(', ')} 
       WHERE id = $${index++} AND board_id = $${index} 
       RETURNING *`,
            values);
        return result.rows[0];
    },

    delete: async (id, board_id) => {
        const result = await pool.query(
            `DELETE FROM columnss WHERE id = $1 AND board_id = $2 RETURNING *`,
            [id, board_id]
        );
        console.log(result.rows[0]);
        
        return result.rows[0]
    }
}

export default columnModel;