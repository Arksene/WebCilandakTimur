import React, { useState, useEffect } from "react";

const FasilitasPendidikan = () => {
  const [dataSekolah, setDataSekolah] = useState([]);
  const [loading, setLoading] = useState(true);

  const keyMap = {
    paud: "PAUD",
    pkbm: "PKBM",
    sd: "SD",
    smp: "SMP",
    sma: "SMA",
    smk: "SMK",
  };
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/informasi-kelurahan`);
        const result = await response.json();

        const filteredData = Object.keys(keyMap).map((key) => {
          const foundItem = result.data.find((item) => item.key === key);
          return {
            label: keyMap[key],
            jumlah: foundItem ? foundItem.value : "0",
          };
        });

        setDataSekolah(filteredData);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Memuat data...</div>;
  }

  const mainColorClass = "bg-[#0a210f]";
  const borderColorClass = "border-[#0a210f]";

  return (
    <section className="py-8">
      <div className="text-center mb-8">
        <h2
          className={`text-2xl md:text-3xl font-bold text-gray-900 inline-block border-b-4 ${borderColorClass} pb-2`}
        >
          Fasilitas Pendidikan
        </h2>
        <p className="mt-2 text-gray-600">
          Rekapitulasi jumlah sekolah di wilayah Kelurahan Cilandak Timur
        </p>
      </div>

      <div className="max-w-2xl mx-auto overflow-hidden rounded-lg shadow-lg">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className={`${mainColorClass} text-white text-left`}>
              <th className="py-4 px-6 font-semibold text-lg border-b border-gray-600 w-1/2">
                Jenjang Pendidikan
              </th>
              <th className="py-4 px-6 font-semibold text-lg border-b border-gray-600 w-1/2">
                Jumlah Sekolah
              </th>
            </tr>
          </thead>
          <tbody>
            {dataSekolah.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-[#0a210f]/5" : "bg-white"
                } hover:bg-[#0a210f]/10 transition-colors duration-200`}
              >
                <td className="py-3 px-6 border-b border-gray-200 text-gray-800 font-medium">
                  {item.label}
                </td>
                <td className="py-3 px-6 border-b border-gray-200 text-gray-800 font-bold">
                  {item.jumlah}
                </td>
              </tr>
            ))}

            <tr className="bg-[#0a210f]/20 font-bold">
              <td className="py-3 px-6 text-gray-900">Total</td>
              <td className="py-3 px-6 text-gray-900">
                {dataSekolah.reduce(
                  (acc, curr) => acc + parseInt(curr.jumlah || 0),
                  0
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default FasilitasPendidikan;
