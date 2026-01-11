import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FileText,
  Trash2,
  Upload,
  Download,
  Edit,
  Loader2,
  Eye,
} from "lucide-react";
import FormDokumen from "./FormDokumen";

const DashboardDokumen = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

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
      console.log(data);
    } catch (error) {
      console.error("Gagal load dokumen:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDokumen();
  }, []);

  // --- 3. DELETE ---
  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus dokumen ini?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`, getAuthHeader());
      alert("Dokumen berhasil dihapus");
      fetchDokumen();
    } catch (error) {
      console.error("Error delete:", error);
      alert("Gagal menghapus dokumen");
    }
  };

  // --- 4. SUBMIT (CREATE & UPDATE) ---
  const handleFormSubmit = async (formDataInput) => {
    const formData = new FormData();
    // Append field text
    formData.append("namaDokumen", formDataInput.namaDokumen);
    formData.append("kategori", formDataInput.kategori);

    // Append File (Hanya jika ada file baru)
    // Backend kamu pakai upload.single("file"), jadi key-nya wajib "file"
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
        // === UPDATE (PUT) ===
        // Endpoint: /:id
        await axios.put(`${API_URL}/${editingItem.id}`, formData, config);
        alert("Dokumen berhasil diperbarui!");
      } else {
        // === CREATE (POST) ===
        // Endpoint backend kamu: /upload
        await axios.post(`${API_URL}/upload`, formData, config);
        alert("Dokumen berhasil diupload!");
      }

      setShowForm(false);
      setEditingItem(null);
      fetchDokumen(); // Refresh data
    } catch (error) {
      console.error("Error saving:", error);
      alert(
        `Gagal menyimpan: ${
          error.response?.data?.message || "Terjadi kesalahan"
        }`
      );
    }
  };

  // --- UI HANDLERS ---
  const handleEditClick = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleAddClick = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleDownload = (url) => {
    // Membuka fileUrl di tab baru
    window.open(url, "_blank");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dokumen Publik</h1>
          <p className="text-gray-500 text-sm">
            Upload peraturan, formulir, atau laporan.
          </p>
        </div>

        {!showForm && (
          <button
            onClick={handleAddClick}
            className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700 transition"
          >
            <Upload size={18} /> Upload Dokumen
          </button>
        )}
      </div>

      {showForm ? (
        <div className="max-w-2xl mx-auto">
          <FormDokumen
            initialData={editingItem}
            onClose={() => setShowForm(false)}
            onSubmit={handleFormSubmit}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          {isLoading ? (
            <div className="p-10 flex justify-center text-gray-500">
              <Loader2 className="animate-spin mr-2" /> Memuat data...
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Nama Dokumen
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Kategori
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600">
                    Tanggal
                  </th>
                  <th className="p-4 text-sm font-semibold text-gray-600 text-right">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.length > 0 ? (
                  data.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50 transition">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 text-blue-600 rounded">
                            <FileText size={20} />
                          </div>
                          <span className="font-medium text-gray-700">
                            {doc.namaDokumen}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-semibold border border-gray-200">
                          {doc.kategori || "Umum"}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {new Date(doc.createdAt).toLocaleDateString("id-ID")}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          {/* Tombol Lihat/Download File */}
                          {doc.fileUrl && (
                            <button
                              onClick={() => handleDownload(doc.fileUrl)}
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition"
                              title="Download / Lihat"
                            >
                              <Download size={18} />
                            </button>
                          )}

                          {/* Tombol Edit */}
                          <button
                            onClick={() => handleEditClick(doc)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                          >
                            <Edit size={18} />
                          </button>

                          {/* Tombol Hapus */}
                          <button
                            onClick={() => handleDelete(doc.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-6 text-gray-500">
                      Belum ada dokumen.
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

export default DashboardDokumen;
