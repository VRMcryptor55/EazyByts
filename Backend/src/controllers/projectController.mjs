import Project from "../models/Project.mjs";
import { sendEmailNotification } from "./notificationController.mjs";


// Add New Project
export const addProject = async (req, res) => {
  const { title, description, link } = req.body;
  const userId = req.user.id;

  try {
    const newProject = new Project({ title, description, link, createdBy: userId });
    await newProject.save();

    const subject = "New Project Added!";
    const message = `A new project titled "${title}" has been added. Check it out!`;
    await sendEmailNotification(userId, subject, message);

    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Get Projects by User ID
export const getProjectsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
      const projects = await Project.find({ createdBy: userId });
      res.json(projects);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// Update Project
export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, link } = req.body;

  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.title = title;
    project.description = description;
    project.link = link;
    await project.save();

    res.json({ message: "Project updated", project });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Project
export const deleteProject = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const project = await Project.findOneAndDelete({ _id: id, createdBy: userId });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const subject = "Project Deleted!";
    const message = `The project titled "${project.title}" has been deleted.`;
    await sendEmailNotification(userId, subject, message);

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
  