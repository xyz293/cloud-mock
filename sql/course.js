const db = require('./index');   //这是在学院里面进行的查询
module.exports = {
    getcollege_course: (id,usid) => {
        return new Promise((resolve, reject) => {
            db.query('select * from course where college_id = ? and university_id = ?',[id,usid], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    getuniversity_course: (id) => {
        return new Promise((resolve, reject) => {
            db.query('select * from course where university_id = ?',[id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    search: (keyword,id)=>{
        return new Promise((resolve, reject) => {
            db.query('select * from course where name like ? and university_id = ?',['%'+keyword+'%',id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    addcourse: (name,college_id,university_id,description,code,create_time,update_time) => {
        return new Promise((resolve, reject) => {
            db.query('insert into course (name,college_id,university_id,description,code,create_time,update_time) values (?,?,?,?,?,?,?)',[name,college_id,university_id,description,code,create_time,update_time], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    deletecourse: (id) => {
        return new Promise((resolve, reject) => {
            db.query('delete from course where id = ?',[id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    tag: (tag,id) => {
        return new Promise((resolve, reject) => {
            db.query('select * from course where course_id = ? and college_name = ?',[id,tag], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        }) 
    }
}
