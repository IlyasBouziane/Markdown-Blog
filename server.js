/**
 * uses express
 */
const express = require('express')
const app = express()

/**
 * importes routers
 */
const articleRouter = require('./routes/posts')

/**
 * Connection to MongoDB
 */
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/myblog')

app.use(express.urlencoded({extended : false}))

app.set('view engine','ejs')

app.use('/posts',articleRouter)

app.get('/',(req,res) => {
    res.render('posts/index',{
        posts : [{
            title:'Title',
            dateCreation: new Date().toLocaleDateString(),
            description:'Markdown blog part 1'
        }]
    })
})

app.listen(8080)
