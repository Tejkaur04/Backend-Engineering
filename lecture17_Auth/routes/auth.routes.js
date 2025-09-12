const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
// const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const verifyUser = require("../middleware/verify.middleware");
const verifyAdmin = require("../middleware/verifyAdmin.middleware");

router.post("/signup",async (req,res)=>{
    try {
        let {name,email,password} = req.body;
        if(!name || !email || !password){
            throw new Error("All fields are required");
        }
        const hashPass = await bcrypt.hash(password,10);
        let user = await User.create({
            name:name,
            email:email,
            password:hashPass
        })
        res.status(200).json({message:"user signup successfull",user});
    } catch (error) {
        res.status(500).json({message:error,message});
    }
})


router.post("/admin/signup",async(req,res)=>{
    try {
        let {name,email,password} = req.body;
        if(!name || !email || !password){
            throw new Error("All fields are required");
        }
        const hashPass = await bcrypt.hash(password,10);
        let user = await User.create({
            name:name,
            email:email,
            password:hashPass,
            role:"admin" //admin ka page khulega
        })
        res.status(200).json({message:"user signup successfull",user});
    } catch (error) {
        res.status(500).json({message:error,message});
    }
})


router.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await User.findOne({email:email}).select("+password");
        if(!user){
            throw new Error("Invalid email or password")
        }
        const isMatched = await bcrypt.compare(password,user.password);
        if(!isMatched){
            throw new Error("Inavlid email or password");
        }
        const token = jwt.sign({id:user._id,name:user.name,email:user.email},
            process.env.JWT_SECRET,{expiresIn:'1h',algorithm:"HS256"}
        )
        res.cookie("token",token,{httpOnly:true,secure:false,domain:"localhost",path:"/",maxAge:24*60*60*1000});  //local host pe cookie send krr rhe hain
        res.status(200).json({message:"user loggin successfull",token:token});
    }catch(error){
        console.log(error)
        res.status(400).json({message:error.message});
    }
})

//to check if user is valid/loggedin ya nhi
router.get("/check",verifyUser,async(req,res)=>{
    try{
        // const authorization = req.headers.authorization;
        // const token = authorization.split(" ")[1] //character array mai krdega on the basis of split
        // const payload = jwt.verify(token,process.env.JWT_SECRET)
        // res.status(200).json({message:"welcome user",user:payload})
        res.status(200).json({message:"welcome user",user:req.user})
    }catch(error){
        res.status(400).json({message:error.message});
    }
})

//non-admin walle users ki list aa jayegi admin ko 
router.get("/info",verifyUser,verifyAdmin,async(req,res)=>{
    try{
        let users = await User.find({role:{$ne:"admin"}});
        res.status(200).json({users})
    }catch(error){
        res.status(400).json({message:error.message})
    }
})


module.exports = router;