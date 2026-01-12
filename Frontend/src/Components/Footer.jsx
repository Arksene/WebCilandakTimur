import { MapPin } from "lucide-react";
export default function Footer() {
  const iconStyle = "w-5 h-5 md:w-6 md:h-6";
  const linkStyle =
    "bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2.5 md:p-3 transition";

  return (
    <footer className="text-center">
      <div className="bg-hijauFigma opacity-99 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:pt-10 md:pb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-12 md:divide-x md:divide-white md:divide-opacity-30">
            <div className="flex flex-col items-center md:items-start text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
                <img
                  src="/Coat_of_arms_of_Jakarta.svg"
                  alt="Jakarta"
                  className="w-16 h-16 md:w-20 md:h-20 mb-4 sm:mb-0 sm:mr-4"
                />
                <div>
                  <p className="text-xl text-center md:text-left md:text-2xl font-semibold leading-tight">
                    Kelurahan
                  </p>
                  <p className="text-2xl md:text-3xl font-bold">
                    Cilandak Timur
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={20} />
                <p className="text-sm md:text-base">
                  Jl. Bhakti No.48, RT.3/RW.7, Cilandak Timur, Ps. Minggu,
                  Jakarta Selatan, 12560
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="text-sm md:text-base font-semibold mb-4 uppercase tracking-wider">
                Ikuti Kami
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://www.facebook.com/share/1P6qogyRGf/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
                    <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.688v-3.621h3.13V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.099 2.796.143v3.24h-1.921c-1.5 0-1.793.715-1.793 1.763v2.309h3.587l-.467 3.621h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.324V1.324C24 .593 23.408 0 22.676 0" />
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/kelurahancilandaktimur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>

                <a
                  href="https://www.tiktok.com/@kelurahancilandaktimur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-gray-200 w-12 h-12 pl-1.5 rounded-full flex items-center justify-center transition-all shadow-md"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
                    <path d="M12.525.02c1.31 0 2.591.214 3.75.606V5.32a5.093 5.093 0 01-3.047-1.03V15.5c0 3.59-2.91 6.5-6.5 6.5s-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5c.348 0 .686.027 1.016.08v4.135a2.433 2.433 0 00-1.016-.215c-1.325 0-2.4 1.075-2.4 2.4s1.075 2.4 2.4 2.4 2.4-1.075 2.4-2.4V0h3.797z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-hijauFigma p-4 border-t border-white border-opacity-10">
        <p className="text-xs text-gray-200 opacity-70">
          © 2026 Kelurahan Cilandak Timur. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
