import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import gambarHeader from "../assets/beritaGambar.jpg";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import NewsCard from "../Components/NewsCard"; // 👈 Import komponen baru disini

export default function NewsPage() {
  // State untuk Accordion Pengumuman
  const [openAccordion, setOpenAccordion] = useState(0);

  // Dummy Data Pengumuman
  const announcements = [
    {
      id: 0,
      title: "Pemberian vitamin E balita bulan Desember",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    },
    {
      id: 1,
      title: "Pemberian vitamin E pada balita di Posyandu",
      content: "Jadwal dan lokasi posyandu...",
    },
    // ... data lainnya
  ];

  // Dummy Data Berita
  const newsItems = [
    {
      id: 1,
      title: "Monitoring Pembangunan Turap di RT 004/04 dan RT 005/04",
      image: "https://placehold.co/400x300/1a4d2e/white?text=Foto+Kegiatan",
      date: "21/11/2024",
      author: "Kelurahan Cilandak Timur",
    },
    {
      id: 2,
      title: "Festival Pasar Minggu",
      image: "https://placehold.co/400x300/1a4d2e/white?text=Foto+Kegiatan",
      date: "21/11/2024",
      author: "Kelurahan Cilandak Timur",
    },
    // ... data lainnya
  ];

  return (
    <>
      <Navbar />
      <div className="bg-white pb-20 font-sans">
        {/* HEADER */}
        <div
          className="relative h-80 w-full bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${gambarHeader})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 text-center text-white">
            <h1 className="text-3xl font-bold tracking-wider">BERITA</h1>
            <h2 className="text-4xl font-extrabold uppercase mt-1">
              CILANDAK TIMUR
            </h2>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 mt-12">
          {/* SECTION 2: PENGUMUMAN (ACCORDION) */}
          <div className="mb-16">
            <div className="flex justify-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 border-b-4 border-gray-800 pb-1 inline-block">
                Pengumuman
              </h2>
            </div>
            <div className="space-y-3">
              {announcements.map((item, index) => (
                <div key={item.id} className="overflow-hidden">
                  <button
                    onClick={() =>
                      setOpenAccordion(openAccordion === index ? -1 : index)
                    }
                    className="w-full flex items-center justify-between px-6 py-4 bg-[#1a2e1a] text-white text-left font-medium rounded-md hover:bg-[#264226] transition-colors"
                  >
                    {item.title}
                    {openAccordion === index ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                  <div
                    className={`bg-[#9CA3AF] transition-all duration-300 ease-in-out ${
                      openAccordion === index
                        ? "max-h-96 opacity-100 p-6"
                        : "max-h-0 opacity-0 p-0"
                    }`}
                  >
                    <p className="text-sm text-gray-800 text-justify leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: INFO TERKINI (HORIZONTAL SCROLL) */}
          <div className="mb-16">
            <div className="flex justify-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 border-b-4 border-gray-800 pb-1 inline-block">
                Info Terkini
              </h2>
            </div>
            <div className="flex overflow-x-auto pb-6 gap-6 scrollbar-hide">
              {newsItems.map((item) => (
                <div
                  key={item.id}
                  className="min-w-[280px] w-[280px] flex-shrink-0"
                >
                  {/* Panggil Component NewsCard Disini */}
                  <NewsCard
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    date={item.date}
                    author={item.author}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 4: BERITA GRID */}
          <div className="mb-12">
            <div className="flex justify-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 border-b-4 border-gray-800 pb-1 inline-block">
                Berita Cilandak Timur
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[...newsItems, ...newsItems].slice(0, 6).map((item, idx) => (
                <div key={idx} className="h-full">
                  {/* Panggil Component NewsCard Disini */}
                  <NewsCard
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    date={item.date}
                    author={item.author}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* PAGINATION (Tetap sama) */}
          <div className="flex justify-center items-center gap-2 mt-12 mb-20">
            {/* ... Kode Pagination kamu tetap ... */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
