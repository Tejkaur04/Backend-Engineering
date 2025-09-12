const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        maxLength:16,
        required: true //makes an attribute compulsory 
    },email:{
        type:String,
        required: true, //makes an attribute compulsory 
        unique:true
    },age:{
        type:Number,
        min:1,
    }
})

const User = mongoose.model("User",userSchema);

module.exports =User;