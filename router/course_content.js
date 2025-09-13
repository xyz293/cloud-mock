const express =require('express')
const router = express.Router()
const course_content = require('../sql/course_content')
router.get('/courselist',async (req,res)=>{  //获取课程内容列表
   try{
    const {courseId,universityId} = req.query
    if(!courseId || !universityId){
      res.send({
        code:400,
        msg:'参数错误',
      })
    }
      else{
        const result = await course_content.course_Content(courseId,universityId)
      res.send({
         code:200,
         msg:'获取成功',
         data:result
      })
      }
      
   }catch(err){
      res.send({
         code:500,
         msg:'获取失败',
         data:err
      })
   }
})
router.get('/contentdetail',async (req,res)=>{
  try{
    const {title} = req.query
    if(!title){
      res.send({
        code:400,
        msg:'参数错误',
      })
    }
    else{
      const result = await course_content.getDetail_Content(title)
      res.send({
        code:200,
        msg:'获取成功',
        data:result
      })
    }
  }catch(err){
    res.send({
      code:500,
      msg:'获取失败',
      data:err
    })
  }
})
module.exports = router