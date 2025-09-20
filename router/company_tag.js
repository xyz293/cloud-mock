const tag = require('../sql/company_tag');
const express = require('express');
const router = express.Router();
router.get('/tag',async (req,res)=>{
    const result = await tag.gettag();
    res.json({code:200,msg:'获取成功',data:result});
})
module.exports = router;