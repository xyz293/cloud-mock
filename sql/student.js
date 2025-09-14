const db = require('./index')
module.exports = {
    addStudent:(name,phone,email,department,major,student_no,gender,school_id,enrollment_year,status,create_time,update_time,userid)=>{
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO student (name,phone,email,department,major,student_no,gender,school_id,enrollment_year,status,create_time,update_time,userid) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [name,phone,email,department,major,student_no,gender,school_id,enrollment_year,status,create_time,update_time,userid], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    getSchool_student:(school_id)=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM student WHERE school_id = ?', [school_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    getStudent:(name)=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM student WHERE name = ?', [name], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    getMajor_student:(major)=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM student WHERE major = ?', [major], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    getDepartment_student:(department)=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM student WHERE department = ?', [department], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    delStudent:(student_id)=>{
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM student WHERE id = ?', [student_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    getMyStudent:(userid)=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM student WHERE userid = ?', [userid], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }
}