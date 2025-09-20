const db = require('./index');
module.exports = {
    verification: (student_id,student_name,university_name,college_name,grade)=>{
          return  new Promise((resolve, reject) => {
            db.query('insert into university_verification (student_id,student_name,university_name,college_name,grade,create_time,update_time   ) values (?,?,?,?,?,now(),now())', [student_id,student_name,university_name,college_name,grade], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    getVerification: (student_id,university_name,college_name)=>{
        return new Promise((resolve, reject) => {
            db.query('select * from university_verification where student_id = ? and university_name = ? and college_name = ?', [student_id,university_name,college_name], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            })
        })
    }
}