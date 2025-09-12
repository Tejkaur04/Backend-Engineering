const mongoose = require("mongoose");

async function connectDB(){
    await mongoose.connect(process.env.DB_URL).then(()=>{
            console.log("connected to DB");
    }).catch((err)=>{
        console.log("attempted db connection"+ err.message);   
    })
}

module.exports = connectDB;
