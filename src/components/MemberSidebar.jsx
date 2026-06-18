// src/components/MemberNavbar.jsx
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  MdDashboard, 
  MdShoppingBag, 
  MdShoppingCart, 
  MdLocalOffer, 
  MdRateReview, 
  MdManageAccounts, 
  MdLogout,
  MdAdminPanelSettings
} from "react-icons/md";

export default function MemberNavbar() {
  const navigate = useNavigate();
  
  // Mengambil data user untuk pengecekan hak akses admin
  const user = JSON.parse(localStorage.getItem("admin") || "{}");
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar dari Member Lounge?")) {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/login", { replace: true });
    }
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-300 text-xs font-medium whitespace-nowrap ${
      isActive
        ? "bg-white/20 text-white shadow-sm backdrop-blur-sm border border-white/10"
        : "text-white/80 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-16 px-6 text-white bg-gradient-to-r from-[#FF7B7B] to-[#ED346C] flex items-center justify-between shadow-md">
      
      {/* SISI KIRI: BRANDING */}
      <div className="flex items-center gap-2 shrink-0">
        <div>
          <h1 className="text-xl font-black tracking-wider leading-none">BLOOM</h1>
          <p className="text-[9px] uppercase tracking-widest text-white/70 font-medium mt-0.5">
            Member Lounge
          </p>
        </div>
      </div>

      {/* SISI TENGAH: NAVIGATION LINKS (Scrollable horizontal jika layar menyempit) */}
      <div className="flex items-center gap-1 mx-4 overflow-x-auto max-w-full" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        
        <NavLink to="/member" end className={navClass}>
          <MdDashboard size={16} /> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/member/products" className={navClass}>
          <MdShoppingBag size={16} /> <span>Products</span>
        </NavLink>
        <NavLink to="/member/orders" className={navClass}>
          <MdShoppingCart size={16} /> <span>Orders</span>
        </NavLink>
        <NavLink to="/member/promos" className={navClass}>
          <MdLocalOffer size={16} /> <span>Promos</span>
        </NavLink>
        <NavLink to="/member/reviews" className={navClass}>
          <MdRateReview size={16} /> <span>Reviews</span>
        </NavLink>
        <NavLink to="/member/profile" className={navClass}>
          <MdManageAccounts size={16} /> <span>Profile</span>
        </NavLink>
      </div>

      {/* SISI KANAN: ACTIONS & LOGOUT */}
      <div className="flex items-center gap-2 shrink-0">
        {/* TOMBOL KHUSUS ADMIN */}
        {isAdmin && (
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/30 text-amber-200 border border-amber-400/30 hover:bg-amber-500/50 hover:text-white transition-all duration-200 text-xs font-bold"
          >
            <MdAdminPanelSettings size={16} />
            <span className="hidden sm:inline">Back to Admin</span>
          </button>
        )}

        <button 
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white/90 hover:bg-rose-700/40 hover:text-white transition-all duration-150 text-xs font-semibold border border-transparent hover:border-white/10"
        >
          <MdLogout size={16} />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>

    </div>
  );
}