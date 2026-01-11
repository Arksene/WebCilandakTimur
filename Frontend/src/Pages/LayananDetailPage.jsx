import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Search,
  X,
  ExternalLink,
  Info,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import headerLayanan from "../assets/headerlayanan.jpg";

export default function LayananDetailPage() {
  const { kategori } = useParams();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [dataLayanan, setDataLayanan] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const judulMap = {
    DUKCAPIL: "Pelayanan Kependudukan (DUKCAPIL)",
    PERIZINAN: "Pelayanan PTSP (Perizinan)",
    KELURAHAN: "Pelayanan Administrasi Umum Kelurahan",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/layanan-publik`);
        const allData = res.data.data || [];

        const filtered = allData.filter(
          (item) => item.kategoriLayanan === kategori
        );

        const sorted = filtered.sort((a, b) => (a.nomor || 0) - (b.nomor || 0));

        setDataLayanan(sorted);
      } catch (error) {
        console.error("Gagal ambil data layanan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [kategori]);

  const filteredList = dataLayanan.filter((item) => {
    if (searchTerm === "") return true;

    const term = searchTerm.toLowerCase();
    const matchNama = item.namaLayanan.toLowerCase().includes(term);

    return matchNama;
  });
  const infoContent = {
    PERIZINAN: {
      judul: "Pelayanan PTSP (Perizinan)",
      deskripsi: (
        <>
          Pelayanan Perizinan dan Non Perizinan dapat diakses secara online
          melalui website Jakevo di{" "}
          <a
            href="https://jakevo.jakarta.go.id/"
            target="_blank"
            rel="noreferrer"
            className="font-bold underline text-blue-700 hover:text-blue-500 inline-flex items-center gap-1"
          >
            https://jakevo.jakarta.go.id/ <ExternalLink size={14} />
          </a>
        </>
      ),
      bg: "bg-blue-50",
      border: "border-blue-200",
      iconColor: "text-blue-600",
    },
    DUKCAPIL: {
      judul: "Pelayanan Kependudukan dan Catatan Sipil",
      deskripsi: (
        <>
          Pelayanan dapat diakses secara online melalui layanan aplikasi{" "}
          <b>Alpukat Betawi</b> yang dapat diunduh melalui Playstore atau
          Appstore.
        </>
      ),
      bg: "bg-orange-50",
      border: "border-orange-200",
      iconColor: "text-orange-600",
    },
    KELURAHAN: {
      judul: "Pelayanan Administrasi Umum di Kelurahan",
      deskripsi: (
        <>
          Pelayanan Surat Pengantar Perkawinan Pertama dan Kedua dapat diakses
          secara online melalui{" "}
          <a
            href="https://jakevo.jakarta.go.id/"
            target="_blank"
            rel="noreferrer"
            className="font-bold underline text-green-700 hover:text-green-500 inline-flex items-center gap-1"
          >
            https://jakevo.jakarta.go.id/ <ExternalLink size={14} />
          </a>{" "}
          dan pelayanan tatap muka di kantor kelurahan.
        </>
      ),
      bg: "bg-green-50",
      border: "border-green-200",
      iconColor: "text-green-600",
    },
  };
  const currentInfo = infoContent[kategori] || infoContent["PERIZINAN"];
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pb-20 font-sans">
        <div className="relative w-full h-64 md:h-[390px] bg-gray-800 overflow-hidden">
          <img
            src={headerLayanan}
            alt="Header"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 px-4">
            <h1 className="text-2xl md:text-4xl font-bold text-white text-center uppercase tracking-wide drop-shadow-md leading-tight mb-6">
              {judulMap[kategori] || `Layanan ${kategori}`}
            </h1>

            <div className="w-full max-w-lg relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Cari layanan (misal: KTP, Makam, Izin)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-10 py-3 rounded-full border border-white focus:border-none shadow-lg focus:ring-2 focus:ring-green-500 outline-none text-white"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
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
          <div
            className={`w-full p-6 rounded-xl border ${currentInfo.border} ${currentInfo.bg} mb-8 shadow-sm flex flex-col md:flex-row gap-4 items-start`}
          >
            <div
              className={`p-3 bg-white rounded-full shadow-sm ${currentInfo.iconColor} flex-shrink-0`}
            >
              <Info size={28} />
            </div>

            <div>
              <h3 className={`text-lg font-bold mb-1 ${currentInfo.iconColor}`}>
                Informasi Akses Layanan
              </h3>
              <p className="text-gray-700 leading-relaxed text-base">
                {currentInfo.deskripsi}
              </p>
            </div>
          </div>

          {loading && (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B2F20] mx-auto"></div>
              <p className="mt-4 text-gray-500">Memuat data layanan...</p>
            </div>
          )}

          {!loading && filteredList.length === 0 && (
            <div className="bg-white p-10 rounded-lg shadow text-center border border-gray-100">
              <div className="inline-block p-4 rounded-full bg-gray-100 mb-4 text-gray-400">
                <Search size={32} />
              </div>
              <p className="text-gray-500 text-lg">
                Tidak ditemukan layanan dengan kata kunci <b>"{searchTerm}"</b>.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-green-700 font-semibold hover:underline"
              >
                Tampilkan Semua Layanan
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
                        {item.nomor || index + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg leading-snug">
                          {item.namaLayanan}
                        </h3>
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <FileText size={14} /> Persyaratan Dokumen:
                      </h4>
                      {item.syarat && item.syarat.length > 0 ? (
                        <ul className="space-y-3">
                          {item.syarat.map((syarat, idx) => (
                            <li
                              key={idx}
                              className="flex items-start text-gray-700 text-sm"
                            >
                              <CheckCircle2
                                size={16}
                                className="text-green-600 mr-3 mt-0.5 flex-shrink-0"
                              />
                              <span className="leading-relaxed">{syarat}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-400 italic text-sm">
                          - Tidak ada syarat khusus -
                        </span>
                      )}
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
                        <th className="p-4 w-1/3 font-bold text-white">
                          Nama Layanan
                        </th>
                        <th className="p-4 font-bold text-white">
                          Persyaratan Dokumen
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredList.map((item, index) => (
                        <tr
                          key={item.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="p-4 text-center font-semibold text-gray-500 align-top">
                            {item.nomor || index + 1}
                          </td>
                          <td className="p-4 align-top">
                            <h3 className="font-bold text-gray-800 text-lg">
                              {item.namaLayanan}
                            </h3>
                          </td>
                          <td className="p-4 align-top">
                            {item.syarat && item.syarat.length > 0 ? (
                              <ul className="space-y-2">
                                {item.syarat.map((syarat, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start text-gray-600 text-sm"
                                  >
                                    <CheckCircle2
                                      size={16}
                                      className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                                    />
                                    <span>{syarat}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <span className="text-gray-400 italic">
                                - Tidak ada syarat khusus -
                              </span>
                            )}
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
