import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FileText,
  Trash2,
  Upload,
  Eye,
  Loader2,
  Search,
  Calendar,
  ChevronRight,
} from "lucide-react";
import FormDokumen from "./FormDokumen";
import { alertSuccess, alertError, confirmAlert } from "../lib/alerts";

const DashboardDokumen = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const Base_URL = import.meta.env.VITE_API_URL;
  const API_URL = `${Base_URL}/api/dokumen-publik`;

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchDokumen = async () => {
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
    fetchDokumen();
  }, []);
  const handleDelete = async (id) => {
    const isConfirmed = await confirmAlert(
      "Apakah Anda yakin?",
      "Berita yang dihapus tidak dapat dikembalikan!"
    );

    if (isConfirmed) {
      try {
        await axios.delete(`${API_URL}/${id}`, getAuthHeader());
        fetchBerita();
        alertSuccess("Berita Berhasil Dihapus");
      } catch (error) {
        alertError("Gagal menghapus berita.");
      }
    }
  };

  const handleFormSubmit = async (formDataInput) => {
    const formData = new FormData();
    formData.append("namaDokumen", formDataInput.namaDokumen);
    formData.append("kategori", formDataInput.kategori);

    if (formDataInput.file instanceof File) {
      formData.append("file", formDataInput.file);
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
      alertSuccess("Berhasil Mengupload Dokumen");
      fetchDokumen();
    } catch (error) {
      alertError("Gagal menyimpan data.");
    }
  };

  const filteredData = data.filter((doc) =>
    doc.namaDokumen.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Arsip Dokumen
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Kelola berkas publik, peraturan, dan formulir kelurahan.
            </p>
          </div>

          {!showForm && (
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <div className="relative w-full sm:w-72 group">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Cari berkas..."
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setShowForm(true);
                }}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-blue-200 transition-all font-bold active:scale-95"
              >
                <Upload size={20} />
                Unggah Berkas
              </button>
            </div>
          )}
        </header>

        {showForm ? (
          <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-4 md:p-8 transition-all">
            <FormDokumen
              initialData={editingItem}
              onClose={() => setShowForm(false)}
              onSubmit={handleFormSubmit}
            />
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
            {isLoading ? (
              <div className="py-32 flex flex-col items-center justify-center text-slate-400">
                <Loader2
                  className="animate-spin mb-4 text-blue-600"
                  size={48}
                />
                <p className="font-bold tracking-wide uppercase text-xs text-slate-500">
                  Memuat Arsip...
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                          Detail Dokumen
                        </th>
                        <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                          Kategori
                        </th>
                        <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                          Dibuat Pada
                        </th>
                        <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-right">
                          Kelola
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredData.length > 0 ? (
                        filteredData.map((doc) => (
                          <tr
                            key={doc.id}
                            className="hover:bg-slate-50/80 transition-colors group"
                          >
                            <td className="p-6">
                              <div className="flex items-center gap-4">
                                <div className="hidden sm:flex w-12 h-12 bg-blue-50 rounded-xl items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                  <FileText size={22} />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-extrabold text-slate-800 text-base group-hover:text-blue-600 transition-colors line-clamp-1">
                                    {doc.namaDokumen}
                                  </span>
                                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-tighter mt-0.5">
                                    PDF / Dokumen Resmi
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="p-6">
                              <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                                {doc.kategori || "Umum"}
                              </span>
                            </td>
                            <td className="p-6 text-sm">
                              <div className="flex items-center gap-2 text-slate-500 font-medium">
                                <Calendar size={14} />
                                {new Date(doc.createdAt).toLocaleDateString(
                                  "id-ID",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                              </div>
                            </td>
                            <td className="p-6 text-right">
                              <div className="flex justify-end gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all transform translate-x-0 lg:translate-x-2 lg:group-hover:translate-x-0">
                                {doc.fileUrl && (
                                  <button
                                    onClick={() =>
                                      window.open(doc.fileUrl, "_blank")
                                    }
                                    className="p-2.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                                    title="Lihat Dokumen"
                                  >
                                    <Eye size={20} />
                                  </button>
                                )}

                                <button
                                  onClick={() => handleDelete(doc.id)}
                                  className="p-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                  title="Hapus"
                                >
                                  <Trash2 size={20} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="p-32 text-center text-slate-400 font-bold text-lg"
                          >
                            <div className="flex flex-col items-center gap-2">
                              <FileText
                                size={48}
                                className="text-slate-200 mb-2"
                              />
                              Arsip tidak ditemukan
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Total {filteredData.length} Berkas Tersimpan</span>
                  <span className="flex items-center gap-2">
                    Kelurahan Cilandak Timur <ChevronRight size={12} />
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

export default DashboardDokumen;
