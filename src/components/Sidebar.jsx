import { useState, useEffect } from "react";
import {
  MdDashboard,
  MdShoppingBag,
  MdShoppingCart,
  MdPeople,
  MdStar,
  MdLocalOffer,
  MdRateReview,
  MdManageAccounts,
  MdNotificationImportant, // Icon baru untuk alert/reminder
} from "react-icons/md";

import { NavLink } from "react-router-dom";

// Daftar pengingat operasional yang krusial untuk Admin Toko Kecantikan
const ADMIN_REMINDERS = [
  "Check out-of-stock items in the 'Products' tab. 🛒",
  "Reply to pending customer reviews today. 💬",
  "Review active promo codes expiration dates. 🏷️",
  "Backup today's transaction report before log out. 📄",
  "Check and approve new membership requests. ⭐",
];

export default function Sidebar() {
  const [reminder, setReminder] = useState(ADMIN_REMINDERS[0]);

  // Mengacak pengingat setiap kali halaman dimuat/di-refresh
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * ADMIN_REMINDERS.length);
    setReminder(ADMIN_REMINDERS[randomIndex]);
  }, []);

  // Data Simulasi Target Penjualan
  const currentSales = 24;
  const targetSales = 30;
  const progressPercentage = Math.min((currentSales / targetSales) * 100, 100);

  const menu = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 text-xs font-medium ${
      isActive
        ? "bg-white/20 text-white shadow-md backdrop-blur-sm border border-white/10"
        : "text-white/80 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div
      className="
        fixed
        top-0
        left-0
        z-50
        w-[210px]
        h-screen
        p-5
        text-white
        bg-gradient-to-b
        from-[#FF7B7B]
        to-[#ED346C]
        flex
        flex-col
        justify-between
        shadow-xl
      "
    >
      {/* BAGIAN ATAS: LOGO & MENU LINKS */}
      <div className="overflow-y-auto pr-1 space-y-6 custom-scrollbar">
        {/* LOGO */}
        <div>
          <h1 className="text-2xl font-black tracking-wider">BLOOM 🌸</h1>
          <p className="text-[10px] uppercase tracking-widest text-white/70 font-medium mt-0.5">
            Beauty Dashboard
          </p>
        </div>

        {/* MENU */}
        <div className="space-y-1.5">
          <NavLink to="/dashboard" end className={menu}>
            <MdDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/dashboard/products" className={menu}>
            <MdShoppingBag size={18} />
            <span>Products</span>
          </NavLink>

          <NavLink to="/dashboard/transactions" className={menu}>
            <MdShoppingCart size={18} />
            <span>Transaction</span>
          </NavLink>

          <NavLink to="/dashboard/customers" className={menu}>
            <MdPeople size={18} />
            <span>Stats</span>
          </NavLink>

          <NavLink to="/dashboard/memberships" className={menu}>
            <MdStar size={18} />
            <span>Membership</span>
          </NavLink>

          <NavLink to="/dashboard/promos" className={menu}>
            <MdLocalOffer size={18} />
            <span>Promos</span>
          </NavLink>

          <NavLink to="/dashboard/reviews" className={menu}>
            <MdRateReview size={18} />
            <span>Reviews</span>
          </NavLink>

          <NavLink to="/dashboard/users" className={menu}>
            <MdManageAccounts size={18} />
            <span>Users</span>
          </NavLink>
        </div>

        {/* QUICK INFO ACTIVITY */}
        <div className="bg-white/10 rounded-2xl p-3.5 border border-white/10 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">Today's Activity</p>
          <div className="mt-2 space-y-1.5 text-xs text-white/90">
            <div className="flex justify-between">
              <span className="text-white/70">Transactions</span>
              <span className="font-bold">{currentSales}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Customers</span>
              <span className="font-bold">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Members</span>
              <span className="font-bold">8</span>
            </div>
          </div>
        </div>
      </div>

      {/* BAGIAN BAWAH: TARGET TRACKER & ADMIN TASK REMINDER */}
      <div className="pt-4 border-t border-white/10 space-y-4 bg-gradient-to-t from-[#ED346C] via-[#ED346C] to-transparent">
        
        {/* GOALS TARGET TRACKER PROGRESS BAR */}
        <div className="space-y-1 px-1">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-white/80">
            <span>Daily Sales Goal</span>
            <span>{currentSales}/{targetSales} Trx</span>
          </div>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden p-[1px] border border-white/10">
            <div 
              className="h-full bg-gradient-to-r from-amber-300 to-yellow-200 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-[9px] text-white/60 italic">
            {progressPercentage >= 100 ? "🎉 Target reached! Incredibly amazing!" : `Need ${targetSales - currentSales} more to hit the target.`}
          </p>
        </div>

        {/* FUNGSI BARU: GLASSMORPHISM ADMIN REMINDER BOX */}
        <div className="bg-white/10 rounded-xl p-3 border border-white/10 shadow-sm relative overflow-hidden group">
          <div className="absolute top-2 right-2 text-amber-300/40 group-hover:text-amber-300 transition-colors duration-300">
            <MdNotificationImportant size={14} />
          </div>
          <p className="text-[10px] font-bold tracking-wider text-amber-300 uppercase mb-1">Admin Task</p>
          <p className="text-[11px] text-white/90 leading-snug font-medium">
            {reminder}
          </p>
        </div>

      </div>
    </div>
  );
}