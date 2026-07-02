import React from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Eye } from "lucide-react";


export default function PromoCard({ promo, formatPromoId, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-pink-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden group">
      {/* Dekorasi Aksen Voucher */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FFFBFB] border-r border-pink-100"></div>
      <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FFFBFB] border-l border-pink-100"></div>

      <div>
        {/* Atas: ID & Status */}
        <div className="flex justify-between items-center mb-4">
          <span className="font-mono font-bold text-xs text-[#E08098] bg-pink-50/60 px-2.5 py-1 rounded-full">
            {formatPromoId(promo.id)}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${
            promo.is_active ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
          }`}>
            {promo.is_active ? "🟢 Aktif" : "🔴 Nonaktif"}
          </span>
        </div>

        {/* Tengah: Kode Promo & Diskon */}
        <div className="space-y-1 mb-4">
          <h3 className="font-mono font-black text-xl tracking-wider text-slate-800 uppercase group-hover:text-[#ED346C] transition-colors">
            {promo.kode_promo}
          </h3>
          <p className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {promo.persentase_diskon}% OFF
          </p>
        </div>

        {/* Detail Ketentuan Voucher */}
        <div className="space-y-2 pt-3 border-t border-dashed border-slate-100 text-xs">
          <div className="flex items-center gap-2 text-slate-600 font-medium">
            <span>Min. Belanja: <strong className="text-slate-700">Rp {Number(promo.minimal_transaksi).toLocaleString("id-ID")}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <span>Berlaku s/d: <span className="font-medium text-slate-600">{promo.tanggal_kedaluwarsa}</span></span>
          </div>
        </div>
      </div>

      {/* Bawah: Kelompok Tombol Aksi */}
      <div className="flex gap-2 mt-5 pt-3 border-t border-slate-50">
        <Link to={`/dashboard/promos/${promo.id}`} className="flex-1">
          <button className="w-full py-2 bg-slate-50 hover:bg-pink-50 text-slate-600 hover:text-[#ED346C] rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5" title="Lihat Ketentuan">
            <Eye size={13} /> Detail
          </button>
        </Link>
        <button onClick={() => onEdit(promo)} className="p-2 text-amber-600 hover:bg-amber-50 border border-transparent hover:border-amber-100 rounded-xl transition-all" title="Ubah Ketentuan">
          <Pencil size={14} />
        </button>
        <button onClick={() => onDelete(promo.id)} className="p-2 text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-xl transition-all" title="Hapus Permanen">
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}