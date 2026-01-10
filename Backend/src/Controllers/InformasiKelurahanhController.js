import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Buat informasi kelurahan baru
export const createInformasiKelurahan = async (req, res) => {
  try {
    const { key, value } = req.body;

    if (!key || !value) {
      return res.status(400).json({
        success: false,
        message: "Key dan value harus diisi",
      });
    }

    const existingInfo = await prisma.informasiKelurahan.findUnique({
      where: { key },
    });

    if (existingInfo) {
      return res.status(400).json({
        success: false,
        message: "Key sudah ada",
      });
    }

    const informasi = await prisma.informasiKelurahan.create({
      data: {
        key,
        value,
      },
    });

    res.status(201).json({
      success: true,
      message: "Informasi kelurahan berhasil dibuat",
      data: informasi,
    });
  } catch (error) {
    console.error("Error creating informasi kelurahan:", error);
    res.status(500).json({
      success: false,
      message: "Gagal membuat informasi kelurahan",
      error: error.message,
    });
  }
};

// Ambil semua informasi kelurahan
export const getAllInformasiKelurahan = async (req, res) => {
  try {
    const informasi = await prisma.informasiKelurahan.findMany();

    res.status(200).json({
      success: true,
      message: "Data informasi kelurahan berhasil diambil",
      data: informasi,
    });
  } catch (error) {
    console.error("Error fetching informasi kelurahan:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data informasi kelurahan",
      error: error.message,
    });
  }
};

// Ambil informasi kelurahan berdasarkan ID
export const getInformasiKelurahanhById = async (req, res) => {
  try {
    const { id } = req.params;

    const informasi = await prisma.informasiKelurahan.findUnique({
      where: { id },
    });

    if (!informasi) {
      return res.status(404).json({
        success: false,
        message: "Informasi kelurahan tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data informasi kelurahan berhasil diambil",
      data: informasi,
    });
  } catch (error) {
    console.error("Error fetching informasi kelurahan by id:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data informasi kelurahan",
      error: error.message,
    });
  }
};

// Ambil informasi kelurahan berdasarkan key
export const getInformasiKelurahanhByKey = async (req, res) => {
  try {
    const { key } = req.params;

    const informasi = await prisma.informasiKelurahan.findUnique({
      where: { key },
    });

    if (!informasi) {
      return res.status(404).json({
        success: false,
        message: "Informasi kelurahan tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data informasi kelurahan berhasil diambil",
      data: informasi,
    });
  } catch (error) {
    console.error("Error fetching informasi kelurahan by key:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data informasi kelurahan",
      error: error.message,
    });
  }
};

// Update informasi kelurahan
export const updateInformasiKelurahan = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;

    const existingInfo = await prisma.informasiKelurahan.findUnique({
      where: { id },
    });

    if (!existingInfo) {
      return res.status(404).json({
        success: false,
        message: "Informasi kelurahan tidak ditemukan",
      });
    }

    const updatedInfo = await prisma.informasiKelurahan.update({
      where: { id },
      data: {
        value: value || existingInfo.value,
      },
    });

    res.status(200).json({
      success: true,
      message: "Informasi kelurahan berhasil diperbarui",
      data: updatedInfo,
    });
  } catch (error) {
    console.error("Error updating informasi kelurahan:", error);
    res.status(500).json({
      success: false,
      message: "Gagal memperbarui informasi kelurahan",
      error: error.message,
    });
  }
};

// Delete informasi kelurahan
export const deleteInformasiKelurahan = async (req, res) => {
  try {
    const { id } = req.params;

    const existingInfo = await prisma.informasiKelurahan.findUnique({
      where: { id },
    });

    if (!existingInfo) {
      return res.status(404).json({
        success: false,
        message: "Informasi kelurahan tidak ditemukan",
      });
    }

    await prisma.informasiKelurahan.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Informasi kelurahan berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting informasi kelurahan:", error);
    res.status(500).json({
      success: false,
      message: "Gagal menghapus informasi kelurahan",
      error: error.message,
    });
  }
};
