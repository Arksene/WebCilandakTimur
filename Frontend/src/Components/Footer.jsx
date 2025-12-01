import jakartaLogo from "../Assets/jakarta.png";

export default function Footer() {
  return (
    <footer className="text-center p-4 bg-CilandakGreen pt-20">
      <div className="flex ml-20">
        <img
          src={jakartaLogo}
          alt="Jakarta Logo"
          className="inline-block w-20 h-23 mr-2"
        />
        <div className="flex flex-col my-auto items-start font-[poppins]">
          <p className="text-white text-3xl font-bold"> Kelurahan </p>
          <p className="text-4xl text-white font-bold"> Cilandak Timur </p>
        </div>
      </div>
      <div className="mt-10 ml-20 flex text-white items-center justify-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="size-9"
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
        <p className="ml-4 text-start">
          Jl. Bhakti No.48 3, RT.3/RW.7, Cilandak Tim., Ps. Minggu, <br />
          Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12560
        </p>
      </div>
    </footer>
  );
}
