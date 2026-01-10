import express from "express";
import { getBatas, updateBatasById } from "../Controllers/WilayahController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
import {
  getStatistik,
  updateStatistikById,
} from "../Controllers/StatistikController.js";

const router = express.Router();

// GET: Ambil semua data batas wilayah
router.get("/batas", getBatas);
// PUT: Update batas wilayah berdasarkan ID
router.put("/batas/:id", authMiddleware, updateBatasById);
// GET: Ambil data statistik
router.get("/statistik", getStatistik);
// PUT: Update data statistik berdasarkan ID
router.put("/statistik/:id", authMiddleware, updateStatistikById);
export default router;
