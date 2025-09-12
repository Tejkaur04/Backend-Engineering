const express = require("express"); //require se node modules se fetch hoga
const User = require("../models/toDo.model.js");
const router = express.Router();//express se router function ko extract kiya hai
const {addTodo , deleteTodo ,updateTodo , allTodo , searchTodo , filterTodo, clearCompleted } = require("../controller/toDo.controller.js");
const Todo = require("../models/toDo.model.js");

router.post("/addTask",addTodo);

router.delete("/deleteTask/:id",deleteTodo);

router.put("/updateTask/:id",updateTodo);

router.get("/search",searchTodo);

router.get("/all",allTodo);

router.get("/filter",filterTodo);

router.delete("/clear/completed",clearCompleted);

module.exports = router;
