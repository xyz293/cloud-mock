const db = require('./index')
module.exports = {
    sendDeliver :(user_id,job_id,state,resume_url)=>{
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO application (user_id,job_id,state,resume_url,create_time,update_time) VALUES (?,?,?,?,now(),now())', [user_id,job_id,state,resume_url], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    getmylist_application:(user_id)=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM application WHERE user_id = ?', [user_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    company_getlist_application:(company_id,department_id,job_id)=>{ //根据自己是哪个部门的去查看简历
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM application WHERE job_id =? and company_id = ? and department = ?', [job_id,company_id,department_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    company_update_application:(company_id,department_id,job_id,user_id,state)=>{ //根据自己是哪个部门的去查看简历
        return new Promise((resolve, reject) => {
            db.query('UPDATE application SET state = ? WHERE job_id =? and company_id = ? and department = ? and user_id = ?', [state,job_id,company_id,department_id,user_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

}