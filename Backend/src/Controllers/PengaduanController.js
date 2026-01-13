import { PrismaClient } from "@prisma/client";
import { sendEmail } from "../lib/emailService.js";
import cloudinary from "../config/cloudinary.js";

const prisma = new PrismaClient();

export const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "pengaduan",
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

// Buat pengaduan baru
export const createPengaduan = async (req, res) => {
  try {
    const { namaPengadu, email, isiPengaduan, judulPengaduan } = req.body;
    let buktiFotoUrl = null;

    if (!namaPengadu || !isiPengaduan || !judulPengaduan) {
      return res.status(400).json({
        success: false,
        message: "Nama pengadu, isi pengaduan, dan judul pengaduan harus diisi",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Bukti foto harus diunggah",
      });
    }

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file);
      buktiFotoUrl = uploadResult.secure_url;
    }

    const pengaduan = await prisma.pengaduan.create({
      data: {
        namaPengadu,
        email,
        isiPengaduan,
        judulPengaduan,
        buktiFotoUrl,
        status: "PENDING",
      },
    });

    if (email) {
      sendEmail(
        email,
        "Laporan Pengaduan Diterima",
        `Halo ${namaPengadu}, laporan Anda "${judulPengaduan}" telah kami terima dengan status PENDING.`
      );
    }

    res.status(201).json({
      success: true,
      message: "Pengaduan berhasil dibuat",
      data: pengaduan,
    });
  } catch (error) {
    console.error("Error creating pengaduan:", error);
    res.status(500).json({
      success: false,
      message: "Gagal membuat pengaduan",
      error: error.message,
    });
  }
};

// Ambil semua pengaduan
export const getAllPengaduan = async (req, res) => {
  try {
    const pengaduan = await prisma.pengaduan.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      message: "Data pengaduan berhasil diambil",
      data: pengaduan,
    });
  } catch (error) {
    console.error("Error fetching pengaduan:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data pengaduan",
      error: error.message,
    });
  }
};

// Ambil pengaduan berdasarkan ID
export const getPengaduanById = async (req, res) => {
  try {
    const { id } = req.params;

    const pengaduan = await prisma.pengaduan.findUnique({
      where: { id },
    });

    if (!pengaduan) {
      return res.status(404).json({
        success: false,
        message: "Pengaduan tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data pengaduan berhasil diambil",
      data: pengaduan,
    });
  } catch (error) {
    console.error("Error fetching pengaduan by id:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data pengaduan",
      error: error.message,
    });
  }
};

// Ambil pengaduan berdasarkan status
export const getPengaduanByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const validStatus = ["PENDING", "PROSES", "SELESAI"];
    if (!validStatus.includes(status.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: "Status tidak valid. Gunakan: PENDING, PROSES, atau SELESAI",
      });
    }

    const pengaduan = await prisma.pengaduan.findMany({
      where: { status: status.toUpperCase() },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      message: "Data pengaduan berhasil diambil",
      data: pengaduan,
    });
  } catch (error) {
    console.error("Error fetching pengaduan by status:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data pengaduan",
      error: error.message,
    });
  }
};

// Update status pengaduan
export const updateStatusPengaduan = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatus = ["PENDING", "PROSES", "SELESAI", "DITOLAK"];
    if (!status || !validStatus.includes(status.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: "Status tidak valid. Gunakan: PENDING, PROSES, atau SELESAI",
      });
    }

    const existingPengaduan = await prisma.pengaduan.findUnique({
      where: { id },
    });

    if (!existingPengaduan) {
      return res.status(404).json({
        success: false,
        message: "Pengaduan tidak ditemukan",
      });
    }

    const updatedPengaduan = await prisma.pengaduan.update({
      where: { id },
      data: {
        status: status.toUpperCase(),
      },
    });
    if (existingPengaduan.email) {
      const subject = `Update Status Pengaduan: ${updatedPengaduan.judulPengaduan}`;
      const text = `
Halo ${existingPengaduan.namaPengadu},

Kami menginformasikan bahwa status pengaduan Anda dengan judul "${
        existingPengaduan.judulPengaduan
      }" telah diperbarui.

Status Saat Ini: ${updatedPengaduan.status}

Pesan: ${
        updatedPengaduan.status === "PROSES"
          ? "Laporan Anda sedang ditindaklanjuti oleh petugas terkait."
          : updatedPengaduan.status === "SELESAI"
          ? "Laporan Anda telah selesai ditangani. Terima kasih telah berpartisipasi."
          : updatedPengaduan.status === "DITOLAK"
          ? "Mohon maaf, laporan Anda tidak dapat kami proses karena alasan tertentu."
          : "Laporan Anda telah masuk ke sistem kami."
      }

Terima kasih,
Layanan Pengaduan Kelurahan Cilandak Timur
      `;

      try {
        await sendEmail(${existingPengaduan.email}, subject, text);
        console.log("Email update status terkirim ke email testing.");
      } catch (err) {
        console.error("Gagal kirim email:", err.message);
      }
    }

    res.status(200).json({
      success: true,
      message: "Status pengaduan berhasil diperbarui",
      data: updatedPengaduan,
    });
  } catch (error) {
    console.error("Error updating status pengaduan:", error);
    res.status(500).json({
      success: false,
      message: "Gagal memperbarui status pengaduan",
      error: error.message,
    });
  }
};

// Update pengaduan
export const updatePengaduan = async (req, res) => {
  try {
    const { id } = req.params;
    const { namaPengadu, email, isiPengaduan, status } = req.body;

    const existingPengaduan = await prisma.pengaduan.findUnique({
      where: { id },
    });

    if (!existingPengaduan) {
      return res.status(404).json({
        success: false,
        message: "Pengaduan tidak ditemukan",
      });
    }

    if (status) {
      const validStatus = ["PENDING", "PROSES", "SELESAI"];
      if (!validStatus.includes(status.toUpperCase())) {
        return res.status(400).json({
          success: false,
          message: "Status tidak valid. Gunakan: PENDING, PROSES, atau SELESAI",
        });
      }
    }

    const updatedPengaduan = await prisma.pengaduan.update({
      where: { id },
      data: {
        namaPengadu: namaPengadu || existingPengaduan.namaPengadu,
        email: email || existingPengaduan.email,
        isiPengaduan: isiPengaduan || existingPengaduan.isiPengaduan,
        status: status ? status.toUpperCase() : existingPengaduan.status,
      },
    });

    res.status(200).json({
      success: true,
      message: "Pengaduan berhasil diperbarui",
      data: updatedPengaduan,
    });
  } catch (error) {
    console.error("Error updating pengaduan:", error);
    res.status(500).json({
      success: false,
      message: "Gagal memperbarui pengaduan",
      error: error.message,
    });
  }
};

// Delete pengaduan
export const deletePengaduan = async (req, res) => {
  try {
    const { id } = req.params;

    const pengaduan = await prisma.pengaduan.findUnique({
      where: { id },
    });

    if (!pengaduan) {
      return res.status(404).json({
        success: false,
        message: "Pengaduan tidak ditemukan",
      });
    }

    await prisma.pengaduan.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Pengaduan berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting pengaduan:", error);
    res.status(500).json({
      success: false,
      message: "Gagal menghapus pengaduan",
      error: error.message,
    });
  }
};
