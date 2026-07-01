import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../components/EmptyState";
import LoadingSpinner from "../../components/LoadingSpinner";
import { CheckCircle2, Clock, MessageSquareHeart, PackageCheck, ShoppingCart, Truck } from "lucide-react";

const notifyMemberDataChanged = () => window.dispatchEvent(new Event("member-data-updated"));

const statusMeta = {
  Pending: {
    label: "Menunggu Checkout",
    helper: "Produk sudah masuk ke transaksi member dan siap diproses.",
    icon: ShoppingCart,
    className: "text-amber-600 bg-amber-50 border-amber-200"
  },
  Otw: {
    label: "Sedang Otw",
    helper: "Produk sedang dalam pengiriman.",
    icon: Truck,
    className: "text-blue-600 bg-blue-50 border-blue-200"
  },
  Selesai: {
    label: "Selesai",
    helper: "Produk sudah diterima member.",
    icon: CheckCircle2,
    className: "text-emerald-600 bg-emerald-50 border-emerald-200"
  }
};

export default function MemberOrders() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("admin") || "{}");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviewOrder, setReviewOrder] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    loadOrders();
    const storedReviews = JSON.parse(localStorage.getItem(`reviews_${user.id}`) || "[]");
    setReviews(storedReviews);

    const intervalId = setInterval(() => {
      // realtime-like sync dari storage (mis. update di tab lain)
      loadOrders(true);
      const updatedReviews = JSON.parse(localStorage.getItem(`reviews_${user.id}`) || "[]");
      setReviews(updatedReviews);
    }, 6000);

    return () => clearInterval(intervalId);
  }, [user.id]);

  const loadOrders = (silent = false) => {
    if (!silent) setLoading(true);
    const stored = JSON.parse(localStorage.getItem(`orders_${user.id}`) || "[]");
    setOrders(stored);
    if (!silent) setLoading(false);
  };

  const handleProcessOrder = (orderId, targetStatus) => {
    const updated = orders.map((order) => {
      if (String(order.id) === String(orderId)) {
        return { ...order, status: targetStatus };
      }
      return order;
    });
    localStorage.setItem(`orders_${user.id}`, JSON.stringify(updated));
    setOrders(updated);
    notifyMemberDataChanged();
  };

  const handleCancelOrder = (orderId) => {
    const updated = orders.filter((order) => String(order.id) !== String(orderId));
    localStorage.setItem(`orders_${user.id}`, JSON.stringify(updated));
    setOrders(updated);
    notifyMemberDataChanged();
  };

  const openReviewModal = (order) => {
    const existing = reviews.find((r) => String(r.order_id) === String(order.id));
    if (existing) {
      setReviewForm({ rating: existing.rating, comment: existing.comment });
    } else {
      setReviewForm({ rating: 5, comment: "" });
    }
    setReviewOrder(order);
  };

  const handleSubmitReview = (event) => {
    event.preventDefault();
    if (!reviewOrder) return;

    const existingIndex = reviews.findIndex((r) => String(r.order_id) === String(reviewOrder.id));
    let updatedReviews = [...reviews];

    const reviewData = {
      id: existingIndex >= 0 ? reviews[existingIndex].id : Date.now(),
      order_id: reviewOrder.id,
      product_id: reviewOrder.product_id,
      product_name: reviewOrder.product_name,
      rating: Number(reviewForm.rating),
      comment: reviewForm.comment,
      created_at: new Date().toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    };

    if (existingIndex >= 0) {
      updatedReviews[existingIndex] = reviewData;
    } else {
      updatedReviews.push(reviewData);
    }

    localStorage.setItem(`reviews_${user.id}`, JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
    setReviewOrder(null);
    notifyMemberDataChanged();
  };

  if (loading) {
    return (
      <div className="py-20">
        <LoadingSpinner text="Sinkronisasi keranjang belanja..." />
      </div>
    );
  }

  return (
    <div className="space-y-7 pb-10 font-[var(--font-barlow)]">
      <section className="relative overflow-hidden rounded-[32px] border border-pink-100 bg-gradient-to-br from-pink-50 via-white to-rose-50 p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-left">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-500/10 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-pink-utama)] border border-pink-200">
              <PackageCheck size={11} fill="currentColor" /> My Shopping Bag
            </span>
            <h2 className="mt-2 font-[var(--font-poppins)] text-xl font-black text-slate-950">
              Kelola Pesanan Kosmetik
            </h2>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              Pantau status pengiriman belanja dari toko Bloom kecantikan Anda.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/member/products")}
            className="rounded-full bg-slate-950 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white transition hover:bg-[var(--color-pink-utama)] sm:w-auto"
          >
            Lanjut Belanja
          </button>
        </div>
      </section>

      {orders.length === 0 && (
        <EmptyState
          icon={ShoppingCart}
          text="Keranjang belanja kosong. Silakan pilih kosmetik favorit Anda di menu katalog produk."
        />
      )}

      {orders.length > 0 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 text-left">
          {orders.map((order) => {
            const meta = statusMeta[order.status] || statusMeta.Pending;
            const IconComponent = meta.icon;
            const reviewed = reviews.some((r) => String(r.order_id) === String(order.id));

            return (
              <article
                key={order.id}
                className="flex flex-col justify-between rounded-2xl border border-pink-50 bg-white p-5 shadow-sm transition hover:border-pink-200"
              >
                <div className="mb-4 flex flex-col gap-4 sm:flex-row">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-pink-50 border border-pink-50">
                    <img
                      src={order.product_image || "https://placehold.co/150?text=BLOOM"}
                      alt={order.product_name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${meta.className}`}>
                      <IconComponent size={10} /> {meta.label}
                    </div>
                    <h3 className="mt-1.5 truncate text-sm font-extrabold text-slate-900">
                      {order.product_name}
                    </h3>
                    <p className="mt-0.5 text-xs font-semibold text-slate-500">
                      Jumlah: <span className="font-bold text-slate-800">{order.quantity} pcs</span>
                    </p>
                    <p className="mt-1 font-[var(--font-poppins)] text-sm font-black text-[var(--color-pink-utama)]">
                      Rp {Number(order.total_price || 0).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-50 pt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <p className="text-[10px] font-semibold text-slate-400 max-w-xs leading-relaxed">
                    {meta.helper}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 justify-end">
                    {order.status === "Pending" && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleCancelOrder(order.id)}
                          className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleProcessOrder(order.id, "Otw")}
                          className="rounded-xl bg-slate-950 px-4 py-2 text-xs font-black text-white hover:bg-[var(--color-pink-utama)]"
                        >
                          Checkout Sekarang
                        </button>
                      </>
                    )}
                    {order.status === "Otw" && (
                      <button
                        type="button"
                        onClick={() => handleProcessOrder(order.id, "Selesai")}
                        className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-black text-white hover:bg-emerald-700"
                      >
                        Konfirmasi Diterima
                      </button>
                    )}
                    {order.status === "Selesai" && (
                      <button
                        type="button"
                        onClick={() => openReviewModal(order)}
                        className={`rounded-xl px-3 py-2 text-xs font-bold transition-colors ${
                          reviewed
                            ? "bg-slate-100 text-slate-600 border border-slate-200"
                            : "bg-pink-50 text-[var(--color-pink-utama)] border border-pink-100 hover:bg-pink-100"
                        }`}
                      >
                        {reviewed ? "Lihat Review Anda" : "Tulis Ulasan Kosmetik"}
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* MODAL SYSTEM REVIEW */}
      {reviewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-pink-100 bg-white p-6 shadow-2xl text-left animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-[var(--font-poppins)] text-lg font-black text-slate-950">
              Ulasan Produk Kosmetik
            </h3>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              Berikan pengalaman pemakaian Anda untuk produk <span className="font-bold text-slate-800">{reviewOrder.product_name}</span>.
            </p>

            <form onSubmit={handleSubmitReview} className="mt-5 space-y-4">
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wide text-slate-400 mb-1.5">
                  Rating Bintang
                </label>
                <select
                  value={reviewForm.rating}
                  onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                  className="w-full rounded-xl border border-pink-100 px-3 py-2.5 text-xs font-bold text-slate-700 outline-none focus:border-[var(--color-pink-utama)] bg-white"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 / Sangat Sempurna)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 / Bagus Sekali)</option>
                  <option value={3}>⭐⭐⭐ (3 / Cukup Oke)</option>
                  <option value={2}>⭐⭐ (2 / Kurang Puas)</option>
                  <option value={1}>⭐ (1 / Sangat Kecewa)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wide text-slate-400 mb-1.5">
                  Komentar Review
                </label>
                <textarea
                  required
                  rows={4}
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  placeholder="Ceritakan tekstur, kecocokan kulit, atau aroma kosmetik ini..."
                  className="w-full rounded-xl border border-pink-100 p-3 text-xs font-semibold text-slate-700 outline-none focus:border-[var(--color-pink-utama)] resize-none"
                />
              </div>

              <div className="flex items-center gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setReviewOrder(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-500 hover:bg-slate-50"
                >
                  Tutup
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[var(--color-pink-utama)] px-5 py-2.5 text-xs font-black text-white hover:bg-rose-700"
                >
                  Simpan Ulasan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}