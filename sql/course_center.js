const db = require('./index');

// 查询用户的课程中心
module.exports = {
  course_Center: (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM course_center WHERE user_id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0]);
            }
        });
    });
},

// 插入课程
 insert:( user_id, name, image, code, type, university_id, college_id, state, description, college_name )=> {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO course_center
            (user_id, name, image, code, type, university_id, college_id, state, description, college_name, create_time, update_time)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;
        db.query(sql, [user_id, name, image, code, type, university_id, college_id, state, description, college_name], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

}
