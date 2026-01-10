import { useState, useEffect } from "react";
import aboutImg from "../assets/AboutImg.jpg";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import MapCilandakTimur from "../Components/MapCilandakTimur";
import MapCilandakTimurSimple from "../Components/MapCilandakTimurSimple";

export default function AboutPage() {
  const [batasWilayah, setBatasWilayah] = useState([]);
  const [statistik, setStatistik] = useState({});
  const [informasi, setInformasi] = useState({
    sejarah: "",
    visi: "",
    misi: "",
  });
  const BASE_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resBatas = await axios.get(`${BASE_URL}/api/wilayah/batas`);
        setBatasWilayah(resBatas.data.data || []);

        const resStatistik = await axios.get(
          `${BASE_URL}/api/wilayah/statistik`
        );
        const statsData = resStatistik.data.data;

        if (Array.isArray(statsData)) {
          setStatistik({
            penduduk: statsData.filter((item) => item.kategori === "PENDUDUK"),
            wilayah: statsData.filter((item) => item.kategori === "WILAYAH"),
          });
        } else {
          setStatistik(statsData);
        }

        const resInfo = await axios.get(`${BASE_URL}/api/informasi-kelurahan/`);
        const infoArray = resInfo.data.data;

        const infoMap = {
          sejarah: "",
          visi: "",
          misi: "",
        };

        if (Array.isArray(infoArray)) {
          infoArray.forEach((item) => {
            const cleanKey = item.key ? item.key.trim().toLowerCase() : "";

            if (cleanKey === "sejarah") infoMap.sejarah = item.value;
            if (cleanKey === "visi") infoMap.visi = item.value;
            if (cleanKey === "misi") infoMap.misi = item.value;
          });
        }

        setInformasi(infoMap);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchData();
  }, []);

  const pendudukStats = statistik.penduduk || [];
  const wilayahStats = statistik.wilayah || [];

  return (
    <>
      <Navbar />
      <header
        className="relative bg-cover bg-center bg-no-repeat h-96"
        style={{ backgroundImage: `url(${aboutImg})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex flex-col justify-end items-center h-full pb-10">
          <h1 className="text-4xl md:text-5xl text-white font-bold">
            Tentang Kelurahan
          </h1>
          <h1 className="text-4xl md:text-5xl  text-white font-bold">
            Cilandak Timur
          </h1>
        </div>
      </header>
      <section className="flex  flex-col items-center mt-10 mb-10">
        <div className="w-1/12 border-b-4 border-hijauFigma text-center px-4">
          <h1 className="font-bold text-2xl md:text-3xl pb-2">Sejarah</h1>
        </div>
        <p className="w-11/12 md:w-3/4 lg:w-2/3 mt-8 text-gray-700 leading-relaxed">
          {informasi.sejarah || "Memuat Informasi Sejarah ..."}
        </p>
      </section>
      <section className="mt-10 mb-10 bg-green-50 py-12">
        <div className="flex flex-col items-center mb-10">
          <h1 className="font-bold text-3xl pb-1.5 border-b-3 border-hijauFigma text-center px-4">
            Visi & Misi
          </h1>
        </div>

        <div className="w-11/12 md:w-5/6 lg:w-3/4 mx-auto">
          <div className="mb-12 text-center bg-white p-8 rounded-xl shadow-sm border-t-4 border-hijauFigma">
            <h3 className="font-bold text-2xl mb-4 text-hijauFigma uppercase tracking-wide">
              Visi
            </h3>
            <p className="text-xl md:text-2xl text-gray-700 font-serif italic leading-relaxed">
              "{informasi.visi || "Memuat visi..."}"
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="font-bold text-2xl mb-6 text-hijauFigma text-center uppercase tracking-wide">
              Misi
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-left">
              {informasi.misi ? (
                informasi.misi.split(/(?=\d\.)/).map((item, idx) => {
                  const teksBersih = item.replace("/n", "").trim();
                  if (!teksBersih) return null;
                  return (
                    <div key={idx} className="flex">
                      <span className="font-bold text-hijauFigma mr-2 text-lg">
                        {idx + 1}.
                      </span>
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        {teksBersih.replace(/^\d+\.\s*/, "")}{" "}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p className="text-center col-span-2">Memuat misi...</p>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="mt-10">
        <div className="flex flex-col items-center mb-10">
          <h1 className="font-bold text-3xl pb-1.5 w-1/2.5 sm:w-1/4 md:w-1/6 lg:w-1/8 xl:1/10 border-b-3 border-hijauFigma text-center px-4 ">
            GEOGRAFI
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-3/4 mx-auto">
          <div className="h-80 w-3/4 md:1/2 lg:2/3 mx-auto rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <MapCilandakTimur />
          </div>
          <div className="h-80 w-3/4 md:1/2 lg:2/3 mx-auto rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <MapCilandakTimurSimple />
          </div>
        </div>
        <p className="mt-10 text-gray-700 text-center leading-relaxed">
          Kelurahan Cilandak Timur memiliki luas ±353 Ha atau 3.53 km² dengan
          batas-batas wilayah berikut:
        </p>

        <div className="mt-6 w-full md:w-3/4 mx-auto overflow-x-auto mb-10">
          <table className="w-full border-collapse">
            <thead className="bg-hijauFigma text-white">
              <tr>
                <th className="px-4 py-3 font-semibold">Arah</th>
                <th className="px-4 py-3 font-semibold">Batas Wilayah</th>
                <th className="px-4 py-3 font-semibold">Kelurahan</th>
              </tr>
            </thead>
            <tbody>
              {batasWilayah.length > 0 ? (
                batasWilayah.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-semibold text-white bg-hijauFigma/95">
                      {item.arah}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{item.batas}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {item.kelurahan}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    Memuat data...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-green-50 pt-10">
        <div className="flex flex-col items-center mb-10">
          <h1 className="font-bold text-3xl pb-1.5 w-1/2.5 sm:w-1/4 md:w-1/6 lg:w-1/5 xl:1/10 border-b-3 border-hijauFigma text-center px-4 ">
            DEMOGRAFI
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-3/4 mx-auto mb-10">
          <div>
            <h1 className="font-bold text-3xl flex justify-center mb-4">
              Jumlah Penduduk
            </h1>
            <p className="text-sm text-gray-500 mb-2 italic">
              *Berdasarkan data terbaru
            </p>
            <div className="overflow-x-auto rounded-lg shadow-md">
              <table className="w-full border-collapse">
                <thead className="bg-hijauFigma text-white">
                  <tr>
                    <th className="px-6 py-4 font-bold text-left border-b-2 border-white/20">
                      Jenis Kelamin
                    </th>
                    <th className="px-6 py-4 font-bold text-left border-b-2 border-white/20">
                      Jumlah
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pendudukStats.length > 0 ? (
                    pendudukStats.map((item, index) => (
                      <tr
                        key={item.id || index}
                        className="border-b border-gray-200"
                      >
                        <td className="px-6 py-4 font-semibold text-white bg-hijauFigma/95 border-b border-white/20">
                          {item.label}
                        </td>
                        <td className="px-6 py-4 text-gray-700 bg-white hover:bg-gray-50 transition">
                          {item.jumlah}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center py-4 bg-white">
                        Loading...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h1 className="font-bold text-3xl flex justify-center mb-4">
              Wilayah Administrasi
            </h1>
            <p className="text-sm text-gray-500 mb-2 italic">
              *Berdasarkan data terbaru
            </p>
            <div className="overflow-x-auto rounded-lg shadow-md">
              <table className="w-full border-collapse">
                <thead className="bg-hijauFigma text-white">
                  <tr>
                    <th className="px-6 py-4 font-bold text-left border-b-2 border-white/20">
                      Nama
                    </th>
                    <th className="px-6 py-4 font-bold text-left border-b-2 border-white/20">
                      Jumlah
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wilayahStats.length > 0 ? (
                    wilayahStats.map((item, index) => (
                      <tr
                        key={item.id || index}
                        className="border-b border-gray-200"
                      >
                        <td className="px-6 py-4 font-semibold text-white bg-hijauFigma/95 border-b border-white/20">
                          {item.label}
                        </td>
                        <td className="px-6 py-4 text-gray-700 bg-white hover:bg-gray-50 transition">
                          {item.jumlah}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center py-4 bg-white">
                        Loading...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
