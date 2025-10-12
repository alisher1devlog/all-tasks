import {app} from "./src/app.js"
import dotenv from "dotenv"
import pool from "./src/config/database.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
    try {
        await pool.query(`SELECT NOW()`);
        console.log(`Databasega ulanish tekshirildi!`);

        app.listen(PORT, ()=> {
            console.log(`Server running on port ${PORT}`);
        })
    } catch (err) {
        console.log(`Serverni ishga tushurishda xatolik!`,err);

    }
};

startServer();