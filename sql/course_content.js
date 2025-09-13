const db = require('./index');
module.exports = {
   course_Content: (courseId,universityId) => {   
      return new Promise((resolve, reject) => {
         db.query('select * from course_content where course_id = ?  and university_id = ?', [courseId,universityId], (err, result) => {
            if (err) {
               reject(err);
            } else {
               resolve(result);
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
