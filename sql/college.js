const db = require('./index');
module.exports = {
    getCollegeDetail: (id) => {
        return new Promise((resolve, reject) => {
            db.query('select * from college where university_id = ?',[id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    deleteCollege: (id) => {
        return new Promise((resolve, reject) => {
            db.query('delete from college where id = ?',[id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
}
