// layouts/AdminLayout.jsx
import { useState } from "react";
import Sidebar from "../Components/Sidebar"; // Sesuaikan path Sidebar kamu

// Import halaman-halaman dashboard yang sudah dibuat sebelumnya
import DashboardInformasiKelurahan from "../Components/DashboardInformasiKelurahan";
import DashboardBerita from "../Components/DashboardBerita";
import DashboardPengaduan from "../Components/DashboardPengaduan";
import DashboardLayanan from "../Components/DashboardLayanan";
import DashboardDokumen from "../Components/DashboardDokumen";
// import DashboardDokumen from '../pages/DashboardDokumen'; // Jika sudah ada

const AdminLayout = () => {
  // State untuk menyimpan menu apa yang sedang aktif
  // Default kita set ke 'info' (Profil Kelurahan)
  const [activeMenu, setActiveMenu] = useState("info");

  // Fungsi untuk menentukan komponen mana yang dirender
  const renderContent = () => {
    switch (activeMenu) {
      case "berita":
        return <DashboardBerita />;

      case "layanan":
        return <DashboardLayanan />;

      case "pengaduan":
        return <DashboardPengaduan />;

      case "dokumen":
        return <DashboardDokumen />;

      case "info":
        return <DashboardInformasiKelurahan defaultTab="profil" />;
      case "wilayah":
        return <DashboardInformasiKelurahan defaultTab="wilayah" />;
      case "statistik":
        return <DashboardInformasiKelurahan defaultTab="statistik" />;

      default:
        return <DashboardInformasiKelurahan defaultTab="profil" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Posisi Fixed di Kiri */}
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {/* Konten Utama - Di sebelah kanan Sidebar */}
      {/* ml-64 digunakan karena sidebar lebarnya w-64 dan fixed */}
      <main className="ml-64 w-full transition-all duration-300">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminLayout;
