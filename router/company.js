const Company = require('../sql/company');
const express = require('express');
const router = express.Router();
router.post('/addCompany',async (req,res)=>{
    try {
        const {name, logo,description,contact,address,state,create_time,update_time,email,website,industry,type,scale} = req.body;
        if(!name||!industry||!address||!description){
            res.json({
                msg: '参数错误',
                code:400
            })
        }
        const result = await Company.addCompany(name, logo,description,contact,address,state,create_time,update_time,email,website,industry,type,scale);
        if(!result){
            res.json({
                code: 400,
                msg: '添加失败'
            })
        }
        else {
            res.json({
                code: 200,
                msg: '添加成功',
                data: result
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            msg: '添加失败'
        })
    }
})
router.delete('/deleteCompany/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            res.json({
                msg: '参数错误',
                code:400
            })
        }
        const result = await Company.deleteCompany(id);
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
router.get('/getOne/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            res.json({
                msg: '参数错误',
                code:400
            })
        }
        const result = await Company.getCompanyDetail(id);
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
router.post('/updateCompany',async (req,res)=>{
    try {
        const {id,name, logo,description,contact,address,state,create_time,update_time,email,website,industry,type,scale} = req.body;
        if(!id||!name||!industry||!address||!description){
            res.json({
                msg: '参数错误',
                code:400
            })
        }
        const result = await Company.updateCompany(id,name, logo,description,contact,address,state,create_time,update_time,email,website,industry,type,scale);
        if(!result){
            res.json({
                code: 400,
                msg: '更新失败'
            })
        }
        else {
            res.json({
                code: 200,
                msg: '更新成功',
                data: result
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            msg: '更新失败'
        })
    }
})
router.get('/tag',async (req,res)=>{
    try {
        const {industry} = req.query;
        const result = await Company.tag(industry);
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
        console.log(error);
        res.json({
            code: 400,
            msg: '查询失败'
        })
    }
})
router.post('/search',async (req,res)=>{
    try {
        const {keyword} = req.body;
        if(!keyword){
            res.json({
                msg: '参数错误',
                code:400
            })
        }
        const result = await Company.search(keyword);
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
router.get('/getAll',async (req,res)=>{
    try {
        const result = await Company.getAll();
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
router.get('/detail',async (req,res)=>{
    try {
        const {id} = req.query;
        if(!id){
            res.json({
                msg: '参数错误',
                code:400
            })
        }
        const result = await Company.getDetail(id);
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
