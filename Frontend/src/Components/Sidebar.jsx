import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  FileText,
  Info,
  Briefcase,
  MessageSquare,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menus = [
    { name: "Berita & Artikel", icon: FileText, key: "berita" },
    { name: "Dokumen Publik", icon: Home, key: "dokumen" },
    { name: "Profil Kelurahan", icon: Info, key: "info" },
    { name: "Layanan Publik", icon: Briefcase, key: "layanan" },
    { name: "Pengaduan Warga", icon: MessageSquare, key: "pengaduan" },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-6 text-xl font-black tracking-tighter border-b border-slate-800 flex items-center justify-between">
        <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Admin Panel
        </span>
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden text-slate-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <ul className="mt-6 flex-1 px-3 space-y-1.5 overflow-y-auto">
        {menus.map((menu) => (
          <li
            key={menu.key}
            className={`p-3.5 rounded-2xl cursor-pointer flex items-center gap-3 transition-all font-bold text-sm ${
              activeMenu === menu.key
                ? "bg-blue-600 text-white shadow-xl shadow-blue-900/40"
                : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
            }`}
            onClick={() => {
              setActiveMenu(menu.key);
              setIsOpen(false);
            }}
          >
            <menu.icon
              size={20}
              className={
                activeMenu === menu.key ? "text-white" : "text-slate-500"
              }
            />
            {menu.name}
          </li>
        ))}
      </ul>

      <div className="p-4 border-t border-slate-800/50">
        <button
          className="w-full flex items-center gap-3 p-3.5 text-rose-400 hover:bg-rose-500/10 rounded-2xl transition-all font-bold text-sm group"
          onClick={() => alert("Logout Clicked")}
        >
          <LogOut
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Keluar
        </button>
      </div>
    </>
  );

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-5 z-40 backdrop-blur-md bg-opacity-90">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 text-white bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
          >
            <Menu size={20} />
          </button>
          <span className="text-white font-black tracking-tight text-sm uppercase">
            Admin Kelurahan
          </span>
        </div>
      </div>

      <aside className="hidden lg:flex w-72 h-screen bg-slate-900 text-white fixed flex-col border-r border-slate-800 shadow-2xl z-50">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[60] lg:hidden"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 w-80 h-screen bg-slate-900 text-white z-[70] flex flex-col shadow-2xl lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
