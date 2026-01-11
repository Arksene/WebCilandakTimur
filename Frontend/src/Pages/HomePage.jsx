import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import FotoKantor from "../assets/kantorLurah.jpg";
import StrukturOrganisasi from "../assets/Struktur-Organisasi.png";
import { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "../Components/NewsCard";
import PrestasiKerja from "../Components/PrestasiKerja";

const formatTanggal = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
export default function HomePage() {
  const [berita, setBerita] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resBerita = await axios.get(
          `${BASE_URL}/api/berita/latest?limit=3`
        );
        const berita = resBerita.data.data;
        setBerita(berita);
        console.log(berita);
      } catch (error) {
        console.error("Gagal fetch berita:", error);
      }
    };

    fetchData();
  }, []);

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
        <h1 className="text-xl md:text-3xl font-bold"> Struktur Organisasi </h1>
        <h1 className="text-xl md:text-3xl font-bold mb-5">
          Kelurahan Cilandak Timur
        </h1>
        <img
          src={StrukturOrganisasi}
          className="mb-5 w-full h-auto md:h-140 object-contain"
          alt="Struktur Organisasi"
        />{" "}
      </div>
      <section className="py-12 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
              Berita Terkini
            </h2>
            <p className="text-md md:text-3xl text-gray-600">
              Informasi dan update terbaru dari Kelurahan Cilandak Timur
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {berita.map((berita, idx) => (
              <div key={idx} className="h-full">
                <NewsCard
                  id={berita.id}
                  title={berita.judul}
                  image={berita.gambar}
                  date={formatTanggal(berita.tanggal)}
                  author={berita.Penulis}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <PrestasiKerja />
      <Footer />
    </div>
  );
}
