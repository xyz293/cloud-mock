const db = require('./index');
module.exports = {
  getCollegeAll: ()=>{
      return new Promise((resolve,reject)=>{
        db.query('select * from university',(err,result)=>{
            if(err){
                reject(err);
            }
            else {
                resolve(result);
            }
        })
      })
  },
  getCollegeById: (id)=>{
    return new Promise((resolve,reject)=>{
      db.query('select * from university where id = ?',[id],(err,result)=>{
        if(err){
          reject(err);
        }
        else {
          resolve(result);
        }
      })
    })
  },
  searchCollege: (keyword)=>{
    return new Promise((resolve,reject)=>{
      db.query('select * from university where name like ? or university_type like ? or address like ?  extra_info like ?',['%'+keyword+'%','%'+keyword+'%','%'+keyword+'%','%'+keyword+'%'],(err,result)=>{
        if(err){
          reject(err);
        }
        else {
          resolve(result);
        }
      })
    })
  },
  deleteCollege: (id)=>{
    return new Promise((resolve,reject)=>{
      db.query('delete from university where id = ?',[id],(err,result)=>{
        if(err){
          reject(err);
        }
        else {
          resolve(result);
        }
      })
    })
  },
  addCollege: (name,university_type,address,extra_info,state,create_time,update_time,website,video_url)=>{
    return new Promise((resolve,reject)=>{
      db.query('insert into university (name,university_type,address,extra_info,state,create_time,update_time,website,video_url) values (?,?,?,?,?,?,?)',[name,university_type,address,extra_info,state,create_time,update_time,website,video_url],(err,result)=>{
        if(err){
          reject(err);
        }
        else {
          resolve(result);
        }
      })
    })
  },
}
