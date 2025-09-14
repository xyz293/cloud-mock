const express = require('express');
const router = express.Router();
const university = require('../sql/university');
router.get('/university',async (req,res)=>{
    try {
        const result = await university.getCollegeAll(id);
        if(!result){
            res.json({
                code: 400,
                msg: '查询失败'
            })
        }
        else {
            res.json({
                code: 200,
                msg: '查询成功',
                data: result
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            msg: '查询失败'
        })
    }
})
router.get('/university/:id',async (req,res)=>{
    try {
        const result = await university.getCollegeById(req.params.id);
        if(!result){
            res.json({
                code: 400,
                msg: '查询失败'
            })
        }
        else {
            res.json({
                code: 200,
                msg: '查询成功',
                data: result
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            msg: '查询失败'
        })
    }
})
router.get('/search',async (req,res)=>{
    try {
       const {keyword} = req.query;
       if(!keyword){
        res.json({
            code: 400,
            msg: '参数错误'
        })
       }
       else {
        const result = await university.searchCollege(keyword);
        if(!result){
            res.json({
                code: 400,
                msg: '查询失败'
            })
        }
        else {
            res.json({
                code: 200,
                msg: '查询成功',
                data: result
            })
        }
       }
    } catch (error) {
        res.json({
            code: 400,
            msg: '查询失败'
        })
    }
})
router.delete('/university/:id',async (req,res)=>{
    try {
        const result = await university.deleteCollege(req.params.id);
        if(!result){
            res.json({
                code: 400,
                msg: '删除失败'
            })
        }
        else {
            res.json({
                code: 200,
                msg: '删除成功',
                data: result
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            msg: '删除失败'
        })
    }
})
module.exports = router;
