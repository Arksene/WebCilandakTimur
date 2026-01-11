import express from "express";
import {
  createPengaduan,
  getAllPengaduan,
  getPengaduanById,
  getPengaduanByStatus,
  updateStatusPengaduan,
  updatePengaduan,
  deletePengaduan,
} from "../Controllers/PengaduanController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
import upload from "../Middlewares/uploadMiddleware.js";

const router = express.Router();

//  Buat pengaduan (public) - dengan upload gambar
router.post("/", upload.single("buktiFoto"), createPengaduan);

//  Ambil semua pengaduan
router.get("/", getAllPengaduan);

//  Ambil pengaduan berdasarkan ID
router.get("/id/:id", getPengaduanById);

//  Ambil pengaduan berdasarkan status
router.get("/status/:status", getPengaduanByStatus);

//  Update status pengaduan
router.patch("/:id/status", authMiddleware, updateStatusPengaduan);

//  Hapus pengaduan
router.delete("/:id", authMiddleware, deletePengaduan);

export default router;
