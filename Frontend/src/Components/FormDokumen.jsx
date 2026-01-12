import { useState } from "react";
import { Upload, FileText, X, FileUp, Info } from "lucide-react";
import { alertError } from "../lib/alerts";

const FormDokumen = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    namaDokumen: initialData?.namaDokumen || "",
    kategori: initialData?.kategori || "",
    file: null,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alertError("File terlalu besar! Maksimal ukuran file adalah 5MB.");
        return;
      }
      setFormData({ ...formData, file: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!initialData && !formData.file) {
      alertError("Silakan pilih file dokumen terlebih dahulu!");
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden max-w-lg w-full mx-auto shadow-2xl border border-slate-100">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-black text-slate-800 tracking-tight">
          {initialData ? "Edit Dokumen" : "Upload Dokumen"}
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
            Nama Dokumen
          </label>
          <input
            required
            type="text"
            value={formData.namaDokumen}
            onChange={(e) =>
              setFormData({ ...formData, namaDokumen: e.target.value })
            }
            placeholder="Contoh: Formulir Surat Keterangan Domisili"
            className="w-full bg-slate-50 border border-slate-200 p-3 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all text-slate-700 font-medium"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
            Kategori Dokumen
          </label>
          <input
            required
            type="text"
            value={formData.kategori}
            onChange={(e) =>
              setFormData({ ...formData, kategori: e.target.value })
            }
            placeholder="Contoh: Formulir / SK / Peraturan"
            className="w-full bg-slate-50 border border-slate-200 p-3 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all text-slate-700 font-medium"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
            Berkas File{" "}
            {!initialData && <span className="text-rose-500">*</span>}
          </label>

          {initialData && !formData.file && (
            <div className="mb-3 flex items-start gap-2 p-3 bg-amber-50 border border-amber-100 rounded-2xl">
              <Info size={14} className="text-amber-600 mt-0.5 shrink-0" />
              <p className="text-[11px] text-amber-700 leading-tight">
                Dokumen saat ini tersedia. Pilih file baru jika ingin mengganti,
                atau biarkan kosong untuk tetap menggunakan file lama.
              </p>
            </div>
          )}

          <div className="relative group">
            <input
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              onChange={handleFileChange}
            />
            <div
              className={`border-2 border-dashed rounded-3xl p-8 transition-all flex flex-col items-center justify-center gap-3 ${
                formData.file
                  ? "border-emerald-200 bg-emerald-50/30"
                  : "border-slate-200 bg-slate-50 hover:border-emerald-400 hover:bg-slate-100"
              }`}
            >
              {formData.file ? (
                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-2">
                    <FileText size={32} className="text-emerald-500" />
                  </div>
                  <span className="font-bold text-slate-700 text-sm max-w-[200px] truncate text-center">
                    {formData.file.name}
                  </span>
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full mt-1">
                    {(formData.file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-3 text-slate-400 group-hover:text-emerald-500 transition-colors">
                    <Upload size={24} />
                  </div>
                  <p className="text-sm font-bold text-slate-500">
                    Pilih Dokumen
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">
                    PDF, DOCX, ATAU XLSX (MAX 5MB)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-slate-900 hover:bg-emerald-600 text-white p-4 rounded-2xl flex justify-center items-center gap-3 font-bold shadow-xl shadow-slate-200 transition-all active:scale-[0.98] mt-4"
        >
          <FileUp size={20} />
          {initialData ? "Simpan Perubahan" : "Upload Dokumen Sekarang"}
        </button>
      </form>
    </div>
  );
};

export default FormDokumen;
