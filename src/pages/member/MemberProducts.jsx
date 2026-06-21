import { useEffect, useMemo, useState } from "react";
import { productsAPI } from "../../services/productsAPI";
import { promosAPI } from "../../services/promosAPI";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import SelectField from "../../components/SelectField";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import { Check, Heart, SearchX, ShoppingCart, X } from "lucide-react";

const formatProductId = (id) => (id ? `PR-${String(id).padStart(4, "0")}` : "");
const notifyMemberDataChanged = () => window.dispatchEvent(new Event("member-data-updated"));

export default function MemberProducts() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("admin") || "{}");
  const [categoryFilter, setCategoryFilter] = useState(() => sessionStorage.getItem("m_prod_filter_cat") || "all");
  const [search, setSearch] = useState(() => sessionStorage.getItem("m_prod_filter_search") || "");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState("");
  const [orderProduct, setOrderProduct] = useState(null);
  const [orderForm, setOrderForm] = useState({ quantity: 1, promoCode: "" });
  const [orderMessage, setOrderMessage] = useState("");

  useEffect(() => {
    loadProducts();
    setWishlist(JSON.parse(localStorage.getItem(`wishlist_${user.id}`) || "[]"));
  }, [user.id]);

  useEffect(() => {
    sessionStorage.setItem("m_prod_filter_cat", categoryFilter);
  }, [categoryFilter]);

  useEffect(() => {
    sessionStorage.setItem("m_prod_filter_search", search);
  }, [search]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await productsAPI.fetchProducts();
      setProducts(data || []);
    } catch (err) {
      setError("Gagal memuat katalog produk kecantikan.");
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const list = new Set(products.map((p) => p.category).filter(Boolean));
    return [
      { value: "all", label: "Semua Kategori" },
      ...Array.from(list).map((cat) => ({ value: cat, label: cat }))
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
      const matchesSearch =
        product.nama_produk?.toLowerCase().includes(search.toLowerCase()) ||
        product.brand?.toLowerCase().includes(search.toLowerCase()) ||
        formatProductId(product.id).toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, categoryFilter, search]);

  const wishlistIds = useMemo(() => wishlist.map((item) => String(item.id)), [wishlist]);

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

  const openOrderModal = (product) => {
    setOrderProduct(product);
    setOrderForm({ quantity: 1, promoCode: "" });
    setOrderMessage("");
  };

  const handleOrderSubmit = async (event) => {
    event.preventDefault();
    if (!orderProduct) return;

    setOrderMessage("");
    const qty = Number(orderForm.quantity);
    let baseTotal = qty * Number(orderProduct.price);

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
      product_id: orderProduct.id,
      product_name: orderProduct.nama_produk,
      product_image: orderProduct.image,
      quantity: qty,
      total_price: baseTotal,
      status: "Pending",
      created_at: new Date().toISOString()
    };

    localStorage.setItem(`orders_${user.id}`, JSON.stringify([newOrder, ...currentOrders]));
    notifyMemberDataChanged();
    setOrderProduct(null);
    navigate("/member/orders");
  };

  return (
    <div className="space-y-7 pb-10 text-left font-[var(--font-barlow)]">
      <section className="rounded-[32px] border border-pink-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--color-pink-utama)]">
              Bloom Catalogue
            </p>
            <h1 className="mt-1 font-[var(--font-poppins)] text-2xl font-black text-slate-950">
              Katalog Kosmetik Cantik
            </h1>
            <p className="mt-0.5 text-xs font-semibold text-slate-500">
              Pilih dan beli produk kecantikan kosmetik premium khusus akun member Bloom.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:w-7/12">
            <div className="flex-1">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Cari nama kosmetik, brand, atau ID produk..."
              />
            </div>
            <div className="w-full sm:w-48">
              <SelectField
                value={categoryFilter}
                onChange={setCategoryFilter}
                options={categories}
              />
            </div>
          </div>
        </div>
      </section>

      {loading && <LoadingSpinner text="Sinkronisasi produk kecantikan..." />}

      {!loading && error && (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-5 text-center text-xs font-bold text-rose-600">
          {error}
        </div>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <EmptyState
          icon={SearchX}
          text="Produk kosmetik yang Anda cari tidak ditemukan. Coba ubah kata kunci atau ganti filter kategori."
        />
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col justify-between rounded-2xl border border-pink-100 bg-white p-4 shadow-sm transition hover:border-pink-300 hover:shadow-md"
            >
              <div>
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-pink-50 border border-pink-50">
                  <img
                    src={product.image || "https://placehold.co/300?text=BLOOM"}
                    alt={product.nama_produk}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    className="absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm backdrop-blur-sm transition hover:scale-105"
                  >
                    <Heart
                      size={15}
                      className={wishlistIds.includes(String(product.id)) ? "fill-[var(--color-pink-utama)] text-[var(--color-pink-utama)]" : "text-slate-400"}
                    />
                  </button>
                </div>

                <div className="my-3">
                  <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-wider text-slate-400">
                    <span>{product.brand}</span>
                    <span className="font-mono">{formatProductId(product.id)}</span>
                  </div>
                  <h3
                    onClick={() => navigate(`/member/products/${product.id}`)}
                    className="mt-1 line-clamp-2 min-h-10 cursor-pointer text-sm font-extrabold leading-snug text-slate-900 hover:text-[var(--color-pink-utama)] hover:underline"
                  >
                    {product.nama_produk}
                  </h3>
                  <p className="mt-1 font-[var(--font-poppins)] text-base font-black text-[var(--color-pink-utama)]">
                    Rp {Number(product.price).toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={() => openOrderModal(product)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-pink-utama)] px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-rose-700"
                  >
                    <ShoppingCart size={13} />
                    Tambah Ke Bag
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* MODAL SYSTEM ORDER */}
      {orderProduct && (
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
                  {orderProduct.brand}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOrderProduct(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="my-4 flex gap-3 rounded-2xl bg-pink-50/40 p-3 border border-pink-100/30">
              <img
                src={orderProduct.image || "https://placehold.co/100?text=BLOOM"}
                alt={orderProduct.nama_produk}
                className="h-14 w-14 rounded-xl object-cover bg-white"
              />
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-xs font-extrabold text-slate-900">{orderProduct.nama_produk}</h4>
                <p className="text-[11px] font-semibold text-slate-500 mt-0.5">Harga Satuan:</p>
                <p className="font-[var(--font-poppins)] text-sm font-black text-[var(--color-pink-utama)]">
                  Rp {Number(orderProduct.price).toLocaleString("id-ID")}
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
                  Kode Voucher Promo
                </label>
                <input
                  type="text"
                  value={orderForm.promoCode}
                  onChange={(event) => setOrderForm({ ...orderForm, promoCode: event.target.value })}
                  className="w-full rounded-xl border border-pink-100 px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-[var(--color-pink-utama)]"
                  placeholder="Opsional (Contoh: BLOOMNEW)"
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
                  Rp {(Number(orderForm.quantity || 0) * Number(orderProduct.price)).toLocaleString("id-ID")}
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