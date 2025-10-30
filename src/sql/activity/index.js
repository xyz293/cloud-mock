import db from '../index.js'
const activityController = {
   getlist: ()=>{
      return new Promise((resolve, reject) => {
        db.query('SELECT * FROM activity', (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
   },
   getDetail: (id)=>{
      return new Promise((resolve, reject) => {
        db.query('SELECT * FROM activity WHERE id = ?', [id], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results[0]);
          }
        });
      });
   },
   join: (activity_id,user_id)=>{
      return new Promise((resolve, reject) => {
        db.query('SELECT * FROM sign_up WHERE activity_id = ? AND user_id = ?', [activity_id, user_id], (err, results) => {
          if (err) {
            reject(err);
          } else {
            if(results.length > 0){
                resolve({
                    code:400,
                    message:'已报名',
                });
            }
            else{
               db.query('INSERT INTO sign_up (activity_id, user_id,sign_time,status) VALUES (?, ?,?,?)', [activity_id, user_id,new Date(),1], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve({
                code:200,
                message:'报名成功',
            });
          }
        });
            }
          }
        });
      });
   },
   getHoror: (user_id,type)=>{  //type 2为比赛
           return new Promise((resolve, reject) => {
               db.query('SELECT * FROM honor WHERE userID = ? or type=?', [user_id,type], (err, results) => {
                   if (err) {
                       reject(err);
                   } else {
                       resolve(results);
                   }
               })
           })
       }
}
export default activityController