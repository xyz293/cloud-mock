const db =require('./index')
module.exports = {
    get_news_list: ()=>{
        return new Promise((resolve, reject) => {
            db.query('select * from news', (err, result) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(result)
                }
            })
        })
    },
    get_news_detail: (id)=>{
        return new Promise((resolve, reject) => {
            db.query('select * from news where id = ?', [id], (err, result) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(result[0])
                }
            })
        })
    },
    search_news: (title)=>{
        return new Promise((resolve, reject) => {
            db.query('select * from news where title like ? or content like ? ', ['%'+title+'%','%'+title+'%'], (err, result) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(result)
                }
            })
        })
    },
    tag_news: (tag)=>{
        return new Promise((resolve, reject) => {
            db.query('select * from news where category  like ?', ['%'+tag+'%'], (err, result) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(result)
                }
            })
        })
    },
    create_favorite: (user_id,news_id,news_title,category,content,cover_url)=>{
        console.log(user_id,news_id,news_title,category,content,cover_url)
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO  news_favorite SET ?', {user_id,news_id,news_title,category,content,cover_url,create_time:new Date()}, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    get_new_favorite: (user_id)=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM  news_favorite WHERE user_id = ?', [user_id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    delete_favorite: (user_id,news_id)=>{
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM news_favorite WHERE user_id = ? AND news_id = ?', [user_id,news_id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    

}