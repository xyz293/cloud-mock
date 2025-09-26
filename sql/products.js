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
            db.query('SELECT * FROM products WHERE name LIKE ? or category like? or description like ? or brand like ?', ['%' + key + '%','%' + key + '%','%' + key + '%','%' + key + '%'], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
   tags: (category, brand, color, rating, pricemain,pricemax) => {
    console.log( brand)
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * 
      FROM products 
      WHERE (category = ? OR brand = ? OR color = ? OR rating = ?)
        or price BETWEEN ? AND ?
    `;
    const params = [category, brand, color, rating, pricemain,pricemax];

    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      else {
        console.log(result)
        resolve(result);
      }
    });
  });
}

}