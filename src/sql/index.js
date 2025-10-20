import config from '../config/index.js'
import mysql from 'mysql2'
const db  = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
})
export default db