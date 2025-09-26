const db =require('./index')
module.exports= {
    create_order: (user_id,product_id,product_name,product_price,quantity,status)=>{
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO product_order SET ?', {user_id,product_id,product_name,product_price,quantity,status,pay_time:new Date(),create_time:new Date(),update_time:new Date()}, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    get_person_order: (user_id)=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM product_order WHERE user_id = ?', [user_id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    del_order: (id)=>{
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM product_order WHERE product_id = ?', [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    update_status: (order_id,status)=>{
        return new Promise((resolve, reject) => {
            db.query('UPDATE product_order SET status = ? WHERE id = ?', [status,order_id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    create_favorite: (user_id,product_id,product_name,product_price)=>{
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO  favorite SET ?', {user_id,product_id,product_name,product_price,created_at:new Date(),updated_at:new Date()}, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    get_person_favorite: (user_id)=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM  favorite WHERE user_id = ?', [user_id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    del_favorite: (id)=>{
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM  favorite WHERE id = ?', [id], (err, result) => {
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
            db.query('SELECT * FROM  news_favorite WHERE user_id = ? ORDER BY created_at DESC', [user_id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
}
