import { useEffect, useState } from "react";
import { promosAPI } from "../services/promosAPI";

import PageHeader from "../components/PageHeader";
import PromoForm from "../components/PromoForm";
import FormModal from "../components/FormModal";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import SearchBar from "../components/SearchBar";
import StatsCard from "../components/StatsCard";
import SelectField from "../components/SelectField"; 
import PromoCard from "../components/PromoCard"; // Import komponen baru ✨

import { Sparkles, SearchX } from "lucide-react";

const INITIAL_FORM_STATE = {
  kode_promo: "",
  persentase_diskon: "",
  minimal_transaksi: "",
  tanggal_kedaluwarsa: new Date().toISOString().split("T")[0],
  is_active: true
};

const formatPromoId = (id) => id ? `PRM-${String(id).padStart(4, '0')}` : "";

export default function Promos() {
  const [statusFilter, setStatusFilter] = useState(() => sessionStorage.getItem("promo_filter_status") || "all");
  const [search, setSearch] = useState(() => sessionStorage.getItem("promo_filter_search") || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [promos, setPromos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dataForm, setDataForm] = useState(INITIAL_FORM_STATE);

  useEffect(() => { loadPromos(); }, []);
  useEffect(() => { sessionStorage.setItem("promo_filter_status", statusFilter); }, [statusFilter]);
  useEffect(() => { sessionStorage.setItem("promo_filter_search", search); }, [search]);

  const loadPromos = async () => {
    try {
      setLoading(true);
      const data = await promosAPI.fetchPromos();
      setPromos(data);
    } catch (err) {
      setError("Gagal memuat data kupon promo");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); setError(""); setSuccess("");

      if (isEdit) {
        await promosAPI.updatePromo(selectedId, dataForm);
        setSuccess("Kupon diskon berhasil diperbarui ✨");
      } else {
        await promosAPI.createPromo(dataForm);
        setSuccess("Promo Baru Berhasil Diterbitkan! 🎟️");
      }

      closeModal();
      await loadPromos();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus permanen kupon promo ini? ⚠️")) return;
    try {
      setLoading(true);
      await promosAPI.deletePromo(id);
      await loadPromos();
      setSuccess("Kupon berhasil dihapus");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (promo) => {
    setIsEdit(true);
    setSelectedId(promo.id);
    setDataForm({
      kode_promo: promo.kode_promo,
      persentase_diskon: promo.persentase_diskon,
      minimal_transaksi: promo.minimal_transaksi,
      tanggal_kedaluwarsa: promo.tanggal_kedaluwarsa,
      is_active: promo.is_active,
    });
    setShowForm(true);
  };

  const closeModal = () => {
    setDataForm(INITIAL_FORM_STATE);
    setShowForm(false);
    setIsEdit(false);
    setSelectedId(null);
  };

  const filteredPromos = promos.filter((p) => {
    const prettyId = formatPromoId(p.id).toLowerCase();
    const matchSearch = 
      p.kode_promo?.toLowerCase().includes(search.toLowerCase()) || 
      prettyId.includes(search.toLowerCase());

    const matchStatus = 
      statusFilter === "all" || 
      (statusFilter === "active" && p.is_active) || 
      (statusFilter === "inactive" && !p.is_active);

    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 p-4 bg-[#FFFBFB] min-h-screen">
      
      {/* 1. HEADER UTAMA */}
      <PageHeader title="Glow Promos" subtitle="Kelola voucher potongan harga dan kampanye pemasaran produk BLOOM." breadcrumb={["Dashboard", "Promos"]}>
        <button
          onClick={() => { setIsEdit(false); setSelectedId(null); setDataForm(INITIAL_FORM_STATE); setShowForm(true); }}
          className="bg-[#ED346C] hover:bg-[#d62659] text-white text-xs py-2.5 px-5 flex items-center gap-2 rounded-full font-semibold shadow-sm transition-all duration-150"
        >
          <Sparkles size={14} /> Add New Promo
        </button>
      </PageHeader>

      {/* ALERT NOTIFIKASI */}
      {error && <div className="bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-100 text-xs font-medium">{error}</div>}
      {success && <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-100 text-xs font-medium">{success}</div>}

      {/* POPUP MODAL FORM */}
      {showForm && (
        <FormModal title={isEdit ? "Modify Promo Rules 📝" : "Issue New Promo Coupon 🌸"} onClose={closeModal}>
          <PromoForm dataForm={dataForm} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} isEdit={isEdit} />
        </FormModal>
      )}

      {/* 2. AREA FILTER & CARI */}
      <div className="bg-white p-4 rounded-2xl border border-pink-100/50 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
        <div className="w-full sm:flex-1">
          <SearchBar placeholder="Cari kode kupon promo atau Kode ID..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="w-full sm:w-64">
          <SelectField value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} options={[{ value: "all", label: "Semua Status" }, { value: "active", label: "Aktif Berjalan 🟢" }, { value: "inactive", label: "Nonaktif / Berakhir 🔴" }]} />
        </div>
      </div>

      {/* 3. PANEL STATISTIK RINGKAS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-pink-100/40 shadow-sm"><StatsCard title="Total Campaigns" value={promos.length} color="text-[#ED346C] font-bold text-2xl" /></div>
        <div className="bg-white p-4 rounded-2xl border border-pink-100/40 shadow-sm"><StatsCard title="Active Vouchers" value={promos.filter((p) => p.is_active).length} color="text-emerald-600 font-bold text-2xl" /></div>
        <div className="bg-white p-4 rounded-2xl border border-pink-100/40 shadow-sm"><StatsCard title="Expired / Inactive" value={promos.filter((p) => !p.is_active).length} color="text-gray-400 font-bold text-2xl" /></div>
      </div>

      {/* 4. AREA DATA UTAMA (VERSI GRID CARD) */}
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-white px-6 py-4 rounded-2xl border border-pink-100/40 shadow-sm">
          <h2 className="text-xs font-bold text-slate-700 tracking-wide uppercase">Promo Ledger Directory</h2>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-pink-50 text-[#ED346C]">{filteredPromos.length} Vouchers</span>
        </div>

        {/* Loading & Empty State Manager */}
        {loading && <div className="py-12 bg-white rounded-2xl border border-pink-100/40 shadow-sm"><LoadingSpinner text="Memuat berkas promosi..." /></div>}
        {!loading && promos.length === 0 && <div className="py-12 bg-white rounded-2xl border border-pink-100/40 shadow-sm"><EmptyState text="Belum ada tipe kupon promosi yang dibuat." /></div>}
        
        {!loading && promos.length > 0 && filteredPromos.length === 0 && (
          <div className="p-12 bg-white rounded-2xl border border-pink-100/40 shadow-sm flex flex-col items-center text-center gap-2">
            <div className="p-3 bg-slate-50 text-slate-400 rounded-full"><SearchX size={20} /></div>
            <p className="text-xs font-semibold text-slate-600">Pencarian Tidak Ditemukan</p>
          </div>
        )}

        {/* Grid Output Card */}
        {!loading && filteredPromos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPromos.map((p) => (
              <PromoCard
                key={p.id}
                promo={p}
                formatPromoId={formatPromoId}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}