import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  FileText,
  Megaphone,
  Loader2,
  Image as ImageIcon,
  Calendar,
  User,
  Search,
  ArrowRight,
} from "lucide-react";
import FormBerita from "./FormBerita";
import { alertError, alertSuccess } from "../lib/alerts";

const DashboardBerita = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const Base_URL = import.meta.env.VITE_API_URL;
  const API_URL = `${Base_URL}/api/berita`;

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchBerita = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL);
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBerita();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus berita ini permanen?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, getAuthHeader());
      fetchBerita();
      alertSuccess("Berita Berhasil Dihapus");
    } catch (error) {
      alertError("Gagal menghapus.");
    }
  };

  const handleFormSubmit = async (formDataInput) => {
    const formData = new FormData();
    formData.append("judul", formDataInput.judul);
    formData.append("isi", formDataInput.isi);
    formData.append("kategori", formDataInput.kategori);

    // SESUAIKAN DISINI:
    // Ambil dari formDataInput.Penulis (sesuai state di FormBerita)
    // Append dengan nama "Penulis" (sesuai instruksi error Prisma)
    formData.append("Penulis", formDataInput.Penulis);

    if (formDataInput.gambar instanceof File) {
      formData.append("gambar", formDataInput.gambar);
    }

    try {
      const config = {
        headers: {
          ...getAuthHeader().headers,
          "Content-Type": "multipart/form-data",
        },
      };

      if (editingItem) {
        await axios.put(`${API_URL}/${editingItem.id}`, formData, config);
      } else {
        await axios.post(`${API_URL}/upload`, formData, config);
      }

      setShowForm(false);
      setEditingItem(null);
      alertSuccess("Berhasil Menyimpan Berita");
      fetchBerita();
    } catch (error) {
      console.error(error);
      alertError("Gagal menyimpan data.");
    }
  };

  const filteredData = data.filter((item) =>
    item.judul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-3 md:p-8 bg-[#f8fafc] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 md:mb-10">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Manajemen Konten
            </h1>
            <p className="text-slate-500 mt-2 font-medium text-sm md:text-base">
              Publikasikan berita terbaru dan pengumuman resmi kelurahan.
            </p>
          </div>

          {!showForm && (
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <div className="relative w-full sm:w-72 group">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Cari artikel..."
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all shadow-sm"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setShowForm(true);
                }}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-slate-200 transition-all font-bold active:scale-95"
              >
                <Plus size={20} />
                Buat Artikel
              </button>
            </div>
          )}
        </header>

        {showForm ? (
          <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl border border-slate-100 p-3 md:p-6 transition-all">
            <FormBerita
              initialData={editingItem}
              onClose={() => setShowForm(false)}
              onSubmit={handleFormSubmit}
            />
          </div>
        ) : (
          <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
            {isLoading ? (
              <div className="py-20 md:py-32 flex flex-col items-center justify-center text-slate-400">
                <Loader2
                  className="animate-spin mb-4 text-blue-600"
                  size={40}
                />
                <p className="font-bold tracking-wide uppercase text-[10px] md:text-xs text-slate-500">
                  Menyinkronkan Data...
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto scrollbar-hide">
                  <table className="w-full text-left border-collapse min-w-[700px] lg:min-w-full">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="p-4 md:p-6 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                          Artikel
                        </th>
                        <th className="p-4 md:p-6 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                          Kategori
                        </th>
                        <th className="p-4 md:p-6 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                          Penulis
                        </th>
                        <th className="p-4 md:p-6 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-right">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                          <tr
                            key={item.id}
                            className="hover:bg-slate-50/80 transition-colors group"
                          >
                            <td className="p-4 md:p-6">
                              <div className="flex items-center gap-3 md:gap-4">
                                <div className="hidden sm:flex w-10 h-10 md:w-12 md:h-12 bg-slate-100 rounded-xl items-center justify-center text-slate-400 shrink-0">
                                  {item.gambar ? (
                                    <ImageIcon
                                      size={18}
                                      className="text-blue-500"
                                    />
                                  ) : (
                                    <FileText size={18} />
                                  )}
                                </div>
                                <div className="flex flex-col min-w-0">
                                  <span className="font-extrabold text-slate-800 text-sm md:text-base group-hover:text-blue-600 transition-colors line-clamp-1">
                                    {item.judul}
                                  </span>
                                  <div className="flex items-center gap-2 mt-1 text-slate-400 text-[10px] md:text-xs font-medium">
                                    <span className="flex items-center gap-1 shrink-0">
                                      <Calendar size={12} />{" "}
                                      {new Date(
                                        item.tanggal
                                      ).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                      })}
                                    </span>
                                    <span className="w-1 h-1 bg-slate-300 rounded-full shrink-0"></span>
                                    <span className="truncate">
                                      {item.isi.substring(0, 30)}...
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 md:p-6">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-1 md:px-3 md:py-1.5 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-wider border ${
                                  item.kategori === "PENGUMUMAN"
                                    ? "bg-amber-50 text-amber-600 border-amber-100"
                                    : "bg-blue-50 text-blue-600 border-blue-100"
                                }`}
                              >
                                {item.kategori === "PENGUMUMAN" ? (
                                  <Megaphone size={10} />
                                ) : (
                                  <FileText size={10} />
                                )}
                                {item.kategori}
                              </span>
                            </td>
                            <td className="p-4 md:p-6">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 md:w-8 md:h-8 bg-slate-100 rounded-full flex items-center justify-center border border-white shadow-sm shrink-0">
                                  <User size={14} className="text-slate-500" />
                                </div>
                                <span className="text-xs md:text-sm font-bold text-slate-700 truncate max-w-[80px] md:max-w-none">
                                  {item.Penulis || "Admin"}
                                </span>
                              </div>
                            </td>
                            <td className="p-4 md:p-6 text-right">
                              <div className="flex justify-end gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all transform translate-x-0 lg:translate-x-2 lg:group-hover:translate-x-0">
                                <button
                                  onClick={() => {
                                    setEditingItem(item);
                                    setShowForm(true);
                                  }}
                                  className="p-2 md:p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                >
                                  <Edit size={18} />
                                </button>
                                <button
                                  onClick={() => handleDelete(item.id)}
                                  className="p-2 md:p-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="p-20 md:p-32 text-center text-slate-400 font-bold text-sm md:text-lg"
                          >
                            Data tidak ditemukan
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 md:p-6 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Total {filteredData.length} Artikel</span>
                  <span className="flex items-center gap-2">
                    Kelurahan Cilandak Timur <ArrowRight size={12} />
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardBerita;
