const school_category = require('../sql/school_category');
const express = require('express');
const router = express.Router();
router.get('/tag',async (req,res)=>{
    try {
        const result = await school_category.getALL();
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
        console.log(error);
        res.json({
            code: 500,
            msg: '查询失败'
        })
    }
})
module.exports = router;
