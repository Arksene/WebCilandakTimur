import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import NewsPage from "./Pages/NewsPage";
import DetailBeritaPage from "./Pages/DetailBeritaPage";
import LayananFasilitasPage from "./Pages/ServiceAndFacilitiesPage";
import LaporPage from "./Pages/ReportPage";
import LayananDetailPage from "./Pages/LayananDetailPage";
import DokumenPublikPage from "./Pages/DokumenPublikPage";
import AdminLayout from "./Pages/AdminDashboardPage";
import LoginPage from "./Pages/LoginPage";
import axios from "axios";
import PrivateRoute from "./Components/PrivateRoutes";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");

      if (window.location.pathname !== "/login") {
        alert("Sesi Anda telah berakhir. Silakan login kembali.");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<DetailBeritaPage />} />
        <Route path="/services" element={<LayananFasilitasPage />} />
        <Route path="/layanan/:kategori" element={<LayananDetailPage />} />
        <Route path="/layanan/dokumen_publik" element={<DokumenPublikPage />} />
        <Route path="/report" element={<LaporPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminLayout />} />
        </Route>
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
