// src/pages/member/MemberDashboard.jsx
import { useEffect, useState } from "react";
import { MdShoppingCart, MdAttachMoney, MdCardGiftcard, MdRateReview } from "react-icons/md";
import PageHeader from "../../components/PageHeader";
import MemberStatsCard from "../../components/MemberStatsCard"; // <-- Komponen baru kamu
import LoadingSpinner from "../../components/LoadingSpinner";
import { promosAPI } from "../../services/promosAPI";

export default function MemberDashboard() {
  const user = JSON.parse(localStorage.getItem("admin") || "{}");
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState({ orders: 0, spending: 0, promos: 0, reviews: 0 });

  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      try {
        setLoading(true);
        // 1. Ambil data promos dari API
        const activePromos = await promosAPI.fetchPromos();
        const promoCount = (activePromos || []).filter(p => p.is_active).length;

        // 2. Ambil data orders lokal dari localStorage untuk user ini
        const localOrders = JSON.parse(localStorage.getItem(`orders_${user.id}`) || "[]");
        const totalSpending = localOrders.reduce((sum, o) => sum + (Number(o.total_price) || 0), 0);

        // 3. Ambil data reviews dari localStorage untuk user ini
        const localReviews = JSON.parse(localStorage.getItem(`reviews_${user.id}`) || "[]");

        setMetrics({
          orders: localOrders.length,
          spending: totalSpending,
          promos: promoCount,
          reviews: localReviews.length
        });
      } catch (err) {
        console.error("Gagal sinkronisasi matriks dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardMetrics();
  }, [user.id]);

  if (loading) return <div className="py-20"><LoadingSpinner text="Mengkalkulasi total poin & data kosmetik..." /></div>;

  return (
    <div className="space-y-6">
      <PageHeader 
        title={`Welcome Back, ${user.username || "Gorgeous"}! ✨`} 
        subtitle="Selamat datang di BLOOM Member Lounge. Berikut rangkuman transaksi dan voucher kecantikan spesial Anda."
        breadcrumb={["Member", "Dashboard"]}
      />

      {/* GRID STATISTIK MENGGUNAKAN MEMBERSTATSCARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-pink-100/40 shadow-sm">
          <MemberStatsCard 
            title="Total Orders" 
            value={`${metrics.orders} Trx`} 
            color="text-[#ED346C] font-black text-xl" 
            icon={MdShoppingCart} 
          />
        </div>
        <div className="bg-white p-4 rounded-2xl border border-pink-100/40 shadow-sm">
          <MemberStatsCard 
            title="Total Spending" 
            value={`Rp ${metrics.spending.toLocaleString("id-ID")}`} 
            color="text-purple-600 font-black text-xl" 
            icon={MdAttachMoney} 
          />
        </div>
        <div className="bg-white p-4 rounded-2xl border border-pink-100/40 shadow-sm">
          <MemberStatsCard 
            title="Available Promos" 
            value={`${metrics.promos} Vouchers`} 
            color="text-emerald-600 font-black text-xl" 
            icon={MdCardGiftcard} 
          />
        </div>
        <div className="bg-white p-4 rounded-2xl border border-pink-100/40 shadow-sm">
          <MemberStatsCard 
            title="My Reviews" 
            value={`${metrics.reviews} Ulasan`} 
            color="text-amber-500 font-black text-xl" 
            icon={MdRateReview} 
          />
        </div>
      </div>

      {/* BANNER PROMOSI INTERNAL */}
      <div className="p-6 bg-gradient-to-r from-pink-500 to-[#ED346C] rounded-2xl text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold">Klaim Membership Pink Diamond Anda! 💎</h3>
          <p className="text-xs text-white/90 mt-1">Dapatkan akumulasi cashback hingga 15% setiap transaksi belanja kosmetik di BLOOM official outlet.</p>
        </div>
        <span className="bg-white text-[#ED346C] px-4 py-2 rounded-full font-bold shadow-sm whitespace-nowrap text-xs">
          VIP Verified Status
        </span>
      </div>
    </div>
  );
}