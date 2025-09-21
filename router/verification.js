const verification = require('../sql/verification');
const express = require('express');
const router = express.Router();
router.get('/getVerification',async (req,res)=>{
    try {
        const {student_id,university_name,college_name} = req.query;
        if(!student_id||!university_name||!college_name){
            res.json({
                msg: '参数错误',
                code:400
            })
        }
        const result = await verification.getVerification(student_id,university_name,college_name);
        if(!result){
            res.json({
                code: 400,
                msg: '查询失败'
            })
        }
        else {
            res.json({
                code: 200,
                msg: '查询成功',
                data: result
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            msg: '查询失败'
        })
    }
})
router.post('/verification',async (req,res)=>{
    try {
        const {student_id,student_name,university_name,college_name,grade} = req.body;
        if(!student_id||!student_name||!university_name||!college_name||!grade){
            res.json({
                msg: '参数错误',
                code:400
            })
            return;
        }
        const result = await verification.verification(student_id,student_name,university_name,college_name,grade);
        console.log(result)
        if(!result){
            res.json({
                code: 400,
                msg: '插入失败'
            })
        }
        else {
            res.json({
                code: 200,
                msg: '查询成功',
                data: result
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            code: 400,
            msg: '查询失败'
        })
    }
})
module.exports = router;