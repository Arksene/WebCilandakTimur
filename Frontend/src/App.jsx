import React from "react";
// 1. Import komponen dari react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import halaman-halaman Anda
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import NewsPage from "./Pages/NewsPage";
import LayananFasilitasPage from "./Pages/ServiceAndFacilitiesPage";
import LaporPage from "./Pages/ReportPage";

export default function App() {
  return (
    // 2. Bungkus aplikasi dengan BrowserRouter
    <BrowserRouter>
      {/* 3. Routes bertindak sebagai "switch" untuk memilih halaman */}
      <Routes>
        {/* 4. Tentukan path (URL) dan element (Komponen) yang dituju */}

        {/* Halaman Utama (biasanya path "/") */}
        <Route path="/" element={<HomePage />} />

        {/* Halaman Tentang */}
        <Route path="/about" element={<AboutPage />} />

        {/* Halaman Berita */}
        <Route path="/news" element={<NewsPage />} />

        {/* Halaman Layanan */}
        <Route path="/services" element={<LayananFasilitasPage />} />

        {/* Halaman Lapor */}
        <Route path="/report" element={<LaporPage />} />

        {/* Opsional: Halaman 404 jika rute tidak ditemukan */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
