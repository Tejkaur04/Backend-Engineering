'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                email,
                password,
            };
            // Send a POST request to the backend login endpoint
            const res = await axios.post("http://localhost:5000/auth/login", payload);

            if (res.status === 200) {
                //sets cookie for 7 days
                Cookies.set("token",res.data.token,{expires:7})
                // Redirect to the home page or dashboard on successful login
                router.push("/");
            }
        } catch (error) {
            console.error("Login failed:", error);
            // You can add state here to show an error message to the user
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
            <div className="bg-gray-800/90 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
                
                {/* Title */}
                <h1 className="text-4xl font-extrabold text-center mb-2 tracking-tight text-white">
                    Log In
                </h1>
                <p className="text-gray-400 text-center mb-8 text-sm">
                    Welcome back! 👋
                </p>

                {/* Form */}
                <form onSubmit={submitHandler} className="space-y-6">
                    
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-300">
                            Email Address
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-300">
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-0.5"
                    >
                        Log In
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-400 mt-6">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-blue-400 hover:text-blue-300 font-medium">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;