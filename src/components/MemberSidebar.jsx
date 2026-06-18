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
  MdNotificationImportant 
} from "react-icons/md";

const TIPS = [
  "Rawat kulit cantikmu dengan koleksi terbaru BLOOM. 💄",
  "Klaim voucher diskon aktif sebelum checkout! 🌸",
  "Ulas produk favoritmu untuk membantu member lain. ✨",
  "Gunakan kode promo spesial untuk gratis ongkir. 🏷️"
];

export default function MemberSidebar() {
  const navigate = useNavigate();
  const [tip, setTip] = useState(TIPS[0]);

  useEffect(() => {
    setTip(TIPS[Math.floor(Math.random() * TIPS.length)]);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar dari Member Lounge? 🚪")) {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/login", { replace: true });
    }
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 text-xs font-medium ${
      isActive
        ? "bg-white/20 text-white shadow-md backdrop-blur-sm border border-white/10"
        : "text-white/80 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="fixed top-0 left-0 z-50 w-[210px] h-screen p-5 text-white bg-gradient-to-b from-[#FF7B7B] to-[#ED346C] flex flex-col justify-between shadow-xl">
      <div className="space-y-6 overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        
        {/* LOGO BRAND */}
        <div>
          <h1 className="text-2xl font-black tracking-wider">BLOOM 🌸</h1>
          <p className="text-[10px] uppercase tracking-widest text-white/70 font-medium mt-0.5">
            Member Lounge
          </p>
        </div>

        {/* LINKS MENU */}
        <div className="space-y-1.5">
          <NavLink to="/member" end className={navClass}>
            <MdDashboard size={18} /> <span>Dashboard</span>
          </NavLink>
          <NavLink to="/member/products" className={navClass}>
            <MdShoppingBag size={18} /> <span>Products</span>
          </NavLink>
          <NavLink to="/member/orders" className={navClass}>
            <MdShoppingCart size={18} /> <span>Orders</span>
          </NavLink>
          <NavLink to="/member/promos" className={navClass}>
            <MdLocalOffer size={18} /> <span>Promos</span>
          </NavLink>
          <NavLink to="/member/reviews" className={navClass}>
            <MdRateReview size={18} /> <span>Reviews</span>
          </NavLink>
          <NavLink to="/member/profile" className={navClass}>
            <MdManageAccounts size={18} /> <span>Profile</span>
          </NavLink>
        </div>
      </div>

      {/* FOOTER & LOGOUT */}
      <div className="pt-4 border-t border-white/10 space-y-4">
        <div className="bg-white/10 rounded-xl p-3 border border-white/10 shadow-sm relative text-left">
          <p className="text-[10px] font-bold tracking-wider text-amber-300 uppercase mb-0.5 flex items-center gap-1">
            <MdNotificationImportant size={12} /> Glow Tips
          </p>
          <p className="text-[11px] text-white/90 leading-snug font-medium">{tip}</p>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/90 hover:bg-rose-700/40 hover:text-white transition-all duration-150 text-xs font-semibold border border-transparent hover:border-white/10"
        >
          <MdLogout size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}