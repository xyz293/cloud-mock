import express from 'express';
import DisscussionController from '../../sql/discussion/index.js';

const router = express.Router();
router.get('/all',async (req, res) => {
       try{
        const discussions = await DisscussionController.getAllDiscussion();
        res.json({
            code:200,
            data:discussions
        });
       }
       catch(err){
        res.status(500).send('服务器错误');
       }
})
router.get('/type/:id',async (req, res) => {
    try{
         const id =req.params.id;
         const discussions = await DisscussionController.getDiscussionType(id);
         res.json({
             code:200,
             data:discussions
         });
    }
    catch(err){
        res.status(500).send('服务器错误');
    }
})
router.get('/search',async (req, res) => {
       try{
        const keyword = req.query.keyword;
        const discussions = await DisscussionController.SearchDiscussion(keyword);
        res.json({
            code:200,
            data:discussions
        });
       }catch(err){
        res.status(500).send('服务器错误');
       }
})
router.get('/types',async (req, res) => {
    try{
         const types = await DisscussionController.getDiscussionTypes();
         res.json({
             code:200,
             data:types
         });
    }
    catch(err){
        res.status(500).send('服务器错误');
    }
})
router.post('/updateViewCount',async (req, res) => {
    try{
        const {discussion_id,view_count} = req.body;
        const result = await DisscussionController.updateViewCount(discussion_id,view_count);
        res.json({
            code:200,
            data:result
        });
    }
    catch(err){
        res.status(500).send('服务器错误');
    }
})
router.post('/updateLikeCount',async (req, res) => {
    try{
        const {discussion_id,like_count} = req.body;
        const result = await DisscussionController.updateLikeCount(discussion_id,like_count);
        res.json({
            code:200,
            data:result
        });
    }
    catch(err){
        res.status(500).send('服务器错误');
    }
})
router.get('/detail/:id',async (req, res) => {
    try{
         const id =req.params.id;
         const discussion = await DisscussionController.getDetailDiscussion(id);
         res.json({
             code:200,
             data:discussion
         });
    }
    catch(err){
        res.status(500).send('服务器错误');
    }
})
router.get('/comments/:discussion_id',async (req, res) => {
    try{
         const discussion_id =req.params.discussion_id;
         const comments = await DisscussionController.getChildComments(discussion_id);
         res.json({
             code:200,
             data:comments
         });
    }
    catch(err){
        res.status(500).send('服务器错误');
    }
})
router.get('/comment/:id',async (req, res) => {
    try{
         const id =req.params.id;
         const comment = await DisscussionController.getCommentsByDiscussionId(id);
         res.json({
             code:200,
             data:comment
         });
    }
    catch(err){
        res.status(500).send('服务器错误');
    }
})
export default router;