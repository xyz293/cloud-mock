const db = require('./index');
module.exports = {
    regiser:(password,phone,nickname,code)=>{
        console.log(password,phone,nickname,code);
        return new Promise((resolve, reject) => {
            db.query('select * from code where phone=? and code =?', [phone, code], (err,result) => {
                if (err) {
                    reject(err);
                    console.log(err);
                } 
                if(result){
                    db.query('INSERT INTO user (password,phone,nickname) VALUES (?, ?,?)', [password,phone,nickname], (err,result) => {
                        if (err) {
                            reject(err);
                        } 
                        resolve(result);
                    })
                }
            })
        })
    },
    login:(phone,password)=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE phone = ? AND password = ?', [phone, password], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    getInfo:(phone)=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE phone = ?', [phone], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    updatepassword:(phone,password)=>{
        return new Promise((resolve, reject) => {
            db.query('UPDATE user SET password = ? WHERE phone = ?', [password, phone], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    getuserlist:()=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    updatenickname:(phone,nickname)=>{
        return new Promise((resolve, reject) => {
            db.query('UPDATE user SET nickname = ? WHERE phone = ?', [nickname, phone], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }
    ,
    updatephone:(phone,newphone)=>{
        return new Promise((resolve, reject) => {
            db.query('UPDATE user SET phone = ? WHERE phone = ?', [newphone, phone], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    updateavatar:(phone,avatar)=>{
        return new Promise((resolve, reject) => {
            db.query('UPDATE user SET avatar = ? WHERE phone = ?', [avatar, phone], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    getone:(id)=>{   //后台根据id查询用户
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    getmyinfo:(id)=>{   //根据id查询用户信息
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    bindaffiliation:(id,affiliation)=>{   //绑定用户组织
        return new Promise((resolve, reject) => {
            db.query('UPDATE user SET affiliation = ? WHERE id = ?', [affiliation, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    sendcode:(phone,code)=>{
        return new Promise((resolve, reject) => {
            db.query('insert into code (phone,code) values (?,?)', [phone,code], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
   
}