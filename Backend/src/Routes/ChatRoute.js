import express from "express";

import { handleChat } from "../Controllers/ChatController.js";

const router = express.Router();
router.post("/", handleChat);
export default router;
