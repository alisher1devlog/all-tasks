import columnModel from "../models/columnModel.js";

const columnController = {
    getAllColumn: async (req, res, next) => {
        try {
            const {boardId} = req.params;
            console.log(boardId);
            
            const columns = await columnModel.getAll(boardId);
            console.log(columns);
            
            res.status(200).send({
                success: true,
                message: `Barcha columnlar`,
                data: columns
            });
        } catch (err) {
            next(err)
        }
    },
    getColumnById: async (req, res, next) => {
        try {
            const { boardId, columnId } = req.params;

            const column = await columnModel.getById(boardId, columnId);

            if (!column) {
                return res.status(404).send({
                    success: false,
                    message: 'Column topilmadi'
                });
            }

            res.status(200).send({
                success: true,
                message: 'Column topildi',
                data: column
            });
        } catch (error) {
            next(error);
        }
    },
    createColumn: async (req, res, next) => {
        try {
            const { boardId } = req.params;
            const { title, orders } = req.body;

            const newColumn = await columnModel.create(title, orders, boardId);
            console.log(newColumn);
            
            res.status(201).json({
                success: true,
                message: 'Column muvaffaqiyatli yaratildi',
                data: newColumn
            });
        } catch (error) {
            next(error);
        }
    },

    updateColumn: async (req, res, next) => {
        try {
            const { boardId, columnId } = req.params;
            const updates = req.body;

            const updatedColumn = await columnModel.update(boardId, columnId, updates);

            if (!updatedColumn) {
                return res.status(404).json({
                    success: false,
                    message: 'Column topilmadi'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Column muvaffaqiyatli yangilandi',
                data: updatedColumn
            });
        } catch (error) {
            next(error);
        }
    },

    deleteColumn: async (req, res, next) => {
        try {
            const { boardId, columnId } = req.params;

            const deletedColumn = await columnModel.delete( columnId,boardId);
            console.log(deletedColumn);
            
            if (!deletedColumn) {
                return res.status(404).json({
                    success: false,
                    message: 'Column topilmadi'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Column muvaffaqiyatli o\'chirildi',
                data: { id: deletedColumn.id }
            });
        } catch (error) {
            next(error);
        }
    }
};


export default columnController;