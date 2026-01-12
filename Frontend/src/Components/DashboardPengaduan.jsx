import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Eye,
  Search,
  Filter,
  Loader2,
  X,
  User,
  Mail,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

const DashboardPengaduan = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [selectedItem, setSelectedItem] = useState(null);

  const Base_URL = import.meta.env.VITE_API_URL;
  const API_URL = `${Base_URL}/api/pengaduan`;

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchPengaduan = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL);
      const result = Array.isArray(response.data)
        ? response.data
        : response.data.data;
      setData(result || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPengaduan();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.patch(
        `${API_URL}/${id}/status`,
        { status: newStatus },
        getAuthHeader()
      );
      const updatedData = data.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      );
      setData(updatedData);
      if (selectedItem?.id === id)
        setSelectedItem({ ...selectedItem, status: newStatus });
    } catch (error) {
      alert("Gagal mengubah status.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus laporan ini permanen?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, getAuthHeader());
      fetchPengaduan();
      setSelectedItem(null);
    } catch (error) {
      alert("Gagal menghapus laporan.");
    }
  };

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.judulPengaduan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.namaPengadu.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "ALL" || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyles = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "PROSES":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "SELESAI":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "DITOLAK":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="p-3 md:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight text-center md:text-left">
              Pengaduan Warga
            </h1>
            <p className="text-slate-500 text-sm font-medium text-center md:text-left">
              Monitor dan tindak lanjuti laporan masyarakat.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:justify-end gap-3 w-full">
            <div className="relative group">
              <Filter
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                size={18}
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-8 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none appearance-none font-bold text-slate-700 cursor-pointer shadow-sm transition-all"
              >
                <option value="ALL">Semua Status</option>
                <option value="PENDING">Pending</option>
                <option value="PROSES">Proses</option>
                <option value="SELESAI">Selesai</option>
                <option value="DITOLAK">Ditolak</option>
              </select>
            </div>

            <div className="relative group sm:max-w-xs lg:w-80">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Cari pelapor / judul..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none shadow-sm transition-all"
              />
            </div>
          </div>
        </header>

        <main className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Pengadu
                  </th>
                  <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Laporan
                  </th>
                  <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Status
                  </th>
                  <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {isLoading ? (
                  <tr>
                    <td colSpan="4" className="p-20 text-center">
                      <Loader2
                        className="animate-spin mx-auto text-blue-500"
                        size={40}
                      />
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-blue-50/30 transition-colors group"
                    >
                      <td className="p-5">
                        <div className="font-bold text-slate-800 text-sm">
                          {item.namaPengadu}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                          {new Date(item.createdAt).toLocaleDateString(
                            "id-ID",
                            { day: "numeric", month: "short" }
                          )}
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="font-semibold text-slate-700 text-sm line-clamp-1 max-w-[200px] md:max-w-xs">
                          {item.judulPengaduan}
                        </div>
                      </td>
                      <td className="p-5">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black border transition-all ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-200 uppercase tracking-tighter"
                        >
                          <Eye size={14} /> Detail
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl w-full max-w-5xl h-[92vh] sm:h-auto sm:max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl hidden sm:block">
                    <FileText size={20} />
                  </div>
                  <h2 className="text-lg font-black text-slate-800 tracking-tight">
                    Rincian Pengaduan
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 bg-slate-100 hover:bg-rose-50 rounded-full transition-colors text-slate-400 hover:text-rose-500"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 sm:p-10 overflow-y-auto flex-1 bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                  <div className="lg:col-span-3 space-y-8 order-2 lg:order-1">
                    <div className="flex flex-col sm:flex-row gap-6 border-b border-slate-100 pb-8">
                      <div className="flex-1 space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          Pelapor
                        </label>
                        <p className="text-lg font-bold text-slate-800">
                          {selectedItem.namaPengadu}
                        </p>
                      </div>
                      <div className="flex-1 space-y-1 border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-6">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          Kontak
                        </label>
                        <p className="text-lg font-bold text-slate-800 truncate">
                          {selectedItem.email || "—"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl font-black text-slate-900 leading-tight">
                        {selectedItem.judulPengaduan}
                      </h3>
                      <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 text-slate-700 leading-relaxed text-sm shadow-inner italic">
                        "{selectedItem.isiPengaduan}"
                      </div>
                    </div>

                    <div className="p-6 rounded-[2rem] bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="text-center sm:text-left">
                        <p className="text-[10px] font-black text-slate-500 uppercase mb-2">
                          Tindakan Petugas
                        </p>
                        <div
                          className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black border tracking-widest ${getStatusStyles(
                            selectedItem.status
                          )}`}
                        >
                          {selectedItem.status}
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        {selectedItem.status === "PENDING" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(selectedItem.id, "PROSES")
                            }
                            className="flex-1 bg-blue-500 px-6 py-3 rounded-2xl text-[11px] font-black transition-all active:scale-95 uppercase tracking-wider"
                          >
                            Proses
                          </button>
                        )}
                        {selectedItem.status === "PROSES" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(selectedItem.id, "SELESAI")
                            }
                            className="flex-1 bg-emerald-500 px-6 py-3 rounded-2xl text-[11px] font-black transition-all active:scale-95 uppercase tracking-wider"
                          >
                            Selesai
                          </button>
                        )}
                        {selectedItem.status !== "SELESAI" &&
                          selectedItem.status !== "DITOLAK" && (
                            <button
                              onClick={() =>
                                handleUpdateStatus(selectedItem.id, "DITOLAK")
                              }
                              className="flex-1 bg-rose-500 px-6 py-3 rounded-2xl text-[11px] font-black transition-all active:scale-95 uppercase tracking-wider"
                            >
                              Tolak
                            </button>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2 space-y-4 order-1 lg:order-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <ImageIcon size={14} /> Lampiran Foto
                    </label>
                    <div className="bg-slate-100 rounded-[2rem] overflow-hidden border-4 border-slate-50 shadow-2xl h-[250px] sm:h-[400px]">
                      {selectedItem.buktiFotoUrl ? (
                        <img
                          src={selectedItem.buktiFotoUrl}
                          alt="Bukti"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-300 italic p-10 text-center">
                          <ImageIcon size={48} className="mb-2 opacity-20" />{" "}
                          Tidak ada lampiran
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t bg-slate-50 flex flex-col sm:flex-row gap-4 justify-between items-center px-8">
                <button
                  onClick={() => handleDelete(selectedItem.id)}
                  className="text-rose-500 font-black text-[10px] flex items-center gap-2 uppercase tracking-widest order-2 sm:order-1 hover:text-rose-700 transition-colors"
                >
                  <Trash2 size={16} /> Hapus Permanen
                </button>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-full sm:w-auto px-10 py-4 bg-slate-200 text-slate-800 rounded-2xl text-[11px] font-black uppercase tracking-widest order-1 sm:order-2 transition-all active:scale-95"
                >
                  Kembali
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPengaduan;
