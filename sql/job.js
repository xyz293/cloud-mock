const db = require('./index');
module.exports = {
    get_Department_Job: (id,company_id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM job WHERE department_id = ? and company_id =?', [id,company_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    search_Job: (key) => {  //通过各个type去查询岗位信息
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM job WHERE  type like ? or description like ? or title like ?', ['%'+key+'%','%'+key+'%','%'+key+'%'], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    get_list: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM job', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    delete_Job: (id) => {   
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM job WHERE  id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }
}