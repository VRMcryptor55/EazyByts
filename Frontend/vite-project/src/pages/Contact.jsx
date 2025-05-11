import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Contact = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const token = localStorage.getItem("token");

  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    // Fetch existing contact information if available
    axios
      .get(`http://localhost:5000/api/users/${username}`)
      .then((res) => {
        const userId = res.data.userId;
        return axios.get(`http://localhost:5000/api/contact/${userId}`);
      })
      .then((res) => {
        setEmail(res.data.email || "");
        setAddress(res.data.address || "");
      })
      .catch((err) => console.error("Error fetching contact info:", err));
  }, [username]);

  const handleSubmit = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/contact`,
        { email, address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Contact information updated successfully");

      // Navigate to the projects page after successful update
      navigate(`/projects/${username}`);
    } catch (err) {
      console.error("Error updating contact information:", err);
      alert(err.response?.data?.message || "Error updating contact information");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full mx-4 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
          Update Contact Information
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 bg-gray-100"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 bg-gray-100"
            placeholder="Enter address"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
        >
          Update Contact
        </button>
      </div>
    </div>
  );
};

export default Contact;
