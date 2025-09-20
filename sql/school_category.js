const db = require('./index');
module.exports ={
    getALL :()=>{
        return new Promise((resolve,reject)=>{
            db.query('select * from school_category',(err,result)=>{
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
