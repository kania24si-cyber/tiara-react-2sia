import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdClose,
  MdExpandMore,
  MdFavorite,
  MdHome,
  MdLocationOn,
  MdLogout,
  MdManageAccounts,
  MdRateReview,
  MdShoppingBag,
  MdShoppingCart,
  MdStars,
} from "react-icons/md";

// [KONSEP] Parent Component & Component dengan Javascript (Logic)
// Komponen utama navigasi member yang menampung sub-elemen dan mengatur menu dropdown profil.
export default function MemberNavbar() {
  const navigate = useNavigate();

  // [KONSEP] useRef
  // Digunakan untuk merujuk langsung ke node DOM fisik (dropdown profil) di browser guna melacak aksi klik di luar menu.
  const dropdownRef = useRef(null);

  // [KONSEP] useState
  // Hook untuk menyimpan state lokal interaktif (jumlah barang di cart, wishlist, dan visibilitas dropdown).
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem("admin") || "{}");
  const displayName = user?.username || "Bloom Member";
  const displayEmail = user?.email || "member@bloom.store";

  const orders = JSON.parse(localStorage.getItem(`orders_${user.id}`) || "[]");
  const reviews = JSON.parse(localStorage.getItem(`reviews_${user.id}`) || "[]");
  const completedOrders = orders.filter((o) => o.status === "Selesai").length;
  const points = reviews.length * 50 + completedOrders * 100;
  const memberLevel =
    points >= 2000 ? "Platinum" :
    points >= 1000 ? "Gold" :
    points >= 500 ? "Silver" : "Bloom";

  const avatarUrl = useMemo(() => {
    if (user?.avatar_url?.startsWith("http")) return user.avatar_url;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=FCE7F3&color=ED346C&bold=true`;
  }, [displayName, user?.avatar_url]);

  useEffect(() => {
    const updateCounters = () => {
      if (!user?.id) return;
      const ords = JSON.parse(localStorage.getItem(`orders_${user.id}`) || "[]");
      const wl = JSON.parse(localStorage.getItem(`wishlist_${user.id}`) || "[]");
      const pendingCount = ords
        .filter((o) => o.status === "Pending")
        .reduce((sum, o) => sum + (Number(o.quantity) || 0), 0);
      setCartCount(pendingCount);
      setWishlistCount(wl.length);
    };
    updateCounters();
    window.addEventListener("storage", updateCounters);
    window.addEventListener("member-data-updated", updateCounters);
    return () => {
      window.removeEventListener("storage", updateCounters);
      window.removeEventListener("member-data-updated", updateCounters);
    };
  }, [user?.id]);

  useEffect(() => {
    const close = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setOpenProfileMenu(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.dispatchEvent(new Event("auth-state-changed"));
    navigate("/login", { replace: true });
  };

  const navClass = ({ isActive }) =>
    `inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-extrabold transition-all whitespace-nowrap ${
      isActive ? "member-nav-active" : "text-slate-500 hover:bg-pink-50 hover:text-pink-utama"
    }`;

  const levelBadgeClass =
    memberLevel === "Platinum" ? "badge-platinum" :
    memberLevel === "Gold" ? "badge-gold" :
    memberLevel === "Silver" ? "badge-silver" :
    "bg-pink-100 text-pink-utama text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full";

  // [KONSEP] Nested Component (Komponen Bersarang)
  // Komponen pembantu kecil yang dideklarasikan langsung di dalam file induknya untuk merender tombol ikon dengan badge counter secara konsisten.
  const HeaderIcon = ({ label, count, icon: Icon, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-pink-100 bg-white text-slate-600 shadow-sm transition hover:border-pink-utama hover:bg-pink-50 hover:text-pink-utama"
    >
      <Icon size={18} />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-utama px-1 text-[10px] font-black text-white ring-2 ring-white">
          {count}
        </span>
      )}
    </button>
  );

  return (
    <header className="fixed left-0 right-0 top-0 z-50 font-barlow">
      {/* Top gradient strip */}
      <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, #FF7B7B, #ED346C, #FF7B7B)" }} />

      {/* Main navbar */}
      <div className="border-b border-pink-100/70 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          {/* Brand */}
          <button type="button" onClick={() => navigate("/member")} className="flex shrink-0 items-center gap-3 text-left">
            <img src="/img/bb.png" alt="BLOOM Logo" className="h-10 w-10 object-contain rounded-full border border-pink-100 shadow-sm" />
            <span>
              <span className="block font-poppins text-xl font-black tracking-wide text-slate-950">BLOOM</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-pink-utama">Member Store</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden items-center justify-center gap-1 rounded-full border border-pink-100 bg-pink-50/50 p-1 shadow-sm md:flex">
            <NavLink to="/member" end className={navClass}>
              Home
            </NavLink>
            <NavLink to="/member/products" className={navClass}>
              Shop
            </NavLink>
          </nav>

          {/* Right Actions */}
          <div className="flex shrink-0 items-center gap-2">
            <HeaderIcon label="Wishlist" count={wishlistCount} icon={MdFavorite} onClick={() => navigate("/member/wishlist")} />
            <HeaderIcon label="My Bag" count={cartCount} icon={MdShoppingCart} onClick={() => navigate("/member/orders")} />

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setOpenProfileMenu((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-pink-100 bg-white py-1.5 pl-1.5 pr-3 shadow-sm transition hover:border-pink-utama hover:bg-pink-50"
              >
                <img src={avatarUrl} alt={displayName} className="h-9 w-9 rounded-full border-2 border-pink-100 bg-pink-50 object-cover" />
                <span className="hidden text-left sm:block">
                  <span className="block max-w-28 truncate text-xs font-extrabold text-slate-800">{displayName}</span>
                  <span className="block text-[10px] font-bold text-pink-utama">{memberLevel} Member</span>
                </span>
                <MdExpandMore size={18} className={`text-slate-400 transition-transform duration-300 ${openProfileMenu ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Panel */}
              {openProfileMenu && (
                <div className="absolute right-0 mt-3 w-72 rounded-3xl border border-pink-100 bg-white p-3 shadow-2xl backdrop-blur-sm">
                  {/* Profile Card */}
                  <div className="flex items-start gap-3 rounded-2xl p-3"
                    style={{ background: "linear-gradient(135deg, #fff5f7, #fce7f3)" }}>
                    <img src={avatarUrl} alt={displayName} className="h-12 w-12 rounded-full border-2 border-white bg-pink-50 object-cover shadow-sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-extrabold text-slate-900">{displayName}</p>
                      <p className="truncate text-xs font-medium text-slate-500">{displayEmail}</p>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <MdStars size={12} className="text-pink-utama" />
                        <span className={levelBadgeClass}>{memberLevel} Member</span>
                        <span className="text-[10px] font-bold text-abu">• {points} pts</span>
                      </div>
                    </div>
                    <button type="button" onClick={() => setOpenProfileMenu(false)} className="text-slate-400 hover:text-slate-700 shrink-0">
                      <MdClose size={16} />
                    </button>
                  </div>

                  {/* Menu Items */}
                  <div className="mt-2 grid gap-0.5">
                    {[
                      { label: "Ganti Profile", path: "/member/profile" },
                      { label: "Edit Alamat", path: "/member/address" },
                      { label: "Review Saya", path: "/member/reviews" },
                    ].map(({ label, path }) => (
                      <button
                        key={path}
                        type="button"
                        onClick={() => { setOpenProfileMenu(false); navigate(path); }}
                        className="flex items-center gap-3 rounded-2xl px-4 py-2.5 text-left text-xs font-bold text-slate-600 hover:bg-pink-50 hover:text-pink-utama transition-colors"
                      >
                        {label}
                      </button>
                    ))}
                    <div className="my-1 border-t border-gray-100" />
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center gap-3 rounded-2xl px-4 py-2.5 text-left text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav Strip */}
      <nav className="flex items-center gap-1 overflow-x-auto border-b border-pink-50 bg-white px-3 py-2 shadow-sm md:hidden">
        <NavLink to="/member" end className={navClass}>Home</NavLink>
        <NavLink to="/member/products" className={navClass}>Shop</NavLink>
      </nav>
    </header>
  );
}