import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, FileText, Megaphone, Loader2 } from "lucide-react";
import FormBerita from "./FormBerita"; // Pastikan path ini benar

const DashboardBerita = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

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
      console.log(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data berita:", error);
      alert("Gagal memuat data. Pastikan backend server nyala.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBerita();
  }, []);

  // --- 3. DELETE DATA ---
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus berita ini?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`, getAuthHeader());
      fetchBerita();
      alert("Berita berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Gagal menghapus berita. Cek console.");
    }
  };

  // --- 4. HANDLE SAVE (CREATE & UPDATE) ---
  const handleFormSubmit = async (formDataInput) => {
    /* PENTING: Karena ada upload file, kita WAJIB pakai FormData object,
      bukan JSON biasa.
    */
    const formData = new FormData();
    formData.append("judul", formDataInput.judul);
    formData.append("isi", formDataInput.isi);
    formData.append("kategori", formDataInput.kategori);
    formData.append("penulis", formDataInput.penulis);

    // Hanya append gambar jika ada file baru yang dipilih
    // Jika update dan gambar null (tidak diganti), backend harus handle ignore
    if (formDataInput.gambar instanceof File) {
      formData.append("gambar", formDataInput.gambar);
    }

    try {
      if (editingItem) {
        // === MODE UPDATE (PUT) ===
        // Endpoint: /api/berita/:id
        await axios.put(`${API_URL}/${editingItem.id}`, formData, {
          headers: {
            ...getAuthHeader().headers,
            "Content-Type": "multipart/form-data", // Wajib untuk upload file
          },
        });
        alert("Berita berhasil diperbarui!");
      } else {
        // === MODE CREATE (POST) ===
        // Endpoint sesuai router kamu: /api/berita/upload
        await axios.post(`${API_URL}/upload`, formData, {
          headers: {
            ...getAuthHeader().headers,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Berita berhasil ditambahkan!");
      }

      setShowForm(false);
      setEditingItem(null);
      fetchBerita(); // Refresh tabel
    } catch (error) {
      console.error("Error saving data:", error.response || error);
      alert(
        `Gagal menyimpan: ${error.response?.data?.message || error.message}`
      );
    }
  };

  // --- HANDLER UI ---
  const handleEditClick = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleAddClick = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Manajemen Berita & Pengumuman
        </h1>
        {!showForm && (
          <button
            onClick={handleAddClick}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus size={18} /> Tambah Baru
          </button>
        )}
      </div>

      {showForm ? (
        <div className="max-w-3xl mx-auto">
          <FormBerita
            initialData={editingItem}
            onClose={() => setShowForm(false)}
            onSubmit={handleFormSubmit}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <div className="p-10 flex justify-center text-gray-500">
              <Loader2 className="animate-spin mr-2" /> Memuat data...
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-4">Judul Artikel</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4">Penulis</th>
                  <th className="p-4">Tanggal</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">
                        {item.judul}
                        {/* Menampilkan gambar kecil jika ada URL gambar dari backend */}
                        {item.gambar && (
                          <div className="text-xs text-blue-500 mt-1 flex gap-1 items-center">
                            <FileText size={10} /> Ada Gambar
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <span
                          className={`flex items-center gap-2 text-sm px-2 py-1 rounded w-max ${
                            item.kategori === "PENGUMUMAN"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {item.kategori === "PENGUMUMAN" ? (
                            <Megaphone size={14} />
                          ) : (
                            <FileText size={14} />
                          )}
                          {item.kategori}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600 text-sm">
                        {item.Penulis || "-"}
                      </td>
                      <td className="p-4 text-gray-500 text-sm">
                        {new Date(item.tanggal).toLocaleDateString("id-ID")}
                      </td>
                      <td className="p-4 text-right flex justify-end gap-3">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-gray-500">
                      Belum ada data berita.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardBerita;
