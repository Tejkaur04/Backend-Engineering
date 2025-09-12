const express = require("express");
const app=express();
const port=4000;


app.use(express.json());
app.get("/", (req,res)=>{
    //data processing work and then send response
    // res.send("home api working")
    const result = {
        name : "abc",
        work : null
    }
    // res.json(result);
    // res.json({result});
    // res.json({data:result});
    res.status(200).json({data:[result]});
})

app.post("/",(req,res)=>{
    console.log(req.body);
    res.status(201).send("ok");
    
})


app.listen(port,()=>{
    console.log(`server live on ${port}`);
});
