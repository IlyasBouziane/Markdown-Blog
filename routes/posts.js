const express = require('express')
const Post = require('./../models/post.js') 
const methodeOverride = require('method-override')
const slugify = require('slugify')

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
        markdown : req.body.markdown,
    })
    try {
        post = await post.save()
        res.redirect(`/posts/${post.slug}`)
    } catch (e) {
        console.log(e)
        res.render('posts/new',{post : post})

    }
    
})

router.get('/:slug', async (req,res)=> {
    const post = await Post.findOne({slug : req.params.slug})
    post == null ? res.redirect('/') : res.render('posts/display',{post : post})

})


router.get('/edit/:slug',async (req,res)=>{
    
})


router.delete('/:id',async (req,res)=>{
    await myblog.posts.drop()
    res.redirect('/')
})

module.exports = router
