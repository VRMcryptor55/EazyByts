import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        username,
        password,
      });

      const token = response.data.token;

      if (!username) {
        alert("Username not found. Please try again.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      navigate(`/dashboard/${username}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500">
      <div className="bg-gradient-to-br from-white to-gray-100 p-10 rounded-lg shadow-lg w-full max-w-md mx-4 animate-fade-in">
        <h2 className="text-4xl font-bold text-center text-purple-600 mb-6">
          Welcome Back!
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300 bg-white placeholder-gray-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300 bg-white placeholder-gray-500"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-red-500 hover:via-pink-500 hover:to-purple-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
        >
          Sign In
        </button>

        <div className="text-center mt-6">
          <p className="text-gray-600">Don't have an account? 
            <span className="text-purple-500 hover:underline cursor-pointer ml-1">
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
