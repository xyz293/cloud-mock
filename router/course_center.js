const course_Center = require('../sql/course_center');
const express =require('express')
const router = express.Router()
router.get('/course_user',async (req,res) => {
   try{
    const {id} = req.query
    if(!id){
      res.send({
        code:400,
        msg:'参数错误',
      })
    }
    else{
      const result = await course_Center.course_Center(id)
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
router.post('/select',async (req,res) => {
  try{
    const {user_id, name, image, code, type, university_id, college_id, state, description, college_name} = req.body
    if(!user_id){
      res.send({
        code:400,
        msg:'参数错误',
      })
    }
    else{
      const result = await course_Center.insert(user_id, name, image, code, type, university_id, college_id, state, description, college_name)
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