const policies = require('../sql/policies')
const express = require('express')
const router = express.Router()
router.get('/getlist',async (req,res)=>{
    try{
        const list = await policies.get_list()
        res.json({
            code:200,
            data:list
        })
    }
    catch(err){
        res.json({
            code:500,
            msg:err.message
        })
    }
})
router.get('/detail',async (req,res)=>{
    try{
        const {id} = req.query
       if(!id){
           res.json({
               code:400,
               msg:'id不能为空'
           })
           return
       }
       const detail = await policies.get_detail(id)
       res.json({
           code:200,
           data:detail
       })
    }
    catch(err){
        res.json({
            code:500,
            msg:err.message
        })
    }
})
router.post('/search',async (req,res)=>{
    try{
        const {key} = req.body
        if(!key){
            res.json({
                code:400,
                msg:'key不能为空'
            })
            return
        }
        const list = await policies.search(key)
        res.json({
            code:200,
            data:list
        })
    }
    catch(err){
        res.json({
            code:500,
            msg:err.message
        })
    }
})
router.get('/comment',async (req,res)=>{
    try{
        const {id} = req.query
        if(!id){
            res.json({
                code:400,
                msg:'id不能为空'
            })
            return
        }
        const list = await policies.get_comments(id)
        res.json({
            code:200,
            data:list
        })
    }
    catch(err){
        console.log(err)
        res.json({
            code:500,
            msg:err.message
        })
    }
})
router.post('/like',async (req,res)=>{
    try{
        const {id,policy_id} = req.body
        if(!id || !policy_id){
            res.json({
                code:400,
                msg:'id或user_name不能为空'
            })
            return
        }
        await policies.like_count(id,policy_id)
        res.json({
            code:200,
            msg:'点赞成功'
        })
    }
    catch(err){
        console.log(err)
        res.json({
            code:500,
            msg:err.message
        })
    }
})
router.post('/addcomment',async (req,res)=>{
    try{
        const {policy_id,user_name,content,like_count} = req.body
        if( !policy_id || !user_name || !content){
            res.json({
                code:400,
                msg:'id或policy_id或user_name或content不能为空'
            })
            return
        }
        await policies.add_comment(policy_id,user_name,content,like_count)
        res.json({
            code:200,
            msg:'评论成功'
        })
    }
    catch(err){
        console.log(err)
        res.json({
            code:500,
            msg:err.message
        })
    }
})
module.exports = router