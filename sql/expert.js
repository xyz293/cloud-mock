const db = require('./index')
module.exports = {
    getSchool_expert:(id,department_id)=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM expert WHERE school_id = ? and department_id = ?', [id,department_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    specialization_class :(key)=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM expert where specialization = ?', [key], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    delete_expert:(id)=>{
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM expert WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    add_expert:(name,phone,email,specialization,title,company,address,avatar,school_id,status,remark,create_time,update_time)=>{
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO expert (name,phone,email,specialization,title,company,address,avatar,school_id,status,remark,create_time,update_time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [name,phone,email,specialization,title,company,address,avatar,school_id,status,remark,create_time,update_time], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }
}