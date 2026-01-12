import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import DashboardInformasiKelurahan from "../Components/DashboardInformasiKelurahan";
import DashboardBerita from "../Components/DashboardBerita";
import DashboardPengaduan from "../Components/DashboardPengaduan";
import DashboardLayanan from "../Components/DashboardLayanan";
import DashboardDokumen from "../Components/DashboardDokumen";

const AdminLayout = () => {
  const [activeMenu, setActiveMenu] = useState("berita");

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
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <main className="flex-1 ml-0 lg:ml-72 pt-20 lg:pt-0 transition-all duration-300 min-w-0">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminLayout;
