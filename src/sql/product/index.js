import db from '../index.js'
const ProductController = {
    getProductlist : ()=>{
        return new Promise((resolve, reject) => {
          db.query('SELECT * FROM product ', [], (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
     },
     SearchProduct: (keyword) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM product WHERE name LIKE ? or description LIKE ?', [`%${keyword}%`,`%${keyword}%`], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    getType: (type) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM product WHERE type = ?', [type], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    getDetail: (id)=>{
      return new Promise((resolve, reject) => {
        db.query('SELECT * FROM product WHERE id = ?', [id], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results[0]);
          }
        });
    })
},
      Createorder: (product_id,quantity,price,total_price,user_id) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO order_item SET ?', [{
                product_id,
                quantity,
                price,
                total_price,
                user_id,
                create_time: new Date(),
                update_time: new Date()
            }], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },
    Createdeliver: (user_id,user_nickname,address,phone,postcode) => {
        return new Promise((resolve,reject)=>{
            db.query('INSERT INTO deliver SET ?', [{
                user_id,
                user_nickname,
                address,
                phone,
                postcode,
                create_time: new Date(),
                update_time: new Date()
            }], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        })
          
    },
    getmyorder: (user_id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM order_item WHERE user_id = ?', [user_id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

}
export default ProductController