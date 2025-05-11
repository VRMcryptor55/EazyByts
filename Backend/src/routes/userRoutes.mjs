import express from "express";
import { registerUser, loginUser, updateUser, uploadProfilePhoto } from "../controllers/userController.mjs";
import { protect } from "../middleware/authMiddleware.mjs";
import { upload } from "../config/uploadConfig.mjs";
import { getProfile } from "../controllers/userController.mjs";
import { getUserByUsername } from "../controllers/userController.mjs";

const router = express.Router();

// User Registration
router.post("/register", registerUser);

// User Login
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put("/update", protect, updateUser);
router.post("/upload-photo", protect, upload.single("profilePhoto"), uploadProfilePhoto);
router.get("/:username", getUserByUsername);

export default router;
