// src/pages/member/MemberReviews.jsx
import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import EmptyState from "../../components/EmptyState";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Sparkles, Trash2, Star } from "lucide-react";

export default function MemberReviews() {
  const user = JSON.parse(localStorage.getItem("admin") || "{}");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [dataForm, setDataForm] = useState({ product_name: "", rating: "5", comment: "" });

  useEffect(() => { 
    loadReviews(); 
  }, []);

  const loadReviews = () => {
    setLoading(true);
    const stored = JSON.parse(localStorage.getItem(`reviews_${user.id}`) || "[]");
    setReviews(stored);
    setLoading(false);
  };

  const handleCreateReview = (e) => {
    e.preventDefault();
    if (!dataForm.product_name || !dataForm.comment) return;

    const newReview = {
      id: Date.now(),
      product_name: dataForm.product_name,
      rating: Number(dataForm.rating),
      comment: dataForm.comment,
      created_at: new Date().toISOString().split("T")[0]
    };

    const updated = [newReview, ...reviews];
    localStorage.setItem(`reviews_${user.id}`, JSON.stringify(updated));
    setReviews(updated);
    setDataForm({ product_name: "", rating: "5", comment: "" });
    setShowForm(false);
  };

  const handleDeleteReview = (id) => {
    if (!window.confirm("Hapus ulasan personal Anda untuk item ini? ⚠️")) return;
    const updated = reviews.filter((r) => r.id !== id);
    localStorage.setItem(`reviews_${user.id}`, JSON.stringify(updated));
    setReviews(updated);
  };

  return (
    <div className="space-y-6 text-left">
      <PageHeader title="Product Reviews" subtitle="Kelola dan publikasikan ulasan testimoni kosmetik BLOOM Anda." breadcrumb={["Member", "Reviews"]}>
        <button onClick={() => setShowForm(!showForm)} className="bg-[#ED346C] hover:bg-[#d62659] text-white text-xs py-2 px-4 flex items-center gap-2 rounded-full font-semibold shadow-sm transition-all">
          <Sparkles size={14} /> {showForm ? "Tutup Form" : "Tulis Ulasan Baru"}
        </button>
      </PageHeader>

      {showForm && (
        <form onSubmit={handleCreateReview} className="bg-white p-5 rounded-2xl border border-pink-100 max-w-lg space-y-4 shadow-sm">
          <h3 className="font-bold text-slate-700 text-xs uppercase tracking-wider">Formulir Testimoni Cantik</h3>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-1">Nama Kosmetik / Varian</label>
            <input type="text" value={dataForm.product_name} onChange={(e) => setDataForm({ ...dataForm, product_name: e.target.value })} className="w-full text-xs p-2.5 border border-pink-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-200 font-semibold" placeholder="Contoh: Velvet Matte Lipstick Shade 02" required />
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-1">Rating Skor</label>
            <select value={dataForm.rating} onChange={(e) => setDataForm({ ...dataForm, rating: e.target.value })} className="w-full text-xs p-2.5 border border-pink-100 rounded-xl bg-white font-semibold">
              <option value="5">⭐⭐⭐⭐⭐ (5/5) Sempurna</option>
              <option value="4">⭐⭐⭐⭐ (4/5) Sangat Bagus</option>
              <option value="3">⭐⭐⭐ (3/5) Cukup</option>
              <option value="2">⭐⭐ (2/5) Kurang</option>
              <option value="1">⭐ (1/5) Buruk</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-1">Isi Komentar / Pengalaman Pemakaian</label>
            <textarea value={dataForm.comment} onChange={(e) => setDataForm({ ...dataForm, comment: e.target.value })} rows={3} className="w-full text-xs p-2.5 border border-pink-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-200 font-medium" placeholder="Tulis kepuasan tekstur, ketahanan warna kosmetik..." required />
          </div>
          <button type="submit" className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 rounded-xl transition-all text-xs">Submit Ulasan Resmi</button>
        </form>
      )}

      {loading && <LoadingSpinner text="Sinkronisasi arsip komentar ulasan..." />}
      {!loading && reviews.length === 0 && <EmptyState text="Anda belum mempublikasikan testimoni produk." />}

      {!loading && reviews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white p-5 rounded-2xl border border-pink-50 shadow-sm flex flex-col justify-between group hover:border-pink-200 transition-all">
              <div>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="font-bold text-gray-800 text-xs">{r.product_name}</h4>
                    <p className="text-[10px] text-gray-400 font-mono mt-0.5">Diterbitkan: {r.created_at}</p>
                  </div>
                  <button onClick={() => handleDeleteReview(r.id)} className="text-rose-600 p-1.5 hover:bg-rose-50 rounded-lg transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="flex text-amber-400 gap-0.5 my-2">
                  {[...Array(r.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 font-medium leading-relaxed italic text-xs">"{r.comment}"</p>
              </div>
              <div className="mt-4 pt-2 border-t border-gray-50 text-[10px] text-emerald-600 font-bold tracking-wide">
                ✓ Terverifikasi Pembeli BLOOM Member
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}