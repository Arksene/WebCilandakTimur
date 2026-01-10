import express from "express";
import {
  createInformasiKelurahan,
  getAllInformasiKelurahan,
  getInformasiKelurahanhById,
  getInformasiKelurahanhByKey,
  updateInformasiKelurahan,
  deleteInformasiKelurahan,
} from "../Controllers/InformasiKelurahanhController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";

const router = express.Router();

// Buat informasi kelurahan
router.post("/", authMiddleware, createInformasiKelurahan);

// Ambil semua informasi kelurahan
router.get("/", getAllInformasiKelurahan);

// Ambil informasi kelurahan berdasarkan ID
router.get("/id/:id", getInformasiKelurahanhById);

// Ambil informasi kelurahan berdasarkan Key
router.get("/key/:key", getInformasiKelurahanhByKey);

// Update informasi kelurahan
router.put("/:id", authMiddleware, updateInformasiKelurahan);

// Hapus informasi kelurahan
router.delete("/:id", authMiddleware, deleteInformasiKelurahan);

export default router;
