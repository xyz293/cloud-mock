const db =require('./index');
module.exports = {
    addCompany: (name, logo,description,contact,address,state,create_time,update_time,email,website,industry,type,scale) => {
        return new Promise((resolve, reject) => {
            db.query('insert into company (name, logo, description,contact,address,state,create_time,update_time,email,website,industry,type,scale,content) values (?,?,?,?,?,?,?,?,?,?,?,?,?)', [name, logo, description,contact,address,state,create_time,update_time,email,website,industry,type,scale,content], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    deleteCompany: (id) => {
        return new Promise((resolve, reject) => {
            db.query('delete from company where id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    getCompanyDetail: (id) => {  //不是company的字段数据库   使用的是department
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
    updateCompany: (id, name, logo,description,contact,address,state,create_time,update_time,email,website,industry,type,scale) => {
        return new Promise((resolve, reject) => {
            db.query('update company set name = ?, logo = ?, description = ?,contact = ?,address = ?,state = ?,create_time = ?,update_time = ?,email = ?,website = ?,industry = ?,type = ?,scale = ? where id = ?', [name, logo, description,contact,address,state,create_time,update_time,email,website,industry,type,scale,id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    tag: (tag) => {
        return new Promise((resolve, reject) => {
            db.query('select * from company where industry like ?', ['%' + tag + '%'], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    search: (keyword) => {
        return new Promise((resolve, reject) => {
            db.query('select * from company where name like ? or industry like ? or address like ? or description like ?', ['%' + keyword + '%','%' + keyword + '%','%' + keyword + '%','%' + keyword + '%'], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query('select * from company', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    getDetail: (id) => {
        return new Promise((resolve, reject) => {
            db.query('select * from company where id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            })
        })
    }
}