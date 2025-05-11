import React, { useState } from "react";
import axios from "axios";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const token = localStorage.getItem("token");

  const handleUpdateUsername = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/users/update",
        { username },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Username updated");
    } catch (err) {
      console.error(err);
    }
  };

  const handleUploadPhoto = async () => {
    const formData = new FormData();
    formData.append("profilePhoto", profilePhoto);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/upload-photo",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newProfilePhoto = response.data.profilePhoto;
      setPreview(newProfilePhoto);

      // Update profile photo in localStorage
      localStorage.setItem("profilePhoto", newProfilePhoto);

      // Trigger a re-render of the header by using a custom event
      const event = new Event("profilePhotoUpdated");
      window.dispatchEvent(event);

      alert("Profile photo uploaded");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
          Update Profile
        </h2>

        {/* Update Username */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">New Username:</label>
          <input
            type="text"
            placeholder="Enter new username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition bg-gray-100"
          />
          <button
            onClick={handleUpdateUsername}
            className="w-full mt-3 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition duration-300"
          >
            Update Username
          </button>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Upload Profile Photo */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Upload Profile Photo:</label>
          <input
            type="file"
            onChange={(e) => setProfilePhoto(e.target.files[0])}
            className="w-full py-2 px-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition bg-gray-100"
          />
          <button
            onClick={handleUploadPhoto}
            className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition duration-300"
          >
            Upload Photo
          </button>
        </div>

        {/* Profile Photo Preview */}
        {preview && (
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Profile Photo Preview:</h3>
            <img
              src={`http://localhost:5000/${preview}`}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-purple-500 shadow-lg mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
