const express = require('express')
const router = express.Router()
const product = require('../sql/products')
router.get('/get_product_list',async (req, res) => {
    try{
        const result = await product.get_product_list()
        res.send({
            code: 200,
            msg: '查询成功',
            data: result
        })
    }
    catch(err){
        res.send({
            code: 500,
            msg: '查询失败'
        })
    }
})
router.get('/product_detail/:id',async (req, res) => {
    try{
        const {id} =req.params
        if(!id){
            res.json({
                code: 400,
                msg: '参数错误'
            })
        }
        const result = await product.get_product_detail(id)
        res.send({
            code: 200,
            msg: '查询成功',
            data: result
        })
    }
    catch(err){
        res.send({
            code: 500,
            msg: '查询失败'
        })
    }
})
router.post('/product_search',async (req, res) => {
    try{
        const {keyword} = req.body
        if(!keyword){
            res.json({
                code: 400,
                msg: '参数错误'
            })
        }
        const result = await product.product_search(keyword)
        res.send({
            code: 200,
            msg: '查询成功',
            data: result
        })
    }
    catch(err){
        res.send({
            code: 500,
            msg: '查询失败'
        })
    }
})
router.post('/select_tags',async (req, res) => {
    try{
        const {category,brand,color,rating,price} = req.body
        if(!category && !brand && !color && !rating && !price){
            res.json({
                code: 400,
                msg: '参数错误'
            })
        }
        const result = await product.tags(category,brand,color,rating,price)
        res.send({
            code: 200,
            msg: '查询成功',
            data: result
        })
    }
    catch(err){
        res.send({
            code: 500,
            msg: '查询失败'
        })
    }
})
module.exports =router