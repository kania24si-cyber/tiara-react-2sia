import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usersAPI } from "../services/usersAPI";

import LoadingSpinner from "../components/LoadingSpinner";
import PageHeader from "../components/PageHeader";

import { ArrowLeft, Shield, User, Mail, Key, Sparkles, Fingerprint, AlertCircle } from "lucide-react";

const formatUserId = (id) => id ? `USR-${String(id).padStart(4, '0')}` : "";

export default function UsersDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUserDetail();
  }, [id]);

  const loadUserDetail = async () => {
    try {
      setLoading(true); setError("");
      const data = await usersAPI.getUserById(id); 
      if (data) {
        setUser(data);
      } else {
        setError("Profil akun pengguna tidak ditemukan atau sudah dinonaktifkan 🌟");
      }
    } catch (err) {
      setError("Gagal memuat detail data pengguna dari database");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 p-4 bg-[#FFFBFB] min-h-screen">
        <PageHeader title="User Profile Details" breadcrumb={["Dashboard", "Users", "Detail"]} />
        <div className="bg-white rounded-2xl border border-pink-100/50 shadow-sm flex flex-col justify-center items-center py-20">
          <LoadingSpinner text="Sedang mengambil berkas enkripsi identitas pengguna..." />
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="space-y-6 p-4 bg-[#FFFBFB] min-h-screen">
        <PageHeader title="User Profile Details" breadcrumb={["Dashboard", "Users", "Not Found"]} />
        <div className="bg-white border border-rose-100 rounded-2xl max-w-xl mx-auto p-8 text-center shadow-sm flex flex-col items-center gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-full"><AlertCircle size={28} /></div>
          <div>
            <h3 className="text-sm font-bold text-gray-800">Akun Gagal Dimuat</h3>
            <p className="text-xs text-gray-500 mt-1">{error || "Berkas identitas akun tidak berhasil ditemukan."}</p>
          </div>
          <button 
            onClick={() => navigate("/dashboard/users")}
            className="bg-[#ED346C] hover:bg-[#d62659] text-white text-xs py-2.5 px-6 rounded-full font-semibold transition-colors shadow-sm flex items-center gap-2"
          >
            <ArrowLeft size={14} /> Kembali ke Manajemen Users
          </button>
        </div>
      </div>
    );
  }

  // Terapkan logika penyaringan tautan URL gambar disini
  const isValidUrl = user.avatar_url && user.avatar_url.startsWith("http");
  const displayAvatar = isValidUrl 
    ? user.avatar_url 
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || "User")}&background=FCE7F3&color=ED346C&bold=true&size=150`;

  return (
    <div className="space-y-6 p-4 bg-[#FFFBFB] min-h-screen">
      <PageHeader title={`Profile ${formatUserId(user.id)}`} subtitle="Verifikasi tingkat otoritas sistem, kredensial email masuk, serta status hak akses internal staff." breadcrumb={["Dashboard", "Users", formatUserId(user.id)]}>
        <button 
          onClick={() => navigate("/dashboard/users")}
          className="border border-pink-200 text-gray-600 hover:bg-pink-50 text-xs py-2.5 px-5 flex items-center gap-2 rounded-full font-semibold transition-all duration-150 bg-white shadow-sm"
        >
          <ArrowLeft size={14} /> Kembali
        </button>
      </PageHeader>

      <div className="max-w-xl mx-auto bg-white rounded-3xl border border-pink-100/60 shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 via-[#ED346C] to-pink-500 p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl"><Fingerprint size={22} /></div>
            <div>
              <h3 className="text-base font-bold tracking-tight">Otoritas Akses Sistem</h3>
              <p className="text-[10px] text-pink-100 tracking-wider">Sistem Keamanan Internal BLOOM</p>
            </div>
          </div>
          <span className="bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 text-emerald-300 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider flex items-center gap-1 uppercase">
            <Sparkles size={11} /> Active
          </span>
        </div>

        <div className="p-8 flex flex-col items-center border-b border-gray-50 bg-gradient-to-b from-gray-50/30 to-white">
          <div className="relative">
            <img
              src={displayAvatar} // Menggunakan link terverifikasi
              alt={user.username}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md ring-4 ring-pink-100/50"
            />
            <span className={`absolute bottom-0 right-0 p-2 rounded-full text-white shadow-md ${user.role === "admin" ? "bg-[#ED346C]" : "bg-emerald-500"}`}>
              {user.role === "admin" ? <Shield size={14} /> : <User size={14} />}
            </span>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mt-4 tracking-tight">{user.username}</h2>
          <span className={`inline-block mt-2 px-3.5 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase border ${user.role === "admin" ? "bg-pink-50 text-[#ED346C] border-pink-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"}`}>
            {user.role || "guest"}
          </span>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4 bg-gray-50/60 p-3.5 rounded-2xl border border-gray-100">
            <div className="p-2.5 bg-white text-[#ED346C] rounded-xl shadow-sm border border-gray-100"><Fingerprint size={16} /></div>
            <div className="flex-1">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">User System ID</p>
              <p className="text-xs font-mono font-bold text-gray-700 mt-0.5">{formatUserId(user.id)}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-50/60 p-3.5 rounded-2xl border border-gray-100">
            <div className="p-2.5 bg-white text-[#ED346C] rounded-xl shadow-sm border border-gray-100"><Mail size={16} /></div>
            <div className="flex-1">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Alamat Email Resmi</p>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-50/60 p-3.5 rounded-2xl border border-gray-100">
            <div className="p-2.5 bg-white text-[#ED346C] rounded-xl shadow-sm border border-gray-100"><Key size={16} /></div>
            <div className="flex-1">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Kata Sandi (Terenkripsi)</p>
              <p className="text-xs font-mono text-gray-400 select-all tracking-widest mt-0.5">
                {user.password ? "•".repeat(Math.min(user.password.length, 10)) : "••••••••••"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 text-center text-[11px] text-gray-400 font-medium border-t border-gray-100 tracking-wide">
          Hak akses diatur sepenuhnya oleh kebijakan enkripsi internal • GLOW &amp; BLOOM Co.
        </div>
      </div>
    </div>
  );
}