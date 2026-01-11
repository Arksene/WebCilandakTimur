import GambarPuskes1 from "../assets/puskes2.jpg";

const FasilitasKesehatan = () => {
  return (
    // Menerapkan background hijau mint (bg-green-50) pada section
    <section className="py-16 bg-green-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            {/* Judul dengan aksen garis bawah hijau */}
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4 relative inline-block">
              Fasilitas Kesehatan
              <span className="block h-1.5 w-1/3  bg-green-600 rounded-full mt-2 absolute bottom--1 left-0"></span>
            </h2>

            <h3 className="text-2xl font-semibold text-green-800 mt-6 mb-3">
              Puskesmas Kelurahan Cilandak Timur
            </h3>

            <p className="text-green-700 text-lg leading-relaxed mb-6">
              Menjadi garda terdepan pelayanan kesehatan dasar bagi warga. Kami
              berkomitmen menyediakan layanan medis yang profesional, ramah, dan
              terjangkau untuk meningkatkan kualitas kesehatan masyarakat
              Cilandak Timur.
            </p>

            {/* Contoh Info Tambahan (Placeholder agar terlihat seperti website sungguhan) */}
            <div className="space-y-3">
              <div className="flex items-center text-green-800 bg-green-100/60 p-3 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-3 text-green-600"
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
                <div>
                  <span className="font-bold block text-sm">Jam Layanan:</span>
                  <span className="text-sm">
                    Senin - Jumat, 07.30 - 16.00 WIB
                  </span>
                </div>
              </div>
              {/* Anda bisa menambahkan alamat di sini nanti */}
            </div>
          </div>

          {/* --- Kolom Gambar --- */}
          <div className="order-1 md:order-2 relative group">
            {/* Elemen dekoratif kotak hijau di belakang gambar agar lebih dinamis */}
            <div className="absolute top-4 left-4 w-full h-full bg-green-200 rounded-3xl -z-10 transform group-hover:rotate-2 transition-transform duration-300"></div>

            {/* Container Gambar Utama */}
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white h-[350px] md:h-[450px] relative z-10">
              <img
                src={GambarPuskes1} // Menggunakan satu gambar utama
                alt="Gedung Puskesmas Cilandak Timur"
                // object-cover penting agar gambar memenuhi area tanpa gepeng
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay gradien halus di bagian bawah gambar */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FasilitasKesehatan;
