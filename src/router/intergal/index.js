import IntergalController from '../../sql/intergal/index.js'
import express from 'express'
const router = express.Router()
router.post('/create',async (req,res)=>{
   try{
     const {user_id,intergal} = req.body
    const result = await IntergalController.CreateIntergal(user_id,intergal)
    res.json({
        code:200,
        message:result
    })
   }catch(err){
    console.log(err)
    res.status(500).json({
        code:500,
        message:'服务器错误'
    })
   }
})
router.get('/find',async (req,res)=>{
    try{
        const {user_id} = req.query
        const result = await IntergalController.findIntergal(user_id)
        res.json({
            code:200,
            message:result
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            code:500,
            message:'服务器错误'
        })
    }
})
router.post('/update',async (req,res)=>{
    try{
        const {user_id,intergal} = req.body
        const result = await IntergalController.updateIntergal(user_id,intergal)
        res.json({
            code:200,
            message:result
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            code:500,
            message:'服务器错误'
        })
    }
})
router.get('/rule',async (req,res)=>{
    try{
        const {type,integral_id} = req.query
        const result = await IntergalController.integralRule(type,integral_id)
        res.json({
            code:200,
            data:result
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            code:500,
            message:'服务器错误'
        })
    }
})
router.get('/log',async (req,res)=>{
    try{
        const {user_id} = req.query
        const result = await IntergalController.findLog(user_id)
        res.json({
            code:200,
            data:result
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            code:500,
            message:'服务器错误'
        })
    }
})
router.post('/log',async (req,res)=>{
    try{
        const {user_id,integral,action} = req.body
        const result = await IntergalController.setLog(user_id,integral,action)
        res.json({
            code:200,
            message:result
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            code:500,
            message:'服务器错误'
        })
    }
})
export default router