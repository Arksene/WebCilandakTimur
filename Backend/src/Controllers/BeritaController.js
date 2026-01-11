import { PrismaClient } from "@prisma/client";
import cloudinary from "../config/cloudinary.js";

const prisma = new PrismaClient();

// Fungsi untuk upload gambar ke Cloudinary
export const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "berita",
        resource_type: "auto",
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

// Buat berita baru dengan gambar
export const createBerita = async (req, res) => {
  try {
    const { judul, isi, kategori, tanggal, penulis } = req.body;
    let gambarUrl = null;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file);
      gambarUrl = uploadResult.secure_url;
    }

    const berita = await prisma.berita.create({
      data: {
        judul,
        isi,
        gambar: gambarUrl,
        penulis: penulis || "Kelurahan Cilandak Timur",
        tanggal: tanggal ? new Date(tanggal) : undefined,
        kategori: kategori,
      },
    });

    res.status(201).json({
      success: true,
      message: "Berita berhasil dibuat",
      data: berita,
    });
  } catch (error) {
    console.error("Error creating berita:", error);
    res.status(500).json({
      success: false,
      message: "Gagal membuat berita",
      error: error.message,
    });
  }
};

// Ambil semua berita
export const getAllBerita = async (req, res) => {
  try {
    const berita = await prisma.berita.findMany({
      orderBy: {
        tanggal: "desc",
      },
    });

    res.status(200).json({
      success: true,
      message: "Data berita berhasil diambil",
      data: berita,
    });
  } catch (error) {
    console.error("Error fetching berita:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data berita",
      error: error.message,
    });
  }
};

export const getLatestBerita = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3;

    const berita = await prisma.berita.findMany({
      take: limit,
      orderBy: {
        tanggal: "desc",
      },
      where: {
        kategori: "BERITA",
      },
    });

    res.status(200).json({
      success: true,
      message: `${limit} Berita terbaru berhasil diambil`,
      data: berita,
    });
  } catch (error) {
    console.error("Error fetching latest berita:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil berita terbaru",
      error: error.message,
    });
  }
};

// Ambil berita berdasarkan ID
export const getBeritaById = async (req, res) => {
  try {
    const { id } = req.params;

    const berita = await prisma.berita.findUnique({
      where: { id },
    });

    if (!berita) {
      return res.status(404).json({
        success: false,
        message: "Berita tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data berita berhasil diambil",
      data: berita,
    });
  } catch (error) {
    console.error("Error fetching berita by id:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data berita",
      error: error.message,
    });
  }
};

// Update berita termasuk gambar
export const updateBerita = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, isi, kategori } = req.body;

    // Cari berita yang ada
    const existingBerita = await prisma.berita.findUnique({
      where: { id },
    });

    if (!existingBerita) {
      return res.status(404).json({
        success: false,
        message: "Berita tidak ditemukan",
      });
    }

    let gambarUrl = existingBerita.gambar;

    // Jika ada file baru, upload dan hapus yang lama
    if (req.file) {
      // Hapus gambar lama dari Cloudinary jika ada
      if (existingBerita.gambar) {
        const publicId = existingBerita.gambar.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`berita/${publicId}`);
      }

      // Upload gambar baru
      const uploadResult = await uploadToCloudinary(req.file);
      gambarUrl = uploadResult.secure_url;
    }

    const updatedBerita = await prisma.berita.update({
      where: { id },
      data: {
        judul: judul || existingBerita.judul,
        isi: isi || existingBerita.isi,
        gambar: gambarUrl,
        updatedAt: new Date(),
        kategori: kategori,
      },
    });

    res.status(200).json({
      success: true,
      message: "Berita berhasil diperbarui",
      data: updatedBerita,
    });
  } catch (error) {
    console.error("Error updating berita:", error);
    res.status(500).json({
      success: false,
      message: "Gagal memperbarui berita",
      error: error.message,
    });
  }
};

// DELETE - Hapus berita
export const deleteBerita = async (req, res) => {
  try {
    const { id } = req.params;

    const berita = await prisma.berita.findUnique({
      where: { id },
    });

    if (!berita) {
      return res.status(404).json({
        success: false,
        message: "Berita tidak ditemukan",
      });
    }

    // Hapus gambar dari Cloudinary jika ada
    if (berita.gambar) {
      const publicId = berita.gambar.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`berita/${publicId}`);
    }

    await prisma.berita.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Berita berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting berita:", error);
    res.status(500).json({
      success: false,
      message: "Gagal menghapus berita",
      error: error.message,
    });
  }
};
