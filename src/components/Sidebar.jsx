import {
  MdDashboard,
  MdShoppingBag,
  MdShoppingCart,
  MdPeople,
  MdStar,
} from "react-icons/md";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menu = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-white/25 text-white shadow-md"
        : "text-white/80 hover:bg-white/15 hover:text-white"
    }`;

  return (
    <div
      className="
        w-[260px]
        min-h-screen
        flex
        flex-col
        justify-between
        p-6
        text-white
        bg-gradient-to-b
        from-[#FF7B7B]
        to-[#ED346C]
      "
    >
      {/* TOP */}
      <div>
        {/* LOGO */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-wide">
            BLOOM
          </h1>

          <p className="text-sm text-white/70 mt-1">
            Beauty Dashboard
          </p>
        </div>

        {/* MENU */}
        <div className="space-y-2">
          <NavLink to="/BloomComponents" className={menu}>
            <MdDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/" className={menu}>
            <MdShoppingBag size={20} />
            <span>Products</span>
          </NavLink>

          <NavLink to="/orders" className={menu}>
            <MdShoppingCart size={20} />
            <span>Transaction</span>
          </NavLink>

          <NavLink to="/customers" className={menu}>
            <MdPeople size={20} />
            <span>Stats</span>
          </NavLink>

          <NavLink to="/Memberships" className={menu}>
            <MdStar size={20} />
            <span>Membership</span>
          </NavLink>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/20 pt-5">
        <button
          className="
            w-full
            py-3
            rounded-xl
            border
            border-white/30
            bg-white/10
            hover:bg-white/20
            transition
            font-medium
          "
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}