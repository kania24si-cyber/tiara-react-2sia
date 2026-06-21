import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdArrowForward,
  MdCheck,
  MdFavorite,
  MdLocalOffer,
  MdShoppingBag,
  MdStar,
  MdStars
} from "react-icons/md";

import LoadingSpinner from "../../components/LoadingSpinner";
import { productsAPI } from "../../services/productsAPI";
import { promosAPI } from "../../services/promosAPI";

const notifyMemberDataChanged = () => window.dispatchEvent(new Event("member-data-updated"));

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
  const completedOrders = orders.filter((order) => order.status === "Selesai").length;
  const points = reviews.length * 50 + completedOrders * 100;
  const memberLevel = points >= 2000 ? "Platinum Member" : points >= 1000 ? "Gold Member" : points >= 500 ? "Silver Member" : "Bloom Member";
  const featuredProducts = products.slice(0, 8);
  const heroProducts = featuredProducts.length > 0 ? featuredProducts.slice(0, 4) : [];
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
    <div className="space-y-16 pb-14 font-[var(--font-barlow)]">
      <section className="grid min-h-[560px] items-center gap-10 rounded-[40px] border border-pink-100 bg-gradient-to-br from-pink-50 via-white to-rose-50 p-8 shadow-sm lg:grid-cols-2 lg:p-14">
        <div className="space-y-6 text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-pink-500/10 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-[var(--color-pink-utama)] border border-pink-200/50">
            <MdStars size={14} /> {memberLevel}
          </div>
          <h1 className="font-[var(--font-poppins)] text-4xl font-black leading-none tracking-tight text-slate-950 sm:text-5xl">
            Hai, <span className="text-[var(--color-pink-utama)]">{firstName}!</span> <br />
            Beauty Store Milik Anda.
          </h1>
          <p className="max-w-md text-sm font-semibold leading-relaxed text-slate-500">
            Akses produk kosmetik pilihan eksklusif, kumpulkan reward poin belanja, dan gunakan promo voucher khusus member resmi Bloom.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/member/products")}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-pink-utama)] px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:bg-rose-700"
            >
              Mulai Belanja <MdArrowForward size={14} />
            </button>
            <button
              type="button"
              onClick={() => navigate("/member/promos")}
              className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-6 py-3 text-xs font-black uppercase tracking-wider text-slate-700 shadow-sm transition hover:bg-pink-50"
            >
              <MdLocalOffer size={14} className="text-[var(--color-pink-utama)]" /> Lihat Voucher
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-pink-100 pt-6">
            <div>
              <p className="font-[var(--font-poppins)] text-2xl font-black text-slate-950">{points}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Poin Loyalitas</p>
            </div>
            <div>
              <p className="font-[var(--font-poppins)] text-2xl font-black text-slate-950">{orders.length}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Transaksi</p>
            </div>
            <div>
              <p className="font-[var(--font-poppins)] text-2xl font-black text-slate-950">{wishlist.length}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Item Wishlist</p>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-pink-200/30 to-rose-200/20 blur-2xl" />
          {currentHero ? (
            <div className="relative w-full max-w-sm overflow-hidden rounded-[32px] border border-pink-100 bg-white p-4 shadow-xl transition-all duration-500">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-pink-50">
                <img
                  src={currentHero.image || "https://placehold.co/400?text=BLOOM"}
                  alt={currentHero.nama_produk}
                  className="h-full w-full object-cover transition-transform duration-700"
                />
                <button
                  type="button"
                  onClick={() => toggleWishlist(currentHero)}
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-md backdrop-blur-sm transition hover:scale-105"
                >
                  <MdFavorite size={18} className={wishlistIds.includes(String(currentHero.id)) ? "text-[var(--color-pink-utama)]" : "text-slate-400"} />
                </button>
              </div>
              <div className="mt-4 text-left">
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-pink-utama)]">{currentHero.brand}</span>
                <h3 className="mt-0.5 line-clamp-1 font-[var(--font-poppins)] text-base font-bold text-slate-950">{currentHero.nama_produk}</h3>
                <div className="mt-2 flex items-center justify-between border-t border-slate-50 pt-3">
                  <p className="font-[var(--font-poppins)] text-base font-black text-[var(--color-pink-utama)]">
                    Rp {Number(currentHero.price).toLocaleString("id-ID")}
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate(`/member/products/${currentHero.id}`)}
                    className="rounded-full bg-slate-950 px-4 py-2 text-[10px] font-extrabold uppercase tracking-wider text-white transition hover:bg-[var(--color-pink-utama)]"
                  >
                    Detail Item
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative flex h-80 w-full max-w-sm items-center justify-center rounded-[32px] border border-dashed border-pink-200 bg-white text-xs font-semibold text-slate-400">
              Katalog produk kosong
            </div>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-[32px] border border-pink-100 bg-white p-6 shadow-sm text-left">
          <div className="flex items-center justify-between border-b border-pink-50 pb-4">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--color-pink-utama)]">
                Exclusively curated
              </p>
              <h2 className="mt-1 font-[var(--font-poppins)] text-2xl font-black text-slate-950">Rekomendasi Terlaris</h2>
            </div>
            <button
              type="button"
              onClick={() => navigate("/member/products")}
              className="inline-flex items-center gap-1 text-xs font-extrabold text-[var(--color-pink-utama)] hover:underline"
            >
              Lihat Semua <MdArrowForward size={14} />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {featuredProducts.slice(0, 6).map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/member/products/${product.id}`)}
                className="group cursor-pointer rounded-2xl border border-pink-50 p-3 transition hover:border-pink-200 hover:shadow-sm"
              >
                <div className="aspect-square w-full overflow-hidden rounded-xl bg-pink-50">
                  <img
                    src={product.image || "https://placehold.co/300?text=BLOOM"}
                    alt={product.nama_produk}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-2 line-clamp-1 text-xs font-extrabold text-slate-900">{product.nama_produk}</h3>
                <p className="mt-0.5 font-[var(--font-poppins)] text-xs font-black text-[var(--color-pink-utama)]">
                  Rp {Number(product.price).toLocaleString("id-ID")}
                </p>
              </div>
            ))}
            {featuredProducts.length === 0 && (
              <p className="col-span-3 py-10 text-center text-xs font-bold text-slate-400">Tidak ada produk rekomendasi.</p>
            )}
          </div>
        </div>

        <div className="rounded-[32px] border border-pink-100 bg-white p-6 shadow-sm text-left">
          <div className="flex items-center justify-between border-b border-pink-50 pb-4">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--color-pink-utama)]">
                Loved by you
              </p>
              <h2 className="mt-1 font-[var(--font-poppins)] text-2xl font-black text-slate-950">Review Terbaru</h2>
            </div>
            <button
              type="button"
              onClick={() => navigate("/member/reviews")}
              className="inline-flex items-center gap-1 text-xs font-extrabold text-[var(--color-pink-utama)] hover:underline"
            >
              Semua Review <MdArrowForward size={14} />
            </button>
          </div>
          <div className="mt-6 space-y-3">
            {reviews.length === 0 && (
              <p className="text-center py-10 text-xs font-bold text-slate-400">Belum memberikan review produk.</p>
            )}
            {reviews.slice(0, 2).map((review) => (
              <div key={review.id} className="rounded-2xl bg-pink-50/60 p-4 border border-pink-100/50">
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(Number(review.rating) || 0)].map((_, index) => (
                    <MdStar key={index} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-1.5 block text-[11px] font-extrabold text-slate-800 line-clamp-1">{review.product_name}</p>
                <p className="mt-2 text-xs font-semibold italic leading-relaxed text-slate-600">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="rounded-[32px] border border-pink-100 bg-gradient-to-r from-slate-900 to-slate-950 p-8 shadow-xl text-left">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="rounded-full bg-pink-500 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white">
              Voucher Member
            </span>
            <h2 className="mt-3 font-[var(--font-poppins)] text-2xl font-black text-white">
              Gunakan Voucher Promo Sebelum Checkout!
            </h2>
            <p className="mt-1 text-xs font-medium text-slate-400 max-w-xl">
              Salin kode promo yang tersedia di menu voucher lalu masukkan pada form pemesanan produk untuk mendapatkan potongan harga belanja kosmetik secara instan.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/member/promos")}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-wider text-slate-900 shadow-md transition hover:bg-pink-50"
          >
            Buka Katalog Voucher <MdArrowForward size={14} className="text-[var(--color-pink-utama)]" />
          </button>
        </div>
      </section>
    </div>
  );
}