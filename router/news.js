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
module.exports = router
