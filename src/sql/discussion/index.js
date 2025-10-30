import db from '../index.js'
const DiscussionController = {
   getAllDiscussion: ()=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM discussion', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
   },
   getDiscussionType: (id)=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM discussion WHERE discussion_type = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
   },
SearchDiscussion: (keyword) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM discussion WHERE discussion_type LIKE ? OR author LIKE ? OR description LIKE ? OR title LIKE ?',
            [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            }
        );
    });
},
   getDiscussionTypes: ()=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM discussion_type ', [], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
   },
   updateViewCount: (discussion_id,view_count)=>{
        return new Promise((resolve, reject) => {
            db.query('UPDATE discussion SET view_num = ? WHERE id = ?', [view_count,discussion_id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
   },
   updateLikeCount: (discussion_id,like_count)=>{
        return new Promise((resolve, reject) => {
            db.query('UPDATE discussion SET like_num = ? WHERE id = ?', [like_count,discussion_id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
},
    getCommentsByDiscussionId: (discussion_id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM discussion_comment WHERE id = ?', [discussion_id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
},
      getChildComments: (parent_comment_id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM discussion_comment WHERE parent_id = ?', [parent_comment_id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
},
       getDetailDiscussion: (discussion_id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM discussion WHERE id = ?', [discussion_id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
}
}
export default DiscussionController