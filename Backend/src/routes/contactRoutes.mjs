import express from "express";
import { updateContact, getContactByUserId } from "../controllers/contactController.mjs";
import { protect } from "../middleware/authMiddleware.mjs";

const router = express.Router();

// Update or Add Contact Information (Logged-in User)
router.post("/", protect, updateContact);

// Get Contact Information by User ID (Public)
router.get("/:userId", getContactByUserId);

export default router;
