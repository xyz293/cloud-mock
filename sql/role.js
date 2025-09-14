const db = require('./index')
module.exports = {
    setRole : (name,description,create_time,update_time)=>{
        return new Promise((resolve,reject)=>{
            db.query('insert into role (name,description,create_time,update_time) values (?,?,?,?)',[name,description,create_time,update_time],(err,result)=>{
                if(err){
                    reject(err)
                }else {
                    resolve(result)
                }
            })
        })
    }
}