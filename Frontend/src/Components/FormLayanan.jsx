import { useState } from "react";
import { Save, Plus, Trash2, X, ListChecks, Hash, Layers } from "lucide-react";
import { alertError } from "../lib/alerts";

const FormLayanan = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    namaLayanan: initialData?.namaLayanan || "",
    kategoriLayanan: initialData?.kategoriLayanan || "Administrasi",
    nomor: initialData?.nomor || 1,
    syarat:
      initialData?.syarat && initialData.syarat.length > 0
        ? initialData.syarat
        : [""],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSyaratChange = (index, value) => {
    const newSyarat = [...formData.syarat];
    newSyarat[index] = value;
    setFormData({ ...formData, syarat: newSyarat });
  };

  const addSyaratField = () => {
    setFormData({ ...formData, syarat: [...formData.syarat, ""] });
  };

  const removeSyaratField = (index) => {
    if (formData.syarat.length <= 1) {
      setFormData({ ...formData, syarat: [""] });
      return;
    }
    const newSyarat = formData.syarat.filter((_, i) => i !== index);
    setFormData({ ...formData, syarat: newSyarat });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalSyarat = formData.syarat.filter((s) => s.trim() !== "");

    if (finalSyarat.length === 0) {
      alertError("Minimal harus ada satu persyaratan yang diisi!");
      return;
    }

    const cleanData = {
      ...formData,
      nomor: parseInt(formData.nomor),
      syarat: finalSyarat,
    };

    onSubmit(cleanData);
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full mx-auto shadow-2xl border border-slate-100">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-black text-slate-800 tracking-tight">
          {initialData ? "Edit Layanan Publik" : "Tambah Layanan Baru"}
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-rose-50 hover:text-rose-500 text-slate-400 rounded-full transition-all"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
              <ListChecks size={12} /> Nama Layanan
            </label>
            <input
              required
              name="namaLayanan"
              value={formData.namaLayanan}
              onChange={handleChange}
              placeholder="Contoh: Surat Pengantar Nikah"
              className="w-full bg-slate-50 border border-slate-200 p-3 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-slate-700 font-medium"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
              <Hash size={12} /> No. Urut
            </label>
            <input
              name="nomor"
              type="number"
              value={formData.nomor}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 p-3 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-slate-700 font-medium"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
            <Layers size={12} /> Kategori Layanan
          </label>
          <input
            required
            name="kategoriLayanan"
            value={formData.kategoriLayanan}
            onChange={handleChange}
            placeholder="Contoh: Kependudukan / PTSP"
            className="w-full bg-slate-50 border border-slate-200 p-3 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-slate-700 font-medium"
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 block">
            Persyaratan Dokumen <span className="text-rose-500">*</span>
          </label>

          <div className="space-y-3 max-h-[30vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
            {formData.syarat.map((item, index) => (
              <div
                key={index}
                className="flex gap-2 group animate-in slide-in-from-left-2 duration-200"
              >
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-300">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleSyaratChange(index, e.target.value)}
                    placeholder={`Masukkan persyaratan dokumen...`}
                    className="w-full bg-slate-50 border border-slate-200 pl-8 pr-4 py-2.5 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-sm text-slate-600 font-medium"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeSyaratField(index)}
                  className="p-2.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addSyaratField}
            className="w-full py-3 border-2 border-dashed border-slate-100 rounded-2xl text-indigo-500 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-50 hover:border-indigo-200 transition-all active:scale-[0.98]"
          >
            <Plus size={16} /> Tambah Syarat
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-slate-900 hover:bg-indigo-600 text-white p-4 rounded-2xl flex justify-center items-center gap-3 font-bold shadow-xl shadow-slate-200 transition-all active:scale-[0.98] mt-4"
        >
          <Save size={20} />
          {initialData ? "Perbarui Layanan" : "Simpan Layanan Publik"}
        </button>
      </form>
    </div>
  );
};

export default FormLayanan;
