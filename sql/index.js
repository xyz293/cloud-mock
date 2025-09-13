const mysql = require('mysql2');
const config = require('../config/default');
const db = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
});
module.exports = db;
