import {
  MdDashboard,
  MdShoppingCart,
  MdPeople,
  MdError,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menu = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-white/30 text-white"
        : "text-white/80 hover:bg-white/20"
    }`;

  return (
    <div className="w-[260px] min-h-screen flex flex-col justify-between p-6 text-white
      bg-gradient-to-b from-[#FF7B7B] to-[#ED346C]">

      {/* TOP */}
      <div>

        {/* LOGO */}
        <h1 className="text-2xl font-bold mb-10 tracking-wide">
          BLOOM
        </h1>

        {/* MENU */}
        <div className="space-y-2">

          <NavLink to="/" className={menu}>
            <MdDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink to="/orders" className={menu}>
            <MdShoppingCart size={20} />
            Account
          </NavLink>

          <NavLink to="/customers" className={menu}>
            <MdPeople size={20} />
            Stats
          </NavLink>

          <NavLink to="/support" className={menu}>
            <MdError size={20} />
            Support
          </NavLink>

        </div>
      </div>

      {/* BOTTOM (LOGIN BUTTON) */}
      <div>
        <button className="w-full border border-white/40 text-white py-2 rounded-md hover:bg-white/20 transition">
          LOGIN
        </button>
      </div>

    </div>
  );
}