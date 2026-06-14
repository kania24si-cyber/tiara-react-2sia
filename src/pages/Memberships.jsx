import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { membershipsAPI } from "../services/membershipsAPI"; 

import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import SelectField from "../components/SelectField";
import SearchBar from "../components/SearchBar";
import StatsCard from "../components/StatsCard";
import FormModal from "../components/FormModal";
import MembershipForm from "../components/MembershipForm";

import { Trash2, Pencil, Eye, Sparkles, SearchX } from "lucide-react";

const INITIAL_FORM_STATE = {
  id: "",
  customer_id: "",
  tanggal_daftar: new Date().toISOString().split("T")[0],
  status_member: "Reguler",
  level_membership: "Silver",
  status_aktif: "Aktif"
};

const formatMembershipId = (id) => id ? `MB-${String(id).padStart(4, '0')}` : "";
const formatCustomerId = (id) => id ? `CS-${String(id).padStart(4, '0')}` : "";

export default function Memberships() {
  const [levelFilter, setLevelFilter] = useState(() => sessionStorage.getItem("membership_filter_level") || "all");
  const [search, setSearch] = useState(() => sessionStorage.getItem("membership_filter_search") || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [memberships, setMemberships] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dataForm, setDataForm] = useState(INITIAL_FORM_STATE);

  useEffect(() => { loadMemberships(); }, []);
  useEffect(() => { sessionStorage.setItem("membership_filter_level", levelFilter); }, [levelFilter]);
  useEffect(() => { sessionStorage.setItem("membership_filter_search", search); }, [search]);

  const loadMemberships = async () => {
    try {
      setLoading(true); setError("");
      const data = await membershipsAPI.fetchMemberships();
      setMemberships(data);
    } catch (err) {
      setError("Gagal memuat data membership dari server");
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
        await membershipsAPI.updateMembership(selectedId, dataForm);
        setSuccess("Membership kartu berhasil diperbarui ✨");
      } else {
        const { id, ...payload } = dataForm; 
        await membershipsAPI.createMembership(payload);
        setSuccess("Membership baru berhasil diterbitkan 🎉");
      }
      
      closeModal();
      await loadMemberships();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus keanggotaan membership ini? ⚠️")) return;
    try {
      setLoading(true); setError("");
      await membershipsAPI.deleteMembership(id);
      setSuccess("Membership berhasil dinonaktifkan/dihapus");
      await loadMemberships();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Gagal menghapus data");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (membership) => {
    setIsEdit(true);
    setSelectedId(membership.id);
    setDataForm({
      id: membership.id,
      customer_id: membership.customer_id,
      tanggal_daftar: membership.tanggal_daftar,
      status_member: membership.status_member,
      level_membership: membership.level_membership,
      status_aktif: membership.status_aktif
    });
    setShowForm(true);
  };

  const closeModal = () => {
    setDataForm(INITIAL_FORM_STATE);
    setShowForm(false);
    setIsEdit(false);
    setSelectedId(null);
  };

  const filteredMemberships = memberships.filter((m) => {
    const prettyMembershipId = formatMembershipId(m.id).toLowerCase();
    const prettyCustomerId = formatCustomerId(m.customer_id).toLowerCase();

    const matchSearch =
      String(m.id).toLowerCase().includes(search.toLowerCase()) ||
      String(m.customer_id).toLowerCase().includes(search.toLowerCase()) ||
      prettyMembershipId.includes(search.toLowerCase()) ||
      prettyCustomerId.includes(search.toLowerCase());

    return matchSearch && (levelFilter === "all" || m.level_membership === levelFilter);
  });

  return (
    <div className="space-y-6 p-4 bg-[#FFFBFB] min-h-screen">
      
      {/* 1. HEADER UTAMA */}
      <PageHeader title="Glow Memberships" subtitle="Kelola program loyalitas pelanggan, tingkatan tier reward, serta masa aktif kartu keanggotaan." breadcrumb={["Dashboard", "Memberships"]}>
        <button 
          onClick={() => { setIsEdit(false); setDataForm(INITIAL_FORM_STATE); setShowForm(true); }}
          className="bg-[#ED346C] hover:bg-[#d62659] text-white text-xs py-2.5 px-5 flex items-center gap-2 rounded-full font-semibold shadow-sm transition-all duration-150"
        >
          <Sparkles size={14} /> Add Membership
        </button>
      </PageHeader>

      {/* ALERT NOTIFIKASI */}
      {error && <div className="bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-100 text-xs font-medium">{error}</div>}
      {success && <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-100 text-xs font-medium">{success}</div>}

      {/* POPUP MODAL FORM */}
      {showForm && (
        <FormModal title={isEdit ? "Modify Membership Card 📝" : "Issue New Membership 💳"} onClose={closeModal}>
          <MembershipForm dataForm={dataForm} handleChange={handleChange} handleSubmit={handleSubmit} isEdit={isEdit} loading={loading} />
        </FormModal>
      )}

      {/* 2. AREA FILTER & CARI */}
      <div className="bg-white p-4 rounded-2xl border border-pink-100/50 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
        <div className="w-full sm:flex-1">
          <SearchBar placeholder="Cari Kode Membership (MB-xxxx) atau Customer (CS-xxxx)..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="w-full sm:w-64">
          <SelectField value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} options={[{ value: "all", label: "Semua Level Tier" }, { value: "Silver", label: "Silver 🥈" }, { value: "Gold", label: "Gold ⭐" }]} />
        </div>
      </div>

      {/* 3. PANEL STATISTIK RINGKAS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-pink-100/40 shadow-sm"><StatsCard title="Total Memberships" value={memberships.length} color="text-[#ED346C] font-bold text-2xl" /></div>
        <div className="bg-white p-4 rounded-2xl border border-pink-100/40 shadow-sm"><StatsCard title="Gold Tier Members" value={memberships.filter((m) => m.level_membership === "Gold").length} color="text-amber-500 font-bold text-2xl" /></div>
        <div className="bg-white p-4 rounded-2xl border border-pink-100/40 shadow-sm"><StatsCard title="Silver Tier Members" value={memberships.filter((m) => m.level_membership === "Silver").length} color="text-slate-500 font-bold text-2xl" /></div>
        <div className="bg-white p-4 rounded-2xl border border-pink-100/40 shadow-sm"><StatsCard title="Active Members" value={memberships.filter((m) => m.status_aktif === "Aktif").length} color="text-emerald-600 font-bold text-2xl" /></div>
      </div>

      {/* 4. AREA DATA TABEL UTAMA */}
      <div className="bg-white rounded-2xl border border-pink-100/40 shadow-sm overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xs font-bold text-gray-700 tracking-wide uppercase">Membership Vault Ledger</h2>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-pink-50 text-[#ED346C]">{filteredMemberships.length} Cards Issued</span>
        </div>

        {loading && <div className="py-12"><LoadingSpinner text="Memuat data keanggotaan dari server..." /></div>}
        {!loading && memberships.length === 0 && <div className="py-12"><EmptyState text="Belum ada data membership terdaftar." /></div>}

        {!loading && memberships.length > 0 && filteredMemberships.length === 0 && (
          <div className="p-12 flex flex-col items-center text-center gap-2">
            <div className="p-3 bg-gray-50 text-gray-400 rounded-full"><SearchX size={20} /></div>
            <p className="text-xs font-semibold text-gray-600">Keanggotaan Tidak Ditemukan</p>
          </div>
        )}

        {!loading && filteredMemberships.length > 0 && (
          <div className="overflow-x-auto w-full">
            <div className="min-w-[1100px]">
              <GenericTable
                columns={["Membership ID", "Customer ID", "Registration Date", "Member Type Status", "Level Tier", "Active Status", "Actions"]}
                data={filteredMemberships}
                renderRow={(item) => (
                  <>
                    <td className="px-6 py-4 font-mono font-bold text-[#ED346C] whitespace-nowrap">{formatMembershipId(item.id)}</td>
                    <td className="px-6 py-4 font-mono font-semibold text-gray-700 whitespace-nowrap">{formatCustomerId(item.customer_id)}</td>
                    <td className="px-6 py-4 text-xs text-gray-500 font-medium whitespace-nowrap">{item.tanggal_daftar}</td>
                    <td className="px-6 py-4 text-xs text-gray-700 font-semibold whitespace-nowrap">{item.status_member}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border ${item.level_membership === "Gold" ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-slate-50 text-slate-500 border-slate-100"}`}>
                        {item.level_membership === "Gold" ? "Gold ⭐" : "Silver 🥈"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-medium ${item.status_aktif === "Aktif" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-rose-50 text-rose-600 border border-rose-100"}`}>
                        {item.status_aktif}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-1.5 justify-start">
                        <Link to={`/dashboard/memberships/${item.id}`}>
                          <button className="p-1.5 text-[#ED346C] hover:bg-pink-50 rounded-lg transition-colors" title="Lihat Profil"><Eye size={14} /></button>
                        </Link>
                        <button onClick={() => handleEdit(item)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Ubah Kartu"><Pencil size={14} /></button>
                        <button onClick={() => handleDelete(item.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Hapus"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </>
                )}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}