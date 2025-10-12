import boardModel from "../models/boardModel.js";

const boardController = {
    getAllBoards: async (req, res, next) => {
        try {
            const boards = await boardModel.getAll();

            res.status(200).send({
                success: true,
                message: `Barcha boardlar`,
                data: boards
            });
        } catch (err) {
            next(err);
        }
    },

    getById: async (req, res, next) => {
        try {
            const { boardId } = req.params;
            const board = await boardModel.getById(boardId);

            if (!board) {
                return res.status(404).send({
                    success: false,
                    message: `Board topilmadi!`
                });
            }
            res.status(200).send({
                success: true,
                message: `Board topildi`,
                data: board
            });
        } catch (err) {
            next(err);
        }
    },

    createBoard: async (req, res, next) => {
        try {
            const { title } = req.body;
            const newBoard = await boardModel.create(title);

            res.status(201).send({
                success: true,
                message: `Board yaratildi!`,
                data: newBoard
            });
        } catch (err) {
            next(err);
        }
    },

    updateBoard: async (req, res, next) => {
        try {
            const { boardId } = req.params;
            const { title } = req.body;

            const board = await boardModel.getById(boardId);

            if (!board) {
                return res.status(404).send({
                    success: false,
                    message: `Update bo'lmadi`
                })
            }
            const updatedBoard = await boardModel.update(boardId, title);
            res.status(200).json({
                success: true,
                message: 'Board muvaffaqiyatli yangilandi',
                data: updatedBoard
            });

        } catch (err) {
            next(err);
        }
    },
    deleteBoard: async (req, res, next) => {
        try {
            const { boardId } = req.params;

            const board = await boardModel.getById(boardId);

            if (!board) {
                return res.status(404).json({
                    success: false,
                    message: 'Board topilmadi'
                });
            }
            const deleteBoard = await boardModel.delete(boardId)
            res.status(200).json({
                success: true,
                message: 'Board muvaffaqiyatli o\'chirildi',
                data: deleteBoard
            });
        } catch (err) {
            next(err)
        }
    }
}

export default boardController;