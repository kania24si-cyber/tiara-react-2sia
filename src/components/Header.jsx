import { FaBell } from "react-icons/fa";
import { SlSettings } from "react-icons/sl";

export default function Header() {
  return (
    <div className="topbar">
      {/* LEFT - GREETING BOX */}
      <div className="px-4 py-2 rounded-lg border border-[#FF7B7B] bg-white/60 shadow-sm">
        <p className="text-xs text-gray-500 font-[var(--font-inter)]">
          Hello, Tiara
        </p>

        <p className="text-sm font-semibold text-gray-800 font-[var(--font-inter)]">
          Welcome to your account!
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block px-4 py-2 rounded-md border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-pink-200"
        />

        {/* NOTIF */}
        <div className="icon-box relative">
          <FaBell />

          <span className="badge-pink absolute -top-1 -right-1 text-[10px] px-1.5 py-0.5">
            5
          </span>
        </div>

        {/* SETTINGS */}
        <div className="icon-box">
          <SlSettings />
        </div>

        {/* PROFILE */}
        <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
          <img
            src="img/james3.jpg"
            alt="profile"
            className="w-9 h-9 rounded-full object-cover border-2 border-pink-200"
          />
        </div>
      </div>
    </div>
  );
}
