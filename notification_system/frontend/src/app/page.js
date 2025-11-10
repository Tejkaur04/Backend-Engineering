"use client"
import axios from "axios";
import { Heart, User, Bell } from "lucide-react";   // ✅ Added Bell import
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [socket,setSocket] = useState(null);
  const [isLoggedIn,setIsLoggedIn] = useState(false); // ✅ fixed typo
  const [username,setUsername] = useState("");
  const [content,setContent] = useState("");
  const [posts , setPosts] = useState([]);
  const [refresh , setRefresh] = useState("");
  const [notifications , setNotifications] = useState([]);

  // socket client initialise
  useEffect(()=>{
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);
  },[])

  const getAllPosts = async()=>{
    if(isLoggedIn){
      let res  =  await axios.get("http://localhost:4000/post/all");
      setPosts(res.data.posts);
    }
  }

  useEffect(()=>{
    getAllPosts();
  },[refresh, isLoggedIn])   // ✅ also depend on login state

  // client connection
  useEffect(()=>{
    socket?.on("connect",()=>{
      console.log("user connected",socket.id);
    })
    socket?.on("notice",(data)=>{
      setNotifications((prev)=>[data,...prev])
    })

    setTimeout(()=>{
      setNotifications([]);
    },3000);

    socket?.on("post update",(data)=>{
      setPosts(data);
    })


  },[socket])

  const handleSubmit = (e)=>{
    e.preventDefault();
    socket?.emit("register",username);
    setIsLoggedIn(true);
    setRefresh(prev=>prev+1);
  }

  if(!isLoggedIn){
    return (
      <div className="h-screen w-full bg-white text-black flex justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 border rounded-md p-5">
          <label form="username">Username</label>
          <input onChange={(e)=>setUsername(e.target.value)} className="border" id="username" placeholder="Enter Name"/>
          <button className="border bg-blue-300 rounded-lg">Register</button>
        </form>
      </div>
    )
  }

  const handlePostCreate = async (e)=>{
    e.preventDefault();
    let payload = { username, content };
    let res = await axios.post("http://localhost:4000/post/create",payload);
    if(res.status == 201){
      setContent("");
      setRefresh(prev=>prev+1)
    }
  }

  const handlePostLike = async(id)=>{
    try{
      let res = await axios.post(`http://localhost:4000/post/like/${id}/${username}`);
      if(res.status ==200){
        setRefresh(prev=>prev+1);
      }
    }catch(error){
      console.log(error.message);
    }
  }

  return (
    <div className="h-screen w-full bg-white text-black px-20 py-10">
      <h1 className="text-2xl font-semibold">Hello {username}!!</h1>

      <div className="fixed top-5 right-2 flex flex-col gap-2">
        {notifications?.map((notice,ind)=>(
          <div key={ind} className="border rounded-md p-2 bg-green-500 flex items-center gap-1 capitalize">
            <Bell size={14}/> {notice}
          </div>
        ))}
      </div>

      <form onSubmit={handlePostCreate} className="flex flex-col gap-2 border rounded-md p-5">
          <label>Create Tweet</label>
          <textarea rows={3} onChange={(e)=>setContent(e.target.value)} value={content} className="border" placeholder="Enter Text"/>
          <button className="border bg-blue-300 rounded-lg">Post</button>
      </form>

      <div className="p-5">
        {posts?.map((post,indx) =>(
          <div key={indx} className="p-4 border rounded-lg shadow-md">
            <div className="flex gap-2 items-center">
              <User className="h-7 w-7"/>
              <h4 className="text-lg font-semibold">{post?.author}</h4>
            </div>

            <p className="text-xl">{post?.content}</p>
            <p className="text-sm text-gray-400 float-end">{new Date(post?.createdAt).toLocaleDateString()}</p>

            <div
              aria-disabled={post?.likes?.includes(username)}
              onClick={() => !post?.likes?.includes(username) && handlePostLike(post?.id)}
              className={`flex items-center gap-2 mt-2 ${
                post?.likes?.includes(username)
                  ? "opacity-45 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {post?.likes?.includes(username)
                ? <Heart fill="red" className="mr-2" />
                : <Heart className="mr-2" />
              }
              {post?.likes?.length || 0} Likes
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
