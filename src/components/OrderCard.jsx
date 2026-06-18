import React from "react";
import { Calendar, Trash2 } from "lucide-react";

export default function OrderCard({ order, onDelete }) {
  const getStatusStyle = (status) => {
    const dict = {
      Pending: "bg-amber-50 text-amber-600 border-amber-100",
      Paid: "bg-blue-50 text-blue-600 border-blue-100",
      Processed: "bg-purple-50 text-purple-600 border-purple-100",
      Completed: "bg-emerald-50 text-emerald-600 border-emerald-100",
      Cancelled: "bg-rose-50 text-rose-600 border-rose-100",
    };
    return dict[status] || "bg-gray-50 text-gray-600 border-gray-100";
  };

  return (
    <div className="bg-white border border-pink-100/70 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-pink-200/60 transition-all text-left w-full">
      <div>
        {/* Header Kartu */}
        <div className="flex justify-between items-center pb-2 border-b border-gray-50 mb-3">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
            <Calendar size={11} />
            <span>{order.created_at}</span>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide border ${getStatusStyle(order.status)}`}>
            {order.status}
          </span>
        </div>

        {/* Info Produk */}
        <div className="flex gap-3 items-start">
          <img
            src={order.product?.image || "https://placehold.co/150?text=BLOOM"}
            alt=""
            className="w-14 h-14 object-cover rounded-xl border border-pink-50 bg-slate-50 shadow-inner flex-shrink-0"
          />
          <div className="space-y-0.5 min-w-0 flex-1">
            <span className="text-[9px] font-bold text-[#ED346C] uppercase bg-pink-50 px-1.5 py-0.5 rounded tracking-wider">
              {order.product?.brand}
            </span>
            <h4 className="font-bold text-slate-800 text-xs truncate pt-1">
              {order.product?.nama_produk}
            </h4>
            <p className="text-[10px] text-gray-400 font-medium">
              Qty: <span className="font-bold text-slate-700">{order.quantity} pcs</span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Kartu & Aksi */}
      <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
        <div>
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Total Pembayaran</p>
          <p className="text-xs font-black text-slate-800 mt-0.5">
            Rp {Number(order.total_price).toLocaleString("id-ID")}
          </p>
        </div>

        <button
          onClick={() => onDelete(order.id)}
          className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-100 transition-all"
          title="Batalkan Pesanan"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}