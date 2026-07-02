import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { promosAPI } from "../services/promosAPI";
import LoadingSpinner from "../components/LoadingSpinner";

import { ChevronLeft, Ticket, ShieldAlert, Calendar, DollarSign } from "lucide-react";

export default function PromosDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [promo, setPromo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await promosAPI.getPromoById(id);
        if (!data) throw new Error("Kupon promo tidak ditemukan atau telah dihapus");
        setPromo(data);
      } catch (err) {
        setError(err.message || "Gagal memuat info detail promo");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#FFFBFB]"><LoadingSpinner text="Membuka parameter kupon..." /></div>;
  
  if (error || !promo) return (
    <div className="p-6 max-w-md mx-auto my-12 bg-white rounded-2xl border border-rose-100 text-center space-y-4 shadow-sm">
      <div className="text-rose-500 flex justify-center"><ShieldAlert size={40} /></div>
      <p className="text-xs font-semibold text-gray-700">{error || "Data kupon kosong"}</p>
      <button onClick={() => navigate("/dashboard/promos")} className="text-xs bg-[#ED346C] text-white py-2 px-4 rounded-full font-medium">Kembali ke Promos</button>
    </div>
  );

  return (
    <div className="space-y-6 p-4 bg-[#FFFBFB] min-h-screen text-xs text-gray-600">
      <div className="flex items-center gap-2">
        <Link to="/dashboard/promos" className="p-2 bg-white border border-gray-100 rounded-xl text-gray-500 hover:bg-pink-50 transition-colors">
          <ChevronLeft size={16} />
        </Link>
        <div>
          <h1 className="text-base font-bold text-gray-800">Detail Kupon Voucher</h1>
          <p className="text-[11px] text-gray-400">ID Aturan Kontrak: PRM-{String(promo.id || 0).padStart(4, '0')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KARTU VISUAL VOUCHER */}
        <div className="md:col-span-1 bg-white p-6 rounded-2xl border border-pink-100/60 shadow-sm flex flex-col items-center text-center justify-center space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-pink-100/30 rounded-full translate-x-4 -translate-y-4"></div>
          <div className="p-4 bg-pink-50 text-[#ED346C] rounded-full"><Ticket size={28} /></div>
          <div className="font-mono font-bold text-lg tracking-widest text-gray-800 uppercase px-4 py-1.5 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
            {promo.kode_promo || ""}
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${promo.is_active ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-400"}`}>
            {promo.is_active ? "Status: Kupon Aktif" : "Status: Nonaktif"}
          </span>
        </div>

        {/* SPESIFIKASI ATURAN BELANJA */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-pink-100/60 shadow-sm space-y-4">
          <h2 className="font-bold text-gray-800 text-sm border-b border-gray-100 pb-2">Ketentuan Penggunaan Voucher</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-3 bg-purple-50/50 border border-purple-100/50 rounded-xl">
              <div className="text-purple-600 mt-0.5"><Ticket size={16} /></div>
              <div>
                <p className="text-[11px] text-purple-400 font-semibold uppercase">Besar Nilai Potongan</p>
                <p className="text-sm font-bold text-purple-700">{promo.persentase_diskon || 0}% Potongan Harga</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-amber-50/50 border border-amber-100/50 rounded-xl">
              <div className="text-amber-600 mt-0.5"><DollarSign size={16} /></div>
              <div>
                <p className="text-[11px] text-amber-400 font-semibold uppercase">Syarat Belanja Minimum</p>
                <p className="text-sm font-bold text-amber-700">Rp {Number(promo.minimal_transaksi || 0).toLocaleString("id-ID")}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-blue-50/50 border border-blue-100/50 rounded-xl sm:col-span-2">
              <div className="text-blue-600 mt-0.5"><Calendar size={16} /></div>
              <div>
                <p className="text-[11px] text-blue-400 font-semibold uppercase">Tanggal Kedaluwarsa Kampanye</p>
                {/* ✨ Mengutamakan properti tanggal_kadaluarsa dari database */}
                <p className="text-xs font-bold text-blue-700">{promo.tanggal_kadaluarsa || promo.tanggal_kedaluwarsa || ""}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Sistem kasir otomatis memblokir kode setelah tanggal ini terlewati.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}