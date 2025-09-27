const message = require('../sql/message')
const express = require('express')
const router = express.Router()
router.get('/getOnemessage/:id',async (req,res)=>{
    const id = req.params.id
    const result = await message.getOnemessage(id)
    res.json(result)
})
router.post('/sendMessage',async (req,res)=>{
    try {
        const {sendid,receiveid,content} = req.body
        const result = await message.sendMessage(sendid,receiveid,content)
        res.json(result)
    } catch (error) {
        res.json({success:false,msg:'发送失败'})
    }
})
router.get('/getDetail/:sendid/:receiveid',async (req,res)=>{
    const {sendid,receiveid} = req.params
    const result = await message.getDetail(sendid,receiveid)
    res.json(result)
})
module.exports = router