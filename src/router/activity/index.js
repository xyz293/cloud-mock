import express from 'express'
import activityController from '../../sql/activity/index.js'
const router = express.Router()
router.get('/list', async(req,res)=>{
    try{
        const list = await activityController.getlist()
        res.json({
            code:200,
            message:'获取成功',
            data:list
        })
    }
    catch(err){
        res.json({
            success:false,
            message:'获取失败',
            data:err
        })
    }
})
router.get('/detail', async(req,res)=>{
    try{
        const id = req.query.id
        const detail = await activityController.getDetail(id)
        res.json({
            code:200,
            message:'获取成功',
            data:detail
        })
    }
    catch(err){
        res.json({
            code:500,
            message:'获取失败',
            data:err
        })
    }
})
router.post('/join', async(req,res)=>{
    try{
        const {activity_id,user_id} = req.body
        if(!activity_id || !user_id){
            res.json({
                message:'参数错误',
                data:null
            })
            return ;
        }
        const result = await activityController.join(activity_id,user_id)
        res.json({
          
            data:result
        })
    }
    catch(err){
        res.json({
            code:500,
            message:'报名失败',
            data:err
        })
    }
})
export default router