const db = require('../sql/index')
module.exports = {
     getInformation:(id)=>{
        return new Promise((resolve,reject)=>{
            db.query('select * from information where id = ?',[id],(err,result)=>{
                if(err){
                    reject(err);
                }
                resolve(result);
            })
        })
     },
     getInformationAll:()=>{
        return new Promise((resolve,reject)=>{
            db.query('select * from information',(err,result)=>{
                if(err){
                    reject(err);
                }
                resolve(result);
            })
        })
     },
     gettype:(type)=>{
        return new Promise((resolve,reject)=>{
            db.query('select * from information where type = ?',[type],(err,result)=>{
                if(err){
                    reject(err);
                }
                resolve(result);
            })
        })
     },
     update:(id,title,content,type,state,author,extra_info,create_time,update_time)=>{
        return new Promise((resolve,reject)=>{
            db.query('update information set title = ?,content = ?,type = ?,state = ?,author = ?,extra_info = ?,create_time = ?,update_time = ? where id = ?',[title,content,type,state,author,extra_info,create_time,update_time,id],(err,result)=>{
                if(err){
                    reject(err);
                }
                resolve(result);
            })
        })
     },
     delete:(id)=>{
        return new Promise((resolve,reject)=>{
            db.query('delete from information where id = ?',[id],(err,result)=>{
                if(err){
                    reject(err);
                }
                resolve(result);
            })
        })
     },
    search: (keyword) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT * 
            FROM information 
            WHERE state = 1
              AND (
                    title LIKE ? 
                 OR content LIKE ? 
                 OR author LIKE ? 
                 OR extra_info LIKE ?
              )
        `;
        const likeKeyword = '%' + keyword + '%';
        db.query(sql, [likeKeyword, likeKeyword, likeKeyword, likeKeyword], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}

}