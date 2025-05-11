import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const loggedInUsername = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    if (username !== loggedInUsername) {
      navigate(`/dashboard/${loggedInUsername}`);
    } else {
      fetchProjects();
    }
  }, [username, loggedInUsername, navigate, token]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${username}`);
      const userId = res.data.userId;

      const projectsRes = await axios.get(`http://localhost:5000/api/projects/${userId}`);
      setProjects(projectsRes.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const handleAddProject = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/projects",
        { title, description, link },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTitle("");
      setDescription("");
      setLink("");
      fetchProjects();
      alert("Project added");
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchProjects();
      alert("Project deleted");
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">{username}'s Dashboard</h2>

        <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Add New Project</h3>
          <div className="space-y-4">
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            <input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            <input
              placeholder="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            <button
              onClick={handleAddProject}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition duration-300"
            >
              Add Project
            </button>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Projects</h3>
          {projects.length > 0 ? (
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    <h4 className="text-lg font-bold text-blue-600">{project.title}</h4>
                    <p className="text-gray-500">{project.description}</p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-500 hover:underline"
                    >
                      Visit Link
                    </a>
                  </div>
                  <button
                    onClick={() => handleDeleteProject(project._id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No projects available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
