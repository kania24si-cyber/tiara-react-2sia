import { useEffect, useState } from "react";
import { promosAPI } from "../../services/promosAPI";
import PageHeader from "../../components/PageHeader";
import SearchBar from "../../components/SearchBar";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import { SearchX, Ticket } from "lucide-react";

export default function MemberPromos() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [promos, setPromos] = useState([]);

  useEffect(() => { loadPromos(); }, []);

  const loadPromos = async () => {
    try {
      setLoading(true);
      const data = await promosAPI.fetchPromos();
      setPromos((data || []).filter((p) => p.is_active));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = promos.filter((p) => p.kode_promo?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader title="Exclusive Vouchers" subtitle="Gunakan kupon voucher potongan harga aktif saat transaksi kasir BLOOM." breadcrumb={["Member", "Promos"]} />

      <div className="bg-white p-4 rounded-2xl border border-pink-100/50 shadow-sm max-w-md">
        <SearchBar placeholder="Masukkan kata kunci kode voucher..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {loading && <LoadingSpinner text="Mencari voucer diskon member..." />}
      {!loading && promos.length === 0 && <EmptyState text="Tidak ada voucher promo aktif saat ini." />}
      {!loading && promos.length > 0 && filtered.length === 0 && (
        <div className="p-10 bg-white rounded-2xl text-center border border-pink-50"><SearchX size={20} className="mx-auto text-slate-300 mb-1" /><p className="font-semibold text-slate-500">Voucher tidak ditemukan</p></div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div key={p.id} className="bg-white border-2 border-dashed border-pink-200 rounded-2xl p-5 shadow-sm relative overflow-hidden group">
              <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FFFBFB] border-r-2 border-dashed border-pink-200 rounded-full"></div>
              <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FFFBFB] border-l-2 border-dashed border-pink-200 rounded-full"></div>
              
              <div className="pl-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider">PRM-{String(p.id).padStart(4, "0")}</span>
                  <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Potongan {p.persentase_diskon}%</span>
                </div>
                <div className="mt-3 bg-pink-50/50 border border-pink-100 p-2 rounded-xl text-center font-mono font-bold text-sm tracking-widest text-[#ED346C] select-all">
                  {p.kode_promo}
                </div>
                <p className="mt-3 text-gray-500 font-medium">Min. Belanja: <span className="text-gray-700 font-bold">Rp {parseInt(p.minimal_transaksi || 0).toLocaleString("id-ID")}</span></p>
                <div className="mt-4 pt-3 border-t border-pink-50 flex justify-between items-center text-[10px] text-gray-400">
                  <span>Berakhir: <strong className="text-gray-500">{p.tanggal_kedaluwarsa}</strong></span>
                  <span className="text-pink-400 font-bold flex items-center gap-0.5"><Ticket size={10} /> Active</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}