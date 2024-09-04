import mysql from 'mysql2/promise'
import 'dotenv/config';

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
})

//Get  All Users
export async function getUsers(){
    const [rows] = await  pool.query(
        "SELECT * FROM users"
        )
    return rows;
}

export async function getUser(id){
    const [rows] = await  pool.query(
        "SELECT * FROM users WHERE user_id = ?", [id]
        );
    return rows[0];
}

export async function createUser(firstName, lastName, email, userName){
    const [result] = await pool.query(
        `INSERT INTO users (first_name, last_name, email, user_name) 
         VALUES (?, ?, ?, ?)`, 
         [firstName, lastName, email, userName]);
        const newUserId = result.insertId;
        return getUser(newUserId);
}

