const mongoose= require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false    //this field will not be available in the user data feild that the admin has , it will use hashing for safety
    },
    role:{
        type:String,
        enum:["user","admin"], //possible values of attribute
        default:"user",
        select:false
    }
    },
    {
        timestamps:true
    })

const User = mongoose.model("User",userSchema);
module.exports = User;