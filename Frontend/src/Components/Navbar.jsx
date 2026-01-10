import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // 1. Import Link dan useLocation
import jakartaLogo from "../assets/jakarta.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Untuk mendeteksi halaman aktif (opsional styling)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Fungsi untuk menutup menu saat link diklik (khusus mobile)
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Helper function untuk styling link aktif
  const getLinkClass = (path) => {
    const baseClass =
      "text-white hover:text-gray-300 transition block py-2 md:py-0";
    const activeClass = "font-bold underline underline-offset-4"; // Style jika sedang di halaman tersebut
    return location.pathname === path
      ? `${baseClass} ${activeClass}`
      : baseClass;
  };

  return (
    <nav className="absolute bg-hijauNavbar/80 backdrop-blur-md p-4 top-0 z-50 w-full shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* === LOGO SECTION === */}
        <Link
          to="/"
          className="flex items-center space-x-3"
          onClick={closeMenu}
        >
          <img
            src={jakartaLogo}
            alt="Jakarta Logo"
            className="w-10 h-10 md:w-12 md:h-12"
          />
          <div className="hidden sm:block">
            <p className="text-white text-sm md:text-lg font-bold leading-tight">
              Kelurahan
            </p>
            <p className="text-white text-base md:text-xl font-bold leading-tight">
              Cilandak Timur
            </p>
          </div>
        </Link>

        {/* === BURGER BUTTON (MOBILE) === */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none p-2 rounded-md hover:bg-white/10 transition"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              // Icon X (Close)
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // Icon Hamburger (Open)
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* === NAVIGATION LINKS === */}
        <ul
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:static left-0 right-0 top-full bg-hijauFigma md:bg-transparent w-full md:w-auto p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-8 shadow-lg md:shadow-none items-center md:items-start`}
        >
          <li>
            <Link to="/" className={getLinkClass("/")} onClick={closeMenu}>
              Beranda
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={getLinkClass("/about")}
              onClick={closeMenu}
            >
              Tentang Kami
            </Link>
          </li>
          <li>
            <Link
              to="/news"
              className={getLinkClass("/news")}
              onClick={closeMenu}
            >
              Berita
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={getLinkClass("/services")}
              onClick={closeMenu}
            >
              Layanan & Fasilitas
            </Link>
          </li>
          <li>
            <Link
              to="/report"
              className={getLinkClass("/report")}
              onClick={closeMenu}
            >
              Pengaduan
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
