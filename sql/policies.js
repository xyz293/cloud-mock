const db =require('./index');
module.exports ={
    get_list: ()=>{
        return new Promise((resolve,reject)=>{
            db.query('select * from policies',(err,result)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(result)
                }
            })
        })
    },
    get_detail: (id)=>{
        return new Promise((resolve,reject)=>{
            db.query('select * from policies where id = ?',[id],(err,result)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(result[0])
                }
            })
        })
    },
    search: (key)=>{
        return new Promise((resolve,reject)=>{
            db.query('select * from policies where title like ? or content like ?',['%'+key+'%','%'+key+'%'],(err,result)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(result)
                }
            })
        })
    },
    get_comments:(id)=>{
        return new Promise((resolve,reject)=>{
            db.query('select * from policy_comments where policy_id = ?',[id],(err,result)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(result)
                }
            })
        })
    },
    like_count:(id,policy_id)=>{
        return new Promise((resolve,reject)=>{
            db.query('update policy_comments set like_count = like_count + 1 where id = ? and policy_id =?',[id,policy_id],(err,result)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(result)
                }
            })
        })
    },
    add_comment:(policy_id,user_name,content,like_count)=>{
        return new Promise((resolve,reject)=>{
            db.query('insert into policy_comments (policy_id,user_name,content,like_count,create_time) values (?,?,?,?,now())',[policy_id,user_name,content,like_count],(err,result)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(result)
                }
            })
        })
    },

}