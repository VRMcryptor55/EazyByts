import express from "express";
import { addSubscriber } from "../controllers/notificationController.mjs";

const router = express.Router();

// Subscribe to user updates
router.post("/subscribe/:username", addSubscriber);

export default router;
