import { useEffect, useState } from "react";
import EmptyState from "../../components/EmptyState";
import LoadingSpinner from "../../components/LoadingSpinner";
import { CheckCircle, Star, Trash2 } from "lucide-react";

const notifyMemberDataChanged = () => window.dispatchEvent(new Event("member-data-updated"));

export default function MemberReviews() {
  const user = JSON.parse(localStorage.getItem("admin") || "{}");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReviews();

    const intervalId = setInterval(() => {
      loadReviews();
    }, 6000);

    return () => clearInterval(intervalId);
  }, [user.id]);

  const loadReviews = () => {
    setLoading(true);
    const stored = JSON.parse(localStorage.getItem(`reviews_${user.id}`) || "[]");
    setReviews(stored);
    setLoading(false);
  };

  const handleDeleteReview = (id) => {
    const updated = reviews.filter((review) => String(review.id) !== String(id));
    localStorage.setItem(`reviews_${user.id}`, JSON.stringify(updated));
    setReviews(updated);
    notifyMemberDataChanged();
  };

  return (
    <div className="space-y-7 text-left font-[var(--font-barlow)]">
      {/* HEADER SECTION */}
      <section className="rounded-[28px] border border-pink-100 bg-white p-5 shadow-sm sm:p-7">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--color-pink-utama)]">
          Beauty Journal
        </p>
        <h1 className="mt-1 font-[var(--font-poppins)] text-2xl font-black text-slate-950">
          Review Saya
        </h1>
        <p className="mt-0.5 text-xs font-semibold text-slate-500">
          Riwayat ulasan dan penilaian kosmetik yang telah Anda berikan untuk produk Bloom.
        </p>
      </section>

      {/* LOADING STATE */}
      {loading && <LoadingSpinner text="Memuat riwayat ulasan Anda..." />}

      {/* EMPTY STATE */}
      {!loading && reviews.length === 0 && (
        <EmptyState
          icon={Star}
          text="Anda belum pernah memberikan ulasan produk. Selesaikan pesanan Anda dan bagikan pengalaman cantik Anda!"
        />
      )}

      {/* REVIEWS GRID / LIST */}
      {!loading && reviews.length > 0 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col justify-between rounded-3xl border border-pink-100 bg-white p-5 shadow-sm transition hover:border-pink-200"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {review.product_image ? (
                      <img
                        src={review.product_image}
                        alt={review.product_name}
                        className="h-12 w-12 rounded-xl object-cover border border-pink-50"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-xl bg-pink-50" />
                    )}
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs line-clamp-1">{review.product_name}</h4>
                      <p className="text-[10px] text-[var(--color-abu)] font-mono mt-0.5">
                        Diterbitkan: {review.created_at}
                      </p>
                      {review.order_id && (
                        <p className="text-[10px] text-[var(--color-abu)] font-mono">
                          Order: INV-{review.order_id}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* DELETE BUTTON */}
                  <button
                    type="button"
                    onClick={() => handleDeleteReview(review.id)}
                    className="text-rose-600 p-1.5 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Hapus Ulasan"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* RATING STARS */}
                <div className="flex text-amber-400 gap-0.5 my-3">
                  {[...Array(Number(review.rating) || 0)].map((_, index) => (
                    <Star key={index} size={13} fill="currentColor" />
                  ))}
                </div>

                {/* COMMENT */}
                <p className="text-gray-600 font-medium leading-relaxed text-xs break-words">
                  "{review.comment}"
                </p>
              </div>

              {/* VERIFIED LABEL */}
              <div className="mt-4 pt-2 border-t border-gray-50 text-[10px] text-emerald-600 font-bold tracking-wide flex items-center gap-1">
                <CheckCircle size={12} className="text-emerald-500" />
                Terverifikasi Member Bloom
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}