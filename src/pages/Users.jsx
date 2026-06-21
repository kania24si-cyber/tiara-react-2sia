import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { usersAPI } from "../services/usersAPI";

import GenericTable from "../components/GenericTable";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import SelectField from "../components/SelectField";
import SearchBar from "../components/SearchBar";
import StatsCard from "../components/StatsCard";
import FormModal from "../components/FormModal";
import UserForm from "../components/UserForm";

import { Trash2, Pencil, Eye, Sparkles, SearchX } from "lucide-react"; 

// Mengubah role default dari "guest" menjadi "member"
const INITIAL_FORM_STATE = { username: "", email: "", password: "", role: "member", avatar_url: "" };
const formatUserId = (id) => id ? `USR-${String(id).padStart(4, '0')}` : "";

export default function Users() {
  const [roleFilter, setRoleFilter] = useState(() => sessionStorage.getItem("user_filter_role") || "all");
  const [search, setSearch] = useState(() => sessionStorage.getItem("user_filter_search") || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dataForm, setDataForm] = useState(INITIAL_FORM_STATE);

  useEffect(() => { loadUsers(); }, []);
  useEffect(() => { sessionStorage.setItem("user_filter_role", roleFilter); }, [roleFilter]);
  useEffect(() => { sessionStorage.setItem("user_filter_search", search); }, [search]);

  const loadUsers = async () => {
    try {
      setLoading(true); setError("");
      const data = await usersAPI.fetchUsers();
      setUsers(data);
    } catch (err) {
      setError("Gagal memuat data manajemen pengguna");
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
        await usersAPI.updateUser(selectedId, dataForm);
        setSuccess("Akun pengguna berhasil diperbarui ✨");
      } else {
        await usersAPI.createUser(dataForm);
        setSuccess("Pengguna baru berhasil didaftarkan 👤");
      }

      closeModal();
      await loadUsers();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus akses hak pengguna ini? ⚠️")) return;
    try {
      setLoading(true); setError("");
      await usersAPI.deleteUser(id);
      setSuccess("Akses akun pengguna berhasil dihapus");
      await loadUsers();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Gagal menghapus pengguna");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setIsEdit(true);
    setSelectedId(user.id);
    setDataForm({
      username: user.username || "",
      email: user.email || "",
      password: user.password || "",
      role: user.role || "member", // Mengubah fallback role menjadi "member"
      avatar_url: user.avatar_url || "",
    });
    setShowForm(true);
  };

  const closeModal = () => {
    setDataForm(INITIAL_FORM_STATE);
    setShowForm(false);
    setIsEdit(false);
    setSelectedId(null);
  };

  const filteredUsers = users.filter((user) => {
    const prettyUserId = formatUserId(user.id).toLowerCase();
    const matchSearch =
      user.username?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      prettyUserId.includes(search.toLowerCase());
      
    return matchSearch && (roleFilter === "all" || user.role === roleFilter);
  });

  return (
    <div className="space-y-6 p-4 bg-[#FFFBFB] min-h-screen">
      <PageHeader title="Glow Staff &amp; Accounts" subtitle="Otorisasi kredensial masuk aplikasi, batasan hak akses role, dan manajemen tim kasir BLOOM." breadcrumb={["Dashboard", "Users"]}>
        <button
          onClick={() => { setIsEdit(false); setSelectedId(null); setDataForm(INITIAL_FORM_STATE); setShowForm(true); }}
          className="bg-[#ED346C] hover:bg-[#d62659] text-white text-xs py-2.5 px-5 flex items-center gap-2 rounded-full font-semibold shadow-sm transition-all duration-150"
        >
          <Sparkles size={14} /> Add User
        </button>
      </PageHeader>

      {error && <div className="bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-100 text-xs font-medium">{error}</div>}
      {success && <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-100 text-xs font-medium">{success}</div>}

      {showForm && (
        <FormModal title={isEdit ? "Modify User Account 📝" : "Register Staff / Admin 🛡️"} onClose={closeModal}>
          <UserForm dataForm={dataForm} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} isEdit={isEdit} />
        </FormModal>
      )}

      <div className="bg-white p-4 rounded-2xl border border-pink-100/50 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
        <div className="w-full sm:flex-1">
          <SearchBar placeholder="Cari akun berdasarkan nama, email, atau kode (Contoh: USR-0002)..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="w-full sm:w-64">
          {/* Mengubah opsi label dan value dari "guest" menjadi "member" */}
          <SelectField value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} options={[{ value: "all", label: "Semua Peran / Role" }, { value: "admin", label: "Admin 🛡️" }, { value: "member", label: "Member 👤" }]} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-pink-100/40 shadow-sm"><StatsCard title="Total Users" value={users.length} color="text-[#ED346C] font-bold text-2xl" /></div>
        <div className="bg-white p-4 rounded-2xl border border-pink-100/40 shadow-sm"><StatsCard title="Administrator" value={users.filter((u) => u.role === "admin").length} color="text-purple-600 font-bold text-2xl" /></div>
        {/* Mengubah title dan filter perhitungan statistik dari guest menjadi "Member Access" */}
        <div className="bg-white p-4 rounded-2xl border border-pink-100/40 shadow-sm"><StatsCard title="Member Access" value={users.filter((u) => u.role === "member").length} color="text-emerald-600 font-bold text-2xl" /></div>
      </div>

      <div className="bg-white rounded-2xl border border-pink-100/40 shadow-sm overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xs font-bold text-gray-700 tracking-wide uppercase">User Registry Ledger</h2>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-pink-50 text-[#ED346C]">{filteredUsers.length} Active Accounts</span>
        </div>

        {loading && <div className="py-12"><LoadingSpinner text="Sinkronisasi data database pengguna..." /></div>}
        {!loading && users.length === 0 && <div className="py-12"><EmptyState text="Belum ada otoritas user terdaftar." /></div>}

        {!loading && users.length > 0 && filteredUsers.length === 0 && (
          <div className="p-12 flex flex-col items-center text-center gap-2">
            <div className="p-3 bg-gray-50 text-gray-400 rounded-full"><SearchX size={20} /></div>
            <p className="text-xs font-semibold text-gray-600">Pengguna Tidak Ditemukan</p>
          </div>
        )}

        {!loading && filteredUsers.length > 0 && (
          <div className="overflow-x-auto w-full">
            <div className="min-w-[1000px]">
              <GenericTable
                columns={["User ID", "Profile Picture", "Account Identifier", "Email", "Role Otoritas", "Actions"]}
                data={filteredUsers}
                renderRow={(user) => {
                  const isValidUrl = user.avatar_url && user.avatar_url.startsWith("http");
                  const displayAvatar = isValidUrl 
                    ? user.avatar_url 
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || "User")}&background=FCE7F3&color=ED346C&bold=true`;

                  return (
                    <>
                      <td className="px-6 py-4 font-mono font-bold text-[#ED346C] whitespace-nowrap">{formatUserId(user.id)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img 
                          src={displayAvatar} 
                          alt={user.username} 
                          className="w-10 h-10 rounded-full object-cover border border-pink-100 bg-gray-50 shadow-sm" 
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-sm text-gray-800 whitespace-nowrap">{user.username}</td>
                      <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-medium ${user.role === "admin" ? "bg-purple-50 text-purple-600 border border-purple-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-1.5 justify-start">
                          <Link to={`/dashboard/users/${user.id}`}>
                            <button className="p-1.5 text-[#ED346C] hover:bg-pink-50 rounded-lg transition-colors" title="Lihat Profil"><Eye size={14} /></button>
                          </Link>
                          <button onClick={() => handleEdit(user)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Ubah Akses"><Pencil size={14} /></button>
                          <button onClick={() => handleDelete(user.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Hapus"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </>
                  );
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}