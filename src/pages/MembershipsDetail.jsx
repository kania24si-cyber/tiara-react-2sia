import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { membershipsAPI } from "../services/membershipsAPI"; 

import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";

import { ArrowLeft, IdCard, Calendar, User, ToggleLeft, ShieldCheck, AlertCircle } from "lucide-react";

const formatMembershipId = (id) => {
  if (!id) return "";
  return `MB-${String(id).padStart(4, '0')}`;
};

const formatCustomerId = (id) => {
  if (!id) return "";
  return `CS-${String(id).padStart(4, '0')}`;
};

export default function MembershipsDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDetail();
  }, [id]);

  const loadDetail = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await membershipsAPI.fetchMemberships(); 
      const found = data.find((item) => String(item.id) === String(id));
      
      if (found) {
        setMembership(found);
      } else {
        setError("Berkas kartu keanggotaan tidak ditemukan di sistem pusat.");
      }
    } catch (err) {
      setError("Gagal memuat detail data kemitraan dari server database");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 p-4 bg-[#FFFBFB] min-h-screen">
        <PageHeader title="Membership Tier Details" breadcrumb={["Dashboard", "Memberships", "Detail"]} />
        <div className="bg-white rounded-2xl border border-pink-100/50 shadow-sm flex flex-col justify-center items-center py-20">
          <LoadingSpinner text="Membuka arsip kemitraan kartu..." />
        </div>
      </div>
    );
  }

  if (error || !membership) {
    return (
      <div className="space-y-6 p-4 bg-[#FFFBFB] min-h-screen">
        <PageHeader title="Membership Not Found" breadcrumb={["Dashboard", "Memberships", "Not Found"]} />
        <div className="bg-white border border-rose-100 rounded-2xl max-w-xl mx-auto p-8 text-center shadow-sm flex flex-col items-center gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-full">
            <AlertCircle size={28} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-800">Gagal Memuat Kemitraan</h3>
            <p className="text-xs text-gray-500 mt-1">{error || "Data kemitraan tidak berhasil ditemukan."}</p>
          </div>
          <button 
            onClick={() => navigate("/dashboard/memberships")}
            className="bg-[#ED346C] hover:bg-[#d62659] text-white text-xs py-2.5 px-6 rounded-full font-semibold transition-colors shadow-sm flex items-center gap-2"
          >
            <ArrowLeft size={14} /> Kembali ke List Kemitraan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 bg-[#FFFBFB] min-h-screen">
      
      {/* 1. HEADER UTAMA */}
      <PageHeader 
        title={`Profile ${formatMembershipId(membership.id)}`} 
        subtitle="Informasi status tier keanggotaan pelanggan, tingkat loyalitas kuota, serta masa aktif kemitraan."
        breadcrumb={["Dashboard", "Memberships", formatMembershipId(membership.id)]}
      >
        <button 
          onClick={() => navigate("/dashboard/memberships")}
          className="border border-pink-200 text-gray-600 hover:bg-pink-50 text-xs py-2.5 px-5 flex items-center gap-2 rounded-full font-semibold transition-all duration-150 bg-white shadow-sm"
        >
          <ArrowLeft size={14} /> Kembali
        </button>
      </PageHeader>

      {/* 2. GRID KONTEN UTAMA */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-5xl mx-auto">
        
        {/* Sisi Kiri: Simulasi Kartu VIP Fisik */}
        <div className="md:col-span-4 bg-white rounded-3xl border border-pink-100/60 p-6 shadow-sm flex flex-col items-center justify-between text-center relative overflow-hidden h-[320px]">
          {/* Aksen hiasan latar belakang kartu premium */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-pink-100/40 to-transparent rounded-full blur-xl" />
          
          <div className="w-full flex flex-col items-center pt-4">
            <div className="w-16 h-16 bg-gradient-to-tr from-[#ED346C] to-pink-400 text-white rounded-2xl flex items-center justify-center shadow-md border border-white">
              <IdCard size={28} />
            </div>
            
            <div className="mt-4">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Linked Customer</p>
              <Link 
                to={`/dashboard/customers/${membership.customer_id}`} 
                className="text-lg font-black text-gray-800 hover:text-[#ED346C] tracking-tight block mt-0.5 transition-colors"
              >
                {formatCustomerId(membership.customer_id)}
              </Link>
              <p className="text-xs font-mono font-bold text-[#ED346C] mt-1 bg-pink-50 px-2 py-0.5 rounded-md border border-pink-100/50 inline-block">
                {formatMembershipId(membership.id)}
              </p>
            </div>
          </div>

          <div className="w-full pb-2">
            <span className={`inline-flex items-center justify-center px-6 py-1.5 rounded-full text-xs font-black tracking-widest uppercase border w-full ${
              membership.level_membership === "Gold" 
                ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-white border-transparent shadow-sm" 
                : "bg-slate-800 text-white border-transparent shadow-sm"
            }`}>
              {membership.level_membership} TIER
            </span>
          </div>
        </div>

        {/* Sisi Kanan: Rincian Data Ledger Kemitraan */}
        <div className="md:col-span-8 bg-white rounded-3xl border border-pink-100/60 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-gray-800 tracking-tight border-b border-gray-50 pb-4 mb-5 flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#ED346C]" /> Informasi Kemitraan Pelanggan
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Item: Tanggal Daftar */}
              <div className="flex gap-3.5 items-center bg-gray-50/60 p-3.5 rounded-2xl border border-gray-100">
                <div className="p-2.5 bg-white text-[#ED346C] rounded-xl shadow-sm border border-gray-100">
                  <Calendar size={15} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tanggal Terdaftar</h4>
                  <p className="text-xs font-bold text-gray-700 mt-0.5">{membership.tanggal_daftar || "-"}</p>
                </div>
              </div>

              {/* Item: Tipe Status Member */}
              <div className="flex gap-3.5 items-center bg-gray-50/60 p-3.5 rounded-2xl border border-gray-100">
                <div className="p-2.5 bg-white text-[#ED346C] rounded-xl shadow-sm border border-gray-100">
                  <User size={15} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status Tipe Member</h4>
                  <p className="text-xs font-bold text-gray-700 mt-0.5">{membership.status_member || "-"}</p>
                </div>
              </div>

              {/* Item: Otoritas Keaktifan */}
              <div className="flex gap-3.5 items-center bg-gray-50/60 p-3.5 rounded-2xl border border-gray-100 sm:col-span-2">
                <div className="p-2.5 bg-white text-[#ED346C] rounded-xl shadow-sm border border-gray-100">
                  <ToggleLeft size={15} />
                </div>
                <div className="flex-1">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status Otoritas Keaktifan</h4>
                  <div className="mt-1">
                    <span className={`inline-flex px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wide border uppercase ${
                      membership.status_aktif === "Aktif" 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                        : "bg-rose-50 text-rose-600 border-rose-100"
                    }`}>
                      {membership.status_aktif || "Non-Aktif"}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Log Registrasi Sistem */}
          {membership.created_at && (
            <div className="mt-8 pt-4 border-t border-gray-50 text-right">
              <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-3 py-1 rounded-md border border-gray-100">
                System Record Log: {new Date(membership.created_at).toLocaleString("id-ID")}
              </span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}