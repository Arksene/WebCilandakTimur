import { useState, useEffect } from "react";
import axios from "axios";
import {
  Briefcase,
  FileText,
  Plus,
  Trash2,
  Edit,
  Loader2,
  Search,
  Layers,
  CheckCircle2,
} from "lucide-react";
import FormLayanan from "./FormLayanan";

const DashboardLayanan = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = "http://localhost:3000/api/layanan-publik";

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchLayanan = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL);
      const result = Array.isArray(response.data)
        ? response.data
        : response.data.data;
      setData(result || []);
    } catch (error) {
      console.error("Gagal load layanan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLayanan();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus layanan ini?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, getAuthHeader());
      alert("Layanan berhasil dihapus");
      fetchLayanan();
    } catch (error) {
      alert("Gagal menghapus layanan");
    }
  };

  const handleFormSubmit = async (jsonData) => {
    try {
      if (editingItem) {
        await axios.put(
          `${API_URL}/${editingItem.id}`,
          jsonData,
          getAuthHeader()
        );
        alert("Layanan berhasil diperbarui!");
      } else {
        await axios.post(API_URL, jsonData, getAuthHeader());
        alert("Layanan baru berhasil ditambahkan!");
      }
      setShowForm(false);
      setEditingItem(null);
      fetchLayanan();
    } catch (error) {
      alert(
        `Gagal menyimpan: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleAddClick = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const filteredData = data.filter((item) => {
    const term = searchTerm.toLowerCase();
    const namaLayanan = item.namaLayanan.toLowerCase();
    const kategoriAsli = (item.kategoriLayanan || "").toLowerCase();

    let kategoriAlias = kategoriAsli;
    if (kategoriAsli === "perizinan") {
      kategoriAlias = "ptsp";
    }

    return (
      namaLayanan.includes(term) ||
      kategoriAsli.includes(term) ||
      kategoriAlias.includes(term)
    );
  });

  const groupedData = filteredData.reduce((acc, item) => {
    let category = item.kategoriLayanan || "Lainnya";
    if (category.toLowerCase() === "perizinan") {
      category = "PTSP";
    }
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  const categories = Object.keys(groupedData).sort();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Layanan Publik</h1>
          <p className="text-gray-500 text-sm">Kelola layanan per kategori.</p>
        </div>

        {!showForm && (
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Cari layanan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>

            <button
              onClick={handleAddClick}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition shadow-sm whitespace-nowrap"
            >
              <Plus size={18} />{" "}
              <span className="hidden md:inline">Tambah</span>
            </button>
          </div>
        )}
      </div>

      {showForm ? (
        <div className="max-w-2xl mx-auto animate-fade-in">
          <FormLayanan
            initialData={editingItem}
            onClose={() => setShowForm(false)}
            onSubmit={handleFormSubmit}
          />
        </div>
      ) : (
        <>
          {isLoading ? (
            <div className="flex justify-center items-center h-64 text-gray-500">
              <Loader2 className="animate-spin mr-2" /> Memuat data...
            </div>
          ) : (
            <div className="space-y-8">
              {/* LOOPING PER KATEGORI */}
              {categories.length > 0 ? (
                categories.map((category) => (
                  <div key={category} className="animate-fade-in">
                    {/* Judul Kategori */}
                    <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
                      <div className="bg-indigo-100 p-1.5 rounded text-indigo-700">
                        <Layers size={18} />
                      </div>
                      <h2 className="text-xl font-bold text-gray-700">
                        {category}
                      </h2>
                      <span className="text-sm bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                        {groupedData[category].length}
                      </span>
                    </div>

                    {/* Grid Layanan */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {groupedData[category].map((item) => (
                        <div
                          key={item.id}
                          className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition flex flex-col h-full"
                        >
                          {/* HEADER CARD */}
                          <div className="p-5 pb-2">
                            <div className="flex items-start gap-3">
                              <div className="bg-blue-50 p-2 rounded-lg text-blue-600 mt-1">
                                <Briefcase size={20} />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-gray-800 leading-snug">
                                  {item.namaLayanan}
                                </h3>
                                {/* Menampilkan Nomor Urut jika perlu */}
                                <span className="text-xs text-gray-400">
                                  No. {item.nomor || "-"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* BODY CARD (List Syarat FULL) */}
                          <div className="px-5 py-3 flex-1">
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase mb-2">
                              <FileText size={14} /> Persyaratan:
                            </div>

                            {/* Logic Baru: Tampilkan SEMUA tanpa .slice() */}
                            <ul className="space-y-2">
                              {item.syarat && item.syarat.length > 0 ? (
                                item.syarat.map((syarat, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-2 text-sm text-gray-600"
                                  >
                                    <CheckCircle2
                                      size={14}
                                      className="text-green-500 mt-0.5 shrink-0"
                                    />
                                    <span className="leading-tight">
                                      {syarat}
                                    </span>
                                  </li>
                                ))
                              ) : (
                                <li className="text-gray-400 italic text-xs pl-6">
                                  Tidak ada syarat khusus
                                </li>
                              )}
                            </ul>
                          </div>

                          {/* FOOTER CARD (Tombol Aksi) */}
                          <div className="px-5 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-lg flex justify-end gap-2 mt-auto">
                            <button
                              onClick={() => handleEditClick(item)}
                              className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded transition"
                            >
                              <Edit size={16} /> Edit
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded transition"
                            >
                              <Trash2 size={16} /> Hapus
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                  <div className="text-gray-400 mb-2">
                    <Search size={40} className="mx-auto" />
                  </div>
                  <p className="text-gray-500 text-lg">
                    Tidak ada layanan ditemukan.
                  </p>
                  {searchTerm && (
                    <p className="text-sm text-gray-400">
                      Coba kata kunci lain.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardLayanan;
