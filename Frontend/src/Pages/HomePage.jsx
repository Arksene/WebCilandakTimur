import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import FotoKantor from "../assets/kantorLurah.jpg";
import StrukturOrganisasi from "../assets/Struktur-Organisasi.png";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <header
        className="relative bg-cover bg-center bg-no-repeat h-116"
        style={{ backgroundImage: `url(${FotoKantor})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex flex-col justify-end items-center h-full pb-10">
          <h1 className="text-4xl md:text-5xl text-white font-bold">
            Kelurahan
          </h1>
          <h1 className="text-4xl md:text-5xl  text-white font-bold">
            Cilandak Timur
          </h1>
        </div>
      </header>
      <div className="flex flex-col items-center mt-7">
        <h1 className="text-3xl font-bold"> Struktur Organisasi </h1>
        <h1 className="text-3xl font-bold mb-5">Kelurahan Cilandak Timur</h1>
        <img src={StrukturOrganisasi} className="mb-5 h-140" />
      </div>
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Berita Terkini
            </h2>
            <p className="text-gray-600">
              Informasi dan update terbaru dari Kelurahan Cilandak Timur
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
              <div className="bg-hijauFigma h-40"></div>
              <div className="p-5">
                <p className="text-sm text-hijauFigma font-semibold mb-2">
                  {new Date().toLocaleDateString("id-ID")}
                </p>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Kegiatan Pembersihan Lingkungan
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Kelurahan mengadakan kegiatan pembersihan lingkungan di
                  berbagai titik untuk menjaga kebersihan wilayah.
                </p>
                <a
                  href="#"
                  className="text-hijauFigma font-semibold hover:underline text-sm"
                >
                  Baca Selengkapnya →
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
              <div className="bg-hijauFigma h-40"></div>
              <div className="p-5">
                <p className="text-sm text-hijauFigma font-semibold mb-2">
                  {new Date(Date.now() - 86400000).toLocaleDateString("id-ID")}
                </p>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Layanan Administrasi Penduduk
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Informasi terbaru mengenai layanan administrasi penduduk dan
                  perizinan yang dapat diakses di kantor kelurahan.
                </p>
                <a
                  href="#"
                  className="text-hijauFigma font-semibold hover:underline text-sm"
                >
                  Baca Selengkapnya →
                </a>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
              <div className="bg-hijauFigma h-40"></div>
              <div className="p-5">
                <p className="text-sm text-hijauFigma font-semibold mb-2">
                  {new Date(Date.now() - 172800000).toLocaleDateString("id-ID")}
                </p>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Program Pemberdayaan Masyarakat
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Kelurahan meluncurkan program pemberdayaan masyarakat untuk
                  meningkatkan ekonomi lokal dan keterampilan warga.
                </p>
                <a
                  href="#"
                  className="text-hijauFigma font-semibold hover:underline text-sm"
                >
                  Baca Selengkapnya →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
