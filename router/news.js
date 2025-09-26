const news =require('../sql/news')
const express =require('express')
const router = express.Router()
router.get('/list', async (req, res) => {
      try{
        const result = await news.get_news_list()
        res.send({
            code: 200,
            data: result
        })
      }catch(err){
        console.log(err)
        res.send({
            code: 500,
            msg: err.message
        })
      }
})
router.get('/detail/:id',async (req, res) => {
    try{
     const {id} =req.params
      if(!id){
        res.json({
            code: 400,
            msg: 'id is required'
        })
      }
      const result = await news.get_news_detail(id)
      if(!result){
        res.json({
            code: 400,
            msg: 'news not found'
        })
      }
      res.json({
        code: 200,
        data: result
      })
    }catch(err){
        console.log(err)
        res.send({
            code: 500,
            msg: err.message
        })
    }
})
router.post('/search',async (req, res) => {
    try{
     const {key} =req.body
      if(!key){
        res.json({
            code: 400,
            msg: 'key is required'
        })
      }
      const result = await news.search_news(key)
      if(!result){
        res.json({
            code: 400,
            msg: 'news not found'
        })
      }
      res.json({
        code: 200,
        data: result
      })
    }catch(err){
        console.log(err)
        res.send({
            code: 500,
            msg: err.message
        })
    }
})
router.post('/tag',async (req, res) => {
    try{
     const {tag} =req.body
     console.log(tag)
      if(!tag){
        res.json({
            code: 400,
            msg: 'tag is required'
        })
      }
      const result = await news.tag_news(tag)
      if(!result){
        res.json({
            code: 400,
            msg: 'news not found'
        })
      }
      res.json({
        code: 200,
        data: result
      })
    }catch(err){
        console.log(err)
        res.send({
            code: 500,
            msg: err.message
        })
    }
})
router.post('/create_favorite',async (req, res) => {
    try{
     const {user_id,news_id,news_title,category,content,cover_url} =req.body
     console.log(user_id,news_id,news_title,category,content,cover_url)
      if(!user_id || !news_id || !news_title || !category || !content || !cover_url){
        res.json({
            code: 400,
            msg: 'user_id,news_id,news_title,category is required'
        })
      }
      const result = await news.create_favorite(user_id,news_id,news_title,category,content,cover_url)
      if(!result){
        res.json({
            code: 400,
            msg: 'create favorite failed'
        })
      }
      res.json({
        code: 200,
        data: '成功创建收藏'
      })
    }catch(err){
        console.log(err)
        res.send({
            code: 500,
            msg: err.message
        })
    }
})
router.get('/get_favorite/:user_id',async (req, res) => {
    try{
     const {user_id} =req.params
      if(!user_id){
        res.json({
            code: 400,
            msg: 'user_id is required'
        })
      }
      const result = await news.get_new_favorite(user_id)
      if(!result){
        res.json({
            code: 400,
            msg: 'get favorite failed'
        })
      }
      res.json({
        code: 200,
        data: result
      })
    }catch(err){
        console.log(err)
        res.send({
            code: 500,
            msg: err.message
        })
    }
})
router.delete('/delete_favorite/:id/:user_id',async (req, res) => {
    try{
     const {id,user_id} =req.params
      if(!user_id || !id){
        res.json({
            code: 400,
            msg: 'user_id,id is required'
        })
      }
      const result = await news.delete_favorite(user_id,id)
      if(!result){
        res.json({
            code: 400,
            msg: 'delete favorite failed'
        })
      }
      res.json({
        code: 200,
        data: result
      })
    }catch(err){
        console.log(err)
        res.send({
            code: 500,
            msg: err.message
        })
    }
})
module.exports = router
