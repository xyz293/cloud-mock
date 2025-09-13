const db = require('./index');
module.exports = {
    getCourseComment: (courseId) => {
        return new Promise((resolve, reject) => {
            db.query('select * from course_comment where course_id = ?', [courseId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    add_Comment: (course_id,user_id,content,create_time,update_time,username) => {
        return new Promise((resolve, reject) => {
            db.query('insert into course_comment (course_id, user_id, content, create_time, update_time, username) values (?,?,?,?,?,?)', [course_id,user_id,content,create_time,update_time,username], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    delete_Comment: (id) => {
        return new Promise((resolve, reject) => {
            db.query('delete from course_comment where id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }
}