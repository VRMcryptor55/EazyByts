import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const GetUpdated = () => {
  const { username } = useParams();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/notifications/subscribe/${username}`,
        { email }
      );
      setMessage(response.data.message);
      setEmail("");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error subscribing");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full animate-fade-in">
        <h2 className="text-2xl font-bold text-purple-600 text-center mb-6">
          Get Updates from {username}
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition bg-gray-100"
          />

          <button
            onClick={handleSubscribe}
            className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 hover:from-green-500 hover:to-purple-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
          >
            Subscribe
          </button>
        </div>

        {message && (
          <p className="text-center text-gray-600 mt-4">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default GetUpdated;
