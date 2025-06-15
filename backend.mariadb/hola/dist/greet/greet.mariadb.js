import mariadb from 'mariadb';
import * as dotenv from 'dotenv';
dotenv.config();
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    connectionLimit: 5
});
export class GreetService {
    async getAll() {
        const conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM regards');
        conn.release();
        return rows;
    }
    async getById(id) {
        const conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM regards WHERE id = ?', [id]);
        conn.release();
        return rows[0];
    }
    async insert(greet, language) {
        const conn = await pool.getConnection();
        const result = await conn.query('INSERT INTO regards (greet, language) VALUES (?, ?)', [greet, language]);
        conn.release();
        return result;
    }
}
