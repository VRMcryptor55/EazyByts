import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem("profilePhoto") || "");
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profilePhoto");
    localStorage.removeItem("username");
    setProfilePhoto("");
    setUsername("");
    setIsLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setProfilePhoto(res.data.profilePhoto);
          setUsername(res.data.username);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("profilePhoto", res.data.profilePhoto);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error(err);
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
    }

    const handleProfilePhotoUpdate = () => {
      const updatedPhoto = localStorage.getItem("profilePhoto");
      setProfilePhoto(updatedPhoto);
    };

    window.addEventListener("profilePhotoUpdated", handleProfilePhotoUpdate);

    return () => {
      window.removeEventListener("profilePhotoUpdated", handleProfilePhotoUpdate);
    };
  }, [token]);

  return (
    <nav className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-5 shadow-lg flex justify-between items-center">
      <h2 className="text-2xl font-bold text-white hover:text-gray-200 transition duration-300 cursor-pointer">
        Portfolio Management
      </h2>

      <div className="flex items-center space-x-6">
        <Link to="/" className="text-white hover:text-gray-200 transition duration-300">
          Home
        </Link>

        {isLoggedIn && username ? (
          <>
            <Link
              to={`/projects/${username}`}
              className="text-white hover:text-gray-200 transition duration-300"
            >
              Projects
            </Link>
            <Link
              to={`/contact/${username}`}
              className="text-white hover:text-gray-200 transition duration-300"
            >
              Contact
            </Link>
            <Link
              to={`/profile/${username}`}
              className="text-white hover:text-gray-200 transition duration-300"
            >
              Profile
            </Link>
            <Link
              to={`/dashboard/${username}`}
              className="text-white hover:text-gray-200 transition duration-300"
            >
              Dashboard
            </Link>

            <div className="flex items-center space-x-4">
              {profilePhoto && (
                <img
                  src={`http://localhost:5000/${profilePhoto}`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-white hover:border-gray-300 transition duration-300"
                />
              )}
              <span className="text-white font-semibold">{username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white hover:text-gray-200 transition duration-300">
              Login
            </Link>
            <Link to="/register" className="text-white hover:text-gray-200 transition duration-300">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
