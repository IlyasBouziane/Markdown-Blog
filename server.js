/**
 * uses express
 */
const express = require('express')
const app = express()

/**
 * imports routers
 */
const articleRouter = require('./routes/posts')

/**
 * imports model
 */
const Post = require('./models/post')
/**
 * Connection to MongoDB
 */
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/myblog')

app.use(express.urlencoded({extended : false}))

app.set('view engine','ejs')

app.use('/posts',articleRouter)

app.get('/',async (req,res) => {
    const posts = await Post.find().sort({dateCreation : 'desc'})
    res.render('posts/index',{
        posts : posts
    })
})

app.listen(8080)
