import db from '../index.js'
const SportController = {
    Createrunning: ()=>{
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO running_records (user_id,name,start_time,duration,distance,calories) VALUES (?, ?, ?, ?,?,?)', [user_id,name,start_time,duration,dis_tance,calories], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        code:200,
                        message:'创建成功'
                    });
                }
            })
        })
    },
    CreateData: (user_id,total_distance,total_duration,total_calories)=>{
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO running_data (user_id,total_distance,total_duration,total_calories,create_time,update_time) VALUES (?, ?, ?, ?,?,?)', [user_id,total_distance,total_duration,total_calories,new Date(),new Date()], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        code:200,
                        message:'创建成功'
                    });
                }
            })
        })
    },
}
export default SportController