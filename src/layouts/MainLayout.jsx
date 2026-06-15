import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  // 💡 Tips Tambahan: Pastikan tidak ada token kosong yang merusak CSS layouting.
  // Kamu juga bisa menambahkan pengecekan auth state di sini jika diperlukan.

  return (
    <div className="flex w-full min-h-screen bg-[#FFFBFB] overflow-x-hidden">
      {/* 1. Komponen Navigasi Samping */}
      <Sidebar />

      {/* 2. Area Konten Utama Dashboard */}
      <div className="flex-1 ml-[210px] min-h-screen flex flex-col">
        {/* Header Atas */}
        <Header />

        {/* Bungkus Main Konten dengan batasan flex agar layout tidak hancur */}
        <main className="p-6 flex-1 w-full max-w-[1440px] mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}