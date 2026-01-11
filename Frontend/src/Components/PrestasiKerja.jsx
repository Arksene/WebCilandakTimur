import React from "react";
import { Award, Star } from "lucide-react"; // Ikon untuk dekorasi
import Navbar from "../Components/Navbar"; // Sesuaikan path import
import Footer from "../Components/Footer"; // Sesuaikan path import

const PrestasiKerja = () => {
  // Data sesuai gambar
  const dataPrestasi = [
    {
      no: 1,
      keterangan:
        "Penghargaan Anubhawa Sasana Desa Kelurahan Jagaddhita Tahun 2023",
      tahun: "2023",
    },
    {
      no: 2,
      keterangan:
        "Desa Cantik (Desa Cinta Statistik) Tahun 2022 oleh Badan Pusat Statistik",
      tahun: "2022",
    },
  ];

  return (
    <>
      <div className=" bg-white font-sans pb-20 pt-28">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Prestasi Kerja
            </h2>

            <div className="flex items-center justify-center gap-2">
              <div className="h-[2px] w-12 bg-green-500"></div>
              <div className="text-green-600">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-600"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="h-[2px] w-12 bg-green-500"></div>
            </div>
          </div>

          <div className="overflow-x-auto shadow-lg rounded-t-lg border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#10B981] text-white">
                  <th className="py-4 px-6 font-semibold text-center w-16 border-r border-green-400">
                    No
                  </th>
                  <th className="py-4 px-6 font-semibold text-center border-r border-green-400">
                    Keterangan
                  </th>
                  <th className="py-4 px-6 font-semibold text-center w-32">
                    Tahun
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {dataPrestasi.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6 text-center text-gray-700 border-r border-gray-100">
                      {item.no}
                    </td>
                    <td className="py-4 px-6 text-gray-700 border-r border-gray-100 leading-relaxed">
                      {item.keterangan}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-700 font-medium">
                      {item.tahun}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {dataPrestasi.length === 0 && (
            <div className="text-center py-10 bg-gray-50 border border-gray-200 rounded-b-lg">
              <p className="text-gray-500">Belum ada data prestasi.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PrestasiKerja;
