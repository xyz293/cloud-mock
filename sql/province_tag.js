const db = require('./index');
module.exports = {
    getALL: ()=>{
        return new Promise((resolve,reject)=>{
            db.query('select * from region_tags',(err,result)=>{
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