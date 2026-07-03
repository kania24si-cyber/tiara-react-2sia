import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { customersAPI } from "../services/customersAPI";
import { usersAPI } from "../services/usersAPI";

import PageHeader from "../components/PageHeader";
import CustomerForm from "../components/CustomerForm";
import FormModal from "../components/FormModal";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import SearchBar from "../components/SearchBar";
import StatsCard from "../components/StatsCard";
import GenericTable from "../components/GenericTable"; 
import SelectField from "../components/SelectField"; 

import { Pencil, Trash2, Eye, Sparkles, SearchX } from "lucide-react";

const INITIAL_FORM_STATE = {
  user_id: "",
  nama_lengkap: "",
  jenis_kelamin: "",
  tanggal_lahir: "",
  nomor_hp: "",
  alamat: "",
  kota_provinsi: "",
};

const formatCustomerId = (id) => id ? `CS-${String(id).padStart(4, '0')}` : "";

export default function Customers() {
  const [genderFilter, setGenderFilter] = useState(() => sessionStorage.getItem("customer_filter_gender") || "all");
  const [search, setSearch] = useState(() => sessionStorage.getItem("customer_filter_search") || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dataForm, setDataForm] = useState(INITIAL_FORM_STATE);
  const [users, setUsers] = useState([]);

  // Fetch daftar akun member dari cloud database Supabase
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const all = await usersAPI.fetchUsers();
        // role hanya boleh: admin atau member
        const members = (all || []).filter((u) => u.role === "member");
        setUsers(members);
      } catch (e) {
        setUsers([]);
      }
    };
    loadUsers();
  }, []);


  useEffect(() => {
    loadCustomers();
    const interval = setInterval(() => {
      loadCustomers(true);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => { sessionStorage.setItem("customer_filter_gender", genderFilter); }, [genderFilter]);
  useEffect(() => { sessionStorage.setItem("customer_filter_search", search); }, [search]);

  const loadCustomers = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const data = await customersAPI.fetchCustomers();
      setCustomers(data);
    } catch (err) {
      setError("Gagal memuat data customer");
    } finally {
      if (!silent) setLoading(false);
    }
  };

  // Menangani penulisan form dinamis sesuai field name di database
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(""); setSuccess("");

      // Membuat payload bersih untuk menghindari pengiriman properti id duplikat
      const cleanPayload = {
        user_id: dataForm.user_id,
        nama_lengkap: dataForm.nama_lengkap,
        jenis_kelamin: dataForm.jenis_kelamin,
        tanggal_lahir: dataForm.tanggal_lahir,
        nomor_hp: dataForm.nomor_hp,
        alamat: dataForm.alamat,
        kota_provinsi: dataForm.kota_provinsi
      };

      if (isEdit) {
        await customersAPI.updateCustomer(selectedId, cleanPayload);
        setSuccess("Profil Member berhasil diperbarui ✨");
      } else {
        await customersAPI.createCustomer(cleanPayload);
        setSuccess("Member Baru Berhasil Terdaftar! 💄");
      }

      closeModal();
      await loadCustomers();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus data customer ini? ⚠️")) return;
    try {
      setLoading(true);
      await customersAPI.deleteCustomer(id);
      // refresh list agar UI update
      await loadCustomers();
      setSuccess("Customer berhasil dihapus ✨");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Gagal menghapus customer");
    } finally {
      setLoading(false);
    }
  };

  // Memasukkan data ke form saat tombol edit ditekan
  const handleEdit = (customer) => {
    setIsEdit(true);
    setSelectedId(customer.id);

    setDataForm({
      user_id: customer.user_id || "", 
      nama_lengkap: customer.nama_lengkap || "",
      jenis_kelamin: customer.jenis_kelamin || "",
      tanggal_lahir: customer.tanggal_lahir || "",
      nomor_hp: customer.nomor_hp || "",
      alamat: customer.alamat || "",
      kota_provinsi: customer.kota_provinsi || "",
    });

    setShowForm(true);
  };

  const closeModal = () => {
    setDataForm(INITIAL_FORM_STATE);
    setShowForm(false);
    setIsEdit(false);
    setSelectedId(null);
  };

  const checkGender = (dbValue, filterValue) => {
    if (!dbValue) return false;
    const normalizedDb = dbValue.toUpperCase();
    if (filterValue === "L") return normalizedDb === "L" || normalizedDb.startsWith("LAKI");
    if (filterValue === "P") return normalizedDb === "P" || normalizedDb.startsWith("PEREMPUAN");
    return false;
  };

  const filteredCustomers = customers.filter((customer) => {
    const prettyId = formatCustomerId(customer.id).toLowerCase();
    const matchSearch = 
      customer.nama_lengkap?.toLowerCase().includes(search.toLowerCase()) ||
      customer.kota_provinsi?.toLowerCase().includes(search.toLowerCase()) ||
      prettyId.includes(search.toLowerCase());

    return matchSearch && (genderFilter === "all" || checkGender(customer.jenis_kelamin, genderFilter));
  });

  return (
    <div className="space-y-6 p-4 bg-[#FFFBFB] min-h-screen">
      
      {/* 1. HEADER UTAMA */}
      <PageHeader 
        title="Glow Customers" 
        subtitle="Kelola data keanggotaan dan profil demografis pelanggan BLOOM."
        breadcrumb={["Dashboard", "Customers"]}
      >
        <button
          onClick={() => {
            setIsEdit(false);
            setSelectedId(null);
            setDataForm(INITIAL_FORM_STATE);
            setShowForm(true);
          }}
          className="bg-[#ED346C] hover:bg-[#d62659] text-white text-xs py-2.5 px-5 flex items-center gap-2 rounded-full font-semibold shadow-sm transition-all duration-150"
        >
          <Sparkles size={14} /> Add New Member
        </button>
      </PageHeader>

      {/* ALERT NOTIFIKASI */}
      {error && <div className="bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-100 text-xs font-medium">{error}</div>}
      {success && <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-100 text-xs font-medium">{success}</div>}

      {/* POPUP MODAL FORM */}
      {showForm && (
        <FormModal title={isEdit ? "Edit Member Profile 💄" : "Register New Member 🌸"} onClose={closeModal}>
          <CustomerForm 
            dataForm={dataForm} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
            loading={loading} 
            isEdit={isEdit} 
            userList={users} // Mengirim state users hasil fetch untuk dibaca di dropdown form
          />
        </FormModal>
      )}

      {/* 2. AREA FILTER & CARI */}
      <div className="bg-white p-4 rounded-2xl border border-pink-100/50 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
        <div className="w-full sm:flex-1">
          <SearchBar placeholder="Cari nama, kota, atau ID member..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="w-full sm:w-64">
          <SelectField value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)} options={[{ value: "all", label: "Semua Kategori" }, { value: "L", label: "Laki-Laki 🔵" }, { value: "P", label: "Perempuan 🔴" }]} />
        </div>
      </div>

      {/* 3. PANEL STATISTIK RINGKAS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-pink-100/40 shadow-sm"><StatsCard title="Total Active Members" value={customers.length} color="text-[#ED346C] font-bold text-2xl" /></div>
        <div className="bg-white p-4 rounded-2xl border border-pink-100/40 shadow-sm"><StatsCard title="Laki-Laki" value={customers.filter((c) => checkGender(c.jenis_kelamin, "L")).length} color="text-blue-500 font-bold text-2xl" /></div>
        <div className="bg-white p-4 rounded-2xl border border-pink-100/40 shadow-sm"><StatsCard title="Perempuan" value={customers.filter((c) => checkGender(c.jenis_kelamin, "P")).length} color="text-[#E08098] font-bold text-2xl" /></div>
      </div>

      {/* 4. AREA DATA TABEL UTAMA */}
      <div className="bg-white rounded-2xl border border-pink-100/40 shadow-sm overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xs font-bold text-gray-700 tracking-wide uppercase">Customer Directory</h2>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-pink-50 text-[#ED346C]">{filteredCustomers.length} Records</span>
        </div>

        {loading && <div className="py-12"><LoadingSpinner text="Memuat berkas..." /></div>}
        {!loading && customers.length === 0 && <div className="py-12"><EmptyState text="Belum ada data member terdaftar." /></div>}
        
        {!loading && customers.length > 0 && filteredCustomers.length === 0 && (
          <div className="p-12 flex flex-col items-center text-center gap-2">
            <div className="p-3 bg-gray-50 text-gray-400 rounded-full"><SearchX size={20} /></div>
            <p className="text-xs font-semibold text-gray-600">Pencarian Tidak Ditemukan</p>
          </div>
        )}

        {!loading && filteredCustomers.length > 0 && (
          <div className="overflow-x-auto w-full">
            <div className="min-w-[1000px]">
              <GenericTable
                columns={["ID Member", "Nama Lengkap", "Kategori", "Tanggal Lahir", "Nomor HP", "Kota / Provinsi", "Aksi"]}
                data={filteredCustomers}
                renderRow={(customer) => (
                  <>
                    <td className="px-6 py-4 font-mono font-bold text-[#E08098] whitespace-nowrap">{formatCustomerId(customer.id)}</td>
                    <td className="px-6 py-4 font-semibold text-gray-800 whitespace-nowrap">{customer.nama_lengkap}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-medium ${checkGender(customer.jenis_kelamin, "L") ? "bg-blue-50 text-blue-600" : "bg-[#FFF0F3] text-[#ED346C]"}`}>
                        {checkGender(customer.jenis_kelamin, "L") ? "Laki-Laki" : "Perempuan"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{customer.tanggal_lahir}</td>
                    <td className="px-6 py-4 font-mono text-gray-500 whitespace-nowrap">{customer.nomor_hp}</td>
                    <td className="px-6 py-4 text-gray-600 capitalize whitespace-nowrap">{customer.kota_provinsi}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-1.5 justify-start">
                        <Link to={`/dashboard/customers/${customer.id}`}>
                          <button className="p-1.5 text-[#ED346C] hover:bg-pink-50 rounded-lg transition-colors" title="Lihat Detail"><Eye size={14} /></button>
                        </Link>
                        <button onClick={() => handleEdit(customer)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Ubah Data"><Pencil size={14} /></button>
                        <button onClick={() => handleDelete(customer.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Hapus"><Trash2 size={14} /></button>
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