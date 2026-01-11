import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, FileText, Search, X, Download, Info } from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function DokumenPublikPage() {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [dataDokumen, setDataDokumen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/dokumen-publik`);
        const allData = res.data.data || [];
        setDataDokumen(allData);
      } catch (error) {
        console.error("Gagal ambil data dokumen:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredList = dataDokumen.filter((item) => {
    if (searchTerm === "") return true;
    const term = searchTerm.toLowerCase();
    return item.namaDokumen.toLowerCase().includes(term);
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pb-20 font-sans">
        <div className="relative w-full h-64 md:h-[350px] bg-gray-800 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
            alt="Header Dokumen"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 px-4">
            <h1 className="text-2xl md:text-4xl font-bold text-white text-center uppercase tracking-wide drop-shadow-md leading-tight mb-6">
              DOKUMEN PUBLIK
            </h1>

            <div className="w-full max-w-lg relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Cari dokumen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-10 py-3 rounded-full border border-white focus:border-none shadow-lg focus:ring-2 focus:ring-green-500 outline-none text-white bg-white/10 backdrop-blur-sm placeholder-gray-200"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 mt-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-[#0B2F20] mb-6 transition"
          >
            <ArrowLeft size={20} className="mr-2" />
            Kembali
          </button>

          <div className="w-full p-6 rounded-xl border border-blue-200 bg-blue-50 mb-8 shadow-sm flex flex-col md:flex-row gap-4 items-start">
            <div className="p-3 bg-white rounded-full shadow-sm text-blue-600 flex-shrink-0">
              <Info size={28} />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1 text-blue-600">
                Informasi Dokumen
              </h3>
              <p className="text-gray-700 leading-relaxed text-base">
                Berikut adalah daftar dokumen publik yang dapat diunduh oleh
                masyarakat. Dokumen ini mencakup format formulir, surat
                keterangan, dan regulasi terkait pelayanan kelurahan.
              </p>
            </div>
          </div>

          {loading && (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B2F20] mx-auto"></div>
              <p className="mt-4 text-gray-500">Memuat data dokumen...</p>
            </div>
          )}

          {!loading && filteredList.length === 0 && (
            <div className="bg-white p-10 rounded-lg shadow text-center border border-gray-100">
              <div className="inline-block p-4 rounded-full bg-gray-100 mb-4 text-gray-400">
                <Search size={32} />
              </div>
              <p className="text-gray-500 text-lg">
                Tidak ditemukan dokumen dengan kata kunci <b>"{searchTerm}"</b>.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-green-700 font-semibold hover:underline"
              >
                Tampilkan Semua Dokumen
              </button>
            </div>
          )}

          {!loading && filteredList.length > 0 && (
            <>
              <div className="block md:hidden space-y-4">
                {filteredList.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
                  >
                    <div className="bg-gray-50 p-4 border-b border-gray-100 flex items-start gap-3">
                      <div className="bg-[#0B2F20] text-white w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg leading-snug">
                          {item.namaDokumen}
                        </h3>
                        <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-md">
                          {item.kategori}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-[#0B2F20] text-white py-2 px-4 rounded-lg hover:bg-green-900 transition-colors font-medium"
                      >
                        <Download size={18} />
                        Unduh Dokumen
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-hijauFigma border-b-2 border-gray-200">
                      <tr>
                        <th className="p-4 w-16 text-center font-bold text-white">
                          No
                        </th>
                        <th className="p-4 font-bold text-white">
                          Nama Dokumen
                        </th>
                        <th className="p-4 w-1/4 font-bold text-white">
                          Kategori
                        </th>
                        <th className="p-4 w-1/6 text-center font-bold text-white">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredList.map((item, index) => (
                        <tr
                          key={item.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="p-4 text-center font-semibold text-gray-500">
                            {index + 1}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-gray-100 rounded text-gray-500">
                                <FileText size={20} />
                              </div>
                              <span className="font-bold text-gray-800 text-lg">
                                {item.namaDokumen}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="px-3 py-1 text-sm font-semibold bg-green-100 text-green-800 rounded-full">
                              {item.kategori}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <a
                              href={item.fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-50 text-green-700 hover:bg-green-600 hover:text-white transition-all duration-200"
                              title="Unduh Dokumen"
                            >
                              <Download size={20} />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
