import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Buat layanan publik baru
export const createLayananPublik = async (req, res) => {
  try {
    const { namaLayanan, syarat, kategoriLayanan } = req.body;

    if (!namaLayanan || !syarat || !kategoriLayanan) {
      return res.status(400).json({
        success: false,
        message: "Nama layanan, syarat, dan kategori layanan harus diisi",
      });
    }

    const layanan = await prisma.layananPublik.create({
      data: {
        namaLayanan,
        syarat,
        kategoriLayanan,
      },
    });

    res.status(201).json({
      success: true,
      message: "Layanan publik berhasil dibuat",
      data: layanan,
    });
  } catch (error) {
    console.error("Error creating layanan publik:", error);
    res.status(500).json({
      success: false,
      message: "Gagal membuat layanan publik",
      error: error.message,
    });
  }
};

// Ambil semua layanan publik
export const getAllLayananPublik = async (req, res) => {
  try {
    const layanan = await prisma.layananPublik.findMany();

    res.status(200).json({
      success: true,
      message: "Data layanan publik berhasil diambil",
      data: layanan,
    });
  } catch (error) {
    console.error("Error fetching layanan publik:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data layanan publik",
      error: error.message,
    });
  }
};

// Ambil layanan publik berdasarkan ID
export const getLayananPublikById = async (req, res) => {
  try {
    const { id } = req.params;

    const layanan = await prisma.layananPublik.findUnique({
      where: { id },
    });

    if (!layanan) {
      return res.status(404).json({
        success: false,
        message: "Layanan publik tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data layanan publik berhasil diambil",
      data: layanan,
    });
  } catch (error) {
    console.error("Error fetching layanan publik by id:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data layanan publik",
      error: error.message,
    });
  }
};

// Ambil layanan publik berdasarkan nama
export const getLayananPublikByNama = async (req, res) => {
  try {
    const { nama } = req.query;

    if (!nama) {
      return res.status(400).json({
        success: false,
        message: "Parameter nama harus diisi",
      });
    }

    const layanan = await prisma.layananPublik.findMany({
      where: {
        namaLayanan: {
          contains: nama,
          mode: "insensitive",
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Data layanan publik berhasil diambil",
      data: layanan,
    });
  } catch (error) {
    console.error("Error fetching layanan publik by nama:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data layanan publik",
      error: error.message,
    });
  }
};

// Update layanan publik
export const updateLayananPublik = async (req, res) => {
  try {
    const { id } = req.params;
    const { namaLayanan, syarat, kategoriLayanan } = req.body;

    const existingLayanan = await prisma.layananPublik.findUnique({
      where: { id },
    });

    if (!existingLayanan) {
      return res.status(404).json({
        success: false,
        message: "Layanan publik tidak ditemukan",
      });
    }

    const updatedLayanan = await prisma.layananPublik.update({
      where: { id },
      data: {
        namaLayanan: namaLayanan || existingLayanan.namaLayanan,
        syarat: syarat || existingLayanan.syarat,
        kategoriLayanan: kategoriLayanan || existingLayanan.kategoriLayanan,
      },
    });

    res.status(200).json({
      success: true,
      message: "Layanan publik berhasil diperbarui",
      data: updatedLayanan,
    });
  } catch (error) {
    console.error("Error updating layanan publik:", error);
    res.status(500).json({
      success: false,
      message: "Gagal memperbarui layanan publik",
      error: error.message,
    });
  }
};

// Delete layanan publik
export const deleteLayananPublik = async (req, res) => {
  try {
    const { id } = req.params;

    const layanan = await prisma.layananPublik.findUnique({
      where: { id },
    });

    if (!layanan) {
      return res.status(404).json({
        success: false,
        message: "Layanan publik tidak ditemukan",
      });
    }

    await prisma.layananPublik.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Layanan publik berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting layanan publik:", error);
    res.status(500).json({
      success: false,
      message: "Gagal menghapus layanan publik",
      error: error.message,
    });
  }
};
