import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Projects = () => {
  const { username } = useParams();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const userRes = await axios.get(`http://localhost:5000/api/users/${username}`);
        const userId = userRes.data.userId;

        if (!userId) {
          setError("User not found");
          return;
        }

        const projectsRes = await axios.get(`http://localhost:5000/api/projects/${userId}`);
        setProjects(projectsRes.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects");
      }
    };

    fetchProjects();
  }, [username]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 flex items-center justify-center p-6 animate-fade-in">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-purple-600 text-center mb-6">
          Projects of {username}
        </h2>

        {/* Link to Get Updated Page */}
        <div className="text-center mb-6">
          <Link
            to={`/get-updated/${username}`}
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
          >
            Get Updates for {username}
          </Link>
        </div>

        {error ? (
          <p className="text-red-500 text-center mb-4">{error}</p>
        ) : projects.length > 0 ? (
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-2">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-500 hover:text-purple-600 underline"
                >
                  View Project
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
