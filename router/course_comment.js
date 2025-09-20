const express = require('express');
const router = express.Router();
const Comment = require('../sql/course_comment');
router.get('/comment',async (req,res)=>{
    try{
        const {id} = req.query
        if(!id){
            res.send({
                code:400,
                msg:'参数错误',
            })
        }
        else{
            const result = await Comment.getCourseComment(id)
            res.send({
                code:200,
                msg:'获取成功',
                data:result
            })
        }
    }catch(err){
        console.log(err)
        res.send({
            code:500,
            msg:'获取失败',
            data:err
        })
    }
})
router.post('/comment',async (req,res)=>{
    try{
        const {course_id,user_id,content,create_time,update_time,username} = req.body
        if(!course_id || !user_id || !content){
            res.send({
                code:400,
                msg:'参数错误',
            })
        }
        else{
            const result = await Comment.addComment(course_id,user_id,content,create_time,update_time,username)
            res.send({
                code:200,
                msg:'添加成功',
                data:result
            })
        }
    }catch(err){
        res.send({
            code:500,
            msg:'添加失败',
            data:err
        })
    }
})
module.exports = router;