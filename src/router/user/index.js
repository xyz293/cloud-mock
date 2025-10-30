import express from 'express';
import {getToken} from '../../middle/getToken.js'
import userController from '../../sql/user/index.js';
import {verifyaccessToken} from '../../middle/versity.js'
const router = express.Router();
router.get('/getCode', async (req, res) => {
    try {
        const { identifier } = req.query;
        if(!identifier){
            res.json({ message: 'identifier is required' });
            return;
        }
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const result = await userController.getCode(identifier,code);
        if(result){
            res.json({ code, });
        }
        else{
            res.json({ message: 'fail' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})
router.post('/register', async (req, res) => {
    try {
        const { username, password, nickname ,code } = req.body;
        const result = await userController.Register(username, password, nickname,code);
        res.json({ message: result ,code:200});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})
router.post('/login', async (req, res) => {
    try {
        const { username, password,nickname } = req.body;
        const result = await userController.Login(username, password,nickname);
      
        const token = getToken(username, password);
        res.json({ token ,code:200,data:result});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})
router.post('/sign', async (req, res) => {
    try {
        const { user_id } = req.body;
        const result = await userController.postSign(user_id);
        res.json({ message: result ,code:200});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})
router.post('/verify', verifyaccessToken,async (req, res) => {
    try {
        console.log(11);
        res.json({ message: '验证成功' ,code:200});
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Internal server error' });
    }
})
router.get('/userinfo', verifyaccessToken,async (req, res) => {
    try {
        const { id } = req.query;
        const result = await userController.Finduser(id);
        res.json({ message: result ,code:200});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})
export default router;