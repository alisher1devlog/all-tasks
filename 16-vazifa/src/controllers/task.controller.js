import boardModel from "../models/boardModel.js";
import taskModel from "../models/taskModel.js";

const taskController = {
    getAllTasks: async (req, res, next) => {
        try {
            const { boardId } = req.params;
            const tasks = await taskModel.getAllBoardId(boardId);

            res.status(200).send({
                success: true,
                message: `Taskslar hammasi keldi!`,
                data: tasks
            });
        } catch (err) {
            next(err);
        }
    },

    getTaskById: async (req, res, next) => {
        try {
            const { boardId, taskId } = req.params;

            const task = await taskModel.getById(boardId, taskId);

            if (!task) {
                return res.status(404).send({
                    success: false,
                    message: `Task topilmadi`
                });
            }

            res.status(200).send({
                success: true,
                message: `Task topildi`,
                data: task
            });
        } catch (err) {
            next(err)
        }
    },
    createTask: async (req, res, next) => {
        try {
            const { boardId } = req.params;
            const taskData = req.body;

            const newTask = await taskModel.create(boardId, taskData);

            res.status(201).json({
                success: true,
                message: 'Task muvaffaqiyatli yaratildi',
                data: newTask
            });
        } catch (error) {
            next(error);
        }
    },
    updateTask: async (req, res, next) => {
        try {
            const { boardId, taskId } = req.params;
            const updates = req.body;
            const updateTask = await taskModel.update(boardId, taskId, updates);

            if (!updateTask) {
                return res.status(404).send({
                    success: false,
                    message: 'Task topilmadi'
                });
            }

            res.status(200).send({
                success: true,
                message: 'Task muvaffaqiyatli yangilandi',
                data: updateTask
            });
        } catch (err) {
            next(err);
        }
    },
    deleteTask: async (req, res, next) => {
        try {
            const { boardId, taskId } = req.params;
            const deletedTask = await boardModel.delete(boardId, taskId);
            if (!deletedTask) {
                return res.status(404).send({
                    success: false,
                    message: 'Task topilmadi'
                });
            }

            res.status(200).send({
                success: true,
                message: 'Task muvaffaqiyatli o\'chirildi',
                data: { id: deletedTask.id }
            });
        } catch (err) {
            next(err)
        }
    }
}

export default taskController;