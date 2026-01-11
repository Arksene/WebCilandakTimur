import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Save,
  MapPin,
  BarChart2,
  BookOpen,
  Loader2,
  RefreshCcw,
} from "lucide-react";

const DashboardInformasiKelurahan = ({ defaultTab = "profil" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [loading, setLoading] = useState(true);

  // --- STATE DATA ---
  const [dataProfil, setDataProfil] = useState([]); // API: /informasi-kelurahan
  const [dataBatas, setDataBatas] = useState([]); // API: /wilayah/batas
  const [dataStatistik, setDataStatistik] = useState([]); // API: /wilayah/statistik
  // --- CONFIG API ---

  const API_BASE = `${import.meta.env.VITE_API_URL}/api`;

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // --- 1. FETCH ALL DATA ---
  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Kita panggil 3 endpoint sekaligus dengan Promise.all agar efisien
      const [resProfil, resBatas, resStat] = await Promise.all([
        axios.get(`${API_BASE}/informasi-kelurahan`),
        axios.get(`${API_BASE}/wilayah/batas`),
        axios.get(`${API_BASE}/wilayah/statistik`),
      ]);

      setDataProfil(resProfil.data.data);
      setDataBatas(resBatas.data.data);
      setDataStatistik(resStat.data.data);
    } catch (error) {
      console.error("Gagal memuat data:", error);
      alert("Gagal memuat data informasi kelurahan.");
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
      fetchAllData(); // Refresh data agar sinkron
    } catch (error) {
      console.error("Update Error:", error);
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
      {
        key: item.key,
        value: item.value,
      },
      `Berhasil update ${item.key}`
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin mr-2" /> Memuat Data...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Pusat Informasi Kelurahan
        </h1>
        <button
          onClick={fetchAllData}
          className="p-2 bg-white rounded border hover:bg-gray-100"
          title="Refresh Data"
        >
          <RefreshCcw size={18} />
        </button>
      </div>

      <div className="flex space-x-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab("profil")}
          className={`px-4 py-2 flex gap-2 ${
            activeTab === "profil"
              ? "border-b-2 border-blue-600 text-blue-600 font-bold"
              : "text-gray-500"
          }`}
        >
          <BookOpen size={18} /> Profil & Data
        </button>
        <button
          onClick={() => setActiveTab("batas")}
          className={`px-4 py-2 flex gap-2 ${
            activeTab === "batas"
              ? "border-b-2 border-blue-600 text-blue-600 font-bold"
              : "text-gray-500"
          }`}
        >
          <MapPin size={18} /> Batas Wilayah
        </button>
        <button
          onClick={() => setActiveTab("statistik")}
          className={`px-4 py-2 flex gap-2 ${
            activeTab === "statistik"
              ? "border-b-2 border-blue-600 text-blue-600 font-bold"
              : "text-gray-500"
          }`}
        >
          <BarChart2 size={18} /> Statistik
        </button>
      </div>

      {activeTab === "profil" && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-bold text-lg mb-4 text-gray-800 border-b pb-2">
              Profil Umum
            </h3>
            <div className="space-y-4">
              {["Sejarah", "Visi", "Misi"].map((key) => {
                const item = getProfilItem(key);
                if (!item) return null; // Skip jika key tidak ada di DB
                return (
                  <div key={item.id}>
                    <label className="block font-semibold mb-1 text-sm text-gray-600">
                      {item.key}
                    </label>
                    <div className="flex gap-2">
                      <textarea
                        className="w-full border p-2 rounded h-24 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={item.value}
                        onChange={(e) =>
                          handleProfilChange(key, e.target.value)
                        }
                      />
                      <button
                        onClick={() => saveProfilByKey(key)}
                        className="self-end bg-blue-600 text-white p-2 rounded hover:bg-blue-700 h-10 flex items-center"
                      >
                        <Save size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-bold text-lg mb-4 text-gray-800 border-b pb-2">
              Data Fasilitas Pendidikan
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["paud", "sd", "smp", "sma", "smk", "pkbm"].map((key) => {
                const item = getProfilItem(key);
                if (!item) return null;
                return (
                  <div key={item.id} className="bg-gray-50 p-3 rounded border">
                    <label className="block font-bold text-xs uppercase text-gray-500 mb-1">
                      {item.key}
                    </label>
                    <div className="flex gap-1">
                      <input
                        type="text"
                        className="w-full border p-1 rounded font-bold text-gray-800"
                        value={item.value}
                        onChange={(e) =>
                          handleProfilChange(key, e.target.value)
                        }
                      />
                      <button
                        onClick={() => saveProfilByKey(key)}
                        className="bg-green-600 text-white p-1 rounded hover:bg-green-700"
                      >
                        <Save size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === "batas" && (
        <div className="bg-white p-6 rounded shadow animate-fade-in">
          <h3 className="font-bold text-lg mb-4 text-gray-800">
            Batas Wilayah
          </h3>
          <div className="grid gap-4">
            {dataBatas.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end border-b pb-4 last:border-0"
              >
                <div className="md:col-span-1">
                  <label className="text-xs font-bold text-gray-500">
                    Arah
                  </label>
                  <div className="font-bold text-gray-800 py-2 bg-gray-100 text-center rounded">
                    {item.arah}
                  </div>
                </div>
                <div className="md:col-span-5">
                  <label className="text-xs font-bold text-gray-500">
                    Batas Jalan/Wilayah
                  </label>
                  <input
                    className="w-full border p-2 rounded"
                    value={item.batas}
                    onChange={(e) => {
                      const newData = [...dataBatas];
                      newData[index].batas = e.target.value;
                      setDataBatas(newData);
                    }}
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="text-xs font-bold text-gray-500">
                    Berbatasan dgn Kelurahan
                  </label>
                  <input
                    className="w-full border p-2 rounded"
                    value={item.kelurahan}
                    onChange={(e) => {
                      const newData = [...dataBatas];
                      newData[index].kelurahan = e.target.value;
                      setDataBatas(newData);
                    }}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-gray-500">
                    Kecamatan
                  </label>
                  <input
                    className="w-full border p-2 rounded"
                    value={item.Kecamatan || ""}
                    onChange={(e) => {
                      const newData = [...dataBatas];
                      newData[index].Kecamatan = e.target.value;
                      setDataBatas(newData);
                    }}
                  />
                </div>
                <div className="md:col-span-1">
                  <button
                    onClick={() =>
                      handleUpdateItem(
                        `${API_BASE}/wilayah/batas`,
                        item.id,
                        item,
                        `Update ${item.arah} berhasil`
                      )
                    }
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex justify-center"
                  >
                    <Save size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "statistik" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
          <div className="bg-white p-6 rounded shadow h-fit">
            <h3 className="font-bold text-lg mb-4 text-blue-800 flex items-center gap-2">
              <BarChart2 size={20} /> Statistik Penduduk
            </h3>
            <div className="space-y-4">
              {dataStatistik.penduduk.map((item, index) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div className="w-1/3 font-medium text-gray-700">
                    {item.label}
                  </div>
                  <div className="w-1/2 flex gap-2">
                    <input
                      className="w-full border p-1 rounded font-mono text-right"
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
                          "Data disimpan"
                        )
                      }
                      className="bg-indigo-600 text-white p-1 rounded hover:bg-indigo-700"
                    >
                      <Save size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded shadow h-fit">
            <h3 className="font-bold text-lg mb-4 text-green-800 flex items-center gap-2">
              <MapPin size={20} /> Data RW
            </h3>
            <div className="space-y-4">
              {dataStatistik.wilayah.map((item) => (
                <div key={item.id} className="border p-3 rounded bg-gray-50">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-sm text-gray-700">
                      {item.label}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateItem(
                          `${API_BASE}/wilayah/statistik`,
                          item.id,
                          item,
                          "Data RW disimpan"
                        )
                      }
                      className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 flex gap-1"
                    >
                      <Save size={12} /> Simpan
                    </button>
                  </div>
                  <textarea
                    className="w-full border p-2 rounded text-sm h-16"
                    value={item.value}
                    onChange={(e) => {
                      const realIndex = dataStatistik.findIndex(
                        (x) => x.id === item.id
                      );
                      const newData = [...dataStatistik];
                      newData[realIndex].value = e.target.value;
                      newData[realIndex].updatedAt = new Date();
                      setDataStatistik(newData);
                    }}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Format: 001, 002, 003...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardInformasiKelurahan;
