// src/pages/member/MemberProfile.jsx
import { useEffect, useState } from "react";
import { usersAPI } from "../../services/usersAPI";
import PageHeader from "../../components/PageHeader";
import LoadingSpinner from "../../components/LoadingSpinner";
import { User, Mail, Shield, Key, Save } from "lucide-react";

export default function MemberProfile() {
  const currentSession = JSON.parse(localStorage.getItem("admin") || "{}");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [dataForm, setDataForm] = useState({
    username: "",
    email: "",
    password: "",
    avatar_url: "",
    role: "guest"
  });

  const handleMemberDataChanged = () => {
    // refresh profile from localStorage/usersAPI
    loadUserProfile();
  };

  useEffect(() => {
    if (currentSession.id) {
      loadUserProfile();
    } else {
      setError("Sesi kadaluwarsa, silakan masuk kembali.");
    }

    window.addEventListener("member-data-updated", handleMemberDataChanged);

    const intervalId = setInterval(() => {
      // realtime-like sync lintas tab
      if (currentSession?.id) loadUserProfile();
    }, 6000);

    return () => {
      window.removeEventListener("member-data-updated", handleMemberDataChanged);
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const allUsers = await usersAPI.fetchUsers();
      const myData = allUsers.find((u) => u.id === currentSession.id);
      if (myData) {
        setDataForm({
          username: myData.username || "",
          email: myData.email || "",
          password: myData.password || "",
          avatar_url: myData.avatar_url || "",
          role: myData.role || "guest"
        });
      }
    } catch (err) {
      setError("Gagal menyelaraskan kredensial database akun.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); setError(""); setSuccess("");
      await usersAPI.updateUser(currentSession.id, dataForm);
      
      // Mutasi session storage lokal agar sinkron seketika
      const updated = { ...currentSession, username: dataForm.username, avatar_url: dataForm.avatar_url };
      localStorage.setItem("admin", JSON.stringify(updated));
      
      // trigger realtime sync for other member pages/tabs
      window.dispatchEvent(new Event("member-data-updated"));

      setSuccess("Profil Anda sukses di-update!");

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Gagal memperbarui database.");
    } finally {
      setLoading(false);
    }
  };

  const displayAvatar = dataForm.avatar_url?.startsWith("http")
    ? dataForm.avatar_url
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(dataForm.username || "User")}&background=FCE7F3&color=ED346C&bold=true`;

  if (loading && !dataForm.username) return <div className="py-20"><LoadingSpinner text="Sinkronisasi profil otorisasi..." /></div>;

  return (
    <div className="space-y-6 text-left">
      <PageHeader title="My Personal Account" subtitle="Perbarui identitas publik, tautan foto avatar, dan ganti kata sandi keamanan masuk Anda." breadcrumb={["Member", "Profile"]} />

      {error && <div className="bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-100 font-medium text-xs">{error}</div>}
      {success && <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-100 font-medium text-xs">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="bg-white border border-pink-100 p-5 rounded-2xl shadow-sm text-center flex flex-col items-center">
          <img src={displayAvatar} alt="Profile" className="w-24 h-24 rounded-full object-cover border-2 border-pink-200 shadow-sm bg-slate-50 mb-3" />
          <h3 className="font-bold text-slate-800 text-sm tracking-tight">{dataForm.username || "User"}</h3>
          <p className="text-gray-400 font-medium text-xs mt-0.5">{dataForm.email}</p>
          <div className="mt-4 w-full pt-3 border-t border-slate-50 flex items-center justify-center gap-1.5 text-emerald-600 font-bold bg-emerald-50/50 py-1.5 rounded-xl text-[10px] uppercase tracking-wide">
            <Shield size={12} /> Hak Akses Otoritas ({dataForm.role})
          </div>
        </div>

        <div className="md:col-span-2 bg-white border border-pink-100 p-6 rounded-2xl shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-1 flex items-center gap-1"><User size={12} /> Username / Panggilan</label>
              <input type="text" value={dataForm.username} onChange={(e) => setDataForm({ ...dataForm, username: e.target.value })} className="w-full text-xs p-2.5 border border-pink-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-200 font-semibold text-slate-700" required />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-1 flex items-center gap-1"><Mail size={12} /> Email Address (Read-Only)</label>
              <input type="email" value={dataForm.email} className="w-full text-xs p-2.5 border border-gray-200 bg-gray-50 rounded-xl font-medium text-gray-400 focus:outline-none cursor-not-allowed" disabled />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-1 flex items-center gap-1"><Key size={12} /> Password Baru</label>
              <input type="password" value={dataForm.password} onChange={(e) => setDataForm({ ...dataForm, password: e.target.value })} className="w-full text-xs p-2.5 border border-pink-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-200 font-mono" placeholder="Masukkan password keamanan baru..." required />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-1">Avatar Link URL Image</label>
              <input type="url" value={dataForm.avatar_url} onChange={(e) => setDataForm({ ...dataForm, avatar_url: e.target.value })} className="w-full text-xs p-2.5 border border-pink-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-200 placeholder:text-gray-300" placeholder="https://images.unsplash.com/photo-..." />
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 bg-[#ED346C] hover:bg-[#d62659] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm">
              <Save size={14} /> {loading ? "Menyimpan Berkas..." : "Update Konfigurasi Akun"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}