const Todo  = require("../models/toDo.model");


const addTodo = async (req,res) => {
    try{
        const {task}= req.body;
        const toDo = await Todo.create({task});
        res.status(201).json({message:"todo created successfully"});
    }catch(err){
        res.status(500).json({message:err.message})
    }
};

const deleteTodo = async (req,res) => {
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

const searchTodo = async(req,res)=>{
    try {
        const {task} = req.query;//ismai keyvalue pair directly client se uthate hain unlinke req.params jismai id humme path mai deni pdti hai
        const matchedTodos = await Todo.find({task:{$regex:task},$options: "i"}); //regex is defining ki konsa word search krna hai,options"i' matlab case sensitive
    } catch (error) {  
    }
};

const allTodo = async(req,res)=>{
    try{
        const todos = await Todo.find();
        res.status(200).json({todos});
    }catch(error){
        res.json.status(500).json({message:error.mesaage});
    }
};

const filterTodo =async (req,res)=>{
    try {
        const {filterName} = req.query;
        if(!filterName){
            throw new Error("filterName is required");
        }
        //filterName - all , active , completed (possible values)
        //all -> return all todos
        // active -> return todos whose status is false
        // completed -> return todos whose status is true
        if(filterName=="all"){
            const todos = await Todo.find();
            return res.status(200).json({todos});
        }
        //active and completed dono ko ek hi ternary operation use krke krr diya
        const todos = await Todo.find({status:filterName=="active"?false:true})
        res.status(200).json({todos});
    } catch (error) {
        res.status(200).json({message:error.message});
    }
};

const clearCompleted = async (req,res)=>{
    try {
        await Todo.deleteMany({status:true});
        res.status(200).json({message:"todos deleted"});
    } catch (error) {
        res.status(200).json({message:error});
    }
};

module.exports = {addTodo , deleteTodo ,updateTodo , allTodo , searchTodo , filterTodo, clearCompleted };