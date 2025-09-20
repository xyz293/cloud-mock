const db = require('./index');
module.exports ={
    getCourseTag: ()=>{
        return new Promise((resolve,reject)=>{
            db.query('select * from tag',[],(err,result)=>{
                if(err){
                    reject(err);
                }
                else {
                    resolve(result);
                }
            })
        })
    }
}