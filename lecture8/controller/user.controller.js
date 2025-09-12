const User = require("../models/user.model");

const create= async (req,res)=>{
     try{
            const {name,email,age}= req.body;
            const user = await User({ //creates document only
                name,
                email,
                age
            })
            await user.save(); //save document to database
            res.status(201).json({user});
        }catch(error){
            res.status(500).json({message:error.message})
        }
}
const updateUser = async (req,res)=>{
     try{
        const {id} = req.params;
        const {name,age} = req.body;
        // const result = await User.findByIdAndUpdate( id , {name:name , age:age}); //directly user ki id url se leke update krdega
        const result = await User.updateOne({_id:id},{name:name,age:age}); //only one user document will cahnge woh bhi manually id deke
        res.status(200).json({message:"user updated successfully",result});
    }catch(error){
        res.status(500).json({message:error.message})
    }
}
const deleteUser = async(req,res)=>{
    try{
        const {id}= req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({message:"user deleted successfully"});
    }catch(err){
        res.status(200).json({message:err.message});
    }
}

module.exports = {
    createUser , updateUser , deleteUser
}