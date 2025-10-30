import express from 'express'
import ProductController from '../../sql/product/index.js'
const router = express.Router()
router.get('/list',async (req,res)=>{
   try{
     const {type,sort_type} = req.query
    const productlist = await ProductController.getProductlist(type,sort_type)
    res.json({
        code:200,
        message:'获取成功',
        data:productlist
    })
   }catch(err){
    res.json({
        success:false,
        message:'获取失败',
        data:err
    })
   }
})
router.get('/search',async (req,res)=>{
    try{
        const {keyword} = req.query
        const productlist = await ProductController.SearchProduct(keyword)
        res.json({
            code:200,
            message:'获取成功',
            data:productlist
        })
    }catch(err){
        res.json({
            success:false,
            message:'获取失败',
            data:err
        })
    }
})
router.get('/type',async (req,res)=>{
    try{
        const {type} = req.query
        const productlist = await ProductController.getType(type)
        res.json({
            code:200,
            message:'获取成功',
            data:productlist
        })
    }catch(err){
        res.json({
            success:false,
            message:'获取失败',
            data:err
        })
    }
})
router.get('/detail',async (req,res)=>{
    try{
        const {id} = req.query
        const product = await ProductController.getDetail(id)
        res.json({
            code:200,
            message:'获取成功',
            data:product
        })
    }catch(err){
        res.json({
            success:false,
            message:'获取失败',
            data:err
        })
    }
})
router.post('/create/order',async (req,res)=>{
    try{
        const {product_id,quantity,price,total_price,user_id} = req.body
        const product = await ProductController.Createorder(product_id,quantity,price,total_price,user_id)
        res.json({
            code:200,
            message:'创建成功',
            data:product
        })
    }catch(err){
        res.json({
            success:false,
            message:'创建失败',
            data:err
        })
    }
})
router.post('/create/address',async (req,res)=>{
    try{
        const {user_id,user_nickname,address,phone,postcode} = req.body
        const product = await ProductController.Createdeliver(user_id,user_nickname,address,phone,postcode)
        res.json({
            code:200,
            message:'创建成功',
            data:product
        })
    }catch(err){
        console.log(err)
        res.json({
            success:false,
            message:'创建失败',
            data:err
        })
    }
})
router.get('/myorder',async (req,res)=>{
    try{
        const {user_id} = req.query
        const product = await ProductController.getmyorder(user_id)
        res.json({
            code:200,
            message:'获取成功',
            data:product
        })
    }catch(err){
        console.log(err)
        res.json({
            success:false,
            message:'获取失败',
            data:err
        })
    }
})
export default router