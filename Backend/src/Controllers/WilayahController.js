import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET: Ambil semua data batas
export const getBatas = async (req, res) => {
  try {
    const batas = await prisma.batasWilayah.findMany();
    return res.status(200).json({
      status: "success",
      message: "Data batas wilayah berhasil diambil",
      data: batas,
    });
  } catch (error) {
    return res.status(500).json({ error: "Gagal mengambil data" });
  }
};

export const updateBatasById = async (req, res) => {
  const { id } = req.params;
  const { batas, kelurahan } = req.body;

  try {
    const updatedData = await prisma.batasWilayah.update({
      where: {
        id: id,
      },
      data: {
        batas: batas,
        kelurahan: kelurahan,
      },
    });

    return res.status(200).json({
      message: "Berhasil update batas wilayah",
      data: updatedData,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Data tidak ditemukan (ID salah)" });
    }
    console.error(error);
    return res.status(500).json({ error: "Gagal update data" });
  }
};
