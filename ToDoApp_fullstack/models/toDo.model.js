const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    status:{
        type:Boolean,
        default:false
    },task:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Todo = mongoose.model("taskDetails",todoSchema);

module.exports = Todo;