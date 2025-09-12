const express = require("express");
const app=express();
const port=4000;


app.get("/",(req,res)=>{
    res.send("server online")
})

app.post("/user",(req,res)=>{ //not work in browser
    console.log("hiii");
    res.send("hello");
})


app.listen(port,()=>{
    console.log(`server live on ${port}`);
});
