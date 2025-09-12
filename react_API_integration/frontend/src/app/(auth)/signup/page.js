"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const Page = () => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    let payload ={
        name,
        email,
        password
    }
    console.log("first")
    let res = await axios.post("http://localhost:5000/auth/signup",payload); //to send request to the beackend server
    if(res.status=201){
        router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
      <div className="bg-gray-800/90 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center mb-2 tracking-tight text-white">
          Create Accountt
        </h1>
        <p className="text-gray-400 text-center mb-8 text-sm">
          Sign up to get started with your journey 🚀
        </p>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-6">
          
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-300">
              Full Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-300">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-300">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <p className="text-xs text-gray-400 mt-1">Must be at least 8 characters.</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-0.5"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          {/* <a href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
            Log in
          </a> */}
        </p>
      </div>
    </div>
  );
};

export default Page;
