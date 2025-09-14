const db = require('./index')
module.exports = {
    getDetail: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM patent WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    tagClass : (key) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM patent WHERE classification = ?', [key], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    getList: (owner_id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM patent WHERE owner_id = ?', [owner_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM patent WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }
}