import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Eye,
  Search,
  Filter,
  Loader2,
  X,
} from "lucide-react";

const DashboardPengaduan = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [selectedItem, setSelectedItem] = useState(null); // Untuk Modal Detail

  const API_URL = "http://localhost:3000/api/pengaduan";

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
      console.error("Gagal load pengaduan:", error);
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

      if (selectedItem && selectedItem.id === id) {
        setSelectedItem({ ...selectedItem, status: newStatus });
      }

      alert(`Status berhasil diubah menjadi ${newStatus}`);
    } catch (error) {
      console.error(error);
      alert("Gagal mengubah status.");
    }
  };

  // --- 3. DELETE ---
  const handleDelete = async (id) => {
    if (!confirm("Hapus laporan pengaduan ini secara permanen?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, getAuthHeader());
      alert("Laporan berhasil dihapus");
      fetchPengaduan();
      setSelectedItem(null); // Tutup modal jika yang dihapus sedang dibuka
    } catch (error) {
      alert("Gagal menghapus laporan.");
    }
  };

  // --- FILTERING LOGIC ---
  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.judulPengaduan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.namaPengadu.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "ALL" || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // --- HELPER STATUS COLOR ---
  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "PROSES":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "SELESAI":
        return "bg-green-100 text-green-800 border-green-200";
      case "DITOLAK":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "PENDING":
        return <Clock size={14} />;
      case "PROSES":
        return <Loader2 size={14} />; // Icon loader statis
      case "SELESAI":
        return <CheckCircle size={14} />;
      case "DITOLAK":
        return <XCircle size={14} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pengaduan Warga</h1>
          <p className="text-gray-500 text-sm">
            Monitor dan tindak lanjuti laporan masyarakat.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          {/* Filter Status Dropdown */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none pl-10 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
            >
              <option value="ALL">Semua Status</option>
              <option value="PENDING">Pending</option>
              <option value="PROSES">Proses</option>
              <option value="SELESAI">Selesai</option>
              <option value="DITOLAK">Ditolak</option>
            </select>
            <Filter
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              placeholder="Cari pelapor / judul..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">
                Tanggal & Pelapor
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600">
                Judul Laporan
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600 text-right">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">
                  Memuat data...
                </td>
              </tr>
            ) : filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <div className="font-bold text-gray-800">
                      {item.namaPengadu}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </td>
                  <td
                    className="p-4 max-w-xs truncate"
                    title={item.judulPengaduan}
                  >
                    {item.judulPengaduan}
                  </td>
                  <td className="p-4">
                    {/* Status Badge */}
                    <span
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border w-max ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {getStatusIcon(item.status)}
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="flex items-center gap-1 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded transition"
                      >
                        <Eye size={16} /> Detail
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">
                  Tidak ada data pengaduan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL DETAIL ================= */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            {/* Header Modal */}
            <div className="sticky top-0 bg-white p-5 border-b flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-gray-800">
                Detail Pengaduan
              </h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 hover:text-red-500"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body Modal */}
            <div className="p-6 space-y-6">
              {/* Info Status & Update */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-4 rounded-lg gap-4">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase">
                    Status Saat Ini
                  </span>
                  <div
                    className={`mt-1 flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold border w-max ${getStatusColor(
                      selectedItem.status
                    )}`}
                  >
                    {getStatusIcon(selectedItem.status)} {selectedItem.status}
                  </div>
                </div>

                {/* Tombol Aksi Update Status */}
                <div className="flex gap-2">
                  {selectedItem.status === "PENDING" && (
                    <button
                      onClick={() =>
                        handleUpdateStatus(selectedItem.id, "PROSES")
                      }
                      className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition"
                    >
                      Proses Laporan
                    </button>
                  )}
                  {selectedItem.status === "PROSES" && (
                    <button
                      onClick={() =>
                        handleUpdateStatus(selectedItem.id, "SELESAI")
                      }
                      className="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition"
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
                        className="bg-red-100 text-red-600 border border-red-200 px-3 py-2 rounded text-sm hover:bg-red-200 transition"
                      >
                        Tolak
                      </button>
                    )}
                </div>
              </div>

              {/* Detail Isi */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-500">
                    Nama Pelapor
                  </label>
                  <p className="text-gray-800 font-medium">
                    {selectedItem.namaPengadu}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-500">
                    Email
                  </label>
                  <p className="text-gray-800 font-medium">
                    {selectedItem.email || "-"}
                  </p>
                </div>
                <div className="col-span-full">
                  <label className="block text-sm font-semibold text-gray-500">
                    Judul Pengaduan
                  </label>
                  <p className="text-gray-800 font-bold text-lg">
                    {selectedItem.judulPengaduan}
                  </p>
                </div>
                <div className="col-span-full">
                  <label className="block text-sm font-semibold text-gray-500">
                    Isi Laporan
                  </label>
                  <div className="bg-gray-50 p-4 rounded border mt-1 text-gray-700 whitespace-pre-line">
                    {selectedItem.isiPengaduan}
                  </div>
                </div>
              </div>

              {/* Bukti Foto */}
              {selectedItem.buktiFotoUrl && (
                <div>
                  <label className="block text-sm font-semibold text-gray-500 mb-2">
                    Bukti Lampiran
                  </label>
                  <a
                    href={selectedItem.buktiFotoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full h-64 bg-gray-100 rounded-lg overflow-hidden border hover:opacity-90 transition relative group"
                  >
                    <img
                      src={selectedItem.buktiFotoUrl}
                      alt="Bukti Foto"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition">
                      <span className="bg-white px-3 py-1 rounded shadow text-sm font-bold opacity-0 group-hover:opacity-100 transition">
                        Klik untuk memperbesar
                      </span>
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* Footer Modal */}
            <div className="p-5 border-t bg-gray-50 flex justify-between items-center">
              <button
                onClick={() => handleDelete(selectedItem.id)}
                className="text-red-600 hover:text-red-800 flex items-center gap-2 text-sm"
              >
                <Trash2 size={16} /> Hapus Laporan Ini
              </button>
              <button
                onClick={() => setSelectedItem(null)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 text-sm font-medium"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPengaduan;
