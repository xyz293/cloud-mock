const db=require('./index')
module.exports= {
    get_product_list: ()=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM products', (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    get_product_detail: (id)=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM products WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result[0])
                }
            })
        })
    },
    search_product: (key)=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM products WHERE name LIKE ? or category like? or description ?like  ', ['%' + key + '%','%' + key + '%','%' + key + '%'], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    tags: (category,brand,color,rating,price)=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM products where category =? or brand =? or color =?  or rating  =? or price =?',[category,brand,color,rating,price], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
}