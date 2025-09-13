const express = require('express');
const router = express.Router();
const information = require('../sql/information');
router.get('/gettype',async (req,res)=>{
    try{
         const type = req.query.type;
    const data = await information.gettype(type);
    if(data.length == 0){
        res.json({
            code:400,
            msg:'该类型不存在'
        })
    }
    else {
        res.json({
            code:200,
            msg:'查询成功',
            data
        })
    }
    }
    catch(err){
        res.json({
            code:500,
            msg:'查询失败',
            err
        })
    }
})
router.delete('/delete',async (req,res)=>{
    try{
        const id = req.query.id;
        const data = await information.delete(id);
        if(data.affectedRows == 0){
            res.json({
                code:400,
                msg:'删除失败'
            })
        }
        else {
            res.json({
                code:200,
                msg:'删除成功',
                data
            })
        }
    }
    catch(err){
        res.json({
            code:500,
            msg:'删除失败',
            err
        })
    }
})
router.post('/search',async (req,res)=>{
    try{
        const keyword = req.body.keyword;
        const data = await information.search(keyword);
        if(data.length == 0){
            res.json({
                code:400,
                msg:'查询失败'
            })
        }
        else {
            res.json({
                code:200,
                msg:'查询成功',
                data
            })
        }
    }
    catch(err){
        res.json({
            code:500,
            msg:'查询失败',
            err
        })
    }
})
router.get('/getall',async (req,res)=>{
    try{
        const data = await information.getInformationAll();
        if(data.length == 0){
            res.json({
                code:400,
                msg:'查询失败'
            })
        }
        else {
            res.json({
                code:200,
                msg:'查询成功',
                data
            })
        }
    }
    catch(err){
        res.json({
            code:500,
            msg:'查询失败',
            err
        })
    }
})
module.exports = router;