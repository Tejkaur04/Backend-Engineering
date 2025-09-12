const express = require("express"); //require se node modules se fetch hoga
const User = require("../models/toDo.model.js");
const router = express.Router();//express se router function ko extract kiya hai
const {addTodo , deleteTodo ,updateTodo} = require("../controller/toDo.controller.js");
const Todo = require("../models/toDo.model.js");

router.post("/addTask",addTodo);

router.delete("/deleteTask/:id",deleteTodo);

router.put("/updateTask/:id",updateTodo);

router.get("/search",async(req,res)=>{
    try {
        const {task} = req.query;//ismai keyvalue pair directly client se uthate hain unlinke req.params jismai id humme path mai deni pdti hai
        const matchedTodos = await Todo.find({task:{$regex:task},$options: "i"}); //regex is defining ki konsa word search krna hai,options"i' matlab case sensitive
    } catch (error) {
        
    }
})

module.exports = router;
