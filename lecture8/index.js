const express = require("express");
const app = express();
const PORT = 4000;
require("dotenv").config();
const connectDB = require("./db/connectDB");
const User = require("./models/user.model");
//Routers
const userRouter = require("./routes/user.route");

app.use(express.json());
app.use(express.urlencoded({extended : true}));

//routes
app.use("/api",userRouter);

// app.get("/",async(req,res)=>{
//     const user = await User.create({
//         name: "user1",
//         email:"tej@gmail.com",
//     })
//     res.status(201).json({user});
// });

app.post("/user/create",async (req,res)=>{
    // try{
    //     const {name,email,age}= req.body;
    //     // const user = await User.create({
    //     //     name:name,
    //     //     email:email,
    //     //     age:age
    //     // })
    //     //when name of key and value is same , sirf ek bar likhke kaam chal jaata hai
    //     // database mai entry krke save krega
    //     // const user = await User.create({
    //     //     name,
    //     //     email,
    //     //     age
    //     // })
    //     const user = await User({ //creates document only
    //         name,
    //         email,
    //         age
    //     })
    //     await user.save(); //save document to database


    //     res.status(201).json({user});
    // }catch(error){
    //     res.status(500).json({message:error.message})
    // }
})

app.put("/user/update/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const {name,age} = req.body;
        // const result = await User.findByIdAndUpdate( id , {name:name , age:age}); //directly user ki id url se leke update krdega
        const result = await User.updateOne({_id:id},{name:name,age:age}); //only one user document will cahnge woh bhi manually id deke
        res.status(200).json({message:"user updated successfully",result});
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
    })
})
.catch((error)=>console.log(error))

