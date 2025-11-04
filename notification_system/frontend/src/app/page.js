"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { Heart } from "lucide-react"; // Optional if you're using lucide-react icons

export default function Home() {
  const [socket, setSocket] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  // Initialize socket client
  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);
    return () => newSocket.disconnect(); // clean up socket on unmount
  }, []);

  // Fetch all posts
  const getAllPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/posts/all");
      setPosts(res.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  // Socket connection log
  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      console.log("User connected:", socket.id);
    });
  }, [socket]);

  const handleRegister = (e) => {
    e.preventDefault();
    socket.emit("register", username);
    setIsLoggedIn(true);
  };

  const handlePostCreate = async (e) => {
    e.preventDefault();
    const payload = {
      username,
      content,
    };
    try {
      await axios.post("http://localhost:5000/post/create", payload);
      setContent("");
      getAllPosts(); // refresh posts after creating
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Login/Register screen
  if (!isLoggedIn) {
    return (
      <div className="h-screen w-full bg-white text-black flex justify-center items-center">
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-2 border rounded-md p-5"
        >
          <label htmlFor="username">Username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="border px-2 py-1"
            id="username"
            placeholder="Enter Name"
          />
          <button className="border bg-blue-300 rounded-lg px-3 py-1">
            Register
          </button>
        </form>
      </div>
    );
  }

  // Main app
  return (
    <div className="h-screen w-full bg-white text-black px-20 py-10 overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-4">Hello {username}!!</h1>

      <form
        onSubmit={handlePostCreate}
        className="flex flex-col gap-2 border rounded-md p-5 mb-6"
      >
        <label htmlFor="tweet">Create Tweet</label>
        <textarea
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border px-2 py-1"
          id="tweet"
          placeholder="What's on your mind?"
        />
        <button className="border bg-blue-300 rounded-lg px-3 py-1">
          Post
        </button>
      </form>

      <div className="space-y-4">
        {posts?.map((post) => (
          <div
            key={post._id}
            className="p-4 border rounded-lg shadow-md bg-gray-50"
          >
            <div className="flex gap-2 items-center mb-2">
              <Image
                src={"/default-avatar.png"} // Replace with actual avatar
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
              <h4 className="text-lg font-semibold">{post.author}</h4>
            </div>

            <p className="text-xl mb-2">{post.content}</p>
            <p className="text-sm text-gray-500 mb-2">{post.createdAt}</p>

            <div className="flex items-center gap-1 text-sm text-gray-700">
              <Heart size={16} /> {post.likes?.length || 0} Likes
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
