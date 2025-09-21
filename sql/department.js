const db = require('./index');
module.exports ={
    getDepartment: (id) => {
        return new Promise((resolve, reject) => {
            db.query('select * from department where company_id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    addDepartment: (company_id,name,description,manager,state,create_time,update_time) => {
        return new Promise((resolve, reject) => {
            db.query('insert into department (company_id,name,description,manager,state,create_time,update_time) values (?, ?,?,?, ?, ?, ?)', [company_id,name,description,manager,state,create_time,update_time], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    updateDepartment: (id, company_id,name,description,manager,state,create_time,update_time) => {
        return new Promise((resolve, reject) => {
            db.query('update department set company_id = ?,name = ?,description = ?,manager = ?,state = ?,create_time = ?,update_time = ? where id = ?', [company_id,name,description,manager,state,create_time,update_time,id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    deleteDepartment: (id) => {
        return new Promise((resolve, reject) => {
            db.query('delete from department where id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    getDpartmentDetail: (id,company_id) => {
        return new Promise((resolve, reject) => {
            db.query('select * from department where id = ? and company_id = ?', [id,company_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            })
        })
    }
}