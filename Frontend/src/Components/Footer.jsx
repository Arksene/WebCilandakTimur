import jakartaLogo from "../assets/jakarta.png";

export default function Footer() {
  return (
    <footer className="text-center">
      <div className=" bg-hijauFigma opacity-99 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:pt-10 md:pb-2">
          {/* 2 Column Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-12 md:divide-x md:divide-white md:divide-opacity-30">
            {/* Left Column: Logo + Title + Location */}
            <div className="flex flex-col items-center md:items-start">
              {/* Logo + Title */}
              <div className="flex flex-col sm:flex-row sm:items-start mb-6">
                <img
                  src={jakartaLogo}
                  alt="Jakarta Logo"
                  className="w-16 h-16 md:w-20 md:h-20 mx-auto sm:mx-0 mb-4 sm:mb-0 sm:mr-4"
                />
                <div className="flex flex-col items-center sm:items-start justify-center sm:justify-start">
                  <p className="text-xl md:text-2xl font-semibold">Kelurahan</p>
                  <p className="text-2xl md:text-3xl font-bold">
                    Cilandak Timur
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 md:gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-6 h-6 md:w-7 md:h-7 flex-shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <p className="text-sm md:text-base text-center sm:text-left">
                  Jl. Bhakti No.48 3, RT.3/RW.7, Cilandak Tim., Ps. Minggu,{" "}
                  <br />
                  Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12560
                </p>
              </div>
            </div>

            {/* Right Column: Social Media */}
            <div className="flex flex-col items-center justify-start">
              <p className="text-sm md:text-base font-semibold mb-4">
                Ikuti Kami
              </p>
              <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2.5 md:p-3 transition"
                  title="Facebook"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.688v-3.621h3.13V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.099 2.796.143v3.24h-1.921c-1.5 0-1.793.715-1.793 1.763v2.309h3.587l-.467 3.621h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.324V1.324C24 .593 23.408 0 22.676 0" />
                  </svg>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2.5 md:p-3 transition"
                  title="Instagram"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 4c2.21 0 2.47.01 3.346.048.813.037 1.255.166 1.549.276.389.152.667.333.958.623.29.29.471.569.623.958.11.294.24.736.276 1.549.038.876.048 1.135.048 3.346 0 2.21-.01 2.47-.048 3.346-.037.813-.166 1.255-.276 1.549-.152.389-.333.667-.623.958-.29.29-.569.471-.958.623-.294.11-.736.24-1.549.276-.876.038-1.135.048-3.346.048-2.21 0-2.47-.01-3.346-.048-.813-.037-1.255-.166-1.549-.276-.389-.152-.667-.333-.958-.623-.29-.29-.471-.569-.623-.958-.11-.294-.24-.736-.276-1.549-.038-.876-.048-1.135-.048-3.346 0-2.21.01-2.47.048-3.346.037-.813.166-1.255.276-1.549.152-.389.333-.667.623-.958.29-.29.569-.471.958-.623.294-.11.736-.24 1.549-.276.876-.038 1.135-.048 3.346-.048m0-1.04C8.744 2.96 8.455 2.97 7.564 3.008c-.898.04-1.512.166-2.049.354-.555.215-1.025.504-1.49.969-.466.465-.754.936-.969 1.49-.188.537-.314 1.151-.354 2.049C2.97 8.455 2.96 8.744 2.96 12c0 3.256.01 3.545.048 4.436.04.898.166 1.512.354 2.049.215.555.504 1.025.969 1.49.465.466.936.754 1.49.969.537.188 1.151.314 2.049.354.891.038 1.18.048 4.436.048 3.256 0 3.545-.01 4.436-.048.898-.04 1.512-.166 2.049-.354.555-.215 1.025-.504 1.49-.969.466-.465.754-.936.969-1.49.188-.537.314-1.151.354-2.049.038-.891.048-1.18.048-4.436 0-3.256-.01-3.545-.048-4.436-.04-.898-.166-1.512-.354-2.049-.215-.555-.504-1.025-.969-1.49-.465-.466-.936-.754-1.49-.969-.537-.188-1.151-.314-2.049-.354-.891-.038-1.18-.048-4.436-.048" />
                  </svg>
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2.5 md:p-3 transition"
                  title="Twitter"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>

                <a
                  href="https://wa.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2.5 md:p-3 transition"
                  title="WhatsApp"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.946 1.34c-2.95 1.706-4.898 5.202-4.898 8.866 0 1.529.307 3.01.903 4.418L3.467 20.92c-.396 1.065.267 2.249 1.443 2.45h.005c.965.173 1.858-.603 2.254-1.668l.687-1.853c1.07.541 2.277.835 3.554.835 4.934 0 8.945-4.011 8.945-8.945 0-2.408-.943-4.67-2.662-6.389-1.719-1.718-4-2.671-6.388-2.671z" />
                  </svg>
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2.5 md:p-3 transition"
                  title="YouTube"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-hijauFigma p-4">
        <p className="text-xs md:text-sm text-gray-200">
          &copy; 2024 Kelurahan Cilandak Timur. All rights reserved.
        </p>
        <p className="text-xs md:text-sm text-gray-200 mt-2">
          Dinas Administrasi Umum Pemerintah Provinsi DKI Jakarta
        </p>
      </div>
    </footer>
  );
}
