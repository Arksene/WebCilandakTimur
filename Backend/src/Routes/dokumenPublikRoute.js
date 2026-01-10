import express from "express";
import upload from "../Middlewares/uploadMiddleware.js";
import {
  createDokumenPublik,
  getAllDokumenPublik,
  getDokumenPublikById,
  getDokumenPublikByKategori,
  updateDokumenPublik,
  deleteDokumenPublik,
} from "../Controllers/DokumenPublikController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";

const router = express.Router();

// Buat dokumen publik dengan file
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  createDokumenPublik
);

// Ambil semua dokumen publik
router.get("/", getAllDokumenPublik);

// Ambil dokumen publik berdasarkan ID
router.get("/id/:id", getDokumenPublikById);

// Ambil dokumen publik berdasarkan kategori
router.get("/kategori/:kategori", getDokumenPublikByKategori);

// Update dokumen publik
router.put("/:id", authMiddleware, upload.single("file"), updateDokumenPublik);

// Hapus dokumen publik
router.delete("/:id", authMiddleware, deleteDokumenPublik);

export default router;
