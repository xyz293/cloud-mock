const db =require('./index');
module.exports = {
    gettag:()=>{
        return new Promise((resolve, reject) => {
            db.query('select * from company_tag', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }
}
