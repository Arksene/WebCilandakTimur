import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function DetailBeritaPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/berita/${id}`);
        setNews(res.data.data || res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetail();
    }
  }, [id, BASE_URL]);

  const formatTanggal = (isoString) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Berita tidak ditemukan
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen pb-20 pt-24 font-sans">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-green-600 mb-6 transition-colors font-medium"
          >
            <ArrowLeft size={20} className="mr-2" />
            Kembali ke Berita
          </button>

          <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="w-full h-64 md:h-96 relative bg-gray-200">
              {news.gambar ? (
                <img
                  src={news.gambar}
                  alt={news.judul}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}
            </div>

            <div className="p-6 md:p-10">
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4 border-b border-gray-100 pb-4">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-green-600" />
                  {formatTanggal(news.tanggal)}
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-2 text-green-600" />
                  {news.Penulis || "Admin Kelurahan"}
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2 text-green-600" />
                  {new Date(news.tanggal).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  WIB
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                {news.judul}
              </h1>

              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-justify whitespace-pre-line">
                {news.isi}
              </div>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
}
