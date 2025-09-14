const expert =require('../sql/expert')
const express = require('express')
const router = express.Router()
router.get('/specialization',async (req,res)=>{
    try{
       const {key} =req.query
       if(!key){
        res.json({
            code:400,
            msg:'参数错误'
        })
       }
       else {
        const result = await expert.specialization_class(key)
        if(result){
            res.send({
                code:200,
                msg:'查询成功',
                data:result
            })
        }else {
            res.send({
                code:400,
                msg:'查询失败'
            })
        }
       }

    }catch(err){
        res.send({
            code:500,
            msg:'查询失败'
        })
    }
})
router.get('/list',async (req,res)=>{
    try{
        const {id} = req.query
        if(!id){
            res.send({
                code:400,
                msg:'参数错误'
            })
        }
        else{
            const result = await expert.getSchool_expert(id)
            if(result){
                res.send({
                    code:200,
                    msg:'查询成功',
                    data:result
                })
            }else {
                res.send({
                    code:400,
                    msg:'查询失败'
                })
            }
        }
    }catch(err){
        res.send({
            code:500,
            msg:'查询失败'
        })
    }
})
router.delete('/delete',async (req,res)=>{
    try{
        const {id} = req.query
        if(!id){
            res.send({
                code:400,
                msg:'参数错误'
            })
        }
        else{
            const result = await expert.delete_expert(id)
            if(result){
                res.send({
                    code:200,
                    msg:'删除成功'
                })
            }else {
                res.send({
                    code:400,
                    msg:'删除失败'
                })
            }
        }
    }catch(err){
        res.send({
            code:500,
            msg:'删除失败'
        })
    }
})
module.exports = router
