const tag = require('../sql/course_tag');
const express = require('express');
const router = express.Router();
router.get('/tag',async (req,res)=>{
    try {
        const result = await tag.getCourseTag();
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
            code: 500,
            msg: '查询失败'
        })
    }
})
module.exports = router;
