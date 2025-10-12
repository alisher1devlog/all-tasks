import pool from "../config/database.js";
import boardModel from "./boardModel.js";

const taskModel = {
        getAllBoardId: async (board_id) => {
        const result = await pool.query(
            `SELECT * FROM tasks WHERE board_id = $1 ORDER BY orders`,
            [board_id]
        )
        return result.rows;
    },
    getById: async (boardId, taskId) => {
        const result = await pool.query(
            'SELECT * FROM tasks WHERE id = $1 AND board_id = $2',
            [taskId, boardId]
        );
        return result.rows[0];
    },
    create: async (boardId, taskData) => {
        const { title, orders, description, userId, columnId } = taskData;

        const result = await pool.query(
            `INSERT INTO tasks (title, orders, description, user_id, board_id, column_id) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [title, orders, description || null, userId || null, boardId, columnId || null]
        );
        return result.rows[0];
    },
    update: async (boardId, taskId, updates) => {
        const { title, order, description, userId, columnId } = updates;

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

        if (description !== undefined) {
            setClauses.push(`description = $${index++}`);
            values.push(description);
        }

        if (userId !== undefined) {
            setClauses.push(`user_id = $${index++}`);
            values.push(userId);
        }

        if (columnId !== undefined) {
            setClauses.push(`column_id = $${index++}`);
            values.push(columnId);
        }

        if (setClauses.length === 0) {
            return null;
        }

        values.push(taskId, boardId);

        const result = await pool.query(
            `UPDATE tasks SET ${setClauses.join(', ')} 
        WHERE id = $${index++} AND board_id = $${index} 
        RETURNING *`,
            values
        );
        return result.rows[0];
    },
    delete: async (board_id, id) => {
        const result = await pool.query(
            'DELETE FROM tasks WHERE id = $1 AND board_id = $2 RETURNING id',
            [id, board_id]
        );
        return result.rows[0];
    }
}

export default taskModel;