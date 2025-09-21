const db=require('./index')
module.exports={
    get_news: ()=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM news_tags', (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    get_policy: ()=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM policy_tags', (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    get_product: ()=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM product_tags', (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    get_product_brand_tags: ()=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM product_brand_tags', (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    get_product_color_tags: ()=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM product_color_tags', (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    get_product_price_tags: ()=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM product_price_tags', (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    get_product_rating_tags: ()=>{
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM product_rating_tags', (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
}