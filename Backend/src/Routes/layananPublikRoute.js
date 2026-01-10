import express from "express";
import {
  createLayananPublik,
  getAllLayananPublik,
  getLayananPublikById,
  getLayananPublikByNama,
  updateLayananPublik,
  deleteLayananPublik,
} from "../Controllers/LayananPublikController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";

const router = express.Router();

// Buat layanan publik
router.post("/", authMiddleware, createLayananPublik);

// Ambil semua layanan publik
router.get("/", getAllLayananPublik);

// Ambil layanan publik berdasarkan ID
router.get("/id/:id", getLayananPublikById);

//  Ambil layanan publik berdasarkan nama
router.get("/search", getLayananPublikByNama);

//  Update layanan publik
router.put("/:id", authMiddleware, updateLayananPublik);

//  Hapus layanan publik
router.delete("/:id", authMiddleware, deleteLayananPublik);

export default router;
