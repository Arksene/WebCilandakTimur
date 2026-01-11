import { FileText, Building2, Globe, Users, DownloadIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import FasilitasPendidikan from "../Components/FasilitasPendidikan";
import FasilitasRumahIbadah from "../Components/FasilitasRumahIbadah";
import FasilitasPerpustakaan from "../Components/FasilitasPerpustakaan";
import FasilitasPuskesmas from "../Components/FasilitasPuskesmas";
import PasarSwalayan from "../Components/FasilitasBelanja";
import headerLayanan from "../assets/headerlayanan.jpg";

const LayananFasilitasPage = () => {
  const navigate = useNavigate();
  const themeColor = "bg-[#0B2F20]";

  const handleNavigation = (kategori) => {
    if (kategori === "DOKUMEN_PUBLIK") {
      navigate(`/layanan/dokumen_publik`);
    } else {
      navigate(`/layanan/${kategori}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full bg-white font-sans">
        <div className="relative w-full h-[400px] bg-gray-800 overflow-hidden">
          <img
            src={headerLayanan}
            alt="Taman Cilandak Timur"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-end justify-center bg-black/30">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-10 uppercase tracking-wide drop-shadow-md">
              Layanan & Fasilitas
              <br />
              Cilandak Timur
            </h1>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12 space-y-20">
          <section>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 inline-block border-b-2 border-gray-300 pb-2 mb-4">
                Layanan Cilandak Timur
              </h2>
              <p className="text-gray-600 text-sm md:text-base max-w-4xl mx-auto leading-relaxed text-center">
                Pilih jenis layanan di bawah ini untuk melihat persyaratan dan
                detail lengkap.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div
                onClick={() => handleNavigation("DUKCAPIL")}
                className={`${themeColor} rounded-xl p-8 flex flex-col items-center justify-center text-white shadow-lg hover:bg-opacity-90 transition cursor-pointer h-48 transform hover:-translate-y-1`}
              >
                <div className="mb-4">
                  <FileText size={48} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-lg tracking-wider">
                  PELAYANAN DUKCAPIL
                </h3>
              </div>

              <div
                onClick={() => handleNavigation("PERIZINAN")}
                className={`${themeColor} rounded-xl p-8 flex flex-col items-center justify-center text-white shadow-lg hover:bg-opacity-90 transition cursor-pointer h-48 transform hover:-translate-y-1`}
              >
                <div className="mb-4">
                  <Building2 size={48} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-lg tracking-wider">
                  PELAYANAN PTSP
                </h3>
              </div>

              <div
                onClick={() => handleNavigation("DOKUMEN_PUBLIK")}
                className={`${themeColor} rounded-xl p-8 flex flex-col items-center justify-center text-white shadow-lg hover:bg-opacity-90 transition cursor-pointer h-48 transform hover:-translate-y-1`}
              >
                <div className="mb-4 text-5xl font-bold border-b-2 border-white pb-1">
                  <DownloadIcon size={48} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-lg tracking-wider">
                  UNDUH DOKUMEN PUBLIK
                </h3>
              </div>

              <div
                onClick={() => handleNavigation("KELURAHAN")}
                className={`${themeColor} rounded-xl p-8 flex flex-col items-center justify-center text-white shadow-lg hover:bg-opacity-90 transition cursor-pointer h-48 transform hover:-translate-y-1`}
              >
                <div className="mb-4">
                  <Users size={48} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-lg tracking-wider">
                  PELAYANAN ADMINISTRASI UMUM
                </h3>
              </div>
            </div>
          </section>

          <section>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 inline-block border-b-2 border-gray-300 pb-2">
                Fasilitas Cilandak Timur
              </h2>
            </div>
            <FasilitasPendidikan />
            <FasilitasPuskesmas />
            <FasilitasRumahIbadah />
            <FasilitasPerpustakaan />
            <PasarSwalayan />
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LayananFasilitasPage;
