import GambarTransmart from "../assets/Transmart-Cilandak-mall.jpg";
import GambarSuperindo from "../assets/superindo.webp";

const PasarSwalayan = () => {
  const dataPasar = [
    {
      id: 1,
      nama: "Transmart Cilandak",
      jenis: "Pusat Perbelanjaan & Hiburan",
      deskripsi:
        "Pusat perbelanjaan modern lengkap yang menyediakan swalayan (groceries), area bermain (Trans Studio Mini), dan berbagai restoran keluarga dalam satu kawasan.",
      jam: "10.00 - 22.00 WIB",
      image: GambarTransmart,
      lokasi: "Jl. Raya Cilandak KKO",
    },
    {
      id: 2,
      nama: "Super Indo Cilandak",
      jenis: "Supermarket",
      deskripsi:
        "Supermarket pilihan warga untuk belanja bulanan dengan area parkir luas, produk segar berkualitas, dan promo rutin yang hemat untuk kebutuhan rumah tangga.",
      jam: "08.00 - 22.00 WIB",
      image: GambarSuperindo,
      lokasi: "Jl. Cilandak KKO",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4 relative inline-block">
            Pasar & Swalayan
            <span className="block h-1.5 w-full bg-green-600 rounded-full mt-2 absolute -bottom-3 "></span>
          </h2>
          <p className="text-green-700 max-w-2xl mx-auto mt-4 text-lg">
            Pusat perniagaan dan perbelanjaan yang dikelola di kawasan Cilandak
            Timur untuk memenuhi kebutuhan pokok warga.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dataPasar.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-green-100 group flex flex-col h-full"
            >
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-green-900/10 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                <img
                  src={item.image}
                  alt={item.nama}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-20 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {item.jenis}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  {item.nama}
                </h3>

                <div className="flex items-center text-green-600 mb-3 text-sm font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {item.lokasi}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                  {item.deskripsi}
                </p>

                <div className="pt-4 border-t border-green-50 flex items-center text-green-700 bg-green-50/50 -mx-6 -mb-6 px-6 py-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm font-semibold">{item.jam}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PasarSwalayan;
