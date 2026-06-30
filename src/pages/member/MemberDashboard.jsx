import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdArrowForward,
  MdFavorite,
  MdLocalOffer,
  MdShoppingBag,
  MdStar,
  MdStars,
  MdTrendingUp,
} from "react-icons/md";

import LoadingSpinner from "../../components/LoadingSpinner";
import { productsAPI } from "../../services/productsAPI";
import { promosAPI } from "../../services/promosAPI";

const notifyMemberDataChanged = () => window.dispatchEvent(new Event("member-data-updated"));

function StatCard({ icon, value, label, color = "text-pink-utama" }) {
  return (
    <div className="stat-card text-left">
      <div className="icon-gradient-soft mb-3">{icon}</div>
      <p className={`font-poppins text-2xl font-black ${color}`}>{value}</p>
      <p className="font-barlow text-[10px] font-bold uppercase tracking-wider text-abu mt-0.5">{label}</p>
    </div>
  );
}

export default function MemberDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("admin") || "{}");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [activePromos, setActivePromos] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);

  const firstName = useMemo(() => (user.username || "Member").split(" ")[0], [user.username]);
  const completedOrders = orders.filter((o) => o.status === "Selesai").length;
  const points = reviews.length * 50 + completedOrders * 100;

  const { level, levelColor, nextLevel, progress, nextTarget } = useMemo(() => {
    if (points >= 2000) return { level: "Platinum Member", levelColor: "badge-platinum", nextLevel: null, progress: 100, nextTarget: 2000 };
    if (points >= 1000) return { level: "Gold Member", levelColor: "badge-gold", nextLevel: "Platinum", progress: ((points - 1000) / 1000) * 100, nextTarget: 2000 };
    if (points >= 500) return { level: "Silver Member", levelColor: "badge-silver", nextLevel: "Gold", progress: ((points - 500) / 500) * 100, nextTarget: 1000 };
    return { level: "Bloom Member", levelColor: "", nextLevel: "Silver", progress: (points / 500) * 100, nextTarget: 500 };
  }, [points]);

  const featuredProducts = products.slice(0, 8);
  const heroProducts = featuredProducts.slice(0, 4);
  const currentHero = heroProducts[heroIndex] || products[0];
  const wishlistIds = useMemo(() => wishlist.map((item) => String(item.id)), [wishlist]);

  const loadMemberHome = async (showSpinner = false) => {
    try {
      if (showSpinner) setLoading(true);
      const localOrders = JSON.parse(localStorage.getItem(`orders_${user.id}`) || "[]");
      const localWishlist = JSON.parse(localStorage.getItem(`wishlist_${user.id}`) || "[]");
      const localReviews = JSON.parse(localStorage.getItem(`reviews_${user.id}`) || "[]");
      setOrders(localOrders);
      setWishlist(localWishlist);
      setReviews(localReviews);
      const prodData = await productsAPI.fetchProducts();
      setProducts(prodData || []);
      const promoData = await promosAPI.fetchPromos();
      setActivePromos((promoData || []).filter((p) => p.is_active));
    } catch (err) {
      console.error("Gagal memuat data dashboard member:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMemberHome(true);
    const handleUpdate = () => loadMemberHome(false);
    window.addEventListener("member-data-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("member-data-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [user.id]);

  useEffect(() => {
    if (heroProducts.length <= 1) return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroProducts.length]);

  const toggleWishlist = (product) => {
    let updated;
    if (wishlistIds.includes(String(product.id))) {
      updated = wishlist.filter((item) => String(item.id) !== String(product.id));
    } else {
      updated = [...wishlist, product];
    }
    localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(updated));
    setWishlist(updated);
    notifyMemberDataChanged();
  };

  if (loading) {
    return (
      <div className="py-20">
        <LoadingSpinner text="Menyiapkan toko member..." />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-14 font-barlow">

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden rounded-[36px] hero-member-bg border border-pink-100/60 p-8 lg:p-12"
        style={{ boxShadow: "0 8px 40px -8px rgba(237,52,108,0.12)" }}>
        {/* Decorative orbs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full animate-pulse-slow pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,123,123,0.2) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full animate-pulse-slow pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(237,52,108,0.15) 0%, transparent 70%)", animationDelay: "3s" }} />

        <div className="grid min-h-[480px] items-center gap-10 lg:grid-cols-2 relative z-10">
          {/* Left Content */}
          <div className="space-y-5 text-left">
            {/* Level Badge */}
            <div className={levelColor || "section-pill"}>
              {!levelColor ? (
                <span className="section-pill"><MdStars size={12} /> {level}</span>
              ) : (
                <span className={levelColor}><MdStars size={10} className="inline mr-1" />{level}</span>
              )}
            </div>

            <h1 className="font-poppins text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Hai, <span className="text-gradient-animated">{firstName}!</span> 🌸
              <br />
              <span className="text-slate-800">Beauty Store Milikmu.</span>
            </h1>

            <p className="max-w-md text-sm font-semibold leading-relaxed text-slate-500">
              Akses produk kosmetik pilihan eksklusif, kumpulkan reward poin belanja, dan gunakan promo voucher khusus member resmi Bloom.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate("/member/products")}
                className="btn-pink-premium inline-flex items-center gap-2 !rounded-full !px-6 !py-3 text-xs font-black uppercase tracking-wider cursor-pointer"
              >
                Mulai Belanja <MdArrowForward size={14} />
              </button>
              <button
                type="button"
                onClick={() => navigate("/member/promos")}
                className="btn-outline inline-flex items-center gap-2 !rounded-full !px-6 !py-3 text-xs font-black uppercase tracking-wider cursor-pointer"
              >
                <MdLocalOffer size={14} className="text-pink-utama" /> Lihat Voucher
              </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 border-t border-pink-100 pt-5 mt-2">
              <div>
                <p className="font-poppins text-2xl font-black text-pink-utama">{points}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Poin Loyalitas</p>
              </div>
              <div>
                <p className="font-poppins text-2xl font-black text-slate-950">{orders.length}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Transaksi</p>
              </div>
              <div>
                <p className="font-poppins text-2xl font-black text-slate-950">{wishlist.length}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Item Wishlist</p>
              </div>
            </div>

            {/* Membership Progress Bar */}
            {nextLevel && (
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-abu">
                    Progress ke <span className="text-pink-utama">{nextLevel}</span>
                  </p>
                  <p className="text-[10px] font-bold text-abu">{points} / {nextTarget} pts</p>
                </div>
                <div className="progress-bar-track">
                  <div
                    className="progress-bar-fill animate-progress"
                    style={{ width: `${Math.min(progress, 100)}%`, "--progress-width": `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right: Product Showcase */}
          <div className="relative flex justify-center lg:justify-end animate-float">
            <div className="absolute -inset-4 rounded-[40px] blur-2xl animate-pulse-slow pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(237,52,108,0.12) 0%, rgba(255,123,123,0.08) 50%, transparent 70%)" }} />
            {currentHero ? (
              <div className="relative w-full max-w-sm card-premium p-4">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50">
                  <img
                    src={currentHero.image || "https://placehold.co/400?text=BLOOM"}
                    alt={currentHero.nama_produk}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() => toggleWishlist(currentHero)}
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-md backdrop-blur-sm transition hover:scale-110"
                  >
                    <MdFavorite size={18} className={wishlistIds.includes(String(currentHero.id)) ? "text-pink-utama" : "text-slate-300"} />
                  </button>
                </div>
                <div className="mt-4 text-left">
                  <span className="text-[10px] font-black uppercase tracking-widest text-pink-utama">{currentHero.brand}</span>
                  <h3 className="mt-0.5 line-clamp-1 font-poppins text-base font-bold text-slate-950">{currentHero.nama_produk}</h3>
                  <div className="mt-3 flex items-center justify-between border-t border-pink-50 pt-3">
                    <p className="font-poppins text-base font-black text-pink-utama">
                      Rp {Number(currentHero.price).toLocaleString("id-ID")}
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate(`/member/products/${currentHero.id}`)}
                      className="rounded-full bg-slate-950 px-4 py-2 text-[10px] font-extrabold uppercase tracking-wider text-white transition hover:bg-pink-utama"
                    >
                      Detail →
                    </button>
                  </div>
                </div>
                {/* Dot indicators */}
                {heroProducts.length > 1 && (
                  <div className="flex justify-center gap-1.5 mt-4">
                    {heroProducts.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setHeroIndex(idx)}
                        className={`rounded-full transition-all duration-300 ${
                          idx === heroIndex ? "w-5 h-1.5 bg-pink-utama" : "w-1.5 h-1.5 bg-pink-200"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="relative flex h-80 w-full max-w-sm items-center justify-center rounded-[32px] border border-dashed border-pink-200 bg-white text-xs font-semibold text-slate-400">
                Katalog produk kosong
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard icon={<MdStars size={20} />} value={points} label="Poin Loyalitas" color="text-pink-utama" />
        <StatCard icon={<MdShoppingBag size={20} />} value={orders.length} label="Total Order" color="text-slate-900" />
        <StatCard icon={<MdFavorite size={20} />} value={wishlist.length} label="Wishlist" color="text-slate-900" />
        <StatCard icon={<MdStar size={20} />} value={reviews.length} label="Review Ditulis" color="text-slate-900" />
      </div>

      {/* ===== PRODUCTS & REVIEWS ===== */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Product Grid */}
        <div className="lg:col-span-2 card-premium p-6 text-left">
          <div className="flex items-center justify-between border-b border-pink-50 pb-4 mb-6">
            <div>
              <p className="section-pill !px-3 !py-1 !text-[9px] mb-2">Exclusively curated</p>
              <h2 className="font-poppins text-xl font-black text-slate-950">Rekomendasi Terlaris</h2>
            </div>
            <button
              type="button"
              onClick={() => navigate("/member/products")}
              className="inline-flex items-center gap-1 text-xs font-extrabold text-pink-utama hover:underline"
            >
              Lihat Semua <MdArrowForward size={14} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {featuredProducts.slice(0, 6).map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/member/products/${product.id}`)}
                className="group cursor-pointer card-beauty p-3 hover:scale-[1.03]"
              >
                <div className="aspect-square w-full overflow-hidden rounded-xl bg-pink-50">
                  <img
                    src={product.image || "https://placehold.co/300?text=BLOOM"}
                    alt={product.nama_produk}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-2 line-clamp-1 text-xs font-extrabold text-slate-900">{product.nama_produk}</h3>
                <p className="mt-0.5 font-poppins text-xs font-black text-pink-utama">
                  Rp {Number(product.price).toLocaleString("id-ID")}
                </p>
              </div>
            ))}
            {featuredProducts.length === 0 && (
              <p className="col-span-3 py-10 text-center text-xs font-bold text-slate-400">Tidak ada produk rekomendasi.</p>
            )}
          </div>
        </div>

        {/* Reviews Panel */}
        <div className="card-premium p-6 text-left">
          <div className="flex items-center justify-between border-b border-pink-50 pb-4 mb-6">
            <div>
              <p className="section-pill !px-3 !py-1 !text-[9px] mb-2">Loved by you</p>
              <h2 className="font-poppins text-xl font-black text-slate-950">Review Terbaru</h2>
            </div>
            <button
              type="button"
              onClick={() => navigate("/member/reviews")}
              className="inline-flex items-center gap-1 text-xs font-extrabold text-pink-utama hover:underline"
            >
              Semua <MdArrowForward size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {reviews.length === 0 && (
              <p className="text-center py-10 text-xs font-bold text-slate-400">Belum memberikan review produk.</p>
            )}
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 p-4 border border-pink-100/60 relative overflow-hidden">
                <div className="absolute top-2 right-3 font-poppins text-4xl font-black text-pink-100 leading-none select-none">"</div>
                <div className="flex gap-0.5 text-amber-400 relative z-10">
                  {[...Array(Number(review.rating) || 0)].map((_, i) => (
                    <MdStar key={i} size={13} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-1.5 block text-[11px] font-extrabold text-slate-800 line-clamp-1 relative z-10">{review.product_name}</p>
                <p className="mt-1.5 text-xs font-semibold italic leading-relaxed text-slate-600 line-clamp-2 relative z-10">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== PROMO BANNER ===== */}
      <section className="relative overflow-hidden rounded-[32px] p-8 text-left"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1030 40%, #1a0a14 100%)" }}>
        {/* Shimmer decorative */}
        <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full pointer-events-none animate-pulse-slow"
          style={{ background: "radial-gradient(circle, rgba(237,52,108,0.3) 0%, transparent 70%)" }} />
        <div className="absolute top-0 left-1/3 w-40 h-40 rounded-full pointer-events-none animate-pulse-slow"
          style={{ background: "radial-gradient(circle, rgba(255,123,123,0.15) 0%, transparent 70%)", animationDelay: "2s" }} />

        {/* Shimmer sweep */}
        <div className="absolute inset-0 overflow-hidden rounded-[32px] pointer-events-none">
          <div className="absolute -top-full left-0 w-1/3 h-full rotate-12 animate-shimmer opacity-10"
            style={{ background: "linear-gradient(transparent, rgba(255,255,255,0.4), transparent)" }} />
        </div>

        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="rounded-full text-[9px] font-black uppercase tracking-widest text-white px-3 py-1 mb-3 inline-block"
              style={{ background: "linear-gradient(135deg, #FF7B7B, #ED346C)" }}>
              Voucher Member
            </span>
            <h2 className="font-poppins text-2xl font-black text-white mt-2">
              Gunakan Voucher Promo <br className="hidden sm:block" />Sebelum Checkout!
            </h2>
            <p className="mt-2 text-xs font-medium text-slate-400 max-w-md leading-relaxed">
              Salin kode promo di menu voucher, lalu masukkan pada form pemesanan untuk mendapatkan potongan harga belanja kosmetik secara instan.
            </p>
            {activePromos.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {activePromos.slice(0, 3).map((promo) => (
                  <span key={promo.id} className="font-poppins text-[10px] font-extrabold uppercase tracking-widest bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full">
                    {promo.kode} — {promo.discount_pct || promo.diskonPct || 0}% OFF
                  </span>
                ))}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => navigate("/member/promos")}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-black uppercase tracking-wider text-slate-900 shadow-md transition hover:bg-pink-50"
          >
            <MdTrendingUp size={14} className="text-pink-utama" />
            Buka Katalog Voucher
          </button>
        </div>
      </section>

    </div>
  );
}