const center =require('../sql/person_center')
const express = require('express')
const router = express.Router()
router.post('/create_order',async (req,res)=>{
   try{
     const {user_id,product_id,product_name,product_price,quantity,status} = req.body
     console.log(user_id,product_id,product_name,product_price,quantity,status)
     if(!user_id || !product_id || !product_name || !product_price || !quantity || !status){
        res.json({code:400,msg:'参数错误'})
        return
     }
     else {
        const result = await center.create_order(user_id,product_id,product_name,product_price,quantity,status)
        if(result){
          res.json({code:200,msg:'创建成功'})
        }
        else {
            res.json({code:400,msg:'创建失败'})
        }
     }
   }catch(err){
    console.log(err)
    res.json({code:500,msg:'创建失败'})
   }
})
router.delete('/del_order/:id',async (req,res)=>{
     try{
        const {id} = req.params
        if(!id){
            res.json({code:400,msg:'参数错误'})
            return
        }
        else {
            const result = await center.del_order(id)
            if(result){
                res.json({
                    code:200,
                    msg:'删除成功',
                })
            }
            else {
                res.json({
                    code:400,
                    msg:'删除失败',
                })
            }
        }
     }catch(err){
        console.log(err)
        res.json({code:500,msg:'删除失败'})
     }
})
router.get('/person_order/:id',async (req,res)=>{
   try{
    const {id} =req.params
    if(!id){
        res.json({
            code:400,
            msg:'参数错误',
        })
    }
    else {
        const result = await center.get_person_order(id)
        if(result){
            res.json({
                code:200,
                msg:'获取成功',
                data:result
            })
        }
        else {
            res.json({
                code:400,
                msg:'获取失败',
            })
        }
    }
   }catch(err){
    console.log(err)
    res.json({code:500,msg:'获取失败'})
   }
})
router.put('/status',async (req,res)=>{
    try{
        const {id,status} = req.body
        if(!id || !status){
            res.json({
                code:400,
                msg:'参数错误',
            })
        }
        else {
            const result = await center.update_order_status(id,status)
            if(result){
                res.json({
                    code:200,
                    msg:'更新成功',
                })
            }
            else {
                res.json({
                    code:400,
                    msg:'更新失败',
                })
            }
        }
    }catch(err){
        console.log(err)
        res.json({code:500,msg:'更新失败'})
    }
})
router.post('/create_favorite',async (req,res)=>{
    try{
        const {user_id,product_id,product_name,product_price} = req.body
        if(!user_id || !product_id || !product_name || !product_price){
            res.json({
                code:400,
                msg:'参数错误',
            })
        }
        else {
            const result = await center.create_favorite(user_id,product_id,product_name,product_price)
            if(result){
                res.json({
                    code:200,
                    msg:'创建成功',
                })
            }
            else {
                res.json({
                    code:400,
                    msg:'创建失败',
                })
            }
        }
    }catch(err){
        console.log(err)
        res.json({code:500,msg:'创建失败'})
    }
})
router.get('/person_favorite/:id',async (req,res)=>{
    try{
        const {id} = req.params
        if(!id){
            res.json({
                code:400,
                msg:'参数错误',
            })
        }
        else {
            const result = await center.get_person_favorite(id)
            if(result){
                res.json({
                    code:200,
                    msg:'获取成功',
                    data:result
                })
            }
            else {
                res.json({
                    code:400,
                    msg:'获取失败',
                })
            }
        }
    }catch(err){
        console.log(err)
        res.json({code:500,msg:'获取失败'})
    }
})
router.delete('/del_favorite/:id',async (req,res)=>{
    try{
        const {id} = req.params
        if(!id){
            res.json({
                code:400,
                msg:'参数错误',
            })
        }
        else {
            const result = await center.del_favorite(id)
            if(result){
                res.json({
                    code:200,
                    msg:'删除成功',
                })
            }
            else {
                res.json({
                    code:400,
                    msg:'删除失败',
                })
            }
        }
    }catch(err){
        console.log(err)
        res.json({code:500,msg:'删除失败'})
    }
})
module.exports = router
