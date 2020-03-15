const mongoose = require('mongoose')
const slugify = require('slugify')
const marked = require('marked')

const postSchema = new mongoose.Schema({
    title : {
        required : true,
        type : String
    },
    description : {
        type : String
    },
    dateCreation : {
        type : Date,
        default : Date.now()
    },
    markdown : {
        type : String,
        required : true
    },
    slug : {
        type : String,
        unique : true
    } 
    
})

postSchema.pre('save', (next) => {
    if(this.title){
        this.slug = slugify(this.title,{strict : true,lower:true})
    }
    next()
})

module.exports = mongoose.model('Post',postSchema)