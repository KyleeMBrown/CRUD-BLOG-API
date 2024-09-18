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

//Get User by id (user_id)
export async function getUser(id){
    const [rows] = await pool.query(
        'SELECT * FROM users WHERE user_id = ? LIMIT 1', [id]
        );
    return rows[0] || null;
    
}

//CREATE A USER IN THE DATABASE
export async function createUser(firstName, lastName, email, userName){
    const [result] = await pool.query(
        `INSERT INTO users (first_name, last_name, email, user_name) 
         VALUES (?, ?, ?, ?)`, 
         [firstName, lastName, email, userName]);
        const newUserId = result.insertId;
        return getUser(newUserId);
}

//DELETE A USER FROM THE DATABASE

export async function deleteUser(id){
    const [result] = await pool.query(
        'DELETE FROM users WHERE user_id = ?', [id])
        return result
}

//UPDATE USERNAME BY ID
export async function updateUser(id, newUserName){
    const [result] = await pool.query(
        `UPDATE users
        SET user_name = ?
        WHERE user_id = ?`, [newUserName, id])
        return result
}


//DEBUG
//async function testGetUser() {
//    try {
//        const user = await getUser(1); // Call the function with the user ID
//       console.log(user); // Log the result
//    } catch (err) {
//        console.error('Error fetching user:', err); // Log an error if it occurs
//    }
//}

//testGetUser();
