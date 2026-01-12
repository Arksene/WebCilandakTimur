import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Save,
  MapPin,
  BarChart2,
  BookOpen,
  Loader2,
  RefreshCcw,
  Navigation,
  School,
  Info,
} from "lucide-react";

const DashboardInformasiKelurahan = ({ defaultTab = "profil" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [loading, setLoading] = useState(true);
  const [dataProfil, setDataProfil] = useState([]);
  const [dataBatas, setDataBatas] = useState([]);
  const [dataStatistik, setDataStatistik] = useState([]);

  const API_BASE = `${import.meta.env.VITE_API_URL}/api`;

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [resProfil, resBatas, resStat] = await Promise.all([
        axios.get(`${API_BASE}/informasi-kelurahan`),
        axios.get(`${API_BASE}/wilayah/batas`),
        axios.get(`${API_BASE}/wilayah/statistik`),
      ]);
      setDataProfil(resProfil.data.data);
      setDataBatas(resBatas.data.data);
      setDataStatistik(resStat.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setActiveTab(defaultTab);
    fetchAllData();
  }, [defaultTab]);

  const handleUpdateItem = async (url, id, payload, message) => {
    try {
      await axios.put(url + `/${id}`, payload, getAuthHeader());
      alert(message || "Data berhasil diperbarui!");
      fetchAllData();
    } catch (error) {
      alert("Gagal menyimpan perubahan.");
    }
  };

  const getProfilItem = (keyName) => {
    return dataProfil.find(
      (item) => item.key.toLowerCase() === keyName.toLowerCase()
    );
  };

  const handleProfilChange = (keyName, newValue) => {
    const newData = dataProfil.map((item) =>
      item.key.toLowerCase() === keyName.toLowerCase()
        ? { ...item, value: newValue }
        : item
    );
    setDataProfil(newData);
  };

  const saveProfilByKey = (keyName) => {
    const item = getProfilItem(keyName);
    if (!item) return;
    handleUpdateItem(
      `${API_BASE}/informasi-kelurahan`,
      item.id,
      { key: item.key, value: item.value },
      `Berhasil update ${item.key}`
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-slate-500">
        <Loader2 className="animate-spin mb-4 text-blue-600" size={40} />
        <p className="font-medium animate-pulse">Menyingkronkan data...</p>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight text-center md:text-left w-full">
              Pusat Data Kelurahan
            </h1>
            <p className="text-slate-500 text-xs md:text-sm mt-1 text-center md:text-left w-full">
              Kelola profil, demografi, dan informasi kewilayahan.
            </p>
          </div>
          <button
            onClick={fetchAllData}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 text-slate-600 transition-all active:scale-95 w-full md:w-auto"
          >
            <RefreshCcw size={16} />
            <span className="text-sm font-semibold">Segarkan</span>
          </button>
        </div>

        <div className="flex bg-slate-200/50 p-1 rounded-2xl mb-6 md:mb-8 overflow-x-auto scrollbar-hide no-scrollbar">
          {[
            { id: "profil", label: "Profil", icon: BookOpen },
            { id: "batas", label: "Batas", icon: Navigation },
            { id: "statistik", label: "Statistik", icon: BarChart2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 items-center justify-center gap-2 px-3 md:px-6 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-white text-blue-600 shadow-sm ring-1 ring-slate-200"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <tab.icon size={16} className="md:w-[18px] md:h-[18px]" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "profil" && (
          <div className="grid grid-cols-1 gap-6 md:gap-8">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 p-4 md:p-8">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Info size={20} />
                </div>
                <h3 className="font-bold text-lg md:text-xl text-slate-800">
                  Narasi Profil Umum
                </h3>
              </div>

              <div className="space-y-6 md:space-y-8">
                {["Sejarah", "Visi", "Misi"].map((key) => {
                  const item = getProfilItem(key);
                  if (!item) return null;
                  return (
                    <div key={item.id} className="group">
                      <div className="flex items-center justify-between mb-3 px-1">
                        <label className="block font-bold text-[10px] md:text-xs uppercase tracking-widest text-slate-400">
                          {item.key}
                        </label>
                        <button
                          onClick={() => saveProfilByKey(key)}
                          className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1.5 rounded-xl text-[10px] md:text-xs font-bold hover:bg-blue-700 shadow-md transition-all active:scale-95"
                        >
                          <Save size={14} />
                          Simpan
                        </button>
                      </div>
                      <textarea
                        className="w-full border border-slate-200 p-3 md:p-4 rounded-xl md:rounded-2xl h-32 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-slate-50/50 focus:bg-white text-slate-700 text-sm md:text-base shadow-inner resize-none"
                        value={item.value}
                        onChange={(e) =>
                          handleProfilChange(key, e.target.value)
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 p-4 md:p-8">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                  <School size={20} />
                </div>
                <h3 className="font-bold text-lg md:text-xl text-slate-800">
                  Fasilitas Pendidikan
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {["paud", "sd", "smp", "sma", "smk", "pkbm"].map((key) => {
                  const item = getProfilItem(key);
                  if (!item) return null;
                  return (
                    <div
                      key={item.id}
                      className="bg-slate-50 p-4 md:p-5 rounded-2xl border border-slate-100 group hover:border-emerald-200 hover:bg-white hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <label className="block font-black text-[10px] uppercase text-slate-400 tracking-tighter">
                          Kuantitas {item.key}
                        </label>
                        <button
                          onClick={() => saveProfilByKey(key)}
                          className="text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-lg transition-colors"
                        >
                          <Save size={18} />
                        </button>
                      </div>
                      <input
                        type="text"
                        className="w-full bg-transparent border-b-2 border-slate-200 py-1 font-bold text-slate-800 focus:border-emerald-500 outline-none transition-all text-base md:text-lg"
                        value={item.value}
                        onChange={(e) =>
                          handleProfilChange(key, e.target.value)
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "batas" && (
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 p-4 md:p-8">
            <h3 className="font-bold text-lg md:text-xl text-slate-800 mb-6 md:mb-8 flex items-center gap-2">
              <Navigation className="text-blue-500" size={24} />
              Geografis Batas Wilayah
            </h3>
            <div className="space-y-4 md:space-y-6">
              {dataBatas.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-center p-4 md:p-6 rounded-2xl border border-slate-100 bg-slate-50/30 group hover:bg-white hover:shadow-md transition-all"
                >
                  <div className="lg:col-span-2">
                    <span className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                      Arah
                    </span>
                    <div className="font-black text-blue-700 bg-blue-50 px-4 py-2 rounded-xl text-center border border-blue-100 text-sm">
                      {item.arah}
                    </div>
                  </div>
                  <div className="lg:col-span-4">
                    <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">
                      Jalan / Landmark
                    </label>
                    <input
                      className="w-full bg-white border border-slate-200 p-2 md:p-2.5 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none font-medium text-slate-700 text-sm"
                      value={item.batas}
                      onChange={(e) => {
                        const newData = [...dataBatas];
                        newData[index].batas = e.target.value;
                        setDataBatas(newData);
                      }}
                    />
                  </div>
                  <div className="lg:col-span-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">
                      Kelurahan
                    </label>
                    <input
                      className="w-full bg-white border border-slate-200 p-2 md:p-2.5 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none font-medium text-slate-700 text-sm"
                      value={item.kelurahan}
                      onChange={(e) => {
                        const newData = [...dataBatas];
                        newData[index].kelurahan = e.target.value;
                        setDataBatas(newData);
                      }}
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">
                      Kecamatan
                    </label>
                    <input
                      className="w-full bg-white border border-slate-200 p-2 md:p-2.5 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none font-medium text-slate-700 text-sm"
                      value={item.Kecamatan || ""}
                      onChange={(e) => {
                        const newData = [...dataBatas];
                        newData[index].Kecamatan = e.target.value;
                        setDataBatas(newData);
                      }}
                    />
                  </div>
                  <div className="lg:col-span-1">
                    <button
                      onClick={() =>
                        handleUpdateItem(
                          `${API_BASE}/wilayah/batas`,
                          item.id,
                          item,
                          `Batas ${item.arah} diperbarui`
                        )
                      }
                      className="w-full h-11 lg:aspect-square bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg active:scale-95"
                    >
                      <Save size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "statistik" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 p-4 md:p-8 h-fit">
              <h3 className="font-bold text-lg md:text-xl text-slate-800 mb-6 md:mb-8 flex items-center gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <BarChart2 size={20} />
                </div>
                Demografi Penduduk
              </h3>
              <div className="space-y-4 md:space-y-6">
                {dataStatistik.penduduk.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 md:p-4 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <div className="font-bold text-slate-600 text-xs md:text-sm tracking-tight">
                      {item.label}
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <input
                        className="flex-1 sm:w-28 md:w-32 bg-white border border-slate-200 p-2 rounded-xl text-right font-mono font-bold text-blue-600 focus:ring-2 focus:ring-blue-100 outline-none shadow-sm text-sm"
                        value={item.value}
                        onChange={(e) => {
                          const realIndex = dataStatistik.findIndex(
                            (x) => x.id === item.id
                          );
                          const newData = [...dataStatistik];
                          newData[realIndex].value = e.target.value;
                          setDataStatistik(newData);
                        }}
                      />
                      <button
                        onClick={() =>
                          handleUpdateItem(
                            `${API_BASE}/wilayah/statistik`,
                            item.id,
                            item,
                            "Data kependudukan disimpan"
                          )
                        }
                        className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 shadow-md transition-all"
                      >
                        <Save size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 p-4 md:p-8 h-fit">
              <h3 className="font-bold text-lg md:text-xl text-slate-800 mb-6 md:mb-8 flex items-center gap-3">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                  <MapPin size={20} />
                </div>
                Integrasi Wilayah (RT/RW)
              </h3>
              <div className="space-y-4 md:space-y-6">
                {dataStatistik.wilayah.map((item) => (
                  <div
                    key={item.id}
                    className="group p-4 md:p-5 rounded-2xl md:rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-black text-[10px] md:text-xs uppercase tracking-widest text-amber-600">
                        {item.label}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateItem(
                            `${API_BASE}/wilayah/statistik`,
                            item.id,
                            item,
                            "Data wilayah disimpan"
                          )
                        }
                        className="flex items-center gap-2 bg-amber-600 text-white px-3 md:px-4 py-1.5 rounded-xl text-[10px] md:text-xs font-bold hover:bg-amber-700 shadow-lg transition-all"
                      >
                        <Save size={14} /> Simpan
                      </button>
                    </div>
                    <textarea
                      className="w-full bg-white border border-slate-200 p-3 md:p-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-medium text-slate-700 h-24 focus:ring-4 focus:ring-amber-50 outline-none transition-all resize-none shadow-inner"
                      value={item.value}
                      placeholder="Contoh: 001, 002..."
                      onChange={(e) => {
                        const realIndex = dataStatistik.findIndex(
                          (x) => x.id === item.id
                        );
                        const newData = [...dataStatistik];
                        newData[realIndex].value = e.target.value;
                        setDataStatistik(newData);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardInformasiKelurahan;
