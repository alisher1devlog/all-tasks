import userModel from "../models/userModel.js";

const userController = {
    getAll: async (req, res) => {
        try {
            const users = await userModel.getAll();
            res.status(200).send(users);
        } catch (err) {
            console.log(`Userslar kelmadi!`, err);
            res.status(500).send({ message: `Serverda xarolik` });
        }
    },
    getById: async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await userModel.getById(userId);

            if (!user) {
                res.status(404).send(`User not found`)
            }

            res.status(200).send(user)
        } catch (err) {
            console.log(`user topilmadi!`, err);
            res.status(500).send(`Serverda xatolik`)
        }
    },
    update: async (req, res) => {
        try {
            const { userId } = req.params;
            const updates = req.body;

            const updatedUser = await userModel.update(userId, updates);

            if (!updatedUser) {
                return res.status(404).send({ message: "Foydalanuvchi topilmadi" });
            }

            res.status(200).send(updatedUser);
        } catch (err) {
            console.error("update error:", err);
            res.status(500).send({ message: "Serverda xatolik yuz berdi" });
        }
    },
    delete: async (req, res) => {
        try {
            const { userId } = req.params;
            const deleteUser = await userModel.delete(userId);
            if (!deleteUser) {
                return res.status(404).send({ message: `User topilmadi` });
            }

            res.status(200).send({ message: `User o'chirildi` });
        } catch (err) {
            console.error("delete error:", err);
            res.status(500).send({ message: "Serverda xatolik yuz berdi" });
        }
    }

}

export default userController;