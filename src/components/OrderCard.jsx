import React from "react";
import { Calendar, Trash2, CheckCircle2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OrderCard({ order, onDelete, onConfirmComplete }) {
  const navigate = useNavigate();

  const getStatusStyle = (status) => {
    const dict = {
      Pending: "bg-amber-50 text-amber-600 border-amber-200",
      Paid: "bg-blue-50 text-[var(--blue-normal)] border-blue-200",
      Processed: "bg-purple-50 text-purple-600 border-purple-200",
      Completed: "bg-emerald-50 text-emerald-600 border-emerald-200",
      Cancelled: "bg-rose-50 text-[var(--color-pink-utama)] border-rose-200",
    };
    return dict[status] || "bg-gray-50 text-gray-600 border-gray-200";
  };

  return (
    <div className="card-beauty p-4 flex flex-col justify-between text-left w-full border-[var(--color-pink-border)]/70">
      <div>
        <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-3">
          <div className="flex items-center gap-1.5 text-[10px] text-[var(--color-abu)] font-medium font-[var(--font-barlow)]">
            <Calendar size={11} />
            <span>{order.created_at}</span>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide border ${getStatusStyle(order.status)} font-[var(--font-barlow)]`}>
            {order.status === "Pending" ? "🛒 Di Keranjang" : order.status}
          </span>
        </div>

        <div className="flex gap-3 items-start">
          <img
            src={order.product?.image || "https://placehold.co/150?text=BLOOM"}
            alt=""
            className="w-14 h-14 object-cover rounded-xl border border-[var(--color-pink-border)]/50 bg-slate-50 shadow-inner flex-shrink-0"
          />
          <div className="space-y-0.5 min-w-0 flex-1">
            <span className="text-[9px] font-bold text-[var(--color-pink-utama)] uppercase bg-pink-50 px-1.5 py-0.5 rounded tracking-wider">
              {order.product?.brand}
            </span>
            <h4 className="font-bold text-slate-800 text-xs truncate pt-1 font-[var(--font-barlow)]">
              {order.product?.nama_produk}
            </h4>
            <p className="text-[10px] text-[var(--color-abu)] font-medium">
              Qty: <span className="font-bold text-slate-700">{order.quantity} pcs</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-[9px] font-bold text-[var(--color-abu)] uppercase tracking-wide">Total Tagihan</p>
          <p className="text-xs font-black text-slate-800 mt-0.5 font-[var(--font-poppins)]">
            Rp {Number(order.total_price).toLocaleString("id-ID")}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => navigate(`/member/orders/${order.id}`)}
            className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-all border border-transparent hover:border-gray-200"
            title="Lihat Invoice Detail"
          >
            <Eye size={14} />
          </button>

          {order.status !== "Completed" && order.status !== "Cancelled" && (
            <button
              onClick={() => onConfirmComplete(order)}
              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all border border-transparent hover:border-emerald-200"
              title="Konfirmasi Pesanan Selesai & Beri Ulasan"
            >
              <CheckCircle2 size={14} />
            </button>
          )}

          <button
            onClick={() => onDelete(order.id)}
            className="p-1.5 text-[var(--color-pink-utama)] hover:bg-rose-50 rounded-lg border border-transparent hover:border-rose-100 transition-all"
            title={order.status === "Pending" ? "Hapus dari Keranjang" : "Batalkan Transaksi"}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}