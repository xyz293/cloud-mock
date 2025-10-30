import db from '../index.js'
const OrderController = {
   CreateOrder : (user_id,item_id,order_status,total_amount,pay_status,pay_method)=>{  //用来看做支付和下单情况
      return new Promise((resolve, reject) => {
        db.query('INSERT INTO order_msg (user_id,item_id,order_status,total_amount,pay_status,pay_method,pay_time,create_time,update_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)', [user_id,item_id,order_status,total_amount,pay_status,pay_method,new Date(),new Date(),new Date()], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve({
                code:200,
                message:'下单成功',
                data:'返回一个链接'
            });
          }
        });
      });
   },
   CreateOder_item : (user_id,product_id,quantity,price,total_price)=>{
      return new Promise((resolve, reject) => {
        db.query('INSERT INTO order_item (user_id,product_id,quantity,price,total_price,create_time,update_time) VALUES (?, ?, ?, ?, ?, ?, ?)', [user_id,product_id,quantity,price,total_price,new Date(),new Date()], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve({
                code:200,
                message:'订单商品添加成功',
            });
          }
        });
      });
   },
   createAddress: (user_id,user_nickname,address,phone,postcode)=>{
      return new Promise((resolve, reject) => {
        db.query('INSERT INTO address (user_id,user_nickname,address,phone,postcode,create_time,update_time) VALUES (?, ?, ?, ?, ?, ?, ?)', [user_id,user_nickname,address,phone,postcode,new Date(),new Date()], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve({
                code:200,
                message:'地址添加成功',
            });
          }
        });
      });
   }
}
export default OrderController