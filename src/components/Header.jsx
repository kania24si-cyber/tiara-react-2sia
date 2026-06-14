import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { SlSettings } from "react-icons/sl";
import { FiLogOut, FiUser } from "react-icons/fi";

export default function Header() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("admin");
    if (data) {
      setAdmin(JSON.parse(data));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 transition-all">
      
      {/* KIRI - KOTAK SAPAAN */}
      <div className="flex flex-col">
        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider font-sans">
          Hai, {admin?.username || "Guest"} 👋
        </p>
        <h2 className="text-base font-black text-gray-800 tracking-tight font-poppins">
          Selamat Datang Kembali!
        </h2>
      </div>

      {/* KANAN - NAVIGASI & PROFIL */}
      <div className="flex items-center gap-4">

        {/* TOMBOL PENGATURAN (Pink Gradient Sesuai Tema Utama) */}
        <button className="p-2.5 bg-gradient-to-r from-[#FF7B7B] to-[#ED346C] text-white hover:opacity-90 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md shadow-pink-500/20 group">
          <SlSettings size={15} className="group-hover:rotate-45 transition-transform duration-300" />
        </button>

        {/* GARIS PEMBATAS */}
        <div className="h-6 w-px bg-gray-200 mx-1"></div>

        {/* TOMBOL MENU PROFIL */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2.5 p-1.5 pr-3 hover:bg-gray-50 rounded-2xl border border-transparent hover:border-gray-100 transition-all active:scale-95"
          >
            <div className="relative">
              <img
                src={admin?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                alt="profile"
                className="w-9 h-9 rounded-xl object-cover border-2 border-[#FF7B7B] shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
            </div>

            <div className="hidden md:flex flex-col text-left">
              <span className="font-bold text-xs text-gray-800 leading-tight font-sans">
                {admin?.username || "Administrator"}
              </span>
              <span className="text-[10px] text-gray-400 font-medium capitalize mt-0.5 font-sans">
                {admin?.role || "Super Admin"}
              </span>
            </div>
          </button>

          {/* DROPDOWN MENU */}
          {showMenu && (
            <>
              {/* Overlay penutup */}
              <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)}></div>
              
              <div className="absolute right-0 top-14 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 p-1.5 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                <div className="px-3.5 py-3 border-b border-gray-50">
                  <p className="font-bold text-xs text-gray-800 truncate font-sans">{admin?.username || "Admin"}</p>
                  <p className="text-[10px] text-gray-400 truncate mt-0.5 font-sans">{admin?.email || "admin@bloom.com"}</p>
                </div>

                <div className="py-1">
                  <button className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-gray-600 hover:text-[#ED346C] hover:bg-pink-50/50 rounded-xl transition-all font-sans">
                    <FiUser size={14} className="text-gray-400" /> Profil Saya
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-[#E90D0D] hover:bg-red-50 rounded-xl transition-all mt-0.5 font-sans"
                  >
                    <FiLogOut size={14} /> Keluar Aplikasi
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </header>
  );
}