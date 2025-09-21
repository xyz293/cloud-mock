const express = require('express')
const router = express.Router()
const tags = require('../sql/tags')
router.get('/news',async (req, res) => {
    try{
        const result = await tags.get_news()
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
router.get('/policy',async (req, res) => {
    try{
        const result = await tags.get_policy()
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
router.get('/product',async (req, res) => {
    try{
        const result = await tags.get_product()
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
router.get('/product_brand_tags',async (req, res) => {
    try{
        const result = await tags.get_product_brand_tags()
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
router.get('/product_color_tags',async (req, res) => {
    try{
        const result = await tags.get_product_color_tags()
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
router.get('/product_price_tags',async (req, res) => {
    try{
        const result = await tags.get_product_price_tags()
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
router.get('/product_rating_tags',async (req, res) => {
    try{
        const result = await tags.get_product_rating_tags()
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

module.exports = router