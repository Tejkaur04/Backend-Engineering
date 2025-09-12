const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());

app.use((req,res,next)=>{
    console.log("generic middleware 1");
    next();
})

app.get("/",(req,res)=>{
    console.log(req.query);
    const userName = req.query.name;
    const {num,number} = req.query ; //object destructuring
    console.log(num,number);

    const[num1,num2] = [1,2,3,4];//array destructuring
    console.log(num1 ,num2);
    
    res.status(301).send("ok");
})

app.post("/",(req,res)=>{
    console.log("hi");
    res.send("hello");
})

app.get("/user/:id",(req,res)=>{
    console.log(req.params);
    const {id} = req.params;
    console.log(id);
    res.send("ok");
    
})

app.get("/user/:id/:user",(req,res)=>{
    console.log(req.params);
    const {id} = req.params;
    const {user} = req.params;
    console.log(id ,user);
    res.send("ok");
    
})



app.listen(PORT,()=>{
        console.log(`Server live on ${PORT}`);
        
})