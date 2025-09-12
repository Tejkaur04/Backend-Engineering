const express = require("express");
const app = express();
const PORT = 4000;
require("dotenv").config();
const connectDB = require("./db/connectDB");
const taskDetails = require("./models/toDo.model");
//Routers
// const userRouter = require("./routes/toDo.route");

app.use(express.json());
app.use(express.urlencoded({extended : true}));

connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
    })
})
.catch((error)=>console.log(error))