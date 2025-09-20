const db = require('./index');
module.exports = {
   course_Content: (courseId) => {   
      return new Promise((resolve, reject) => {
         db.query('select * from course_content where id = ?', [courseId], (err, result) => {
            if (err) {
               reject(err);
            } else {
               resolve(result[0]);
            }
         })
      })
   },
   getDetail_Content: (title) => {
      return new Promise((resolve, reject) => {
         db.query('select * from course_content where title = ?', [title], (err, result) => {
            if (err) {
               reject(err);
            } else {
               resolve(result);
            }
         })
      })
   }
}
