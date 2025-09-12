
const mongoose = require("mongoose");

async function connectDB(){
    // await mongoose.connect(process.env.DB_URL);
    ( mongoose.connect(process.env.DB_URL)).then(()=>{
        console.log("done");
    })
    console.log("connected to db");
    
}
module.exports = connectDB;