import { useState, useEffect } from "react";
import { Save, Image, X } from "lucide-react";

const FormBerita = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    judul: initialData?.judul || "",
    isi: initialData?.isi || "",
    kategori: initialData?.kategori || "BERITA",
    Penulis: initialData?.Penulis || "Kelurahan Cilandak Timur",
    gambar: initialData?.gambar || null,
  });

  const [preview, setPreview] = useState(
    typeof initialData?.gambar === "string" ? initialData.gambar : null
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, gambar: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
      >
        <X />
      </button>

      <h2 className="text-xl font-bold mb-4">
        {initialData ? "Edit Berita" : "Tambah Berita Baru"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Judul</label>
          <input
            required
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Kategori</label>
            <select
              name="kategori"
              value={formData.kategori}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-white"
            >
              <option value="BERITA">Berita</option>
              <option value="PENGUMUMAN">Pengumuman</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Penulis</label>
            <input
              name="Penulis"
              value={formData.Penulis}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Gambar</label>
          <div className="border-2 border-dashed border-gray-300 p-4 rounded text-center relative hover:bg-gray-50">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />

            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-32 mx-auto object-cover rounded"
                />
                <p className="text-xs text-center mt-1 text-gray-500">
                  Klik area ini untuk mengganti gambar
                </p>
              </div>
            ) : (
              <div className="text-gray-500 py-4">
                <Image className="mx-auto mb-1" />
                <span className="text-sm">Upload Gambar</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Isi Berita</label>
          <textarea
            required
            name="isi"
            value={formData.isi}
            onChange={handleChange}
            rows="5"
            className="w-full border p-2 rounded"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded flex justify-center items-center gap-2 hover:bg-blue-700"
        >
          <Save size={18} /> {initialData ? "Update Berita" : "Simpan Berita"}
        </button>
      </form>
    </div>
  );
};

export default FormBerita;
