import React from "react";
import { FileText, Building2, Globe, Users } from "lucide-react"; // Pastikan install lucide-react atau ganti dengan icon library pilihan Anda
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const LayananFasilitasPage = () => {
  const themeColor = "bg-[#0B2F20]";

  return (
    <>
      <Navbar />
      <div className="w-full bg-white font-sans">
        <div className="relative w-full h-[400px] bg-gray-800 overflow-hidden">
          <img
            src="/api/placeholder/1200/400"
            alt="Taman Cilandak Timur"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center uppercase tracking-wide drop-shadow-md">
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
              <p className="text-gray-600 text-sm md:text-base max-w-4xl mx-auto leading-relaxed text-justify md:text-center">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div
                className={`${themeColor} rounded-xl p-8 flex flex-col items-center justify-center text-white shadow-lg hover:bg-opacity-90 transition cursor-pointer h-48`}
              >
                <div className="mb-4">
                  <FileText size={48} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-lg tracking-wider">
                  PELAYANAN DUKCAPIL
                </h3>
              </div>

              <div
                className={`${themeColor} rounded-xl p-8 flex flex-col items-center justify-center text-white shadow-lg hover:bg-opacity-90 transition cursor-pointer h-48`}
              >
                <div className="mb-4">
                  <Building2 size={48} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-lg tracking-wider">
                  PELAYANAN PTSP
                </h3>
              </div>

              <div
                className={`${themeColor} rounded-xl p-8 flex flex-col items-center justify-center text-white shadow-lg hover:bg-opacity-90 transition cursor-pointer h-48`}
              >
                <div className="mb-4 text-5xl font-bold border-b-2 border-white pb-1">
                  JE
                </div>
                <h3 className="font-bold text-lg tracking-wider">
                  AKSES LAYANAN JAK EVO
                </h3>
              </div>

              <div
                className={`${themeColor} rounded-xl p-8 flex flex-col items-center justify-center text-white shadow-lg hover:bg-opacity-90 transition cursor-pointer h-48`}
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

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-400">
                <thead>
                  <tr className={`${themeColor} text-white`}>
                    <th className="py-3 px-4 border border-gray-600 w-16 text-center">
                      No.
                    </th>
                    <th className="py-3 px-4 border border-gray-600 text-center">
                      Fasilitas
                    </th>
                    <th className="py-3 px-4 border border-gray-600 text-center">
                      Alamat
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(6)].map((_, index) => (
                    <tr key={index} className="h-16">
                      <td className="bg-[#8F9B94] border border-gray-600"></td>
                      <td className="bg-[#8F9B94] border border-gray-600"></td>
                      <td className="bg-[#8F9B94] border border-gray-600"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="pb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 inline-block border-b-2 border-gray-300 pb-2">
                Galeri
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(12)].map((_, index) => (
                <div
                  key={index}
                  className={`${themeColor} w-full aspect-[4/3] rounded-sm`}
                ></div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LayananFasilitasPage;
