const express = require('express');
const router = express.Router();
const course = require('../sql/course');
router.get('/college_course',async (req,res)=>{
    try {
        const {id,usid} = req.query;
        if(!id||!usid){
            res.json({
                msg: '参数错误',
                code:400
            })
        }
        const result = await course.getcollege_course(id,usid);
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
router.get('/university',async (req,res)=>{
    try {
        const {id} = req.query;
        if(!id){
            res.json({
                msg: '参数错误',
                code:400
            })
        }
        const result = await course.getuniversity_course(id);
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
router.post('/tag',async (req,res)=>{
    try {
        const {tag,id} = req.body;
        if(!tag||!id){
            res.json({
                msg: '参数错误',
                code:400
            })
        }
        const result = await course.tag(tag,id);
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
router.post('/search',async (req,res)=>{   //id为大学的id
    try {
        const {keyword,id} = req.body;
        if(!keyword||!id){
            res.json({
                msg: '参数错误',
                code:400
            })
        }
        const result = await course.search(keyword,id);
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
module.exports = router;
