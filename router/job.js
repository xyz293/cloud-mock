const job  = require('../sql/job')
const express = require('express')
const router = express.Router()
router.get('/getjob',async (req,res)=>{  //在每个部门的job
    try{
       const {id,company_id} = req.query
       if(!id || !company_id){
        res.send({
            code: 400,
            msg: '参数错误'
        })
        return
       }
       else {
        const result = await job.get_Department_Job(id,company_id)
        if(!result){
            res.send({
                code: 400,
                msg: '获取失败'
            })
            return
        }
        else {
            res.send({
                code: 200,
                msg: '获取成功',
                data: result
            })
        }
       }
    }catch(err){
        res.send({
            code: 500,
            msg: '服务器错误'
        })
    }
})
router.get('/searchjob',async (req,res)=>{  //搜索job
    try{
       const {name} = req.query
       if(!name){
        res.send({
            code: 400,
            msg: '参数错误'
        })
        return
       }
       else {
        const result = await job.search_Job(name)
        if(!result){
            res.send({
                code: 400,
                msg: '获取失败'
            })
            return
        }
        else {
            res.send({
                code: 200,
                msg: '获取成功',
                data: result
            })
        }
       }
    }catch(err){
        res.send({
            code: 500,
            msg: '服务器错误'
        })
    }
})
router.get('/getlist',async (req,res)=>{  //获取所有job
    try{
       const result = await job.get_list()
       if(!result){
        res.send({
            code: 400,
            msg: '获取失败'
        })
        return
       }
       else {
        res.send({
            code: 200,
            msg: '获取成功',
            data: result
        })
       }
    }catch(err){
        res.send({
            code: 500,
            msg: '服务器错误'
        })
    }
})
router.delete('/deletejob',async (req,res)=>{  //删除job 
//  //假如后台想删除的话那么就先获取本公司的，之后在按id删除
    try{
       const {id} = req.query
       if(!id){
        res.send({
            code: 400,
            msg: '参数错误'
        })
        return
       }
       else {
        const result = await job.delete_Job(id)
        if(!result){
            res.send({
                code: 400,
                msg: '删除失败'
            })
            return
        }
        else {
            res.send({
                code: 200,
                msg: '删除成功'
            })
        }
       }
    }catch(err){
        res.send({
            code: 500,
            msg: '服务器错误'
        })
    }
})
module.exports = router