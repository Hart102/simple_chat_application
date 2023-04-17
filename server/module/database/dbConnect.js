const mysql = require('mysql')
const dbConnect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: "mtn-chat-app6"
})
dbConnect.connect((err) => {
    if (err) return console.log("Connection Timed Out!")
    console.log("Database Connected Successfully")  
})

// Database activities
const createUser = `INSERT INTO users(username, password, role) VALUES (?, ?, ?)`
const createMessage = `INSERT INTO messages(message, sender_id, sender_name, role) VALUES (?, ?, ?, ?)`
const SelectAllMessages = `SELECT * FROM messages`
const deleteMessage = (id) => `DELETE FROM messages WHERE id = '${id}'`

module.exports = {
    dbConnect, createUser,
    createMessage, SelectAllMessages,
    deleteMessage
}





// CREATE TABLE `users` ( `id` int(11) NOT NULL, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role` varchar(255) NOT NULL ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;