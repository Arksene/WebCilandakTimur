import React from "react";

const FasilitasRumahIbadah = () => {
  // Data Hardcoded
  const dataRumahIbadah = [
    {
      nama: "Masjid Jami Al-Akhyar",
      alamat: "Jl. Benda Pedurenan No. 10, Cilandak Timur",
    },
    {
      nama: "Masjid Al-Barkah",
      alamat: "Jl. Jeruk Purut No. 2A RT.006/03, Cilandak Timur",
    },
    {
      nama: "Masjid Baitul Hikmah",
      alamat: "Jl. TB Simatupang Kav. 1B, Cilandak Timur",
    },
    {
      nama: "Masjid Al-Makmur",
      alamat: "Jl. Masjid Al Makmur No. 10, Cilandak Timur",
    },
    {
      nama: "Musholla An-Nur",
      alamat: "Jl. Benda Raya RT.06/04, Cilandak Timur",
    },
    {
      nama: "Musholla Al-Ikhlas",
      alamat: "Jl. Ampera Raya, Cilandak Timur",
    },
  ];

  // Config warna tema agar konsisten (Hijau Figma)
  const themeColor = "bg-[#0a210f]";
  const borderColor = "border-[#0a210f]";

  return (
    <section className="py-8">
      <div className="text-left mb-6">
        {/* Judul tanpa underline, atau bisa ditambahkan jika mau seragam dengan tabel pendidikan */}
        <h2 className={`text-2xl font-bold text-gray-900 inline-block`}>
          Fasilitas Rumah Ibadah
        </h2>
      </div>

      <div className="overflow-x-auto rounded-t-lg shadow-md border border-gray-200">
        <table className="min-w-full bg-white text-sm text-left">
          {/* Header Hijau Gelap (#0a210f) */}
          <thead>
            <tr className={`${themeColor} text-white`}>
              <th className="py-3 px-4 font-semibold border-r border-gray-600 w-12 text-center">
                No
              </th>
              <th className="py-3 px-4 font-semibold border-r border-gray-600">
                Nama Rumah Ibadah
              </th>
              <th className="py-3 px-4 font-semibold">Alamat</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {dataRumahIbadah.map((item, index) => (
              <tr
                key={index}
                className={`border-b border-gray-200 ${
                  // Baris ganjil menggunakan opacity 5% dari warna tema
                  index % 2 === 0 ? "bg-[#0a210f]/5" : "bg-white"
                } hover:bg-[#0a210f]/10 transition-colors duration-200`}
              >
                <td className="py-3 px-4 border-r border-gray-200 text-center">
                  {index + 1}
                </td>
                <td className="py-3 px-4 border-r border-gray-200 font-medium">
                  {item.nama}
                </td>
                <td className="py-3 px-4">{item.alamat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default FasilitasRumahIbadah;
