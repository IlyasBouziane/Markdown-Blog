const mongoose = require('mongoose')

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
    }
    
})

module.exports = mongoose.model('Post',postSchema)