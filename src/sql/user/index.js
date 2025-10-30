import db from '../index.js';
const userController = {
    getCode:  (identifier,code) => {
       return new Promise((resolve, reject) => {
        db.query('insert into verification_code (identifier,code) values (?,?)', [identifier, code], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve('success');
            }
        });
       })
    },
    Register:  (username, password,nickname,code) => {
        return new Promise((resolve, reject) => {
           db.query('select * from verification_code where identifier = ? and code = ?', [username, code], (err, results) => {
                       if(results.length){
                           db.query('insert into users (username,password,nickname) values (?,?,?)', [username, password,nickname], (err, results) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve('success');
                }
            });
        }
        });
        })
    },
    Login:  (username, password,nickname) => {
        return new Promise((resolve, reject) => {
            db.query('select * from users where username = ? and password = ? and nickname = ?', [username, password,nickname], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                   db.query('delete from verification_code where identifier = ?', [username], (err, results1) => {
                        if (err) {
                            reject(err);
                        } 
                        else {
                            resolve(results[0]);
                        }
                    });
                }
            });
        })
    },
    postSign:  (user_id) => {
        return new Promise((resolve, reject) => {
            db.query('insert into user_sign (user_id,sign_date,create_time) values (?,?,?)', [user_id,new Date(),new Date()], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(
                        {
                            message: 'success',
                            code: 200,
                        }
                    );
                }
            });
        })
    },
    Finduser :(id)=>{
        return new Promise((resolve, reject) => {
            db.query('select * from users where id = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            })
        })
    }

}
export default userController;