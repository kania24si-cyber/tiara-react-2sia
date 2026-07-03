import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { customersAPI } from "../services/customersAPI"; 
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";

import { ArrowLeft, User, Phone, MapPin, Calendar, Users, AlertCircle } from "lucide-react";

const formatCustomerId = (id) => {
  if (!id) return "";
  return `CS-${String(id).padStart(4, '0')}`;
};

// Fungsi helper untuk generate inisial nama avatar
const getInitialName = (name) => {
  if (!name) return "??";
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0].substring(0, 2).toUpperCase();
};

export default function CustomersDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCustomerDetail = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await customersAPI.fetchCustomerById(id);
        setCustomer(data);
      } catch (err) {
        setError("Gagal memuat detail customer atau data tidak ditemukan");
      } finally {
        setLoading(false);
      }
    };

    if (id) getCustomerDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6 p-4 bg-[#FFFBFB] min-h-screen">
        <PageHeader title="Customer Account Detail" breadcrumb={["Dashboard", "Customers", "Loading..."]} />
        <div className="bg-white rounded-2xl border border-pink-100/50 shadow-sm flex justify-center py-20">
          <LoadingSpinner text="Memuat berkas profil eksklusif customer..." />
        </div>
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="space-y-6 p-4 bg-[#FFFBFB] min-h-screen">
        <PageHeader title="Customer Profiles" breadcrumb={["Dashboard", "Customers", "Error"]} />
        <div className="bg-white border border-rose-100 rounded-2xl max-w-xl mx-auto p-8 text-center shadow-sm flex flex-col items-center gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-full">
            <AlertCircle size={28} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-800">Berkas Gagal Ditemukan</h3>
            <p className="text-xs text-gray-500 mt-1">{error || "Identitas customer tidak terdaftar di database pusat."}</p>
          </div>
          <Link to="/dashboard/customers" className="mt-2">
            <button className="bg-[#ED346C] hover:bg-[#d62659] text-white text-xs py-2.5 px-6 rounded-full font-semibold transition-colors shadow-sm">
              Kembali ke Manajemen Customers
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 bg-[#FFFBFB] min-h-screen">
      
      {/* 1. HEADER UTAMA */}
      <PageHeader 
        title={`Profile ${formatCustomerId(customer.id)}`} 
        subtitle="Informasi rekaman kartu identitas, wilayah domisili, dan kontak korespondensi personal pelanggan."
        breadcrumb={["Dashboard", "Customers", formatCustomerId(customer.id)]}
      >
        <Link to="/dashboard/customers">
          <button className="border border-pink-200 text-gray-600 hover:bg-pink-50 text-xs py-2.5 px-5 flex items-center gap-2 rounded-full font-semibold transition-all duration-150 bg-white">
            <ArrowLeft size={14} /> Kembali
          </button>
        </Link>
      </PageHeader>

      {/* 2. AREA PROFILE CARD MASTER */}
      <div className="max-w-4xl mx-auto bg-white border border-pink-100/60 rounded-3xl shadow-sm overflow-hidden">
        
        {/* Banner Dekoratif Atas */}
        <div className="h-32 bg-gradient-to-r from-pink-400 via-[#ED346C] to-purple-500 relative" />

        {/* Profil Singkat (Avatar & Badge Utama) */}
        <div className="px-8 pb-6 relative flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-14 border-b border-gray-100">
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-[#ED346C] to-pink-300 text-white font-bold text-3xl flex items-center justify-center shadow-md border-4 border-white tracking-wider">
            {getInitialName(customer.nama_lengkap)}
          </div>
          
          <div className="text-center sm:text-left flex-1 py-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
              <h2 className="text-xl font-bold text-gray-800 tracking-tight">{customer.nama_lengkap}</h2>
              <span className={`inline-flex items-center justify-center mx-auto sm:mx-0 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border ${
                customer.jenis_kelamin === "L" 
                  ? "bg-blue-50 text-blue-600 border-blue-100" 
                  : "bg-pink-50 text-[#ED346C] border-pink-100"
              }`}>
                {customer.jenis_kelamin === "L" ? "Male 🔵" : "Female 🌸"}
              </span>
            </div>
            <p className="text-xs font-mono font-bold text-[#ED346C] mt-1">{formatCustomerId(customer.id)}</p>
            <p className="text-[11px] text-gray-500 font-semibold mt-0.5">@{customer.username || "unknown"}</p>

          </div>
        </div>

        {/* DETIL GRID INFORMASI */}
        <div className="p-8">
          <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-6 flex items-center gap-2">
            <User size={13} className="text-[#ED346C]" /> Account Personal Ledger
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Otoritas Sistem */}
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">System User Authority ID</p>
              <div className="bg-gray-50/70 border border-gray-100 p-2.5 rounded-xl">
                <p className="text-xs text-gray-700 font-mono font-semibold">
                  {customer.user_id ? `USR-${String(customer.user_id).padStart(4, '0')}` : "⚠️ UNLINKED SYSTEM ACCOUNT"}
                </p>
              </div>
            </div>

            {/* Nomor HP */}
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Contact Phone Line</p>
              <div className="bg-gray-50/70 border border-gray-100 p-2.5 rounded-xl flex items-center gap-2 text-gray-700">
                <Phone size={13} className="text-gray-400" />
                <p className="text-xs font-mono font-medium">{customer.nomor_hp || "-"}</p>
              </div>
            </div>

            {/* Tanggal Lahir */}
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Date of Birth</p>
              <div className="bg-gray-50/70 border border-gray-100 p-2.5 rounded-xl flex items-center gap-2 text-gray-700">
                <Calendar size={13} className="text-gray-400" />
                <p className="text-xs font-medium">{customer.tanggal_lahir || "-"}</p>
              </div>
            </div>

            {/* Wilayah / Provinsi */}
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Regional Province Zone</p>
              <div className="bg-gray-50/70 border border-gray-100 p-2.5 rounded-xl flex items-center gap-2 text-gray-700">
                <MapPin size={13} className="text-gray-400" />
                <p className="text-xs font-semibold text-gray-800">{customer.kota_provinsi || "-"}</p>
              </div>
            </div>

            {/* Alamat Domisili Penuh */}
            <div className="md:col-span-2 space-y-1 mt-2">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Full Residential Address</p>
              <div className="bg-pink-50/15 border border-pink-100/50 p-4 rounded-2xl">
                <p className="text-xs text-gray-600 font-medium whitespace-pre-line leading-relaxed">
                  {customer.alamat || "Detail alamat domisili fisik belum dimasukkan."}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}