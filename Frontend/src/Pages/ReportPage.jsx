import React from "react";
import { Upload } from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const LaporPage = () => {
  const reports = [1, 2, 3, 4, 5];

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen font-sans pb-20">
        <div
          className="relative h-72 w-full bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage:
              'url("https://placehold.co/1200x400/2f3e46/white?text=Foto+Polsek+Cilandak")',
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="text-center mt-6">
          <h1 className="text-3xl font-bold uppercase">Lapor!</h1>
          <h2 className="text-3xl font-bold uppercase mt-1">
            Pengaduan Online
          </h2>
        </div>
        <div className="max-w-3xl mx-auto px-4 mt-10 relative z-20">
          <div className="bg-[#0c2415] rounded-lg shadow-2xl overflow-hidden mb-16">
            <div className="bg-[#8B0000] py-4 text-center">
              <h3 className="text-white text-xl font-bold">
                Sampaikan Laporan Anda!
              </h3>
            </div>

            <div className="p-8 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nama Pelapor *"
                  className="w-full p-3 rounded bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-700"
                />
                <span className="absolute right-3 top-3 text-red-600 font-bold">
                  *
                </span>
              </div>

              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Pelapor *"
                  className="w-full p-3 rounded bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-700"
                />
                <span className="absolute right-3 top-3 text-red-600 font-bold">
                  *
                </span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Ketik Judul Laporan Anda! *"
                  className="w-full p-3 rounded bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-700"
                />
                <span className="absolute right-3 top-3 text-red-600 font-bold">
                  *
                </span>
              </div>

              <div className="relative">
                <textarea
                  rows={6}
                  placeholder="Ketik Isi Laporan Anda! *"
                  className="w-full p-3 rounded bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-700 resize-none"
                ></textarea>
                <span className="absolute right-3 top-3 text-red-600 font-bold">
                  *
                </span>
              </div>

              <label
                className="border-2 border-dashed border-gray-500 rounded p-6
  flex flex-col items-center justify-center
  text-gray-400 hover:border-white hover:text-white
  transition cursor-pointer bg-white/5"
              >
                <span className="text-sm mb-1">Upload Lampiran (Max 2 MB)</span>
                <Upload size={20} />

                <input type="file" className="hidden" accept="image/*,.pdf" />
              </label>

              {/* Submit Button */}
              <div className="flex justify-end pt-2">
                <button className="bg-[#8B0000] hover:bg-[#a50000] text-white font-bold py-2 px-8 rounded shadow-lg transition-colors">
                  Lapor!
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {reports.map((item, index) => (
              <div key={index} className="bg-[#9CA3AF] p-1 rounded shadow-md">
                <div className="border border-gray-400 p-4">
                  {/* Badge Judul */}
                  <div className="mb-3">
                    <span className="bg-[#0c2415] text-white text-xs font-bold px-4 py-1.5 rounded-sm uppercase tracking-wide">
                      Judul Laporan
                    </span>
                  </div>

                  <p className="text-gray-800 text-sm leading-relaxed text-justify">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LaporPage;
