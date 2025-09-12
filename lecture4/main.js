const { log } = require("console");
const fs = require("fs");


fs.writeFile("./text.txt","this is written by Async",(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("done"); 
    }
})

// fs.writeFileSync("./text.txt","this is written by Sync");

// console.log(1);


// console.log(2);

//sync
// const data = fs.readFileSync("./text.txt","utf-8");
// console.log("Sync: ",data);

fs.appendFile("./text.txt","\nthis is appended by Async",(err)=>{
    if(err){
        console.log(err); 
    } else {
        console.log("async update done"); 
    }
})

//async
fs.readFile("./text.txt","utf-8",(err,data)=>{
    if(err){
        console.log(err);
    } else{
        console.log("async: ",data); 
    }
})
