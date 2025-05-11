import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-fade-in">
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-lg mx-4 text-center">
        <h1 className="text-3xl font-bold text-purple-600 mb-4">Welcome to the Portfolio Management System</h1>
        <p className="text-gray-600">This is the homepage. Explore the features and manage your portfolio effectively.</p>
      </div>
    </div>
  );
};

export default Home;
