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
  MdShoppingCart
} from "react-icons/md";

export default function MemberNavbar() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem("admin") || "{}");
  const displayName = user?.username || "Bloom Member";
  const displayEmail = user?.email || "member@bloom.store";

  const avatarUrl = useMemo(() => {
    if (user?.avatar_url?.startsWith("http")) return user.avatar_url;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=FCE7F3&color=ED346C&bold=true`;
  }, [displayName, user?.avatar_url]);

  useEffect(() => {
    const updateCounters = () => {
      if (!user?.id) return;

      const orders = JSON.parse(localStorage.getItem(`orders_${user.id}`) || "[]");
      const wishlist = JSON.parse(localStorage.getItem(`wishlist_${user.id}`) || "[]");
      const pendingCount = orders
        .filter((order) => order.status === "Pending")
        .reduce((sum, order) => sum + (Number(order.quantity) || 0), 0);

      setCartCount(pendingCount);
      setWishlistCount(wishlist.length);
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
    const closeOnOutsideClick = (event) => {
      if (!dropdownRef.current?.contains(event.target)) setOpenProfileMenu(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  const navClass = ({ isActive }) =>
    `inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-extrabold transition-all whitespace-nowrap ${
      isActive
        ? "bg-[var(--color-pink-utama)] text-white shadow-sm"
        : "text-slate-500 hover:bg-pink-50 hover:text-[var(--color-pink-utama)]"
    }`;

  const HeaderIcon = ({ label, count, icon: Icon, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-pink-100 bg-white text-slate-600 shadow-sm transition hover:border-[var(--color-pink-utama)] hover:bg-pink-50 hover:text-[var(--color-pink-utama)]"
    >
      <Icon size={18} />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-pink-utama)] px-1 text-[10px] font-black text-white ring-2 ring-white">
          {count}
        </span>
      )}
    </button>
  );

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-pink-100/70 bg-white/95 font-[var(--font-barlow)] shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <button type="button" onClick={() => navigate("/member")} className="flex shrink-0 items-center gap-3 text-left">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-pink-utama)] text-white shadow-sm">
            <MdShoppingBag size={20} />
          </span>
          <span>
            <span className="block font-[var(--font-poppins)] text-xl font-black tracking-wide text-slate-950">
              BLOOM
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-pink-utama)]">
              Member Store
            </span>
          </span>
        </button>

        <nav className="hidden items-center justify-center gap-1 rounded-full border border-pink-100 bg-white p-1 shadow-sm md:flex">
          <NavLink to="/member" end className={navClass}>
            <MdHome size={15} />
            Home
          </NavLink>
          <NavLink to="/member/products" className={navClass}>
            <MdShoppingBag size={15} />
            Shop
          </NavLink>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <HeaderIcon label="Wishlist" count={wishlistCount} icon={MdFavorite} onClick={() => navigate("/member/wishlist")} />
          <HeaderIcon label="My Bag" count={cartCount} icon={MdShoppingCart} onClick={() => navigate("/member/orders")} />

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setOpenProfileMenu((prev) => !prev)}
              className="flex items-center gap-2 rounded-full border border-pink-100 bg-white py-1.5 pl-1.5 pr-3 shadow-sm transition hover:border-[var(--color-pink-utama)] hover:bg-pink-50"
            >
              <img src={avatarUrl} alt={displayName} className="h-9 w-9 rounded-full border border-pink-100 bg-pink-50 object-cover" />
              <span className="hidden text-left sm:block">
                <span className="block max-w-28 truncate text-xs font-extrabold text-slate-800">{displayName}</span>
                <span className="block text-[10px] font-bold text-[var(--color-pink-utama)]">Member</span>
              </span>
              <MdExpandMore size={18} className={`text-slate-400 transition ${openProfileMenu ? "rotate-180" : ""}`} />
            </button>

            {openProfileMenu && (
              <div className="absolute right-0 mt-3 w-72 rounded-3xl border border-pink-100 bg-white p-3 shadow-xl">
                <div className="flex items-start gap-3 rounded-2xl bg-pink-50/70 p-3">
                  <img src={avatarUrl} alt={displayName} className="h-12 w-12 rounded-full border border-pink-100 bg-white object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-extrabold text-slate-900">{displayName}</p>
                    <p className="truncate text-xs font-medium text-slate-500">{displayEmail}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-[var(--color-pink-utama)]">
                      Bloom member
                    </p>
                  </div>
                  <button type="button" onClick={() => setOpenProfileMenu(false)} className="text-slate-400 hover:text-slate-700">
                    <MdClose size={16} />
                  </button>
                </div>

                <div className="mt-2 grid gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenProfileMenu(false);
                      navigate("/member/profile");
                    }}
                    className="flex items-center gap-2 rounded-2xl px-3 py-2.5 text-left text-xs font-bold text-slate-600 hover:bg-pink-50 hover:text-[var(--color-pink-utama)]"
                  >
                    <MdManageAccounts size={16} />
                    Ganti Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenProfileMenu(false);
                      navigate("/member/address");
                    }}
                    className="flex items-center gap-2 rounded-2xl px-3 py-2.5 text-left text-xs font-bold text-slate-600 hover:bg-pink-50 hover:text-[var(--color-pink-utama)]"
                  >
                    <MdLocationOn size={16} />
                    Edit Alamat
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenProfileMenu(false);
                      navigate("/member/reviews");
                    }}
                    className="flex items-center gap-2 rounded-2xl px-3 py-2.5 text-left text-xs font-bold text-slate-600 hover:bg-pink-50 hover:text-[var(--color-pink-utama)]"
                  >
                    <MdRateReview size={16} />
                    Review Saya
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-2xl px-3 py-2.5 text-left text-xs font-bold text-rose-600 hover:bg-rose-50"
                  >
                    <MdLogout size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto border-t border-pink-50 bg-white px-3 py-2 md:hidden">
        <NavLink to="/member" end className={navClass}>Home</NavLink>
        <NavLink to="/member/products" className={navClass}>Shop</NavLink>
      </nav>
    </header>
  );
}