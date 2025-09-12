const express = require('express');
const app = express();
const PORT = 4000;
const {formatDate,anotherFormat} = require("./utils/date-converter.js");


app.get("/",(req,res)=>{
    const date = formatDate("07-07-2025");
    console.log(date);
    res.send(`formated date: ${date}, Another Formated Date: ${anotherFormat}`)
})


app.listen(PORT,()=>{
        console.log(`Server live on ${PORT}`);
        
})