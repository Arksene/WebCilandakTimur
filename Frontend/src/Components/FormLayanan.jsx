import React, { useState } from "react";
import { Save, Plus, Trash2, X } from "lucide-react";

const FormLayanan = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    namaLayanan: initialData?.namaLayanan || "",
    kategoriLayanan: initialData?.kategoriLayanan || "Administrasi",
    nomor: initialData?.nomor || 1,
    // Jika edit, pakai syarat lama. Jika baru, siapkan satu array kosong
    syarat:
      initialData?.syarat && initialData.syarat.length > 0
        ? initialData.syarat
        : [""],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- LOGIKA DINAMIS ARRAY SYARAT ---
  const handleSyaratChange = (index, value) => {
    const newSyarat = [...formData.syarat];
    newSyarat[index] = value;
    setFormData({ ...formData, syarat: newSyarat });
  };

  const addSyaratField = () => {
    setFormData({ ...formData, syarat: [...formData.syarat, ""] });
  };

  const removeSyaratField = (index) => {
    const newSyarat = formData.syarat.filter((_, i) => i !== index);
    setFormData({ ...formData, syarat: newSyarat });
  };
  // -----------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    // FORMAT DATA SEBELUM KIRIM
    const cleanData = {
      ...formData,
      nomor: parseInt(formData.nomor), // Pastikan Integer sesuai Schema Prisma
      // Hapus input syarat yang kosong agar tidak nyampah di DB
      syarat: formData.syarat.filter((s) => s.trim() !== ""),
    };

    console.log("Mengirim Data Layanan:", cleanData);
    onSubmit(cleanData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {initialData ? "Edit Layanan" : "Tambah Layanan"}
        </h2>
        <button onClick={onClose}>
          <X className="text-gray-500 hover:text-red-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-semibold mb-1">
              Nama Layanan
            </label>
            <input
              required
              name="namaLayanan"
              value={formData.namaLayanan}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Contoh: Pembuatan KTP"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">No. Urut</label>
            <input
              name="nomor"
              type="number"
              value={formData.nomor}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Kategori</label>
          <input
            required
            name="kategoriLayanan"
            value={formData.kategoriLayanan}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Contoh: Kependudukan"
          />
        </div>

        {/* Dynamic Input Syarat */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Persyaratan Dokumen
          </label>
          {formData.syarat.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleSyaratChange(index, e.target.value)}
                placeholder={`Syarat ke-${index + 1}`}
                className="w-full border p-2 rounded bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              {/* Tombol hapus hanya muncul jika ada lebih dari 1 syarat */}
              <button
                type="button"
                onClick={() => removeSyaratField(index)}
                className="text-red-500 p-2 hover:bg-red-50 rounded"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSyaratField}
            className="text-sm text-indigo-600 flex items-center gap-1 hover:underline mt-1 font-medium"
          >
            <Plus size={14} /> Tambah Syarat Lain
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded flex justify-center items-center gap-2 hover:bg-indigo-700 transition"
        >
          <Save size={18} />{" "}
          {initialData ? "Simpan Perubahan" : "Simpan Layanan"}
        </button>
      </form>
    </div>
  );
};

export default FormLayanan;
