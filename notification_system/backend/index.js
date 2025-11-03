const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);

// ✅ Initialize Socket.IO correctly
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const PORT = 5000;

// ✅ Middleware setup
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ✅ In-memory user and post storage
const Users = {};

//post->{
// author -> username
// content -> string 
// likes-> [Username]
// createdAt->date
// }

const posts = []; // Example: { author, content, likes: [user], createdAt }

// ✅ Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register", (userName) => {
    Users[userName] = socket.id;
    console.log(`${userName} registered with id ${socket.id}`);
  });

  app.post("/post/create",async(req,res)=>{
    try {
        const{username,content} = req.body;
        const post = {
            author:username,
            content,
            likes:[],
            createdAt: new Date()
        }
        posts.unshift(post);
        res.status(201).json({posts:Post});
    } catch (error) {
        res.status(401).json({message:error.message})
    }
  })

  app.get("/post/all",async(req,res)=>{
    res.status({posts:Posts})
  })

  

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    // Optional: remove user from Users map
    for (let user in Users) {
      if (Users[user] === socket.id) {
        delete Users[user];
        break;
      }
    }
  });
});

// ✅ Base route
app.get("/", (req, res) => {
  res.send("Server running...");
});

// ✅ Start server
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
