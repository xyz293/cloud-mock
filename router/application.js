const express = require('express')
const router = express.Router()
const application = require('../sql/application')
router.post('/send',async (req,res)=>{
    try{
        const {user_id,job_id,state,resume_url} = req.body
         if(!user_id || !job_id || !state || !resume_url){
            res.send({
                code: 400,
                msg: '参数错误'
            })
            return
        }
        const result = await application.send_application(user_id,job_id,state,resume_url)
        if(!result){
            res.send({
                code: 400,
                msg: '申请失败'
            })
            return
        }
        else {
            res.send({
                code: 200,
                msg: '申请成功'
            })
        }
    }catch(err){
        res.send({
            code: 500,
            msg: '服务器错误'
        })
    }
})
router.get('/getmyapplication',async (req,res)=>{
    try{
        const {id} = req.query
         if(!id){
            res.send({
                code: 400,
                msg: '参数错误'
            })
            return
        }
        const result = await application.getmylist_application(id)
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
router.get('/department_application',async (req,res)=>{
    try{
         const {company_id,department_id,job_id} = req.query
        const result = await application.company_getlist_application()
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
router.put('/update',async (req,res)=>{
    try{
        const {company_id,department_id,job_id,user_id,state} = req.body
        if(!id || !state){
            res.send({
                code: 400,
                msg: '参数错误'
            })
            return
        }
        const result = await application.company_update_application(company_id,department_id,job_id,user_id,state)
        if(!result){
            res.send({
                code: 400,
                msg: '更新失败'
            })
            return
        }
        else {
            res.send({
                code: 200,
                msg: '更新成功'
            })
        }
    }catch(err){
        res.send({
            code: 500,
            msg: '服务器错误'
        })
    }
})
module.exports = router