const express = require('express');
const apitoken = require('../middle/token');
const router = express.Router();
const user = require('../sql/user');
router.post('/regiser',async (req,res)=>{
   try {
    const  {phone,password,nickname,code} = req.body;
    if(!phone){
        res.json({code:400,msg:'手机号不能为空'});
    }
    if(!password){
        res.json({code:400,msg:'密码不能为空'});
    }
    if(!nickname){
        res.json({code:400,msg:'昵称不能为空'});
    }
    if(!code){
        res.json({code:400,msg:'验证码不能为空'});
    }
        const  result = await user.regiser(phone,password,nickname,code);
        if(result){
            res.json({code:200,msg:'注册成功'});
        }else{
            res.json({code:400,msg:'注册失败'});
        }
   } catch (error) {
    console.log(error);
    res.json({code:500,msg:'注册失败'});
   }
})
router.get('/sendcode',async (req,res)=>{
    const code = Math.floor(100000 + Math.random() * 900000); 
    const {phone} = req.query;
    if(!phone){
        res.json({code:400,msg:'手机号不能为空'});
    }
     const  result = await user.sendcode(phone,code);
    if(result){
        res.json({code:1,msg:'发送成功',data:code});
    }else{
        res.json({code:0,msg:'发送失败'});
    }
})
router.post('/login',async (req,res)=>{
   try{
     const {phone,password} = req.body;
     if(!phone){
        res.json({code:400,msg:'手机号不能为空'});
    }
    if(!password){
        res.json({code:400,msg:'密码不能为空'});
    }
      const token = apitoken.createToken({phone});
    const result = await user.login(phone,password);
    if(result){
        res.json({code:200,msg:'登录成功',token:token});
    }else{
        res.json({code:400,msg:'登录失败'});
    }
   }catch(error){
    console.log(error);
    res.json({code:500,msg:'登录失败'});
   }
})
module.exports = router;