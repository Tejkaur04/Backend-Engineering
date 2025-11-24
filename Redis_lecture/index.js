const express  =  require("express");
const app = express();
const client =  require("./client");
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/" , async(req,res)=>{
    try{
        const res1 = await client.set("users:9","test 1","nx");
        const data = await client.get("users:9");

        const res2 = await client.expire("users:9",7); //expire in 7 sec

        const datas = await client.mget("users:9","users:1","users:2");
        res.json({data,datas});
    }catch(error){
        console.log(error);
    }
});

//list data type

app.get("/list",async(req,res)=>{
    try{
        const res1 = await client.lpush("mylist",1);
        const res2 = await client.rpush("mylist",2);

        const data= await client.lrange("mylist",0,-1);
        res.json({data})
    }catch(error){
        console.log(error);
    }
})

//sets data type
app.get("/sets",async (req,res)=>{
    try{
        const res1 = await client.sadd("myset","hello",7);
        const res2 = await client.sadd("myset","hel",14);
        const res3 = await client.sadd("myset",1,21);

        const allKeys = await client.smembers("myset");
        const isExist = await client.sismember("myset","hello");
        res.json({allKeys,isExist})
    }catch(error){
        console.log(error);
    }
})

//JSON
app.get("/json",async(req,res)=>{
    try{
        const jsonData={
            name:"Shubham",
            val:25,
        }
        const res1 = await client.set("mydata:1",JSON.stringify(jsonData));
        const data = await client.get("mydata:1");
        const realData = JSON.parse(data);
        res.json({realData});
    }catch(error){
        console.log(error);
    }
})

//api architecture with redis
app.get("/arch",async (req,res)=>{
    try{
        // 1. to check data in redis
        const data = await client.get("archData:1");
        if(data){
            return res.json({data});
        }

        // 2. if !data then find from DB
        // ......... fetch data from DB

        // 3. store the data from DB into redis
        const res1 = await client.set("archData:1",JSON.stringify({name:"Tejinder",val:1}))

        // 4. Set an expiry on data in redis 
        await client.expire("archData:1",7)

        res.json({data:"fetched data from DB"});

    }catch(error){
        console.log(error);
    }
})


app.listen(PORT , ()=>console.log("Server running yeaahhh baby on "+ PORT) );