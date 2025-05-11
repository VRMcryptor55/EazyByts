import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Footer = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const username =
    pathSegments.includes("contact") ||
    pathSegments.includes("profile") ||
    pathSegments.includes("dashboard") ||
    pathSegments.includes("projects")
      ? pathSegments[pathSegments.length - 1]
      : null;

  const [contact, setContact] = useState({ email: "Not provided", address: "Not provided" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:5000/api/users/${username}`)
        .then((res) => {
          const userId = res.data.userId;

          return axios.get(`http://localhost:5000/api/contact/${userId}`);
        })
        .then((res) => {
          setContact({
            email: res.data.email || "Not provided",
            address: res.data.address || "Not provided",
          });
        })
        .catch((err) => {
          console.error("Error fetching contact info:", err);
          setError("Failed to load contact information.");
        });
    } else {
      setContact({ email: "Not provided", address: "Not provided" });
    }
  }, [username, location]);

  return (
    <footer className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white py-6 mt-10">
      <div className="container mx-auto text-center space-y-2 animate-fade-in">
        {error ? (
          <p className="text-red-300 animate-pulse">{error}</p>
        ) : (
          <>
            <p className="text-lg font-semibold">Email: <span className="text-yellow-300">{contact.email}</span></p>
            <p className="text-lg font-semibold">Address: <span className="text-yellow-300">{contact.address}</span></p>
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;
