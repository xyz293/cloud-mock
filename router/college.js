const express = require('express');
const router = express.Router();
const college = require('../sql/college');
router.get('/detail',async (req,res)=>{
    const {id} = req.query;
    const result = await college.getCollegeDetail(id);
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
})
module.exports = router;