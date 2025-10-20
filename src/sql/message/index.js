import db from '../index.js';
const messageController = {
   getUnread : (user_id)=>{
      return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user_msg WHERE user_id= ? AND read = 0', [user_id], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
   },
   updateRead : (user_id,id)=>{
      return new Promise((resolve, reject) => {
        db.query('UPDATE user_msg SET read = 1 WHERE id = ? and user_id = ?', [id,user_id], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve({
                success:true,
                message:'更新成功'
            });
          }
        });
      });
   },
   getAll : (user_id)=>{
      return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user_msg WHERE user_id= ?', [user_id], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
   },
   delete : (user_id,id)=>{
      return new Promise((resolve, reject) => {
        db.query('DELETE FROM user_msg WHERE id = ? and user_id = ?', [id,user_id], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve({
                success:true,
                message:'删除成功'
            });
          }
        });
      });
   },
   Aimessage : (user_id)=>{
      return new Promise((resolve, reject) => {
        db.query('SELECT * FROM chat_message WHERE user_id= ?', [user_id], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve({
               
                message:'获取成功',
                data:results
            });
          }
        });
      });
   },
   SaveMessage : (user_id,role,content,create_time,update_time)=>{
      return new Promise((resolve, reject) => {
        db.query('INSERT INTO chat_message (user_id, role, content, create_time,update_time) VALUES (?, ?, ?, ?,?)', [user_id, role, content, new Date(),new Date()], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve({
                success:true,
                message:'保存成功'
            });
          }
        });
      });
   }
}
export default messageController;