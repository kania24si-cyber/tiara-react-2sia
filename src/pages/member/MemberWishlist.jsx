import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../components/EmptyState";
import { Heart, HeartOff, Search, ShoppingBag, ShoppingCart } from "lucide-react";

const notifyMemberDataChanged = () => window.dispatchEvent(new Event("member-data-updated"));

export default function MemberWishlist() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("admin") || "{}");
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setWishlist(JSON.parse(localStorage.getItem(`wishlist_${user.id}`) || "[]"));
  }, [user.id]);

  const removeWishlist = (productId) => {
    const updated = wishlist.filter((product) => String(product.id) !== String(productId));
    localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(updated));
    setWishlist(updated);
    notifyMemberDataChanged();
  };

  const filteredWishlist = useMemo(() => {
    const keyword = search.toLowerCase();
    return wishlist.filter((product) => {
      return (
        product.nama_produk?.toLowerCase().includes(keyword) ||
        product.brand?.toLowerCase().includes(keyword) ||
        product.category?.toLowerCase().includes(keyword)
      );
    });
  }, [wishlist, search]);

  return (
    <div className="space-y-7 pb-10 font-[var(--font-barlow)]">
      {/* HEADER SECTION */}
      <section className="relative overflow-hidden rounded-[32px] border border-pink-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md text-left">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--color-pink-utama)]">
              My Favorites
            </p>
            <h1 className="mt-1 font-[var(--font-poppins)] text-2xl font-black text-slate-950">
              Wishlist Saya
            </h1>
            <p className="mt-0.5 text-xs font-semibold text-slate-500">
              Daftar produk kosmetik impian yang Anda simpan. Pesan kapan saja saat Anda siap.
            </p>
          </div>

          {/* SEARCH BAR INPUT */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari di wishlist Anda..."
              className="w-full rounded-full border border-pink-100 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-semibold text-slate-700 outline-none transition focus:border-[var(--color-pink-utama)] focus:bg-white"
            />
          </div>
        </div>
      </section>

      {/* EMPTY STATE */}
      {filteredWishlist.length === 0 && (
        <EmptyState
          icon={Heart}
          text="Wishlist Anda kosong atau tidak ada produk yang cocok dengan pencarian Anda."
        />
      )}

      {/* WISHLIST PRODUCTS GRID */}
      {filteredWishlist.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredWishlist.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col justify-between rounded-2xl border border-pink-100 bg-white p-4 shadow-sm transition hover:border-pink-300 hover:shadow-md"
            >
              <div className="text-left">
                {/* PRODUCT IMAGE CONTAINER */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-pink-50 border border-pink-50">
                  <img
                    src={product.image || "https://placehold.co/300?text=BLOOM"}
                    alt={product.nama_produk}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                {/* PRODUCT DETAILS */}
                <div className="my-3">
                  <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-wider text-slate-400">
                    <span>{product.brand}</span>
                    <span className="font-mono">PR-{String(product.id).padStart(4, "0")}</span>
                  </div>
                  <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-extrabold leading-snug text-slate-900">
                    {product.nama_produk}
                  </h3>
                  <p className="mt-1 font-[var(--font-poppins)] text-base font-black text-[var(--color-pink-utama)]">
                    Rp {Number(product.price).toLocaleString("id-ID")}
                  </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="grid grid-cols-[1fr_auto] gap-2">
                  <button
                    type="button"
                    onClick={() => navigate(`/member/products/${product.id}`)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-pink-utama)] px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-rose-700"
                  >
                    <ShoppingCart size={14} />
                    Order
                  </button>
                  <button
                    type="button"
                    onClick={() => removeWishlist(product.id)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rose-100 bg-rose-50 text-rose-600 transition hover:bg-rose-100"
                    title="Hapus dari wishlist"
                  >
                    <HeartOff size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}