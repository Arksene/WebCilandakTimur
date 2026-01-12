import { useState, useEffect } from "react";
import { Calendar, User, Clock, Upload, Send } from "lucide-react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { alertSuccess, alertError } from "../lib/alerts";
import PolsekCilandak from "../assets/polsek.jpg";
import Chatbot from "../Components/Chatbot";

const LaporPage = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const API_URL = `${BASE_URL}/api/pengaduan`;

  const [reports, setReports] = useState([]);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    judul: "",
    isi: "",
  });
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      if (response.ok) {
        setReports(result.data || result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!formData.nama || !formData.email || !formData.judul || !formData.isi) {
      alertError("Harap isi semua kolom bertanda *");
      return;
    }

    if (!file) {
      alertError("Harap masukan bukti foto");
      return;
    }

    setIsLoading(true);
    const data = new FormData();
    data.append("namaPengadu", formData.nama);
    data.append("email", formData.email);
    data.append("judulPengaduan", formData.judul);
    data.append("isiPengaduan", formData.isi);
    if (file) {
      data.append("buktiFoto", file);
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alertSuccess("Laporan berhasil dikirim!");
        setFormData({ nama: "", email: "", judul: "", isi: "" });
        setFile(null);
        fetchReports();
      } else {
        alertError("Gagal mengirim laporan");
      }
    } catch (error) {
      console.error(error);
      alertError("Terjadi kesalahan jaringan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen font-sans">
        <div
          className="relative h-64 md:h-90 w-full bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: `url(${PolsekCilandak})`,
            backgroundPosition: "center 60%",
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-white text-3xl md:text-5xl font-black uppercase tracking-tighter">
              Lapor!
            </h1>
            <h2 className="text-white text-xl md:text-3xl font-bold uppercase mt-2">
              Pengaduan Online
            </h2>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-10 relative z-20">
          <div className="bg-[#0c2415] rounded-lg shadow-2xl overflow-hidden mb-16">
            <div className="bg-[#8B0000] py-4 text-center">
              <h3 className="text-white text-xl font-bold">
                Sampaikan Laporan Anda!
              </h3>
            </div>

            <div className="p-5 md:p-8 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Nama Pelapor *"
                  className="w-full p-3 rounded bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-700"
                />
                <span className="absolute right-3 top-3 text-red-600 font-bold">
                  *
                </span>
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Pelapor *"
                  className="w-full p-3 rounded bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-700"
                />
                <span className="absolute right-3 top-3 text-red-600 font-bold">
                  *
                </span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="judul"
                  value={formData.judul}
                  onChange={handleChange}
                  placeholder="Ketik Judul Laporan Anda! *"
                  className="w-full p-3 rounded bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-700"
                />
                <span className="absolute right-3 top-3 text-red-600 font-bold">
                  *
                </span>
              </div>

              <div className="relative">
                <textarea
                  name="isi"
                  value={formData.isi}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Ketik Isi Laporan Anda! *"
                  className="w-full p-3 rounded bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-700 resize-none"
                ></textarea>
                <span className="absolute right-3 top-3 text-red-600 font-bold">
                  *
                </span>
              </div>

              <label className="border-2 border-dashed border-gray-500 rounded p-4 md:p-6 flex flex-col items-center justify-center text-gray-400 hover:border-white hover:text-white transition cursor-pointer bg-white/5 overflow-hidden">
                <span className="text-xs md:text-sm mb-2 text-center break-words w-full px-2">
                  {file ? file.name : "Upload Lampiran (Max 10 MB)"}
                </span>
                <Upload size={20} />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>

              <div className="flex justify-center md:justify-end pt-2">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full md:w-auto bg-[#8B0000] hover:bg-[#a50000] text-white font-bold py-3 px-10 rounded shadow-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? "Mengirim..." : "Lapor!"}
                  {!isLoading && <Send size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-slate-900 font-black text-xl uppercase tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#8B0000]"></span>
              Laporan Terkini
            </h4>

            {reports.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-[#0a210f] px-5 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[9px] font-black px-2.5 py-1 rounded uppercase tracking-wider border ${
                        item.status === "SELESAI"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : item.status === "PROSES"
                          ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                          : item.status === "DITOLAK"
                          ? "bg-red-500/20 text-red-400 border-red-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      }`}
                    >
                      {item.status || "PENDING"}
                    </span>
                    <span className="font-bold text-white text-base md:text-lg truncate max-w-[200px] sm:max-w-none">
                      {item.judulPengaduan || "Tanpa Judul"}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-400 text-[10px] font-bold uppercase tracking-tighter shrink-0">
                    <Calendar size={14} className="mr-1.5 opacity-60" />
                    {new Date(item.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <div className="p-5 md:p-6 flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                      {item.isiPengaduan}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4 pt-4 border-t border-gray-50 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      <div className="flex items-center">
                        <User size={14} className="mr-1.5 text-[#8B0000]" />
                        {item.namaPengadu || "Anonim"}
                      </div>
                      <div className="flex items-center border-l border-gray-200 pl-4">
                        <Clock size={14} className="mr-1.5 text-[#8B0000]" />
                        {new Date(item.createdAt).toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        WIB
                      </div>
                    </div>
                  </div>
                  {item.buktiFotoUrl && (
                    <div className="w-full md:w-40 h-48 md:h-32 flex-shrink-0">
                      <img
                        src={item.buktiFotoUrl}
                        alt="Bukti"
                        className="w-full h-full object-cover rounded-lg border border-gray-100 cursor-pointer hover:opacity-90 transition-opacity shadow-sm"
                        onClick={() => window.open(item.buktiFotoUrl, "_blank")}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {reports.length === 0 && (
              <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                  Belum ada laporan masuk
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Chatbot />
      <Footer />
    </>
  );
};

export default LaporPage;
