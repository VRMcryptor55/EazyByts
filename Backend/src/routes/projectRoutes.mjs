import express from "express";
import { addProject, getProjectsByUser, updateProject, deleteProject } from "../controllers/projectController.mjs";
import { protect } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.get("/:userId", getProjectsByUser);
router.post("/", protect, addProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;
