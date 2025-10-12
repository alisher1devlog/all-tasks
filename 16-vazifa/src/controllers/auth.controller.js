import { json } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

const authController = {
    register: async (req, res, next) => {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res
                    .status(400)
                    .json({ message: `Name , email va password bo'lishi shart` })
            }

            const newUser = await userModel.create(name, email, password);

            res.status(201).json(newUser)
        } catch (err) {
            next(err)
        }
    },
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await userModel.getByEmail(email);

            if (!user) {
                return res.status(401).json({
                    succes: false,
                    message: `Email yoki parol natog'ri`
                });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401), json({
                    succes: false,
                    message: `Email yoki parol notog'ri`
                });
            }
            const { password: _, ...userWithoutPassword } = user;

            res.status(200).json({
                success: true,
                message: 'Muvaffaqiyatli tizimga kirildi',
                data: userWithoutPassword
            });
        } catch (err) {
            next(err);
        }
    }
}

export default authController;