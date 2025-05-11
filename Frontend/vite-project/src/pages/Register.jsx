import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/register", { username, password });
      setMessage("Registration successful!");
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setMessage("Error during registration. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500 flex items-center justify-center p-6 animate-fade-in">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Register
        </h2>

        {message && (
          <p className={`text-center mb-4 ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border-2 border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition bg-gray-100"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition bg-gray-100"
          />

          <button
            onClick={handleRegister}
            className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 hover:from-yellow-500 hover:to-red-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
