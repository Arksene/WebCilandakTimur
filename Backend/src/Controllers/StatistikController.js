import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getStatistik = async (req, res) => {
  try {
    const data = await prisma.statistik.findMany();

    const penduduk = data.filter((d) => d.kategori === "PENDUDUK");
    const wilayah = data.filter((d) => d.kategori === "WILAYAH");

    return res.status(200).json({
      data: { penduduk, wilayah },
    });
  } catch (error) {
    return res.status(500).json({ error: "Gagal mengambil data statistik" });
  }
};

export const updateStatistikById = async (req, res) => {
  const { id } = req.params;
  const { jumlah } = req.body;

  try {
    const updatedData = await prisma.statistik.update({
      where: { id: id },
      data: {
        jumlah: parseInt(jumlah),
      },
    });

    return res.status(200).json({
      message: "Berhasil update data statistik",
      data: updatedData,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Data statistik tidak ditemukan" });
    }
    console.error(error);
    return res.status(500).json({ error: "Gagal update data" });
  }
};
