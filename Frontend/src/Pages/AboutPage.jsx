import { useState, useEffect } from "react";
import aboutImg from "../assets/AboutImg.jpg";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import MapCilandakTimur from "../Components/MapCilandakTimur";
import MapCilandakTimurSimple from "../Components/MapCilandakTimurSimple";
import Chatbot from "../Components/Chatbot";

export default function AboutPage() {
  const [batasWilayah, setBatasWilayah] = useState([]);
  const [pendudukStats, setPendudukStats] = useState([]);
  const [wilayahStats, setWilayahStats] = useState([]);
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
        setBatasWilayah(
          Array.isArray(resBatas.data.data) ? resBatas.data.data : []
        );

        const resStatistik = await axios.get(
          `${BASE_URL}/api/wilayah/statistik`
        );
        const statsData = resStatistik.data.data || {};

        const rawPenduduk = Array.isArray(statsData.penduduk)
          ? statsData.penduduk
          : [];
        const sortedPenduduk = rawPenduduk.sort((a, b) =>
          a.label.localeCompare(b.label)
        );
        setPendudukStats(sortedPenduduk);

        const rawWilayah = Array.isArray(statsData.wilayah)
          ? statsData.wilayah
          : [];

        const processedWilayah = rawWilayah
          .filter(
            (item) => item.label && item.label.toUpperCase().includes("RW")
          )
          .map((item) => {
            const rtArray = item.value ? item.value.split(",") : [];
            const jumlahRT = rtArray.length;
            return {
              ...item,
              rtList: item.value,
              rtCount: jumlahRT,
              displayTotal: `${jumlahRT} RT`,
            };
          })
          .sort((a, b) => a.label.localeCompare(b.label));

        setWilayahStats(processedWilayah);

        const resInfo = await axios.get(`${BASE_URL}/api/informasi-kelurahan/`);
        const infoArray = Array.isArray(resInfo.data.data)
          ? resInfo.data.data
          : [];
        const infoMap = { sejarah: "", visi: "", misi: "" };

        infoArray.forEach((item) => {
          const cleanKey = item.key ? item.key.trim().toLowerCase() : "";
          if (cleanKey === "sejarah") infoMap.sejarah = item.value;
          if (cleanKey === "visi") infoMap.visi = item.value;
          if (cleanKey === "misi") infoMap.misi = item.value;
        });

        setInformasi(infoMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const totalRT = wilayahStats.reduce(
    (acc, curr) => acc + (curr.rtCount || 0),
    0
  );
  const totalRW = wilayahStats.length;

  return (
    <>
      <Navbar />
      <header
        className="relative bg-cover bg-center bg-no-repeat h-96"
        style={{ backgroundImage: `url(${aboutImg})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col justify-end items-center h-full pb-10">
          <h1 className="text-3xl md:text-5xl text-white font-bold">
            Tentang Kelurahan
          </h1>
          <h1 className="text-3xl md:text-5xl text-white font-bold">
            Cilandak Timur
          </h1>
        </div>
      </header>

      <section className="flex flex-col items-center mt-10 mb-10">
        <div className="border-b-3 border-hijauFigma text-center px-4">
          <h1 className="font-bold text-2xl md:text-3xl pb-2">Sejarah</h1>
        </div>
        <p className="w-11/12 md:w-3/4 lg:w-2/3 mt-8 text-gray-700 leading-relaxed text-justify">
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
                        {teksBersih.replace(/^\d+\.\s*/, "")}
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
      <Chatbot />
      <section className="mt-10">
        <div className="flex flex-col items-center mb-10">
          <h1 className="font-bold text-3xl pb-1.5 border-b-3 border-hijauFigma text-center px-4">
            GEOGRAFI
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-4/5 mx-auto">
          <div className="relative z-0 h-80 w-3/4 my-auto mx-auto rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <MapCilandakTimur />
          </div>

          <div className="relative z-0 h-96 w-full mx-auto rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <MapCilandakTimurSimple />
          </div>
        </div>

        <div className="mt-10 w-11/12 md:w-3/4 mx-auto mb-10">
          <p className="text-gray-700 text-center leading-relaxed mb-6">
            Kelurahan Cilandak Timur memiliki luas ±353 Ha atau 3.53 km² dengan
            batas-batas wilayah berikut:
          </p>
          <div className="overflow-x-auto rounded-lg shadow-md border border-gray-100">
            <table className="w-full border-collapse">
              <thead className="bg-hijauFigma text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold text-left">Arah</th>
                  <th className="px-4 py-3 font-semibold text-left">
                    Batas Wilayah
                  </th>
                  <th className="px-4 py-3 font-semibold text-left">
                    Kelurahan
                  </th>
                </tr>
              </thead>
              <tbody>
                {batasWilayah.length > 0 ? (
                  batasWilayah.map((item, index) => (
                    <tr
                      key={item.id || index}
                      className="border-b border-gray-200 hover:bg-green-50/50 transition"
                    >
                      <td className="px-4 py-3 font-semibold text-hijauFigma bg-green-50">
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
        </div>
      </section>

      <section className="bg-green-50 py-16">
        <div className="flex flex-col items-center mb-12">
          <h1 className="font-bold text-3xl pb-1.5 border-b-3 border-hijauFigma text-center px-4">
            DEMOGRAFI
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-11/12 mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-hijauFigma h-fit">
            <h2 className="font-bold text-2xl text-center mb-2 text-gray-800">
              Kependudukan
            </h2>
            <p className="text-sm text-gray-500 mb-6 text-center italic">
              *Menurut Data Terbaru
            </p>

            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left font-bold text-sm uppercase tracking-wider">
                      Kategori
                    </th>
                    <th className="px-6 py-3 text-right font-bold text-sm uppercase tracking-wider">
                      Jumlah
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pendudukStats.length > 0 ? (
                    pendudukStats.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-green-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-gray-700">
                          {item.label.replace(/_/g, " ")}
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-hijauFigma">
                          {item.value}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="2"
                        className="text-center py-4 text-gray-500"
                      >
                        Memuat data penduduk...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-hijauFigma">
            <h2 className="font-bold text-2xl text-center mb-2 text-gray-800">
              Wilayah Administrasi
            </h2>
            <p className="text-sm text-gray-500 mb-6 text-center italic">
              *Sebaran RT dan RW
            </p>

            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full table-fixed">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="w-1/4 px-4 py-3 text-left font-bold text-sm uppercase tracking-wider">
                      Wilayah
                    </th>
                    <th className="w-2/4 px-4 py-3 text-left font-bold text-sm uppercase tracking-wider">
                      Daftar RT
                    </th>
                    <th className="w-1/4 px-4 py-3 text-right font-bold text-sm uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {wilayahStats.length > 0 ? (
                    wilayahStats.map((item, index) => (
                      <tr
                        key={index}
                        className="transition-colors hover:bg-gray-50"
                      >
                        <td className="px-4 py-4 text-gray-700 align-top">
                          {item.label.replace(/_/g, " ")}
                        </td>

                        <td className="px-4 py-4 text-gray-600 text-xs leading-relaxed align-top">
                          {item.rtList}
                        </td>

                        <td className="px-4 py-4 text-right align-top text-gray-800 font-semibold">
                          {item.displayTotal}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center py-4 text-gray-500"
                      >
                        Memuat data wilayah...
                      </td>
                    </tr>
                  )}
                </tbody>
                {wilayahStats.length > 0 && (
                  <tfoot className="border-t-2 border-gray-100">
                    <tr className="bg-green-50/80 font-bold">
                      <td
                        colSpan={2}
                        className="px-4 py-4 text-gray-700 align-middle text-center"
                      >
                        Total Jumlah ({totalRW} RW)
                      </td>
                      <td className="px-4 py-4 text-right align-middle text-hijauFigma text-lg">
                        {totalRT} RT
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
