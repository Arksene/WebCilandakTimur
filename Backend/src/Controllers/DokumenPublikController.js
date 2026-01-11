import { PrismaClient } from "@prisma/client";
import cloudinary from "../config/cloudinary.js";

const prisma = new PrismaClient();

// Fungsi untuk upload file ke Cloudinary
export const uploadFileToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "dokumen_publik",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    stream.end(file.buffer);
  });
};

// Buat dokumen publik baru
export const createDokumenPublik = async (req, res) => {
  try {
    const { namaDokumen, deskripsi, kategori } = req.body;
    let fileUrl = null;

    if (!namaDokumen) {
      return res.status(400).json({
        success: false,
        message: "Nama dokumen harus diisi",
      });
    } // Jika ada file, upload ke Cloudinary

    if (req.file) {
      const uploadResult = await uploadFileToCloudinary(req.file);
      fileUrl = uploadResult.secure_url;
    }

    const dokumen = await prisma.dokumenPublik.create({
      data: {
        namaDokumen,
        fileUrl,
        deskripsi,
        kategori,
      },
    });

    res.status(201).json({
      success: true,
      message: "Dokumen publik berhasil dibuat",
      data: dokumen,
    });
  } catch (error) {
    console.error("Error creating dokumen publik:", error);
    res.status(500).json({
      success: false,
      message: "Gagal membuat dokumen publik",
      error: error.message,
    });
  }
};

// Ambil semua dokumen publik
export const getAllDokumenPublik = async (req, res) => {
  try {
    const dokumen = await prisma.dokumenPublik.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      message: "Data dokumen publik berhasil diambil",
      data: dokumen,
    });
  } catch (error) {
    console.error("Error fetching dokumen publik:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data dokumen publik",
      error: error.message,
    });
  }
};

// Ambil dokumen publik berdasarkan ID
export const getDokumenPublikById = async (req, res) => {
  try {
    const { id } = req.params;

    const dokumen = await prisma.dokumenPublik.findUnique({
      where: { id },
    });

    if (!dokumen) {
      return res.status(404).json({
        success: false,
        message: "Dokumen publik tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data dokumen publik berhasil diambil",
      data: dokumen,
    });
  } catch (error) {
    console.error("Error fetching dokumen publik by id:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data dokumen publik",
      error: error.message,
    });
  }
};

// Ambil dokumen publik berdasarkan kategori
export const getDokumenPublikByKategori = async (req, res) => {
  try {
    const { kategori } = req.params;

    const dokumen = await prisma.dokumenPublik.findMany({
      where: { kategori },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      message: `Data dokumen publik dengan kategori ${kategori} berhasil diambil`,
      data: dokumen,
    });
  } catch (error) {
    console.error("Error fetching dokumen publik by kategori:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data dokumen publik",
      error: error.message,
    });
  }
};

// Update dokumen publik
export const updateDokumenPublik = async (req, res) => {
  try {
    const { id } = req.params;
    const { namaDokumen, deskripsi, kategori } = req.body;

    const existingDokumen = await prisma.dokumenPublik.findUnique({
      where: { id },
    });

    if (!existingDokumen) {
      return res.status(404).json({
        success: false,
        message: "Dokumen publik tidak ditemukan",
      });
    }

    let fileUrl = existingDokumen.fileUrl;

    if (req.file) {
      if (existingDokumen.fileUrl) {
        const publicId = existingDokumen.fileUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`dokumen_publik/${publicId}`);
      }

      const uploadResult = await uploadFileToCloudinary(req.file);
      fileUrl = uploadResult.secure_url;
    }

    const updatedDokumen = await prisma.dokumenPublik.update({
      where: { id },
      data: {
        namaDokumen: namaDokumen || existingDokumen.namaDokumen,
        fileUrl,
        deskripsi: deskripsi || existingDokumen.deskripsi,
        kategori: kategori || existingDokumen.kategori,
      },
    });

    res.status(200).json({
      success: true,
      message: "Dokumen publik berhasil diperbarui",
      data: updatedDokumen,
    });
  } catch (error) {
    console.error("Error updating dokumen publik:", error);
    res.status(500).json({
      success: false,
      message: "Gagal memperbarui dokumen publik",
      error: error.message,
    });
  }
};

// Delete dokumen publik
export const deleteDokumenPublik = async (req, res) => {
  try {
    const { id } = req.params;

    const dokumen = await prisma.dokumenPublik.findUnique({
      where: { id },
    });

    if (!dokumen) {
      return res.status(404).json({
        success: false,
        message: "Dokumen publik tidak ditemukan",
      });
    } // Hapus file dari Cloudinary jika ada

    if (dokumen.fileUrl) {
      const publicId = dokumen.fileUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`dokumen_publik/${publicId}`);
    }

    await prisma.dokumenPublik.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Dokumen publik berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting dokumen publik:", error);
    res.status(500).json({
      success: false,
      message: "Gagal menghapus dokumen publik",
      error: error.message,
    });
  }
};
