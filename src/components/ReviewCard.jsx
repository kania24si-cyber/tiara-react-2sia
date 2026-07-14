import React from "react";
import { Link } from "react-router-dom";
import { Star, Trash2, Eye, Pencil, Calendar, ShoppingBag } from "lucide-react";

export default function ReviewCard({ review, formatReviewId, onDelete, onEdit }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-pink-100/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-200">
      <div>
        {/* Header Card: ID dan Aksi */}
        <div className="flex justify-between items-center mb-3">
          <span className="font-mono font-bold text-[#ED346C] bg-pink-50 px-2 py-0.5 rounded text-[10px]">
            {formatReviewId(review.id)}
          </span>
          <div className="flex gap-1">
            <Link to={`/dashboard/reviews/${review.id}`}>
              <button
                className="p-1.5 text-[#ED346C] hover:bg-pink-50 rounded-xl transition-colors"
                title="Lihat Detail"
              >
                <Eye size={14} />
              </button>
            </Link>
            <button
              onClick={() => onEdit(review)}
              className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors"
              title="Edit Ulasan"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(review.id)}
              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
              title="Hapus Ulasan"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {/* Identitas Pelanggan & Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-[#ED346C] font-bold text-xs">
            {(review.customers?.nama_lengkap || "A")[0].toUpperCase()}
          </div>
          <div>
            <h4 className="font-bold text-gray-800 text-xs">
              {review.customers?.nama_lengkap || "Anonim Member"}
            </h4>
            {/* Render Bintang Dinamis */}
            <div className="flex items-center gap-0.5 mt-0.5">
              {[...Array(5)].map((_, idx) => (
                <Star
                  key={idx}
                  size={11}
                  className={
                    idx < review.rating
                      ? "fill-amber-400 stroke-amber-500"
                      : "text-gray-200"
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {/* Informasi Produk */}
        <div className="flex items-center gap-1.5 text-[11px] text-purple-600 font-medium bg-purple-50/50 px-2.5 py-1 rounded-lg w-fit mb-3">
          <ShoppingBag size={12} />
          <span className="truncate max-w-[180px]">
            {/* PERBAIKAN DISINI: Langsung mengarah ke nama_produk 🛒 */}
            {review.products?.nama_produk || "Produk Dihapus"}
          </span>
        </div>

        {/* Isi Komentar / Ulasan */}
        <div className="text-gray-600 font-normal text-[11px] leading-relaxed mb-4">
          {review.komentar ? (
            <p className="italic">"{review.komentar}"</p>
          ) : (
            <span className="text-gray-400 italic">Hanya memberikan rating bintang.</span>
          )}
        </div>
      </div>

      {/* Footer Card: Tanggal Transaksi */}
      <div className="border-t border-gray-50 pt-3 flex items-center gap-1 text-gray-400 text-[10px]">
        <Calendar size={11} />
        <span>{new Date(review.created_at).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric"
        })}</span>
      </div>
    </div>
  );
}