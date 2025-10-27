const mongoose=require("mongoose")

const bookSchema=mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    myReviews: {
        type: String,
        required: true
    }
})
const userSchema=mongoose.Schema({
name:{
    type: String, 
    required: true
}, 
email: {
    type: String,
    required: true,
    unique: true
},
password: {
    type: String,
    required: true
},
books: [bookSchema]
})