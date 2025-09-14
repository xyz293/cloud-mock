const express = require('express')
const router = express.Router()
const patent = require('../sql/patent')
router.get('/detail', async(req, res) => {
    try{
        const {id} = req.query
        const result = await patent.getDetail(id)
        if(result.length == 0){
            res.send({
                code: 400,
                msg: '专利不存在'
            })
        }
        else {
            res.send({
                code: 200,
                msg: '获取成功',
                data: result[0]
            })
        }
    }
    catch(err){
        res.send({
            code: 500,
            msg: '服务器错误'
        })
    }
})
router.get('/tagclass', async(req, res) => {
    try{
        const {key} = req.query
        const result = await patent.tagClass(key)
        if(result.length == 0){
            res.send({
                code: 400,
                msg: '专利不存在'
            })
        }
        else {
            res.send({
                code: 200,
                msg: '获取成功',
                data: result
            })
        }
    }
    catch(err){
        res.send({
            code: 500,
            msg: '服务器错误'
        })
    }
})
router.get('/list', async(req, res) => {   //这里是查询自己的专利列表
    try{
        const {owner_id} = req.query
        const result = await patent.getList(owner_id)
        if(result.length == 0){
            res.send({
                code: 400,
                msg: '专利不存在'
            })
        }
        else {
            res.send({
                code: 200,
                msg: '获取成功',
                data: result
            })
        }
    }
    catch(err){
        res.send({
            code: 500,
            msg: '服务器错误'
        })
    }
})
router.delete('/delete', async(req, res) => {   //这里是删除自己的专利
    try{
        const {id} = req.query
        const result = await patent.delete(id)
        if(result.length == 0){
            res.send({
                code: 400,
                msg: '专利不存在'
            })
        }
        else {
            res.send({
                code: 200,
                msg: '删除成功',
                data: result
            })
        }
    }
    catch(err){
        res.send({
            code: 500,
            msg: '服务器错误'
        })
    }
})
module.exports = router