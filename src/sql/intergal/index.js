import db from '../index.js'
const IntergalController = {
    CreateIntergal : (user_id,intergal)=>{
        return new Promise((resolve, reject) => {
           db.query('select * from user_integral where user_id = ?',[user_id],(err,results)=>{
            if (err) {
                reject(err);
            } else {
                if(results.length > 0){
                    resolve({
                        code:400,
                        message:'用户积分已存在',
                    });
                }
                else{
                    db.query('INSERT INTO user_integral (user_id,total_integral,created_at,updated_at) VALUES (?, ?, ?, ?)', [user_id,intergal,new Date(),new Date()], (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({
                                code:200,
                                message:'用户积分注册成功',
                            });
                        }
                    });
                }
            }
           })
        });
    },
    FindtypeIntergal: (type,integral_id)=>{
        return new Promise((resolve, reject) => {  //通过type和integral_id查询各类活动的积分
            db.query('select * from integral where type = ?  or integral_id = ?',[type,integral_id],(err,results)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    },
    updateIntergal: (user_id,intergal)=>{
        return new Promise((resolve, reject) => {
            db.query('update user_integral set total_integral = ? where user_id = ?',[intergal,user_id],(err,results)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        code:200,
                        message:'用户积分更新成功',
                    });
                }
            })
        })
    },
    findIntergal: (user_id)=>{
        return new Promise((resolve, reject) => {
            db.query('select * from user_integral where user_id = ?',[user_id],(err,results)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            })
        })
    },
    integralRule: (type,integral_id)=>{
        return new Promise((resolve, reject) => {
            db.query('select * from  integral where type = ? and integral_id = ?',[type,integral_id],(err,results)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            })
        })
    },
    setLog: (user_id,integral,action)=>{
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO integral_log (user_id,integral,action,create_time,update_time) VALUES (?, ?, ?, ?,?)', [user_id,integral,action,new Date(),new Date()], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        code:200,
                        message:'用户积分日志记录成功',
                    });
                }
            });
        });
    },
    findLog: (user_id)=>{
        return new Promise((resolve, reject) => {
            db.query('select * from integral_log where user_id = ?',[user_id],(err,results)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    },
}
export default IntergalController