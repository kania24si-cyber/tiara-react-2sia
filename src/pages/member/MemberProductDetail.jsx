import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productsAPI } from "../../services/productsAPI";
import { promosAPI } from "../../services/promosAPI";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ArrowLeft, Heart, ShieldCheck, ShoppingCart, X } from "lucide-react";

const notifyMemberDataChanged = () => window.dispatchEvent(new Event("member-data-updated"));

export default function MemberProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("admin") || "{}");
  const [product, setProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderForm, setOrderForm] = useState({ quantity: 1, promoCode: "" });
  const [orderMessage, setOrderMessage] = useState("");

  useEffect(() => {
    const loadProductDetail = async () => {
      try {
        setLoading(true);
        const data = await productsAPI.fetchProducts();
        const found = data.find((item) => String(item.id) === String(id));
        if (found) setProduct(found);
        else setError("Produk tidak ditemukan atau sudah tidak tersedia.");
      } catch (err) {
        setError("Gagal memuat detail produk kosmetik.");
      } finally {
        setLoading(false);
      }
    };

    loadProductDetail();
    setWishlist(JSON.parse(localStorage.getItem(`wishlist_${user.id}`) || "[]"));
  }, [id, user.id]);

  const wishlistIds = useMemo(() => wishlist.map((item) => String(item.id)), [wishlist]);

  const toggleWishlist = () => {
    if (!product) return;
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

  const handleOrderSubmit = async (event) => {
    event.preventDefault();
    if (!product) return;

    setOrderMessage("");
    const qty = Number(orderForm.quantity);
    let baseTotal = qty * Number(product.price);

    if (orderForm.promoCode.trim()) {
      try {
        const promos = await promosAPI.fetchPromos();
        const foundPromo = promos.find(
          (p) => p.kode_promo?.toLowerCase() === orderForm.promoCode.trim().toLowerCase() && p.is_active
        );

        if (!foundPromo) {
          setOrderMessage("⚠️ Kode voucher tidak valid atau sudah kedaluwarsa.");
          return;
        }

        if (baseTotal < Number(foundPromo.minimal_transaksi || 0)) {
          setOrderMessage(
            `⚠️ Minimal belanja untuk voucher ini adalah Rp ${Number(foundPromo.minimal_transaksi).toLocaleString("id-ID")}`
          );
          return;
        }

        const discountAmount = (baseTotal * Number(foundPromo.persentase_diskon)) / 100;
        baseTotal = Math.max(0, baseTotal - discountAmount);
      } catch (err) {
        setOrderMessage("⚠️ Gagal memvalidasi kode voucher promo.");
        return;
      }
    }

    const currentOrders = JSON.parse(localStorage.getItem(`orders_${user.id}`) || "[]");
    const newOrder = {
      id: Date.now(),
      product_id: product.id,
      product_name: product.nama_produk,
      product_image: product.image,
      quantity: qty,
      total_price: baseTotal,
      status: "Pending",
      created_at: new Date().toISOString()
    };

    localStorage.setItem(`orders_${user.id}`, JSON.stringify([newOrder, ...currentOrders]));
    notifyMemberDataChanged();
    setShowOrderForm(false);
    navigate("/member/orders");
  };

  if (loading) return <LoadingSpinner text="Memuat spesifikasi produk kosmetik..." />;

  if (error) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-rose-100 bg-rose-50 p-6 text-center font-[var(--font-barlow)]">
        <p className="text-xs font-bold text-rose-600">{error}</p>
        <button
          onClick={() => navigate("/member/products")}
          className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-[var(--color-pink-utama)] hover:underline"
        >
          <ArrowLeft size={14} /> Kembali ke Toko
        </button>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="pb-12 text-left font-[var(--font-barlow)]">
      {/* BACK NAVIGATION */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-100 bg-white px-4 py-2 text-xs font-extrabold text-slate-700 shadow-sm transition hover:bg-pink-50"
      >
        <ArrowLeft size={14} />
        Kembali
      </button>

      {/* CORE PRODUCT CONTAINER */}
      <div className="grid grid-cols-1 gap-8 rounded-[32px] border border-pink-100 bg-white p-5 shadow-sm md:grid-cols-2 lg:gap-12 sm:p-8">
        {/* IMAGE BLOCK */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-pink-50 border border-pink-50">
          <img
            src={product.image || "https://placehold.co/500?text=BLOOM"}
            alt={product.nama_produk}
            className="h-full w-full object-cover"
          />
        </div>

        {/* DATA BLOCK */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
              <span>{product.brand}</span>
              <span className="font-mono">PR-{String(product.id).padStart(4, "0")}</span>
            </div>

            <h1 className="mt-2 font-[var(--font-poppins)] text-xl font-black leading-snug text-slate-950 sm:text-2xl">
              {product.nama_produk}
            </h1>

            <span className="mt-3 inline-block rounded-full bg-pink-50 px-3 py-1 text-[10px] font-extrabold uppercase text-[var(--color-pink-utama)]">
              {product.category}
            </span>

            <div className="my-5 border-t border-slate-100 pt-4">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Harga Exclusive Member</p>
              <p className="font-[var(--font-poppins)] text-2xl font-black text-[var(--color-pink-utama)] mt-1">
                Rp {Number(product.price).toLocaleString("id-ID")}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Deskripsi Produk</h3>
              <p className="text-xs font-medium leading-relaxed text-slate-600 whitespace-pre-line">
                {product.deskripsi || "Tidak ada deskripsi tambahan untuk kosmetik premium ini."}
              </p>
            </div>
          </div>

          {/* LOWER ACTIONS */}
          <div className="space-y-4 border-t border-slate-100 pt-5">
            <div className="flex items-center gap-2 rounded-xl bg-emerald-50/70 p-3 text-[11px] font-bold text-emerald-700">
              <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
              100% Produk Original & Terverifikasi BPOM Aman
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowOrderForm(true)}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-pink-utama)] py-3 text-xs font-extrabold text-white shadow-sm transition hover:bg-rose-700"
              >
                <ShoppingCart size={14} />
                Pesan Sekarang
              </button>
              <button
                type="button"
                onClick={toggleWishlist}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-pink-100 bg-white text-slate-600 shadow-sm transition hover:bg-pink-50"
                title="Simpan ke wishlist"
              >
                <Heart
                  size={16}
                  className={wishlistIds.includes(String(product.id)) ? "fill-[var(--color-pink-utama)] text-[var(--color-pink-utama)]" : "text-slate-400"}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* OVERLAY MODAL FORM */}
      {showOrderForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleOrderSubmit}
            className="w-full max-w-md rounded-3xl border border-pink-100 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-start justify-between border-b border-slate-50 pb-3">
              <div>
                <h3 className="font-[var(--font-poppins)] text-base font-black text-slate-950">
                  Form Pemesanan Kosmetik
                </h3>
                <p className="text-[10px] font-bold text-[var(--color-pink-utama)] uppercase tracking-wider mt-0.5">
                  {product.brand}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowOrderForm(false);
                  setOrderMessage("");
                }}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="my-4 flex gap-3 rounded-2xl bg-pink-50/40 p-3 border border-pink-100/30">
              <img
                src={product.image || "https://placehold.co/100?text=BLOOM"}
                alt={product.nama_produk}
                className="h-14 w-14 rounded-xl object-cover bg-white"
              />
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-xs font-extrabold text-slate-900">{product.nama_produk}</h4>
                <p className="text-[11px] font-semibold text-slate-500 mt-0.5">Harga Satuan:</p>
                <p className="font-[var(--font-poppins)] text-sm font-black text-[var(--color-pink-utama)]">
                  Rp {Number(product.price).toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Jumlah Item (Pcs)
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  value={orderForm.quantity}
                  onChange={(event) => setOrderForm({ ...orderForm, quantity: Math.max(1, Number(event.target.value)) })}
                  className="w-full rounded-xl border border-pink-100 px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-[var(--color-pink-utama)]"
                />
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Kode Voucher
                </label>
                <input
                  type="text"
                  value={orderForm.promoCode}
                  onChange={(event) => setOrderForm({ ...orderForm, promoCode: event.target.value })}
                  className="w-full rounded-xl border border-pink-100 px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-[var(--color-pink-utama)]"
                  placeholder="Opsional"
                />
              </div>

              {orderMessage && (
                <div className="rounded-xl border border-rose-100 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">
                  {orderMessage}
                </div>
              )}

              <div className="rounded-2xl bg-pink-50/70 p-3 text-xs font-bold text-slate-600">
                Estimasi total:{" "}
                <span className="text-[var(--color-pink-utama)]">
                  Rp {(Number(orderForm.quantity || 0) * Number(product.price)).toLocaleString("id-ID")}
                </span>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[var(--color-pink-utama)] py-3 text-xs font-extrabold text-white transition hover:bg-rose-700"
              >
                Masukkan ke Cart & Orders
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}