const db =require('./index')
module.exports = {
    getOnemessage :(id)=>{
        return new Promise((resolve,reject)=>{
            db.query('SELECT * FROM messages WHERE receiver_id = ?',[id],(err,result)=>{
                if(err){
                    reject(err)
                }
                resolve(result)
            })
        })
    },
    sendMessage:(sendid,receiveid,content)=>{
        return new Promise((resolve,reject)=>{
            db.query('INSERT INTO messages SET ?',[{
                sender_id:sendid,
                receiver_id:receiveid,
                content:content,
                create_time:new Date()
            }],(err,result)=>{
                if(err){
                    reject(err)
                }
                resolve(result)
            })
        })
    },
    getDetail:(sendid,receiveid)=>{
        return new Promise((resolve,reject)=>{
            db.query('SELECT * FROM messages WHERE sender_id = ? AND receiver_id = ?',[sendid,receiveid],(err,result)=>{
                if(err){
                    reject(err)
                }
                resolve(result)
            })
        })
    }
}
