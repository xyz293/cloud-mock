const db = require('./index')
module.exports = {
   add_achievement:async (name,type,owner_type,owner,shcool_id,publish_time,status,description,file_url,avatar,create_time,update_time)=>{
         return new Promise((resolve,reject)=>{
            db.query('insert into achievement (name,type,owner_type,owner,shcool_id,publish_time,status,description,file_url,avatar,create_time,update_time) values (?,?,?,?,?,?,?,?,?,?,?,?)',[name,type,owner_type,owner,shcool_id,publish_time,status,description,file_url,avatar,create_time,update_time],(err,result)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(result)
                }
            })
         })
   },
   getShool_achievement:async (shcool_id)=>{ 
    return new Promise((resolve,reject)=>{
        db.query('select * from achievement where shcool_id = ?',[shcool_id],(err,result)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(result)
            }
        })
    })
   },
     // 1-专利, 2-论文, 3-软件著作权, 4-奖励, 5-其他',
    get_type:async (type,id)=>{
        return new Promise((resolve,reject)=>{
            db.query('select * from achievement where school_id = ? and type = ?',[id,type],(err,result)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(result)
                }
            })
        })
    },
     // 0-个人, 1-团队, 2-单位',
    get_owner_type:async (type,id)=>{
        return new Promise((resolve,reject)=>{
            db.query('select * from achievement where school_id = ? and owner_type = ?',[id,type],(err,result)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(result)
                }
            })
        })
    },
    delete_achievement:async (id)=>{
        return new Promise((resolve,reject)=>{
            db.query('delete from achievement where id = ?',[id],(err,result)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(result)
                }
            })
        })
    },
    getDetail:async (id)=>{
        return new Promise((resolve,reject)=>{
            db.query('select * from achievement where id = ?',[id],(err,result)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(result)
                }
            })
        })
    }
}