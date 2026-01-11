import express from "express";
import upload from "../Middlewares/uploadMiddleware.js";
import {
  createBerita,
  getAllBerita,
  getBeritaById,
  updateBerita,
  deleteBerita,
  getLatestBerita,
} from "../Controllers/BeritaController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";

const router = express.Router();

// Post berita dengan gambar
router.post("/upload", authMiddleware, upload.single("gambar"), createBerita);

// Ambil semua berita
router.get("/", getAllBerita);

// Ambil beberapa berita terbaru
router.get("/latest", getLatestBerita);

// Ambil berita berdasarkan ID
router.get("/:id", getBeritaById);

// Update berita dengan gambar baru
router.put("/:id", authMiddleware, upload.single("gambar"), updateBerita);

// Hapus berita
router.delete("/:id", authMiddleware, deleteBerita);

export default router;
