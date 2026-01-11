import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import jakartaLogo from "../assets/jakarta.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const NavLink = ({ to, title }) => {
    const isActive = location.pathname === to;

    return (
      <Link
        to={to}
        onClick={closeMenu}
        className="relative group text-white hover:text-green-200 transition-colors py-2 md:py-0 block"
      >
        {title}
        <span
          className={`absolute left-0 bottom-0 w-full h-0.5 bg-white transform origin-center transition-transform duration-300 ease-out 
          ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
        />
      </Link>
    );
  };

  const burgerLine =
    "h-0.5 w-6 my-1 rounded-full bg-white transition ease transform duration-300";

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-hijauNavbar/90 backdrop-blur-md shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link
            to="/"
            className="flex items-center gap-3 group"
            onClick={closeMenu}
          >
            <motion.img
              whileHover={{ rotate: 10, scale: 1.1 }}
              src={jakartaLogo}
              alt="Jakarta Logo"
              className="w-10 h-10 md:w-12 md:h-12 drop-shadow-md"
            />
            <div className="hidden sm:block">
              <p className="text-white text-sm md:text-base font-bold leading-tight tracking-wide">
                KELURAHAN
              </p>
              <p className="text-white text-base md:text-lg font-extrabold leading-tight tracking-wider">
                CILANDAK TIMUR
              </p>
            </div>
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
            <NavLink to="/" title="Beranda" />
            <NavLink to="/about" title="Tentang Kami" />
            <NavLink to="/news" title="Berita" />
            <NavLink to="/services" title="Layanan" />
            <NavLink to="/report" title="Pengaduan" />
          </div>

          <button
            className="flex flex-col h-12 w-12 border-2 border-transparent rounded justify-center items-center group md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <div
              className={`${burgerLine} ${
                isOpen ? "rotate-45 translate-y-2.5 opacity-100" : "opacity-100"
              }`}
            />
            <div
              className={`${burgerLine} ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <div
              className={`${burgerLine} ${
                isOpen
                  ? "-rotate-45 -translate-y-2.5 opacity-100"
                  : "opacity-100"
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-hijauFigma border-t border-white/10 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {[
                { path: "/", label: "Beranda" },
                { path: "/about", label: "Tentang Kami" },
                { path: "/news", label: "Berita" },
                { path: "/services", label: "Layanan & Fasilitas" },
                { path: "/report", label: "Pengaduan" },
              ].map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={closeMenu}
                    className={`block px-3 py-3 rounded-md text-base font-medium transition-all duration-200 
                      ${
                        location.pathname === item.path
                          ? "bg-white/20 text-white font-bold pl-6 border-l-4 border-white"
                          : "text-gray-100 hover:bg-white/10 hover:pl-5"
                      }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
