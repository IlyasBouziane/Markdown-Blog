const express = require('express')
const Post = require('./../models/post.js')
const router = express.Router()

/**
 * GET & POST methods for the url : articles/new
 */

router.get('/new',(req,res) => {
    res.render('posts/new',{post : new Post()})
})
router.post('/new',async (req,res)=>{
    let post = new Post({
        title : req.body.title,
        description :req.body.description,
        markdown : req.body.markdown
    })
    try{
        post = await post.save()
        res.redirect(`/posts/${post.id}`)
    } catch (e) {
        res.render('posts/new',{post : post})

    }
    
})

router.get('/:id', async (req,res)=> {
    const post = await Post.findById(req.params.id)
    post == null ? res.redirect('/') : res.render('posts/display',{post : post})

})


router.get('/edit/:id',async (req,res)=>{
    
})

module.exports = router
