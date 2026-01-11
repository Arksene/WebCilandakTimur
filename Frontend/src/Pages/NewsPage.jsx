import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Megaphone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import gambarHeader from "../assets/beritaGambar.jpg";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import NewsCard from "../Components/NewsCard";

export default function NewsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [weekNews, setWeekNews] = useState([]);
  const [newsItems, setNewsItems] = useState([]);
  const [openAccordion, setOpenAccordion] = useState(0);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const scrollRef = useRef(null);
  const newsSectionRef = useRef(null);
  const BASE_URL = import.meta.env.VITE_API_URL;

  const formatTanggal = (isoString) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 350;
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/berita`);
        const allData = res.data.data || [];

        const dataPengumuman = allData.filter(
          (item) => item.kategori === "PENGUMUMAN"
        );

        const dataBerita = allData.filter(
          (item) => item.kategori !== "PENGUMUMAN"
        );

        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);

        const beritaMingguIni = dataBerita.filter((item) => {
          const tanggalBerita = new Date(item.tanggal);
          return tanggalBerita >= sevenDaysAgo;
        });

        setAnnouncements(dataPengumuman);
        setNewsItems(dataBerita);

        if (beritaMingguIni.length > 0) {
          setWeekNews(beritaMingguIni);
        } else {
          setWeekNews(dataBerita.slice(0, 5));
        }
      } catch (error) {
        console.error("Error Fetching Data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (newsSectionRef.current) {
      newsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white pb-20 font-sans">
        <div
          className="relative h-80 w-full bg-cover bg-center flex items-end pb-10 justify-center"
          style={{ backgroundImage: `url(${gambarHeader})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 text-white text-center">
            <h1 className="text-3xl font-bold tracking-wider">BERITA</h1>
            <h2 className="text-4xl font-extrabold uppercase mt-1">
              CILANDAK TIMUR
            </h2>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 mt-12">
          <div className="mb-16 max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8 border-b pb-4 border-gray-200">
              <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                <Megaphone size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Papan Pengumuman
              </h2>
            </div>

            {loading && (
              <p className="text-center text-gray-400">Memuat data...</p>
            )}

            <div className="space-y-4">
              {announcements.map((item, index) => (
                <div
                  key={item.id}
                  className={`group bg-white rounded overflow-hidden border transition-all duration-300 ${
                    openAccordion === index
                      ? "border-green-600 shadow-lg ring-1 ring-green-100"
                      : "border-gray-200 hover:border-green-400 shadow-sm"
                  }`}
                >
                  <button
                    onClick={() =>
                      setOpenAccordion(openAccordion === index ? -1 : index)
                    }
                    className="w-full flex items-start justify-between px-4 py-4 md:px-6 md:py-5 text-left gap-3"
                  >
                    <div className="flex items-start gap-3 md:gap-4 flex-1">
                      <span
                        className={`shrink-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full text-sm md:text-md font-bold transition-colors ${
                          openAccordion === index
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {index + 1}
                      </span>

                      <span
                        className={`font-semibold text-sm md:text-lg break-words pt-1.5 ${
                          openAccordion === index
                            ? "text-green-800"
                            : "text-gray-700"
                        }`}
                      >
                        {item.judul}
                      </span>
                    </div>

                    <div
                      className={`shrink-0 ml-2 pt-1 transition-transform duration-300 ${
                        openAccordion === index ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown size={20} className="text-gray-400" />
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      openAccordion === index
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-4 pb-6 md:px-6 md:pl-[4.5rem] pt-0">
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed border-l-2 border-gray-100 pl-4 whitespace-pre-line">
                        {item.isi}
                      </p>
                      <p className="text-xs text-gray-400 mt-3 pl-4">
                        {formatTanggal(item.tanggal)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20 relative">
            <div className="flex items-center justify-between mb-8 px-2">
              <div className="relative">
                <h2 className="text-3xl font-bold text-gray-800 z-10 relative">
                  Info Terkini
                </h2>
                <div className="absolute -bottom-2 left-0 w-1/2 h-3 bg-green-200/60 -z-0 rounded-full"></div>
              </div>
              <div className="hidden md:flex gap-2">
                <button
                  onClick={() => scroll("left")}
                  className="p-2 rounded-full border border-gray-300 hover:bg-green-600 hover:text-white transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="p-2 rounded-full border border-gray-300 hover:bg-green-600 hover:text-white transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            <div className="relative group">
              <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-6 pb-8 px-2 scrollbar-hide scroll-smooth snap-x snap-mandatory"
                style={{ scrollbarWidth: "none" }}
              >
                {weekNews.map((item) => (
                  <div
                    key={item.id}
                    className="min-w-[300px] w-[300px] flex-shrink-0 snap-center"
                  >
                    <Link to={`/berita/${item.id}`} className="block h-full">
                      <div className="h-full rounded-2xl shadow-md border border-gray-100 overflow-hidden bg-white hover:-translate-y-2 transition-transform duration-300">
                        <NewsCard
                          id={item.id}
                          title={item.judul}
                          image={item.gambar}
                          date={formatTanggal(item.tanggal)}
                          author={item.Penulis || "Admin"}
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div ref={newsSectionRef} className="mb-12">
            <div className="flex justify-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 border-b-4 border-gray-800 pb-1 inline-block">
                Berita Cilandak Timur
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              {currentItems.map((item) => (
                <Link
                  to={`/berita/${item.id}`}
                  key={item.id}
                  className="block h-full"
                >
                  <div className="h-full hover:shadow-lg transition-shadow duration-300 rounded-xl">
                    <NewsCard
                      id={item.id}
                      title={item.judul}
                      image={item.gambar}
                      date={formatTanggal(item.tanggal)}
                      author={item.Penulis || "Admin"}
                    />
                  </div>
                </Link>
              ))}
            </div>

            {newsItems.length > itemsPerPage && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft size={20} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
                        currentPage === number
                          ? "bg-green-600 text-white shadow-md transform scale-105"
                          : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {number}
                    </button>
                  )
                )}

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
