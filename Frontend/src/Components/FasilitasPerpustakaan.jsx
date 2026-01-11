import React from "react";

const FasilitasPerpustakaan = () => {
  const dataPerpustakaan = [
    {
      nama: "Foreword Library",
      alamat:
        "Jl. Jeruk Purut No. 11, RT 06/RW 03, Cilandak Timur, Kec. Pasar Minggu, Jakarta Selatan",
      pengelola: "Swasta / Foreword",
      jenis: "Perpustakaan Umum & Wisata Literasi",
    },
    {
      nama: "Perpustakaan RPTRA KKO",
      alamat:
        "Komplek KKO Marinir, Jl. Raya Cilandak KKO, Cilandak Timur, Jakarta Selatan",
      pengelola: "Pengelola RPTRA / Kelurahan",
      jenis: "Perpustakaan Ruang Publik (RPTRA)",
    },
    {
      nama: "Taman Bacaan Masyarakat (TBM) Cahaya",
      alamat:
        "Jl. Ampera Raya, Kampus IPDN Blok C-21, Cilandak Timur, Jakarta Selatan",
      pengelola: "LM-PSDM Titian Insan Cemerlang",
      jenis: "Taman Bacaan Masyarakat",
    },
    {
      nama: "Perpustakaan SMP Negeri 56 Jakarta",
      alamat:
        "Jl. Jeruk Purut I, Cilandak Timur, Kec. Pasar Minggu, Jakarta Selatan",
      pengelola: "SMP Negeri 56 Jakarta",
      jenis: "Perpustakaan Sekolah",
    },
  ];

  const mainText = "text-[#0a210f]";
  const mainBorder = "border-[#0a210f]";
  const badgeBg = "bg-[#0a210f]/10";
  const badgeText = "text-[#0a210f]";
  const detailBoxBg = "bg-[#0a210f]/5";

  return (
    <section className="py-12 bg-green-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h2
            className={`text-3xl font-bold ${mainText} border-b-4 ${mainBorder} inline-block pb-2`}
          >
            Perpustakaan
          </h2>
          <p className="mt-2 text-green-800">
            Daftar fasilitas literasi dan perpustakaan di wilayah Kelurahan
            Cilandak Timur
          </p>
        </div>

        <div className="space-y-6">
          {dataPerpustakaan.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-[#0a210f]/10 p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-4 mb-3">
                <span
                  className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${badgeBg} ${badgeText} font-bold text-sm`}
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className={`text-xl font-bold ${mainText}`}>
                    {item.nama}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                    {item.alamat}
                  </p>
                </div>
              </div>

              <div
                className={`ml-12 mt-4 ${detailBoxBg} rounded-lg p-4 border border-[#0a210f]/5`}
              >
                <div className="grid grid-cols-1 md:grid-cols-[140px_10px_1fr] gap-y-2 text-sm">
                  <div className="font-medium text-green-800">Pengelola</div>
                  <div className="hidden md:block text-green-700">:</div>
                  <div className={`font-semibold ${mainText}`}>
                    {item.pengelola}
                  </div>

                  <div className="font-medium text-green-800">
                    Jenis Perpustakaan
                  </div>
                  <div className="hidden md:block text-green-700">:</div>
                  <div className={`font-semibold ${mainText}`}>
                    {item.jenis}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FasilitasPerpustakaan;
