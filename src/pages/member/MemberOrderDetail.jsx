import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ArrowLeft, FileText, Calendar, Tag, CreditCard } from "lucide-react";

export default function MemberOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("admin") || "{}");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const stored = JSON.parse(localStorage.getItem(`orders_${user.id}`) || "[]");
    const found = stored.find((o) => String(o.id) === String(id));
    setOrder(found);
    setLoading(false);
  }, [id, user.id]);

  if (loading) return <div className="py-20"><LoadingSpinner text="Menyusun nomor e-invoice..." /></div>;
  if (!order) return <div className="p-6 bg-rose-50 text-[var(--color-pink-utama)] rounded-xl border border-rose-100 font-semibold text-xs">Invoice pesanan tidak ditemukan.</div>;

  return (
    <div className="space-y-6 text-left font-[var(--font-barlow)]">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-bold text-[var(--color-abu)] hover:text-[var(--color-pink-utama)] transition-colors">
        <ArrowLeft size={14} /> Kembali ke Riwayat
      </button>

      <PageHeader title="E-Invoice Detail" subtitle="Arsip rincian bukti pesanan kosmetik sah dari sistem BLOOM." breadcrumb={["Member", "Orders", "Detail"]} />

      <div className="bg-white border border-[var(--color-pink-border)]/50 rounded-2xl p-6 shadow-sm space-y-6 max-w-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-100 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-pink-50 text-[var(--color-pink-utama)] rounded-xl"><FileText size={18} /></div>
            <div>
              <p className="text-[10px] font-bold text-[var(--color-abu)] uppercase">Order ID Invoice</p>
              <p className="text-xs font-mono font-bold text-gray-800">BLM-TRX-{order.id}</p>
            </div>
          </div>
          <span className="bg-amber-50 text-amber-600 border border-amber-100 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wide">
            {order.status}
          </span>
        </div>

        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-[var(--color-abu)] uppercase tracking-wide">Rincian Komoditas Kosmetik</h4>
          <div className="flex gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <img src={order.product?.image || "https://placehold.co/100"} alt="" className="w-12 h-12 object-cover rounded-xl border border-[var(--color-pink-border)] bg-white" />
            <div>
              <p className="text-[10px] font-bold text-[var(--color-abu)] uppercase">{order.product?.brand}</p>
              <h5 className="text-xs font-bold text-gray-800">{order.product?.nama_produk}</h5>
              <p className="text-[10px] text-[var(--color-abu)] mt-0.5">Kategori: {order.product?.category}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <h4 className="text-[10px] font-bold text-[var(--color-abu)] uppercase tracking-wide">Struktur Pembiayaan</h4>
          <div className="space-y-1.5 text-xs font-medium text-gray-600">
            <div className="flex justify-between">
              <span>Kuantitas Kebutuhan</span>
              <span className="font-bold text-gray-800">{order.quantity} pcs</span>
            </div>
            <div className="flex justify-between">
              <span>Metode Transaksi</span>
              <span className="font-bold text-gray-800 flex items-center gap-1"><CreditCard size={12} /> Saldo Finansial Member</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-dashed border-gray-100 text-sm font-bold text-gray-800">
              <span>Total Gross Pembayaran</span>
              <span className="text-[var(--color-pink-utama)] font-[var(--font-poppins)]">Rp {Number(order.total_price).toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4 text-[10px] text-[var(--color-abu)] font-medium">
          <div className="flex items-center gap-1.5"><Calendar size={12} /> Terbit: {order.created_at}</div>
          <div className="flex items-center gap-1.5 justify-end"><Tag size={12} /> Pemesan ID: {order.user_id}</div>
        </div>
      </div>
    </div>
  );
}