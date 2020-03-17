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
router.post('/new', (req,res,next)=>{
     req.post = new Post()
     next()
}, savePostAndRedirect('new'))


router.get('/:slug', async (req,res)=> {
    const post = await Post.findOne({slug : req.params.slug})
    post == null ? res.redirect('/') : res.render('posts/display',{post : post})

})


router.get('/edit/:id',async (req,res)=>{
    const post = await Post.findById(req.params.id)
    res.render('posts/edit',{post : post})
})
router.put('/edit/:id', async (req,res,next) =>{
    req.post = await Post.findById(req.params.id)
    next()
},savePostAndRedirect('edit'))



router.delete('/:id',async (req,res)=>{
    await Post.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


function savePostAndRedirect(path){
    return async (req,res)=>{
        let post = req.post 
        post.title = req.body.title
        post.description =req.body.description
        post.markdown =req.body.markdown
        
        try {
            post = await post.save()
            res.redirect(`/posts/${post.slug}`)
        } catch (e) {
            console.log(e)
            res.render(`posts/${path}`,{post : post})
    
        }
    }
}

module.exports = router
