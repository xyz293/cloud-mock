import express from 'express';
import AiChat from '../../middle/agent.js';
import {verifyToken } from '../../middle/versity.js';
import messageController from '../../sql/message/index.js';
const router = express.Router();
const client={}
router.get('/event', (req, res) => {
  try {
    const { id } = req.query;

  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');


    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    client[id] = res;

    // 当客户端断开连接时清除
    req.on('close', () => {
      delete client[id];
    });
  } catch (error) {
    console.error('SSE error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/message',(req,res)=>{
    try {
        const {id,message}=req.body;
        if(client[id]){
            client[id].write(`data: ${message}\n\n`);
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.get('/messagelist/:id',async (req,res)=>{
    try {
        const {id}=req.params;
        const messageList=await messageController.getAll(id);
        res.json({
            success:true,
            message:'获取成功',
            data:messageList
        })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})
router.get('/messageunlist/:id',async (req,res)=>{
    try {
        const {id}=req.params;
        const {message_id}=req.body;
        const result=await messageController.getUnread(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})
router.post('/updateunread',async (req,res)=>{
    try {
        const {user_id,message_id}=req.body;
        if(!user_id || !message_id){
            res.status(400).json({ message: 'user_id or message_id is required' });
        }
        else{
            const result=await messageController.updateRead(user_id,message_id);
            res.json(result);
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})
router.delete('/delmessage',async (req,res)=>{
    try {
        const {id,user_id}=req.body;
        if(!id || !user_id){
            res.status(400).json({ message: 'id or user_id is required' });
        }
        else{
            const result=await messageController.delete(user_id,id);
            res.json(result);
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})
router.post('/AIchat',verifyToken,async (req,res)=>{
    try {
       const {content,id}=req.body;
        await messageController.SaveMessage(id,'user',content);
       if(!content){
        res.status(400).json({ message: 'content is required' });
       }
       else{
        const result=await AiChat(content);
        if(client[id]){
            await messageController.SaveMessage(id,'ai',result);
            client[id].write(`data: ${result}\n\n`);
        }
        res.json({
            success:true,
            message:'发送成功',
            data:result
        })
       }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})
router.post('/AImessage',async (req,res)=>{
    try {
       const {user_id}=req.body;
       if(!user_id ){
        res.status(400).json({ message: 'user_id is required' });
       }
       else{
        const result=await messageController.Aimessage(user_id);
        res.json(result);
       }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})
export default router;