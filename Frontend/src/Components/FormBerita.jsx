import { useState, useEffect } from "react";
import { Save, Image as ImageIcon, X, UploadCloud } from "lucide-react";
import { alertError } from "../lib/alerts";

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
      if (file.size > 2 * 1024 * 1024) {
        alertError("Ukuran file terlalu besar! Maksimal 2MB.");
        return;
      }
      setFormData({ ...formData, gambar: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.kategori === "BERITA" && !formData.gambar) {
      alertError("Kategori BERITA wajib mengunggah gambar!");
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full mx-auto shadow-2xl border border-slate-100">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-black text-slate-800 tracking-tight">
          {initialData ? "Edit Artikel" : "Buat Artikel Baru"}
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-rose-50 hover:text-rose-500 text-slate-400 rounded-full transition-all"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
            Judul Artikel
          </label>
          <input
            required
            name="judul"
            placeholder="Masukkan judul berita..."
            value={formData.judul}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 p-3 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-700 font-medium"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              Kategori
            </label>
            <select
              name="kategori"
              value={formData.kategori}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 p-3 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-700 font-medium cursor-pointer"
            >
              <option value="BERITA">Berita Utama</option>
              <option value="PENGUMUMAN">Pengumuman</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              Penulis
            </label>
            <input
              name="Penulis"
              value={formData.Penulis}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 p-3 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-700 font-medium"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
            Media Visual{" "}
            {formData.kategori === "BERITA" && (
              <span className="text-rose-500">*</span>
            )}
          </label>
          <div className="relative group">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              onChange={handleFileChange}
            />
            <div
              className={`border-2 border-dashed rounded-3xl p-6 transition-all flex flex-col items-center justify-center gap-3 ${
                preview
                  ? "border-blue-200 bg-blue-50/30"
                  : "border-slate-200 bg-slate-50 hover:border-blue-400 hover:bg-slate-100"
              }`}
            >
              {preview ? (
                <div className="relative w-full text-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-40 md:h-48 mx-auto object-cover rounded-2xl shadow-md border-4 border-white"
                  />
                  <p className="text-xs font-bold text-blue-500 mt-3 flex items-center justify-center gap-2">
                    <UploadCloud size={14} /> Klik untuk mengganti gambar
                  </p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-3 text-slate-400 group-hover:text-blue-500 transition-colors">
                    <ImageIcon size={24} />
                  </div>
                  <p className="text-sm font-bold text-slate-500">
                    Pilih atau Seret Gambar
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">
                    Maksimal file 2MB (JPG, PNG)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
            Konten Berita
          </label>
          <textarea
            required
            name="isi"
            value={formData.isi}
            onChange={handleChange}
            rows="5"
            placeholder="Tuliskan isi berita secara lengkap di sini..."
            className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-700 font-medium leading-relaxed"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-slate-900 hover:bg-blue-600 text-white p-4 rounded-2xl flex justify-center items-center gap-3 font-bold shadow-xl shadow-slate-200 transition-all active:scale-[0.98] mt-4"
        >
          <Save size={20} />
          {initialData ? "Perbarui Artikel" : "Publikasikan Sekarang"}
        </button>
      </form>
    </div>
  );
};

export default FormBerita;
