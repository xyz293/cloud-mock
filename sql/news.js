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
            db.query('select * from news where tag  like ?', ['%'+tag+'%'], (err, result) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(result)
                }
            })
        })
    }

}