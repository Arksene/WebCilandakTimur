import React, { useState } from "react";
import { Upload, FileText, X } from "lucide-react";

// Tambahkan prop 'initialData' untuk menangani Edit
const FormDokumen = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    namaDokumen: initialData?.namaDokumen || "", // Isi otomatis jika Edit
    kategori: initialData?.kategori || "", // Isi otomatis jika Edit
    file: null, // File baru selalu null di awal
  });

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // VALIDASI KHUSUS:
    // Jika Mode Tambah (!initialData) -> File Wajib Ada
    // Jika Mode Edit (initialData) -> File Boleh Kosong (pakai file lama)
    if (!initialData && !formData.file) {
      return alert("Silakan pilih file dokumen terlebih dahulu!");
    }

    // Kirim data ke parent
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {initialData ? "Edit Dokumen" : "Upload Dokumen Publik"}
        </h2>
        <button onClick={onClose}>
          <X className="text-gray-500 hover:text-red-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">
            Nama Dokumen
          </label>
          <input
            required
            value={formData.namaDokumen}
            onChange={(e) =>
              setFormData({ ...formData, namaDokumen: e.target.value })
            }
            className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="Contoh: Formulir Surat Pindah.pdf"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Kategori</label>
          <input
            value={formData.kategori}
            onChange={(e) =>
              setFormData({ ...formData, kategori: e.target.value })
            }
            className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="Contoh: Formulir / SK / Regulasi"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            File Dokumen
          </label>

          {/* INFO TAMBAHAN SAAT EDIT */}
          {initialData && !formData.file && (
            <div className="mb-2 p-2 bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs rounded">
              File saat ini: <strong>{initialData.namaDokumen}</strong> (Biarkan
              kosong jika tidak ingin mengubah file)
            </div>
          )}

          <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center hover:bg-gray-50 relative cursor-pointer">
            <input
              type="file"
              // Hapus attribute 'required' disini, kita handle validasi manual di handleSubmit
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center pointer-events-none">
              {formData.file ? (
                <>
                  <FileText size={32} className="text-green-600 mb-2" />
                  <span className="font-medium text-gray-800">
                    {formData.file.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {(formData.file.size / 1024).toFixed(1)} KB
                  </span>
                </>
              ) : (
                <>
                  <Upload size={32} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">
                    {initialData
                      ? "Klik untuk ganti file baru"
                      : "Klik untuk pilih file (PDF, DOCX, XLSX)"}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded flex justify-center items-center gap-2 hover:bg-green-700 transition"
        >
          <Upload size={18} />
          {initialData ? "Simpan Perubahan" : "Upload Sekarang"}
        </button>
      </form>
    </div>
  );
};

export default FormDokumen;
