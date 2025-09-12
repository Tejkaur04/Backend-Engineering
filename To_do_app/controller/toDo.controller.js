const User = require("../models/toDo.model");

const addToDo = async (req,res) => {
    try{
        const {task}= req.body;
        const toDo = await toDo.create({task});
        res.status(201).json({"todo created successfully"});
    }catch(err){
        res.status(500).json({message:err.message})
    }
};

const deleteToDo = async (req,res) => {
    try {
        const {id} = req.params;
        await Todo.findByIdAndDelete(id);
        res.status(200).json({message:"todo deleted successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};

const updateTodo =async (req,res) => {
    try {
        const {id} = req.params;
        const todo = await Todo.findById(id);
        todo.status = !todo.status;
        await todo.save();
        res.status(200).json({message:"todo updated sucessfully"})
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
};