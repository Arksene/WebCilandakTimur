import React from "react";
import {
  Home,
  FileText,
  Info,
  Briefcase,
  MessageSquare,
  LogOut,
} from "lucide-react";

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const menus = [
    { name: "Berita & Artikel", icon: FileText, key: "berita" },
    { name: "Dokumen Publik", icon: Home, key: "dokumen" },
    { name: "Profil Kelurahan", icon: Info, key: "info" },
    { name: "Layanan Publik", icon: Briefcase, key: "layanan" },
    { name: "Pengaduan Warga", icon: MessageSquare, key: "pengaduan" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed flex flex-col">
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Admin Kelurahan
      </div>

      <ul className="mt-4 flex-1 overflow-y-auto">
        {menus.map((menu) => (
          <li
            key={menu.key}
            className={`p-4 cursor-pointer flex items-center gap-3 hover:bg-gray-700 transition-colors ${
              activeMenu === menu.key ? "bg-blue-600" : ""
            }`}
            onClick={() => setActiveMenu(menu.key)}
          >
            <menu.icon size={20} />
            {menu.name}
          </li>
        ))}
      </ul>

      <div className="p-4 border-t border-gray-800">
        <button
          className="w-full flex items-center gap-3 p-2 text-red-300 hover:bg-red-900/30 hover:text-red-200 rounded transition-colors"
          onClick={() => alert("Logout Clicked")}
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
